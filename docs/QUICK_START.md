# Quick Start Guide: Quote Flow & Analytics

## 🎯 What's Been Implemented

✅ **Complete quote submission flow** with photo uploads  
✅ **GTM analytics** with 6 tracked events  
✅ **A/B testing** infrastructure (3 hero variants)  
✅ **Email notifications** via Resend  
✅ **Supabase backend** (database + storage)  
✅ **Edge function** for serverless processing  

---

## 🚀 3 Steps to Go Live

### Step 1: Create GTM Container (10 minutes)

1. Go to https://tagmanager.google.com/
2. Create new container: **ascent-build-bright.lovable.app**
3. Copy the Container ID (format: `GTM-XXXXXXX`)
4. Replace placeholder in `index.html`:
   ```bash
   # Find and replace GTM-XXXXXXX with your actual ID
   sed -i 's/GTM-XXXXXXX/GTM-YOUR-ACTUAL-ID/g' index.html
   ```

📖 **Full instructions:** `docs/GTM_SETUP_GUIDE.md`

---

### Step 2: Configure GA4 & GTM Tags (20 minutes)

1. Create GA4 property at https://analytics.google.com/
2. Get Measurement ID (format: `G-XXXXXXXXXX`)
3. In GTM, create:
   - 1 GA4 Configuration tag
   - 7 DataLayer variables
   - 6 Custom Event triggers
   - 6 GA4 Event tags
4. Publish container

📖 **Full instructions:** `docs/GTM_SETUP_GUIDE.md` (Section 2-5)

---

### Step 3: Verify RESEND_API_KEY (Already Done! ✅)

The secret has been added to Lovable Cloud Secrets Manager.

**To verify email delivery:**
1. Go to https://resend.com/domains
2. Make sure your domain is verified
3. Test by submitting a quote at https://ascent-build-bright.lovable.app/

📧 **Emails will be sent to:** ops@ascent-build-bright.lovable.app

---

## 🧪 Testing (15 minutes)

### Quick Test Flow:

1. **Enable GTM Preview:**
   - In GTM, click **Preview**
   - Connect to: https://ascent-build-bright.lovable.app/

2. **Test Hero CTA:**
   - Click "Get a Fast Quote" button
   - ✅ Verify event in GTM Preview: `cta_get_fast_quote_click`
   - ✅ Check GA4 Realtime for event

3. **Submit Test Quote:**
   - Fill form: Name, Phone, Address
   - Upload 1-2 photos (optional)
   - Click Submit
   - ✅ Verify success message
   - ✅ Check email at ops@ascent-build-bright.lovable.app
   - ✅ Verify event: `quote_form_submit` with submission_id

4. **Check Supabase:**
   - Go to Lovable Cloud → Database
   - Open `quote_submissions` table
   - ✅ Verify test row appears
   - Go to Storage → `quote-photos`
   - ✅ Verify uploaded photos

📖 **Complete checklist:** `docs/TESTING_CHECKLIST.md`

---

## 📊 Monitor A/B Test

The A/B test will **automatically assign** visitors to one of 3 hero variants:

- **Variant A:** "Small jobs. Big care."
- **Variant B:** "Home jobs from the low hundreds"
- **Variant C:** "Need a fix this week?"

### Test will auto-stop when:
- ✅ 7 days elapsed, OR
- ✅ Each variant reaches 300 visits

### To start test:
1. Set `VITE_AB_TEST_ENABLED=true` in `.env` (already done!)
2. Update `TEST_START_DATE` in `src/lib/ab-test-manager.ts`
3. Deploy to production
4. Monitor console for warnings

📖 **Full runbook:** `docs/AB_TEST_RUNBOOK.md`

---

## 📈 What Happens When Someone Submits a Quote?

### 1. **Frontend** (User Experience)
- User fills form and uploads photos
- Photos upload to Supabase Storage (`quote-photos` bucket)
- Form data + photo URLs sent to edge function
- Success confirmation displayed
- Analytics events fire to GTM

