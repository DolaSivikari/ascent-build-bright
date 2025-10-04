# Deployment Guide - Ascent Group Construction Website

## Overview
This document provides instructions for deploying the Ascent Group Construction website to production. The site is optimized for deployment on modern hosting platforms like Netlify, Vercel, or similar services.

## Prerequisites
- Node.js 18+ installed
- npm or bun package manager
- A hosting platform account (Netlify, Vercel, etc.)
- Access to the project repository

## Build Configuration

### Environment Variables
The project uses the following environment variables (managed by Lovable Cloud):
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon/public key
- `VITE_SUPABASE_PROJECT_ID` - Supabase project identifier

**Note:** These are automatically configured when using Lovable Cloud. For external deployments, you'll need to set these manually.

### Build Command
```bash
npm run build
# or
bun run build
```

### Output Directory
The build process outputs to the `dist/` directory.

## Deployment Steps

### Option 1: Deploy with Lovable (Recommended)
1. Click the **Publish** button in the top right of the Lovable editor
2. The site will automatically deploy to a Lovable subdomain (e.g., `yoursite.lovable.app`)
3. To connect a custom domain:
   - Navigate to Project > Settings > Domains
   - Follow the DNS configuration instructions
   - Note: Custom domains require a paid Lovable plan

### Option 2: Deploy to Netlify
1. **Via Netlify UI:**
   - Log in to Netlify
   - Click "Add new site" > "Import an existing project"
   - Connect your repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables from Prerequisites section
   - Click "Deploy site"

2. **Via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

3. **netlify.toml Configuration (optional):**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200

   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-Content-Type-Options = "nosniff"
       Referrer-Policy = "strict-origin-when-cross-origin"
       Permissions-Policy = "geolocation=(), microphone=(), camera=()"

   [[headers]]
     for = "/assets/*"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"
   ```

### Option 3: Deploy to Vercel
1. **Via Vercel UI:**
   - Log in to Vercel
   - Click "Add New..." > "Project"
   - Import your repository
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Add environment variables
   - Click "Deploy"

2. **Via Vercel CLI:**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

3. **vercel.json Configuration (optional):**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ],
     "headers": [
       {
         "source": "/assets/(.*)",
         "headers": [
           {
             "key": "Cache-Control",
             "value": "public, max-age=31536000, immutable"
           }
         ]
       }
     ]
   }
   ```

## Performance Optimizations

### Image Optimization
All images use the `OptimizedImage` component which implements:
- Lazy loading for non-critical images
- Responsive srcset attributes
- Async decoding
- Smooth fade-in transitions

**Future Optimization:** Convert images to WebP format for smaller file sizes:
```bash
# Example using cwebp (install via imagemagick)
cwebp -q 80 input.jpg -o output.webp
```

### Code Splitting
The application uses React Router which automatically implements code splitting for routes.

### CSS Optimization
- Tailwind CSS automatically purges unused styles in production builds
- All component styles use the design system from `index.css` and `tailwind.config.ts`

### Bundle Analysis (Optional)
To analyze bundle size:
```bash
npm run build -- --mode analyze
```

## Security Headers
Recommended security headers are included in the Netlify/Vercel configuration examples above. Key headers:
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer information
- `Permissions-Policy` - Restricts browser features

## SEO Configuration

### Sitemap
The `public/sitemap.xml` file lists all pages for search engines. Update this file when adding new pages.

### Robots.txt
The `public/robots.txt` file controls search engine crawler access. Current configuration allows all crawlers.

### Meta Tags
Each page uses the `SEO` component which dynamically updates:
- Page title
- Meta description
- Open Graph tags
- Twitter Card tags
- Canonical URLs

### Structured Data
JSON-LD structured data for LocalBusiness is included in `index.html`. Update this with accurate business information before deployment.

## Monitoring & Analytics

### Recommended Additions
While not currently implemented, consider adding:
- Google Analytics 4
- Google Search Console verification
- Performance monitoring (e.g., Sentry, LogRocket)
- Uptime monitoring (e.g., UptimeRobot, Pingdom)

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test all form submissions (Contact, Estimate)
- [ ] Check mobile responsiveness on actual devices
- [ ] Validate SEO meta tags with tools like:
  - Google Rich Results Test
  - Facebook Sharing Debugger
  - Twitter Card Validator
- [ ] Test page load performance with:
  - Google PageSpeed Insights
  - WebPageTest
  - Lighthouse (Chrome DevTools)
- [ ] Verify accessibility with:
  - WAVE browser extension
  - axe DevTools
  - Keyboard navigation testing
- [ ] Check that custom domain (if configured) resolves correctly
- [ ] Verify SSL certificate is active and valid
- [ ] Test contact form rate limiting
- [ ] Submit sitemap to Google Search Console

## Maintenance

### Regular Updates
- Review and update dependencies monthly: `npm update`
- Monitor for security vulnerabilities: `npm audit`
- Keep Supabase functions and database schemas updated
- Review and optimize images periodically

### Content Updates
To update content without code changes:
- Service information: Edit files in `src/pages/service/`
- Projects portfolio: Edit `src/pages/Projects.tsx`
- Contact information: Edit `src/pages/Contact.tsx`
- Company information: Edit `src/pages/About.tsx`

### Analytics Review
Regularly review:
- Traffic patterns
- Conversion rates (estimate requests, contact form submissions)
- Page performance metrics
- Error logs and console warnings

## Troubleshooting

### Build Failures
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`
- Verify all environment variables are set correctly

### Runtime Errors
- Check browser console for JavaScript errors
- Verify Supabase connection and credentials
- Test form submissions in a staging environment first

### Performance Issues
- Analyze bundle size and consider lazy loading heavy components
- Optimize images (convert to WebP, compress)
- Review and minimize third-party scripts
- Enable CDN for static assets

## Support
For deployment issues specific to Lovable Cloud, refer to:
- [Lovable Documentation](https://docs.lovable.dev/)
- [Lovable Discord Community](https://discord.com/channels/1119885301872070706/1280461670979993613)

For platform-specific issues:
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)
