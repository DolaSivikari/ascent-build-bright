# Complete Testing Checklist & Screenshot Capture Guide

## Pre-Test Setup

### 1. Environment Variables
Ensure these are set in your `.env` or Lovable Cloud:
- `VITE_AB_TEST_ENABLED=true` (to enable A/B testing)
- `VITE_GTM_CONTAINER_ID=GTM-XXXXXXX` (your actual ID)
- `RESEND_API_KEY=re_xxxxxxxxxx` (added via Secrets Manager) ✅

### 2. GTM Preview Mode
1. Open https://tagmanager.google.com/
2. Navigate to your container
3. Click **Preview** button
4. Enter: `https://ascent-build-bright.lovable.app/`
5. Click **Connect**
6. Verify connection in debug panel

### 3. GA4 Realtime
1. Open https://analytics.google.com/
2. Navigate to your property
3. Go to **Reports** → **Realtime**
4. Keep this tab open during testing

---

## Test 1: Hero CTA Click (Get a Fast Quote)

### Steps:
1. Open homepage in GTM Preview
2. Click **"Get a Fast Quote"** button in hero section
3. Verify modal opens

### Expected Results:
- ✅ GTM Preview shows `cta_get_fast_quote_click` event
- ✅ Event includes `variant` parameter (A, B, or C)
- ✅ GA4 Realtime shows event within 30 seconds

### Screenshot Checklist:
- [ ] GTM Preview panel showing event and parameters
- [ ] GA4 Realtime showing the event
- [ ] Browser console showing: `📊 Analytics Event: { event: 'cta_get_fast_quote_click', variant: 'A', timestamp: '...' }`

---

## Test 2: Secondary CTA Click (See Packages)

### Steps:
1. Scroll to hero section
2. Click **"See Starter Packages"** button
3. Verify page scrolls to packages section

### Expected Results:
- ✅ GTM Preview shows `cta_see_packages_click` event
- ✅ Event includes `variant` parameter
- ✅ Page smoothly scrolls to #packages
- ✅ GA4 Realtime shows event

### Screenshot Checklist:
- [ ] GTM Preview showing event
- [ ] GA4 Realtime showing event

---

## Test 3: Package CTA Click

### Steps:
1. Scroll to packages section
2. Click **"Request Starter Quote"** on Starter package
3. Verify modal opens with "Starter" pre-selected

### Expected Results:
- ✅ GTM Preview shows `package_cta_click` event
- ✅ Event includes `package: 'starter'` parameter
- ✅ Event includes `variant` parameter
- ✅ Modal opens with package dropdown showing "Starter"
- ✅ GA4 Realtime shows event

### Repeat for other packages:
- [ ] "Home Refresh — One Room" (package: 'refresh')
- [ ] "Weekend Makeover" (package: 'weekend')

### Screenshot Checklist:
- [ ] GTM Preview showing event with correct package parameter
- [ ] Modal screenshot showing pre-selected package
- [ ] GA4 Realtime showing event

---

## Test 4: Phone Click

### Steps:
1. Scroll to header
2. Click phone number: **(416) 555-0100**
3. Verify tel: link triggers (phone app opens on mobile)

### Expected Results:
- ✅ GTM Preview shows `phone_click` event
- ✅ Event includes `location: 'header'` parameter
- ✅ GA4 Realtime shows event

### Test in multiple locations:
- [ ] Header phone click (location: 'header')
- [ ] Hero phone click if present (location: 'hero')
- [ ] Packages section if present (location: 'packages')

### Screenshot Checklist:
- [ ] GTM Preview showing event with location parameter
- [ ] GA4 Realtime showing event

---

## Test 5: Photo Upload

### Steps:
1. Open quote modal (click any CTA)
2. Click **"Upload photos for better estimate"**
3. Select 1-2 image files (< 10MB each, JPG/PNG/WebP)
4. Wait for upload indicator

### Expected Results:
- ✅ GTM Preview shows `photo_upload` event
- ✅ Event includes `file_count: 2` parameter
- ✅ Event includes `total_bytes: XXXXX` parameter
- ✅ Event includes `variant` parameter
- ✅ Modal shows "2 file(s) selected"
- ✅ GA4 Realtime shows event

### Screenshot Checklist:
- [ ] GTM Preview showing event with file_count and total_bytes
- [ ] Modal showing file count
- [ ] Browser console showing photo_upload event
- [ ] GA4 Realtime showing event

---

## Test 6: Quote Form Submission (Critical Path)

### Steps:
1. Open quote modal
2. Fill out form:
   - Name: `Test User`
   - Phone: `416-555-0101`
   - Email: `test@example.com` (optional)
   - Address: `123 Test St, Toronto, ON`
   - Package: `Starter — Quick Fix ($199+)`
   - Message: `Testing quote submission flow`
3. Upload 1-2 photos (optional but recommended)
4. Click **"Submit Quote Request"**
5. Wait for success confirmation

