# Analytics Testing & Verification Guide

## GTM Preview Mode Setup

1. Open GTM workspace: https://tagmanager.google.com/
2. Click **Preview** button (top right)
3. Enter preview URL: https://ascent-build-bright.lovable.app/
4. Click **Connect**
5. New tab opens with GTM debug panel at bottom

## Event Checklist

### Test 1: Hero CTA Click
- [ ] Click "Get a Fast Quote" button on hero
- [ ] Verify in GTM Preview: `cta_get_fast_quote_click` event fires
- [ ] Check parameters: `variant: 'A'|'B'|'C'`, `timestamp`
- [ ] Verify modal opens

### Test 2: Packages CTA Click
- [ ] Scroll to packages section
- [ ] Click "See Starter Packages" link
- [ ] Verify event: `cta_see_packages_click`
- [ ] Check page scrolls to #packages

### Test 3: Package Selection
- [ ] Click "Request Starter Quote" button
- [ ] Verify event: `package_cta_click` with `package: 'starter'`
- [ ] Verify modal opens with "Starter" pre-selected

### Test 4: Phone Click
- [ ] Click phone number in header
- [ ] Verify event: `phone_click` with `location: 'header'`
- [ ] Check tel: link triggers

### Test 5: Photo Upload
- [ ] Open quote modal
- [ ] Upload a photo (< 10MB)
- [ ] Verify event: `photo_upload` with `file_count: 1`, `total_bytes: <size>`

### Test 6: Form Submission
- [ ] Fill out quote form completely
- [ ] Click "Submit Quote Request"
- [ ] Verify event: `quote_form_submit` with `success: true`, `submission_id: '<uuid>'`
- [ ] Check success message appears

### Test 7: A/B Variant Assignment (if enabled)
- [ ] Open site in incognito window
- [ ] Check console: variant should be logged
- [ ] Verify event: `homepage_variant` with `variant: 'A'|'B'|'C'`
- [ ] Close tab, reopen → variant should persist (sessionStorage)

## GA4 Realtime Verification

1. Open GA4: Analytics → Realtime → Events
2. Perform actions above
3. Verify events appear within 10-30 seconds
4. Check event parameters match expected values

## Common Issues

**Events not firing?**
- Check browser console for errors
- Verify GTM snippet is in `<head>` and `<body>`
- Confirm dataLayer exists: `console.log(window.dataLayer)`

**Wrong variant showing?**
- Clear sessionStorage: `sessionStorage.clear()`
- Refresh page to get new variant

**Modal not opening?**
- Check React DevTools for component state
- Verify button onClick handlers are wired correctly

## Required GTM Configuration

In your GTM workspace, create these custom events:

1. **cta_get_fast_quote_click**
   - Trigger Type: Custom Event
   - Event name: cta_get_fast_quote_click
   - Variables: variant, timestamp

2. **cta_see_packages_click**
   - Trigger Type: Custom Event
   - Event name: cta_see_packages_click
   - Variables: variant, timestamp

3. **package_cta_click**
   - Trigger Type: Custom Event
   - Event name: package_cta_click
   - Variables: package, variant, timestamp

4. **phone_click**
   - Trigger Type: Custom Event
   - Event name: phone_click
   - Variables: location, variant, timestamp

5. **quote_form_submit**
   - Trigger Type: Custom Event
   - Event name: quote_form_submit
   - Variables: success, submission_id, error_message, variant, timestamp

6. **photo_upload**
   - Trigger Type: Custom Event
   - Event name: photo_upload
   - Variables: file_count, total_bytes, variant, timestamp

7. **homepage_variant** (for A/B test tracking)
   - Trigger Type: Custom Event
   - Event name: homepage_variant
   - Variables: variant, timestamp

Each event should be sent to your GA4 property with the configured measurement ID.
