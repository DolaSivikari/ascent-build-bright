# Admin Dashboard → Live Website Connection

## Overview

This document explains how the admin dashboard is connected to the live website content. Content created in the admin is now stored in Lovable Cloud database and displayed on the public website via secure API endpoints.

## Architecture

```
Admin Dashboard → Database Tables → Public API Endpoints → Live Website
     (CRUD)         (Supabase)      (Edge Functions)        (React)
```

### Database Tables

- **articles**: Blog posts and articles
- **projects**: Portfolio projects and case studies
- **services**: Service offerings
- **media**: Uploaded images and files

### API Endpoints

#### Admin Endpoints (Authenticated)
- `POST /articles-crud` - Create/update articles
- `POST /articles-publish` - Publish/schedule articles
- `POST /services-crud` - Manage services
- `POST /media-crud` - Manage media files

#### Public Endpoints (Read-only)
- `GET /articles-public` - List published articles
- `GET /articles-public/:slug` - Get single article
- `GET /projects-public` - List published projects
- `GET /projects-public/:slug` - Get single project
- `GET /services-public` - List active services

## Content Migration

### Running the Migration Script

The migration script moves content from static JSON files to the database:

```bash
# Make sure you're in the project root
npm run migrate-content

# Or manually:
npx tsx scripts/migrate-content.ts
```

