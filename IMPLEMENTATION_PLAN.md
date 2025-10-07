# Full Website Audit & Admin Dashboard Implementation Plan
## Branch: feature/full-audit-admin-overhaul
**Status**: Phase 1 Complete ✅ | Phase 2 In Progress  
**Last Updated**: 2025-10-07

---

## ✅ Phase 1 COMPLETED: Critical Security Fixes (Days 1-2)

### ✅ C1: Database Tables Created
**Status**: COMPLETE  
**What was done**:
- Created `articles` table with full RLS policies
- Created `article_versions` table for version control
- Created `projects` table with full RLS policies
- Created `services` table with full RLS policies
- Created `media` table with full RLS policies
- Added proper indexes for performance
- Implemented triggers for `updated_at` columns

**Verification**:
```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public' 
AND tablename IN ('articles', 'projects', 'services', 'media');
```

### ✅ C2: XSS Vulnerability Fixed
**Status**: COMPLETE  
**What was done**:
- Installed `dompurify` and `@types/dompurify`
- Updated `src/pages/BlogPost.tsx` to sanitize HTML
- Configured allowed tags and attributes
- Added URI regexp for safe links only

**Before**:
```tsx
dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
```

**After**:
```tsx
dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(formatContent(post.content), {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', ...],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|...$/i,
  })
}}
```

### 🔄 Pending from Phase 1:
- [ ] Enable password strength protection in Supabase dashboard
- [ ] Update Deno std library to latest version

---

## 📋 Phase 2: High Priority Security & Validation (Days 3-5)

### H1: Enable Password Strength Protection
**Severity**: 🟠 HIGH  
**Owner**: Admin (Manual Step Required)  

**Steps**:
1. Open Supabase Dashboard
2. Navigate to Authentication → Settings
3. Enable "Password Strength"
4. Enable "Leaked Password Protection"
5. Set minimum password length: 12 characters
6. Require uppercase, lowercase, number, special character

**Documentation**: https://supabase.com/docs/guides/auth/password-security

---

### H2: Add Comprehensive Form Validation
**Severity**: 🟠 HIGH  
**Files to modify**:
- `supabase/functions/submit-contact/index.ts`
- `supabase/functions/submit-estimate/index.ts`
- `supabase/functions/subscribe-newsletter/index.ts`

**Implementation**:
Create `supabase/functions/_shared/validators.ts`:

```typescript
import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";

export const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase(),
  
  phone: z.string()
    .trim()
    .regex(/^[\d\s()+-]+$/, "Phone contains invalid characters")
    .max(20, "Phone must not exceed 20 characters")
    .optional(),
  
  message: z.string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must not exceed 2000 characters")
    .refine(
      (msg) => !/<script|javascript:|onerror=/i.test(msg),
      "Message contains forbidden content"
    ),
});

export const estimateSchema = z.object({
  name: contactSchema.shape.name,
  email: contactSchema.shape.email,
  phone: z.string().trim().min(10).max(20),
  sqft: z.number().int().min(100).max(1000000),
  service: z.enum(['painting', 'stucco', 'commercial', 'condo', 'other']),
  // ... add all fields with validation
});
```

**Usage in edge function**:
```typescript
import { contactSchema } from '../_shared/validators.ts';

// Validate input
const validation = contactSchema.safeParse(body);
if (!validation.success) {
  return new Response(
    JSON.stringify({ 
      error: 'Validation failed', 
      details: validation.error.format() 
    }),
    { status: 400, headers: corsHeaders }
  );
}

const data = validation.data; // Type-safe validated data
```

**Acceptance Criteria**:
- [ ] All edge functions use Zod validation
- [ ] Test with malicious payloads (XSS, SQL injection attempts)
- [ ] Frontend displays validation errors properly

---

### H3: Implement CSRF Protection
**Severity**: 🟠 HIGH  
**Complexity**: Medium  

**Architecture**:
1. Generate CSRF token on auth
2. Store in httpOnly cookie
3. Validate on all POST/PUT/DELETE requests

**Files to create**:
- `supabase/functions/_shared/csrf.ts`

