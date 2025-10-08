# A/B Test Runbook: Homepage Hero Variants

## Test Configuration

- **Duration:** 1 week OR 300 visits per variant (whichever comes first)
- **Traffic Split:** 33% A / 33% B / 34% C
- **Primary KPI:** Quote-start conversion rate (CTA clicks / homepage visits)
- **Secondary KPIs:** Phone clicks, form completions, bounce rate

## Start Test

1. Set environment variable: `VITE_AB_TEST_ENABLED=true`
2. Deploy to production
3. Verify variants are rotating (open 5 incognito windows, check different headlines)
4. Update `TEST_START_DATE` in `src/lib/ab-test-manager.ts` to today's date
5. Log start date: **[DATE]**

## Daily Monitoring

### GA4 Dashboard
- Navigate to: Reports → Engagement → Events
- Filter by: `homepage_variant` event
- Check daily distribution (should be ~33/33/34)

### Check Sample Size

Open Lovable Cloud backend and run this query:

```sql
SELECT 
  source_variant as variant,
  COUNT(*) as submissions,
  COUNT(DISTINCT DATE(created_at)) as days_active
FROM quote_submissions
WHERE created_at >= '[START_DATE]'
  AND source_variant IS NOT NULL
GROUP BY source_variant;
```

**Stop test if:** Any variant reaches 300 submissions OR 7 days elapsed

## Extract Results (End of Week 1)

### 1. Calculate Conversion Rates

```sql
-- Quote-start conversion rate by variant
WITH homepage_visits AS (
  SELECT 
    source_variant,
    COUNT(*) as visit_count
  FROM quote_submissions
  WHERE created_at >= '[START_DATE]'
  GROUP BY source_variant
),
cta_clicks AS (
  SELECT 
    source_variant,
    COUNT(*) as click_count
  FROM quote_submissions
  WHERE created_at >= '[START_DATE]'
  GROUP BY source_variant
)
SELECT 
  v.source_variant,
  v.visit_count,
  c.click_count,
  ROUND((c.click_count::numeric / v.visit_count) * 100, 2) as conversion_rate_pct
FROM homepage_visits v
JOIN cta_clicks c ON v.source_variant = c.source_variant
ORDER BY conversion_rate_pct DESC;
```

### 2. Export Results to CSV

Use the `exportTestResults()` function in your app:

```typescript
import { exportTestResults } from '@/lib/ab-test-manager';

const csvData = await exportTestResults();
// Download or send to email
```

### 3. Statistical Significance Test

Use this calculator: https://abtestguide.com/calc/

**Inputs:**
- Variant A: [visits], [conversions]
- Variant B: [visits], [conversions]
- Confidence level: 95%

**Threshold:** Winner must have >5% improvement AND p-value <0.05

### 4. Declare Winner

**If clear winner (>5% uplift, statistically significant):**
- Implement winning headline permanently
- Disable A/B test: `VITE_AB_TEST_ENABLED=false`
- Update `src/components/home/HeroSection.tsx` with winning copy

**If no clear winner (within 5%):**
- Run test for additional week
- OR implement Variant A (control) and test different element (CTA color, imagery)

## Post-Test Actions

1. **Document results:**
   - Winner: Variant [A|B|C]
   - Conversion rate: [X]% vs [Y]% (baseline)
   - Sample size: [N] visits per variant
   - Statistical significance: p = [0.XX]

2. **Update production:**
   - Deploy winning variant as default hero
   - Archive test variants in Git branch `archive/ab-test-hero-2025`

3. **Plan next test:**
   - Recommended: Test package pricing display (show vs hide)
   - Alternative: Test hero imagery (lifestyle vs project)

## Variant Details

### Variant A: "Small jobs. Big care."
- **Headline:** Small jobs. Big care.
- **Subhead:** From a leaky faucet to a fresh-painted room or a tidy patio repair — fast, friendly, affordable. Free estimates in 24–48 hours.
- **Primary CTA:** Get a Fast Quote (opens modal)

### Variant B: "Home jobs from the low hundreds"
- **Headline:** Home jobs from the low hundreds
- **Subhead:** Transparent prices for small repairs, painting and quick installs — no surprises.
- **Primary CTA:** See Starter Packages (scrolls to packages)

### Variant C: "Need a fix this week?"
- **Headline:** Need a fix this week?
- **Subhead:** Same-week bookings for small repairs and quick makeovers. Upload a photo for an immediate ballpark.
- **Primary CTA:** Upload a Photo — Get Ballpark (opens modal)

## Auto-Stop Logic

The A/B test will automatically log a warning when:
- 7 days have elapsed since `TEST_START_DATE`
- OR all variants have reached 300 submissions

Check browser console for warnings:
```
⚠️ A/B Test should stop: MAX_DAYS_REACHED
⚠️ A/B Test should stop: TARGET_VISITS_REACHED
```

When this happens, manually set `VITE_AB_TEST_ENABLED=false` and export results.
