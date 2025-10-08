# Google Tag Manager Setup & Configuration Guide

## Step 1: Create GTM Container

### 1.1 Create Account & Container
1. Go to https://tagmanager.google.com/
2. Click **Create Account**
   - Account Name: `Ascent Build Bright`
   - Country: Canada
   - Container Name: `ascent-build-bright.lovable.app`
   - Target Platform: **Web**
3. Accept Terms of Service
4. **Copy the Container ID** (format: GTM-XXXXXXX)

### 1.2 Install GTM Snippet

The GTM snippet has already been added to `index.html` with placeholder `GTM-XXXXXXX`.

**You need to replace the placeholder with your actual Container ID in two places:**

1. In `<head>` section (line ~6):
```html
<!-- Replace GTM-XXXXXXX with your actual Container ID -->
<script>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>
```

2. After `<body>` tag (line ~129):
```html
<!-- Replace GTM-XXXXXXX with your actual Container ID -->
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
    height="0" width="0" style="display:none;visibility:hidden">
  </iframe>
</noscript>
```

**Command to replace:**
```bash
# Replace GTM-XXXXXXX with your actual ID in index.html
sed -i 's/GTM-XXXXXXX/GTM-YOUR-ACTUAL-ID/g' index.html
```

---

## Step 2: Configure GA4 Property

### 2.1 Create GA4 Property (if not exists)
1. Go to https://analytics.google.com/
2. Admin → Create Property
   - Property Name: `Ascent Build Bright`
   - Time Zone: `(GMT-05:00) Eastern Time`
   - Currency: CAD
3. Create a **Web** Data Stream
   - Website URL: `https://ascent-build-bright.lovable.app`
   - Stream Name: `Production Site`
4. **Copy the Measurement ID** (format: G-XXXXXXXXXX)

---

## Step 3: Configure GTM Tags & Variables

### 3.1 Create GA4 Configuration Tag

1. In GTM, go to **Tags** → **New**
   - Tag Name: `GA4 - Configuration`
   - Tag Type: **Google Analytics: GA4 Configuration**
   - Measurement ID: `G-XXXXXXXXXX` (your GA4 property ID)
   - Trigger: **All Pages**
2. Click **Save**

### 3.2 Create DataLayer Variables

Go to **Variables** → **User-Defined Variables** → **New**

Create these variables:

| Variable Name | Type | DataLayer Variable Name |
|--------------|------|------------------------|
| `DLV - variant` | Data Layer Variable | `variant` |
| `DLV - package` | Data Layer Variable | `package` |
| `DLV - location` | Data Layer Variable | `location` |
| `DLV - file_count` | Data Layer Variable | `file_count` |
| `DLV - total_bytes` | Data Layer Variable | `total_bytes` |
| `DLV - success` | Data Layer Variable | `success` |
| `DLV - submission_id` | Data Layer Variable | `submission_id` |

**Steps for each:**
1. Click **New**
2. Variable Type: **Data Layer Variable**
3. Data Layer Variable Name: (see table above)
4. Save

---

## Step 4: Create Event Triggers

Go to **Triggers** → **New**

Create these 6 triggers:

### 4.1 CTA Get Fast Quote Click
- Trigger Name: `CE - cta_get_fast_quote_click`
- Trigger Type: **Custom Event**
- Event name: `cta_get_fast_quote_click`
- Save

### 4.2 CTA See Packages Click
- Trigger Name: `CE - cta_see_packages_click`
- Trigger Type: **Custom Event**
- Event name: `cta_see_packages_click`
- Save

### 4.3 Package CTA Click
- Trigger Name: `CE - package_cta_click`
- Trigger Type: **Custom Event**
- Event name: `package_cta_click`
- Save

### 4.4 Phone Click
- Trigger Name: `CE - phone_click`
- Trigger Type: **Custom Event**
- Event name: `phone_click`
- Save

### 4.5 Photo Upload
- Trigger Name: `CE - photo_upload`
- Trigger Type: **Custom Event**
- Event name: `photo_upload`
- Save

### 4.6 Quote Form Submit
- Trigger Name: `CE - quote_form_submit`
- Trigger Type: **Custom Event**
- Event name: `quote_form_submit`
- Save

---

## Step 5: Create GA4 Event Tags

Go to **Tags** → **New**

Create these 6 tags (one for each event):

### 5.1 CTA Get Fast Quote Click Event
- Tag Name: `GA4 - cta_get_fast_quote_click`
- Tag Type: **Google Analytics: GA4 Event**
- Configuration Tag: `GA4 - Configuration`
- Event Name: `cta_get_fast_quote_click`
- Event Parameters:
  - Parameter Name: `variant`, Value: `{{DLV - variant}}`
- Trigger: `CE - cta_get_fast_quote_click`
- Save