**Implementation**:
```typescript
// csrf.ts
export const generateCSRFToken = (): string => {
  return crypto.randomUUID();
};

export const validateCSRFToken = (
  req: Request,
  expectedToken: string
): boolean => {
  const headerToken = req.headers.get('X-CSRF-Token');
  const cookieToken = getCookie(req, 'csrf_token');
  
  return headerToken === expectedToken && cookieToken === expectedToken;
};

// Set cookie with token
export const setCSRFCookie = (token: string): string => {
  return `csrf_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`;
};
```

**Integration**:
Update all CUD edge functions to require CSRF token:
```typescript
if (req.method !== 'GET' && req.method !== 'OPTIONS') {
  const csrfValid = validateCSRFToken(req, session.csrf_token);
  if (!csrfValid) {
    return new Response(
      JSON.stringify({ error: 'Invalid CSRF token' }),
      { status: 403, headers: corsHeaders }
    );
  }
}
```

**Acceptance Criteria**:
- [ ] CSRF tokens generated on login
- [ ] Tokens validated on all state-changing operations
- [ ] Attempt CSRF attack in test environment (should fail)

---

### H4: Server-Side File Upload Validation
**Severity**: 🟠 HIGH  
**Files**: `supabase/functions/media-presign/index.ts`

**Implementation**:
```typescript
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml'
];

const MAGIC_BYTES = {
  'image/jpeg': [0xFF, 0xD8, 0xFF],
  'image/png': [0x89, 0x50, 0x4E, 0x47],
  // ... add all types
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Validate mime type
if (!ALLOWED_MIME_TYPES.includes(body.mimeType)) {
  return new Response(
    JSON.stringify({ error: 'Invalid file type' }),
    { status: 400, headers: corsHeaders }
  );
}

// In actual upload handler (after file received):
const buffer = await file.arrayBuffer();
const bytes = new Uint8Array(buffer);
const magicBytes = MAGIC_BYTES[file.type];

if (!magicBytes || !matchesMagicBytes(bytes, magicBytes)) {
  throw new Error('File content does not match declared type');
}

if (buffer.byteLength > MAX_FILE_SIZE) {
  throw new Error('File too large');
}
```

**Acceptance Criteria**:
- [ ] Upload a `.exe` renamed to `.jpg` (should reject)
- [ ] Upload a PHP script disguised as image (should reject)
- [ ] Upload 11MB file (should reject)
- [ ] Upload legitimate 9MB JPEG (should succeed)

---

## 📊 Phase 3: Admin Dashboard Implementation (Days 6-8)

### Priority 1: Articles Management (Day 6)
**Files to create**:
- `src/pages/admin/ArticleEditor.tsx` (WYSIWYG with TipTap)
- `src/components/admin/RichTextEditor.tsx` (TipTap wrapper)
- `src/components/admin/ArticlePreview.tsx`
- `src/components/admin/ArticleMetadata.tsx` (SEO fields)

**Features**:
- ✅ List articles with filters
- [ ] Create new article
- [ ] Edit existing article
- [ ] Rich text editor (TipTap)
- [ ] Image upload integration
- [ ] SEO metadata fields
- [ ] Schedule publish date
- [ ] Preview before publish
- [ ] Version history viewer
- [ ] Publish/Unpublish toggle

**TipTap Setup**:
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link
```

**Example RichTextEditor Component**:
```tsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