### Expected Results:

#### Frontend:
- ✅ GTM Preview shows `quote_form_submit` event
- ✅ Event includes `success: true`
- ✅ Event includes `submission_id: '<uuid>'`
- ✅ Event includes `variant` parameter
- ✅ Success confirmation appears with checkmark
- ✅ Modal shows "Request Submitted! We'll contact you within 24-48 hours."
- ✅ GA4 Realtime shows event within 30 seconds

#### Backend (Supabase):
- ✅ New row appears in `quote_submissions` table
- ✅ Row contains correct data (name, phone, email, etc.)
- ✅ `source_variant` column shows A, B, or C
- ✅ `photo_urls` array contains uploaded file URLs (if photos uploaded)
- ✅ `created_at` timestamp is correct

#### Edge Function Logs:
- ✅ Lovable Cloud Logs show: `Received quote submission: {...}`
- ✅ Logs show: `Quote saved to database: <uuid>`
- ✅ Logs show: `Email sent successfully` (if RESEND_API_KEY configured)

#### Email (Resend):
- ✅ Email received at `ops@ascent-build-bright.lovable.app`
- ✅ Subject: `New Quote Request — Test User — STARTER`
- ✅ Body includes:
  - Submission ID (clickable)
  - A/B Variant
  - Contact info (name, phone, email, address)
  - Package selection
  - Message
  - Photo URLs (if uploaded)
  - Referrer URL
  - Timestamp
  - Link to Admin Dashboard

### Screenshot Checklist:
- [ ] GTM Preview showing quote_form_submit with all parameters
- [ ] Success modal confirmation
- [ ] Browser Network tab showing `/functions/v1/notify-quote` request (Status 200)
- [ ] Response JSON: `{ "success": true, "id": "<uuid>", "message": "..." }`
- [ ] Supabase table showing new row with matching UUID
- [ ] Supabase Storage `quote-photos` bucket showing uploaded files
- [ ] Lovable Cloud Logs showing:
  - "Received quote submission"
  - "Quote saved to database"
  - "Email sent successfully"
- [ ] Email inbox showing received notification
- [ ] GA4 Realtime showing quote_form_submit event
- [ ] Browser console showing all events in sequence

---

## Test 7: A/B Test Variant Assignment & Persistence

### Steps:
1. Open site in **incognito/private window**
2. Open browser console
3. Check for variant assignment log
4. Refresh page
5. Verify variant persists

### Expected Results:
- ✅ On first visit, variant is randomly assigned (A, B, or C)
- ✅ Console shows: `📊 Analytics Event: { event: 'homepage_variant', variant: 'A', timestamp: '...' }`
- ✅ Hero headline matches variant:
  - Variant A: "Small jobs. Big care."
  - Variant B: "Home jobs from the low hundreds"
  - Variant C: "Need a fix this week?"
- ✅ `sessionStorage.ab_test_variant` is set (check in DevTools → Application → Session Storage)
- ✅ On page refresh, same variant persists
- ✅ All subsequent events include the same variant parameter
- ✅ GTM Preview shows `homepage_variant` event

### Test Distribution:
Open 10 incognito windows and record variants:
- Expected: ~3-4 Variant A, ~3-4 Variant B, ~3-4 Variant C

### Screenshot Checklist:
- [ ] Browser console showing variant assignment
- [ ] DevTools → Application → Session Storage showing `ab_test_variant`
- [ ] Hero section showing each variant (3 screenshots for A, B, C)
- [ ] GTM Preview showing homepage_variant event
- [ ] GA4 Realtime showing homepage_variant event

---

## Test 8: A/B Test Auto-Stop Logic

### Manual Test (Simulate Conditions):
1. Open browser console
2. Run: `localStorage.setItem('ab_test_start_date', '2025-01-01')`
3. Refresh page
4. Check console for warning

### Expected Results:
- ✅ Console shows: `⚠️ A/B Test should stop: MAX_DAYS_REACHED ...`
- ✅ Test continues but logs warning

### Screenshot Checklist:
- [ ] Console warning showing auto-stop trigger

---

## Test 9: Error Handling

### 9.1 Invalid Form Submission
1. Open modal
2. Leave name field empty
3. Click Submit

**Expected:** Validation error: "Name must be at least 2 characters"

### 9.2 Network Failure Simulation
1. Open DevTools → Network tab
2. Set throttling to "Offline"
3. Submit form

**Expected:** 
- Error toast: "Submission failed. Please try again or call us directly."
- GTM event: `quote_form_submit` with `success: false`

### 9.3 Large File Upload
1. Select file > 10MB
2. Attempt upload

**Expected:** Toast error: "Some files were too large or invalid format (max 10MB, JPG/PNG/WebP only)"

### Screenshot Checklist:
- [ ] Validation error messages
- [ ] Error toast for network failure
- [ ] File size error toast
- [ ] GTM Preview showing success: false event