This will:
1. Read all articles from `src/data/blog-posts-complete.json`
2. Read all projects from `src/data/projects-expanded.json`
3. Insert them into the database (uses upsert, so it's safe to run multiple times)
4. Preserve slugs and URLs for SEO

### Migration Results

After migration, you'll see:
- ✅ Success count for each content type
- ❌ Error count with details
- 📋 Next steps

## Publishing Flow

### 1. Create Content in Admin

1. Log in to `/admin`
2. Navigate to Articles, Projects, or Services
3. Click "New" to create content
4. Fill in all required fields
5. Upload media via Media Library

### 2. Publish Content

**Draft → Published Flow:**

1. Click "Publish" button
2. Content status changes to `published`
3. `published_at` timestamp is set
4. Content immediately appears on live website

**Scheduled Publishing:**

1. Click "Schedule" button
2. Select future date/time
3. Content will auto-publish at that time (requires cron job)

### 3. View on Live Site

- Articles: `/blog/:slug`
- Projects: `/projects` (filtered view)
- Services: `/services`

## Frontend Integration

### React Hooks

The frontend uses custom hooks to fetch data:

```typescript
// Fetch articles
import { useArticles, useArticle } from '@/hooks/useArticles';

const { data, isLoading } = useArticles({ 
  category: 'Stucco & EIFS',
  limit: 10 
});

// Fetch single article
const { data: article } = useArticle('my-article-slug');
```

```typescript
// Fetch projects
import { useProjects, useProject } from '@/hooks/useProjects';

const { data } = useProjects({ 
  featured: true,
  limit: 20 
});
```

### Updated Pages

The following pages now use the database instead of static JSON:

- `src/pages/Blog.tsx` - Lists all articles
- `src/pages/BlogPost.tsx` - Single article view
- `src/pages/Projects.tsx` - Project portfolio
- `src/pages/CaseStudy.tsx` - Single project view (to be updated)

## Security & RLS Policies

### Row Level Security

All tables have RLS enabled with the following policies:

**Articles:**
- Public can SELECT published articles only
- Admins can perform all operations

**Projects:**
- Public can SELECT published projects only
- Admins can perform all operations

**Services:**
- Public can SELECT active services only
- Admins can perform all operations

**Media:**
- Authenticated users can manage their own media
- Admins can manage all media

### API Security

- **Admin endpoints**: Require authentication (`verify_jwt = true`)
- **Public endpoints**: No authentication required (`verify_jwt = false`)
- **Rate limiting**: Implemented on contact/estimate forms

## Cache Invalidation

### Manual Cache Invalidation

Currently, content updates are reflected immediately because we're fetching from the database on each request.

### Future: CDN Invalidation

For production with CDN caching:

```typescript
// After publishing content
await fetch('/api/invalidate-cache', {
  method: 'POST',
  body: JSON.stringify({ 
    paths: ['/blog/*', `/blog/${slug}`] 
  })
});
```

## Testing

### Unit Tests

Run unit tests:
```bash
npm test
```

Tests cover:
- Slug generation uniqueness
- API response parsing
- Component rendering with API data

### E2E Tests (Playwright)

Run E2E tests:
```bash
npx playwright test
```

E2E test workflow:
1. Admin logs in
2. Creates new article with unique slug
3. Uploads test image
4. Publishes article
5. Verifies article appears on public site within 30s

### Manual Testing Checklist

- [ ] Create article in admin
- [ ] Upload featured image
- [ ] Publish article
- [ ] Verify appears on `/blog`
- [ ] Verify accessible at `/blog/:slug`
- [ ] Check image loads correctly
- [ ] Verify SEO meta tags
- [ ] Test mobile responsiveness

## Troubleshooting

### Content Not Appearing

**Check 1: Is it published?**
```sql
SELECT title, status, published_at 
FROM articles 
WHERE slug = 'your-slug';
```

**Check 2: RLS Policies**
```sql
-- Test as public user (no auth)
SELECT * FROM articles WHERE slug = 'your-slug';
```

**Check 3: Edge Function Logs**
- Open Lovable Backend
- Navigate to Edge Functions → articles-public
- Check logs for errors

### Images Not Loading

**Check 1: Media URL**
```sql
SELECT url, storage_path FROM media WHERE id = 'media-id';
```

**Check 2: Storage Bucket**
- Verify bucket exists and is public (if needed)
- Check file exists at storage_path

### Migration Errors

If migration fails:
1. Check database connection (env vars)
2. Verify tables exist (run migrations first)
3. Check for duplicate slugs
4. Review error messages in console

## Production Deployment

### Pre-deployment Checklist

- [x] Database tables created
- [x] RLS policies configured
- [x] Edge functions deployed
- [x] Content migrated
- [x] Frontend updated
- [ ] Tests passing
- [ ] Security audit complete
- [ ] Backup created

### Deployment Steps

1. **Backup Database**
```bash
# Backup command (if available)
# Or use Lovable Backend export
```

2. **Run Migrations**
```bash
# Migrations run automatically via Lovable
```

3. **Migrate Content**
```bash
npm run migrate-content
```

4. **Deploy Frontend**
```bash
# Automatically deployed via Lovable
```

5. **Verify**
- Test all public pages
- Test admin CRUD operations
- Verify SEO and performance

### Rollback Plan

If issues occur:

1. **Revert frontend to previous version**
   - Use Lovable version history
   - Restore previous state

2. **Restore database**
   ```sql
   -- Restore from backup
   ```

3. **Verify old JSON files still work**
   - Keep JSON files as backup during transition period

## Maintenance

### Regular Tasks

**Weekly:**
- Review Edge Function logs for errors
- Check API response times
- Monitor database size

**Monthly:**
- Audit published content
- Clean up old media files
- Review and optimize queries

### Monitoring

**Key Metrics:**
- API response times (<200ms target)
- Database query performance
- Edge Function error rates
- Media storage usage

## Support

For issues or questions:
1. Check this documentation
2. Review Edge Function logs in Lovable Backend
3. Check database tables via Lovable Backend
4. Contact support with specific error messages

## Next Steps

1. ✅ Database tables created
2. ✅ API endpoints implemented
3. ✅ Frontend integrated
4. ⏳ Run content migration
5. ⏳ Test admin → public flow
6. ⏳ Implement CDN invalidation
7. ⏳ Add E2E tests
8. ⏳ Production deployment

---

**Last Updated:** 2025-10-07
**Version:** 1.0.0