export function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit, Image, Link],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-lg">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="prose p-4" />
    </div>
  );
}
```

---

### Priority 2: Media Library Enhancements (Day 7 morning)
**Files to update**:
- `src/pages/admin/MediaLibrary.tsx` ✅ (exists, needs enhancements)

**Enhancements**:
- [ ] Bulk upload (drag & drop multiple files)
- [ ] Folder organization
- [ ] Image cropper/editor
- [ ] Thumbnail generation
- [ ] Copy URL to clipboard
- [ ] Usage tracking (which articles use this media)
- [ ] Bulk delete
- [ ] Advanced search (by tag, date, size)

---

### Priority 3: Projects Management (Day 7 afternoon)
**Files to create**:
- `src/pages/admin/ProjectEditor.tsx`
- `src/components/admin/GalleryManager.tsx`
- `src/components/admin/BeforeAfterUploader.tsx`

**Features**:
- [ ] List projects with filters
- [ ] Create/Edit project
- [ ] Gallery management (reorder, captions)
- [ ] Before/After image uploader
- [ ] Testimonial input
- [ ] Featured project toggle
- [ ] Category/Tags management
- [ ] Publish/Draft status

---

### Priority 4: Services Management (Day 8 morning)
**Files to create**:
- `src/pages/admin/ServiceEditor.tsx`
- `src/components/admin/ServiceFeatures.tsx`

**Features**:
- [ ] List services
- [ ] Create/Edit service
- [ ] Process steps builder (JSON editor or form)
- [ ] Features/Benefits lists
- [ ] FAQ editor
- [ ] Related content linking (projects, services)
- [ ] Display order management (drag & drop)
- [ ] Active/Inactive toggle

---

### Priority 5: Users & Roles Management (Day 8 afternoon)
**Files to update**:
- `src/pages/admin/Users.tsx` ✅ (exists, needs implementation)

**Features**:
- [ ] List all users
- [ ] View user details
- [ ] Grant/Revoke roles (Admin, Editor, Viewer)
- [ ] Invite new users (send email with setup link)
- [ ] Deactivate users
- [ ] View user activity (last login, actions)

**Roles to implement**:
- **Admin**: Full access to everything
- **Editor**: Can create/edit/publish content
- **Viewer**: Read-only access to admin dashboard

---

## 🔍 Phase 4: Testing & CI/CD (Days 9-11)

### Day 9: Automated Tests

#### Unit Tests
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

**Tests to write**:
- `tests/unit/DOMPurify.test.tsx` - XSS sanitization
- `tests/unit/validators.test.ts` - Zod schemas
- `tests/unit/csrf.test.ts` - CSRF token generation/validation
- `tests/unit/RichTextEditor.test.tsx` - TipTap integration

#### Integration Tests
- `tests/integration/articles-crud.test.ts` - Full CRUD flow
- `tests/integration/media-upload.test.ts` - File upload flow
- `tests/integration/auth-flow.test.ts` - Login/logout/roles

#### E2E Tests (Playwright)
**Critical Flows**:
1. Admin Login → Create Article → Upload Image → Publish → View on Public Site
2. Admin Login → Create Project → Upload Gallery → Publish → View on Public Site
3. Admin Login → Upload Media → Use in Article → Delete Media (should warn)
4. Public User → Submit Contact Form → Admin Views Submission

**Create**: `tests/e2e/admin-publish-flow.spec.ts`

```typescript
test('admin can create and publish article', async ({ page }) => {
  // Login as admin
  await page.goto('/admin/login');
  await page.fill('[name="email"]', 'admin@test.com');
  await page.fill('[name="password"]', 'TestPassword123!');
  await page.click('button[type="submit"]');
  
  // Navigate to articles
  await page.click('text=Articles');
  await page.click('text=New Article');
  
  // Fill article form
  await page.fill('[name="title"]', 'Test Article');
  await page.fill('[name="excerpt"]', 'This is a test');
  // ... fill rich text editor
  
  // Publish
  await page.click('text=Publish');
  
  // Verify public page
  const articleUrl = await page.locator('[data-testid="view-link"]').getAttribute('href');
  await page.goto(articleUrl);
  await expect(page.locator('h1')).toContainText('Test Article');
});
```

---

### Day 10: Security Scans

#### Static Analysis
```bash
# ESLint with security plugin
npm install --save-dev eslint-plugin-security

# Run scan
npm run lint -- --format json > artifacts/eslint.json
```

#### Dependency Vulnerabilities
```bash
# npm audit
npm audit --json > artifacts/npm-audit.json

# Optional: Snyk (if API key available)
npx snyk test --json > artifacts/snyk.json
```

#### Runtime Security (OWASP ZAP)
**Setup**:
```bash
# Pull ZAP Docker image
docker pull owasp/zap2docker-stable

# Run baseline scan
docker run -v $(pwd)/artifacts:/zap/wrk/:rw \
  -t owasp/zap2docker-stable \
  zap-baseline.py \
  -t https://staging.example.com \
  -r zap-report.html
```

**Manual Exploit Tests** (on staging only):
1. **CSRF**: Attempt to create article without CSRF token
2. **IDOR**: Try accessing another user's draft article
3. **SQL Injection**: Submit `'; DROP TABLE articles--` in form
4. **XSS**: Submit `<script>alert('XSS')</script>` in article body
5. **File Upload**: Upload malicious file disguised as image
6. **Auth Bypass**: Access `/admin` without valid session