---

## Test 10: Performance & Optimization

### Lighthouse Audit:
1. Open DevTools → Lighthouse
2. Category: Performance
3. Device: Mobile
4. Run audit

**Expected:**
- Performance Score: ≥ 90
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

### Screenshot Checklist:
- [ ] Lighthouse report showing scores

---

## Deliverables Summary

### 1. GTM Container Details
- Container ID: GTM-__________ (fill in)
- Container Name: ascent-build-bright.lovable.app
- Published Version: v1.0 - Initial Setup

### 2. Screenshots Required (Minimum 15)
1. GTM Preview showing cta_get_fast_quote_click
2. GTM Preview showing cta_see_packages_click
3. GTM Preview showing package_cta_click (with package parameter)
4. GTM Preview showing phone_click (with location parameter)
5. GTM Preview showing photo_upload (with file_count & total_bytes)
6. GTM Preview showing quote_form_submit (with success & submission_id)
7. GA4 Realtime showing all 6 events
8. Browser Network tab showing notify-quote response
9. Supabase quote_submissions table with test row
10. Supabase Storage quote-photos bucket with uploaded files
11. Lovable Cloud Logs showing edge function execution
12. Email inbox showing notification email
13. Hero section showing Variant A
14. Hero section showing Variant B
15. Hero section showing Variant C
16. Lighthouse performance report

### 3. Data Verification
- [ ] At least 1 test submission in `quote_submissions` table
- [ ] At least 1 photo in `quote-photos` storage bucket
- [ ] All 6 event types visible in GA4 Realtime
- [ ] Email received in ops@ascent-build-bright.lovable.app inbox

### 4. Documentation Files
- [x] docs/GTM_SETUP_GUIDE.md
- [x] docs/ANALYTICS_TEST_GUIDE.md
- [x] docs/AB_TEST_RUNBOOK.md
- [x] docs/TESTING_CHECKLIST.md (this file)
- [x] .env.example

---

## Final Acceptance Criteria

### ✅ GTM & Analytics
- [ ] GTM Container created and ID documented
- [ ] GTM snippet installed in index.html (both locations)
- [ ] 7 DataLayer variables configured
- [ ] 6 Custom Event triggers configured
- [ ] 6 GA4 Event tags configured
- [ ] Container published
- [ ] All 6 events firing correctly in GTM Preview
- [ ] All 6 events appearing in GA4 Realtime

### ✅ Supabase Backend
- [ ] quote_submissions table exists with correct schema
- [ ] quote-photos storage bucket exists
- [ ] RLS policies allow public insert
- [ ] Test data successfully inserted

### ✅ Edge Function
- [ ] notify-quote function deployed
- [ ] Function receives payload correctly
- [ ] Function inserts to database
- [ ] Function sends email via Resend
- [ ] Function returns success response

### ✅ Frontend
- [ ] QuoteModal opens from hero CTA
- [ ] QuoteModal opens from package CTAs
- [ ] Package selection pre-fills correctly
- [ ] Photo upload works (up to 3 files)
- [ ] Form validation works
- [ ] Success confirmation displays
- [ ] All analytics events fire correctly

### ✅ A/B Testing
- [ ] Variants assigned randomly (33/33/34 split)
- [ ] Variant persists in sessionStorage
- [ ] All events include variant parameter
- [ ] Auto-stop logic implemented
- [ ] Hero headlines display correctly for each variant

### ✅ Email Notifications
- [ ] RESEND_API_KEY configured in Secrets Manager
- [ ] Email delivers to ops@ascent-build-bright.lovable.app
- [ ] Email includes all required fields
- [ ] Email includes submission ID link
- [ ] Email includes photo URLs

---

## Test Execution Log

**Tester:** _______________  
**Date:** _______________  
**Environment:** https://ascent-build-bright.lovable.app/

| Test # | Test Name | Status | Notes |
|--------|-----------|--------|-------|
| 1 | Hero CTA Click | ☐ Pass / ☐ Fail | |
| 2 | See Packages CTA | ☐ Pass / ☐ Fail | |
| 3 | Package CTA Click | ☐ Pass / ☐ Fail | |
| 4 | Phone Click | ☐ Pass / ☐ Fail | |
| 5 | Photo Upload | ☐ Pass / ☐ Fail | |
| 6 | Form Submission | ☐ Pass / ☐ Fail | |
| 7 | A/B Variant Assignment | ☐ Pass / ☐ Fail | |
| 8 | A/B Auto-Stop | ☐ Pass / ☐ Fail | |
| 9 | Error Handling | ☐ Pass / ☐ Fail | |
| 10 | Performance | ☐ Pass / ☐ Fail | |

**Overall Status:** ☐ Ready for Production / ☐ Needs Fixes

**Known Issues:**
1. _____________________________________________
2. _____________________________________________
3. _____________________________________________