### 5.2 CTA See Packages Click Event
- Tag Name: `GA4 - cta_see_packages_click`
- Tag Type: **Google Analytics: GA4 Event**
- Configuration Tag: `GA4 - Configuration`
- Event Name: `cta_see_packages_click`
- Event Parameters:
  - Parameter Name: `variant`, Value: `{{DLV - variant}}`
- Trigger: `CE - cta_see_packages_click`
- Save

### 5.3 Package CTA Click Event
- Tag Name: `GA4 - package_cta_click`
- Tag Type: **Google Analytics: GA4 Event**
- Configuration Tag: `GA4 - Configuration`
- Event Name: `package_cta_click`
- Event Parameters:
  - Parameter Name: `package`, Value: `{{DLV - package}}`
  - Parameter Name: `variant`, Value: `{{DLV - variant}}`
- Trigger: `CE - package_cta_click`
- Save

### 5.4 Phone Click Event
- Tag Name: `GA4 - phone_click`
- Tag Type: **Google Analytics: GA4 Event**
- Configuration Tag: `GA4 - Configuration`
- Event Name: `phone_click`
- Event Parameters:
  - Parameter Name: `location`, Value: `{{DLV - location}}`
  - Parameter Name: `variant`, Value: `{{DLV - variant}}`
- Trigger: `CE - phone_click`
- Save

### 5.5 Photo Upload Event
- Tag Name: `GA4 - photo_upload`
- Tag Type: **Google Analytics: GA4 Event**
- Configuration Tag: `GA4 - Configuration`
- Event Name: `photo_upload`
- Event Parameters:
  - Parameter Name: `file_count`, Value: `{{DLV - file_count}}`
  - Parameter Name: `total_bytes`, Value: `{{DLV - total_bytes}}`
  - Parameter Name: `variant`, Value: `{{DLV - variant}}`
- Trigger: `CE - photo_upload`
- Save

### 5.6 Quote Form Submit Event
- Tag Name: `GA4 - quote_form_submit`
- Tag Type: **Google Analytics: GA4 Event**
- Configuration Tag: `GA4 - Configuration`
- Event Name: `quote_form_submit`
- Event Parameters:
  - Parameter Name: `success`, Value: `{{DLV - success}}`
  - Parameter Name: `submission_id`, Value: `{{DLV - submission_id}}`
  - Parameter Name: `variant`, Value: `{{DLV - variant}}`
- Trigger: `CE - quote_form_submit`
- Save

---

## Step 6: Submit & Publish Container

1. Click **Submit** (top right)
2. Version Name: `Initial Setup - Quote Flow Analytics`
3. Version Description: 
   ```
   - GA4 configuration
   - 6 custom events for quote flow
   - DataLayer variables for tracking
   - A/B test variant tracking
   ```
4. Click **Publish**

---

## Step 7: Verify Installation

### 7.1 Check GTM Snippet
1. Open https://ascent-build-bright.lovable.app/
2. View Page Source
3. Search for your Container ID (GTM-XXXXXXX)
4. Verify it appears in both `<head>` and `<noscript>` sections

### 7.2 Launch GTM Preview Mode
1. In GTM, click **Preview** (top right)
2. Enter URL: `https://ascent-build-bright.lovable.app/`
3. Click **Connect**
4. New tab opens with GTM Debug panel at bottom

### 7.3 Verify GA4 Property
1. In GA4, go to **Realtime** → **Overview**
2. You should see "1 user in last 30 minutes" (yourself)
3. Check that page_view event appears

---

## Summary Checklist

- [ ] GTM Container created (Container ID: GTM-________)
- [ ] GTM snippet installed in `index.html` (both locations)
- [ ] GA4 Property created (Measurement ID: G-__________)
- [ ] GA4 Configuration tag created and triggers on All Pages
- [ ] 7 DataLayer variables created
- [ ] 6 Custom Event triggers created
- [ ] 6 GA4 Event tags created with correct parameters
- [ ] Container published
- [ ] GTM Preview mode connected successfully
- [ ] GA4 shows realtime data

**Next Step:** Proceed to `ANALYTICS_TEST_GUIDE.md` to test all 6 events

---

## Troubleshooting

**GTM Preview not connecting?**
- Clear browser cache and cookies
- Try incognito/private window
- Check browser console for errors
- Verify GTM snippet is in page source

**GA4 not showing data?**
- Wait 10-30 seconds for data to appear
- Check Measurement ID is correct
- Verify GA4 Configuration tag fires on All Pages
- Check browser console for gtag errors

**Events not firing?**
- Open GTM Preview and check if dataLayer push appears
- Verify trigger matches event name exactly (case-sensitive)
- Check that tag is set to fire on the correct trigger
- Look for JavaScript errors in browser console