**Expected**: All attacks should be blocked

---

### Day 11: Accessibility & Performance

#### Accessibility (axe-core)
```bash
npm install --save-dev @axe-core/playwright
```

**Add to Playwright tests**:
```typescript
import AxeBuilder from '@axe-core/playwright';

test('admin dashboard has no critical a11y violations', async ({ page }) => {
  await page.goto('/admin');
  
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

#### Performance Audit
```bash
npm install --save-dev lighthouse
```

**Run Lighthouse**:
```bash
lighthouse https://staging.example.com \
  --output json \
  --output-path artifacts/lighthouse.json \
  --preset perf \
  --chrome-flags="--headless"
```

**Targets**:
- FCP < 1.5s
- LCP < 2.5s
- TBT < 200ms
- CLS < 0.1
- Speed Index < 3.0s

---

## 📝 Phase 5: Documentation & Demo (Day 12)

### API Documentation
**Create**: `docs/API.md`

**Contents**:
- All edge function endpoints
- Request/response schemas
- Authentication requirements
- Rate limits
- Error codes
- Example cURL commands

### Admin User Guide
**Create**: `docs/ADMIN_GUIDE.md`

**Contents**:
- How to login
- How to create article (with screenshots)
- How to upload media
- How to create project
- How to manage users
- How to view audit logs
- Troubleshooting common issues

### Security Documentation
**Create**: `SECURITY.md`

**Contents**:
- Vulnerability disclosure policy
- Security contacts
- Supported versions
- Known issues (if any)

### Demo Video
**Record**:
1. Admin login
2. Create article with rich text
3. Upload images to media library
4. Insert image into article
5. Add SEO metadata
6. Preview article
7. Publish article
8. Show article on public site
9. Create project with gallery
10. Publish project
11. Show project on public site

**Tools**: Loom, OBS Studio, or similar  
**Duration**: 3-5 minutes  
**Save to**: `artifacts/demo.mp4`

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Security scans show no Critical/High issues
- [ ] Database backup created
- [ ] Migration plan reviewed
- [ ] Rollback plan documented

### Deployment Steps
1. [ ] Apply database migrations
2. [ ] Deploy edge functions
3. [ ] Deploy frontend
4. [ ] Verify health checks
5. [ ] Run smoke tests
6. [ ] Monitor error logs

### Post-Deployment
- [ ] Verify admin login works
- [ ] Create test article and publish
- [ ] Verify public site shows new content
- [ ] Monitor performance metrics
- [ ] Check error rates

---

## 📊 Success Metrics

### Security
- ✅ 0 Critical vulnerabilities
- ✅ 0 High vulnerabilities
- ✅ OWASP ZAP scan passes
- ✅ All security tests pass

### Functionality
- ✅ Admin can create/edit/publish articles
- ✅ Admin can create/edit/publish projects
- ✅ Admin can upload/manage media
- ✅ Admin can manage users/roles
- ✅ Published content visible on public site
- ✅ All CRUD operations work

### Performance
- ✅ Lighthouse score > 90
- ✅ FCP < 1.5s
- ✅ LCP < 2.5s
- ✅ No accessibility violations (Critical/Serious)

### Testing
- ✅ 100% of critical paths have E2E tests
- ✅ Unit test coverage > 80%
- ✅ All tests passing in CI

---

## 🎯 Current Status Summary

**Completed**:
- ✅ Database tables created
- ✅ XSS vulnerability fixed
- ✅ Audit report generated
- ✅ Splash overlay tests created

**In Progress**:
- 🔄 Admin dashboard UI components
- 🔄 Form validation schemas
- 🔄 CSRF protection

**Pending**:
- ⏳ E2E test suite
- ⏳ Security scans
- ⏳ Documentation
- ⏳ Demo video

**Next Steps**:
1. Enable password protection (manual step)
2. Implement form validation
3. Create admin UI components
4. Write E2E tests

---

**Last Updated**: 2025-10-07  
**Prepared By**: Lovable AI  
**Review Status**: Ready for Phase 2