### 2. **Backend** (Edge Function)
- Receives payload from frontend
- Inserts record into `quote_submissions` table
- Sends email to ops@ascent-build-bright.lovable.app via Resend
- Returns success response with submission ID

### 3. **Analytics** (GTM → GA4)
- Event `quote_form_submit` tracked
- Parameters: success, submission_id, variant
- Data flows to GA4 Realtime
- Available for reporting and analysis

### 4. **Email Notification**
- Subject: "New Quote Request — [Name] — [Package]"
- Contains: Contact info, project details, photos, A/B variant
- Link to admin dashboard
- Delivered in <5 seconds

---

## 🔍 Troubleshooting

### Issue: GTM events not firing
**Solution:**
- Check browser console for errors
- Verify GTM snippet has correct Container ID
- Launch GTM Preview and check Debug panel
- See: `docs/GTM_SETUP_GUIDE.md` Section 7

### Issue: Form submission fails
**Solution:**
- Check browser Network tab for error response
- Open Lovable Cloud → Functions → notify-quote → Logs
- Verify RESEND_API_KEY is set correctly
- Check Supabase RLS policies allow insert

### Issue: Email not received
**Solution:**
- Check spam/junk folder
- Verify domain at https://resend.com/domains
- Check Resend dashboard for delivery status
- View edge function logs for Resend API errors

### Issue: Photos not uploading
**Solution:**
- Check file size (<10MB per file)
- Verify format (JPG, PNG, WebP only)
- Check Supabase Storage → quote-photos bucket exists
- Verify RLS policies allow upload

---

## 📂 Key Files & Locations

### Frontend:
- `src/components/QuoteModal.tsx` - Quote form component
- `src/components/home/HeroVariantTest.tsx` - A/B test hero
- `src/lib/analytics.ts` - Analytics utility
- `src/lib/ab-test-manager.ts` - A/B test logic

### Backend:
- `supabase/functions/notify-quote/index.ts` - Edge function
- `supabase/migrations/20251008003629_*.sql` - Database schema

### Configuration:
- `index.html` - GTM snippet (line 6 and 129)
- `.env.example` - Environment variables template
- `supabase/config.toml` - Edge function config

### Documentation:
- `docs/GTM_SETUP_GUIDE.md` - GTM configuration steps
- `docs/TESTING_CHECKLIST.md` - Complete QA checklist
- `docs/AB_TEST_RUNBOOK.md` - A/B test procedures
- `docs/ANALYTICS_TEST_GUIDE.md` - Event verification
- `docs/IMPLEMENTATION_SUMMARY.md` - Technical details
- `docs/QUICK_START.md` - This file

---

## 🎯 Success Criteria

Before considering this "done", verify:

- [ ] GTM Container created and ID documented
- [ ] GTM snippet installed with correct ID
- [ ] GA4 property created and connected to GTM
- [ ] All 6 events firing in GTM Preview
- [ ] Test quote submitted successfully
- [ ] Email received at ops@ascent-build-bright.lovable.app
- [ ] Supabase table contains test data
- [ ] Photos uploaded to Storage bucket
- [ ] A/B test variants rotating correctly
- [ ] All documentation files reviewed

---

## 📞 Next Steps

### Week 1:
- Monitor daily A/B test progress
- Track quote submission volume
- Check email delivery rate
- Review analytics in GA4

### When test completes (7 days or 300 visits/variant):
- Export results using `exportTestResults()` function
- Calculate statistical significance
- Implement winning variant permanently
- Document results in AB_TEST_RUNBOOK.md

### Ongoing:
- Review quote submissions weekly
- Monitor edge function performance
- Check for spam submissions
- Optimize conversion rate

---

## 🆘 Need Help?

1. Check relevant documentation file
2. Review browser console for errors
3. Check Lovable Cloud Logs for edge function issues
4. Verify Supabase data in Cloud dashboard
5. Test in GTM Preview mode

**All systems are GO! 🚀**

---

*Last updated: January 8, 2025*
