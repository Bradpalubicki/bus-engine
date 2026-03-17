# Website Audit — transitsales.com
**Transit Sales International | Used Buses for Sale**
Platform: WordPress + Divi 4.27.6 + WooCommerce + Yoast SEO | Sister company to CCW/SBL | Riverside, CA
Audit Date: 2026-03-17

---

## Overall Score: 52/100 *(Highest — Yoast SEO installed but misconfigured)*

---

## Critical Issues

1. **Homepage title is "home - Transit Sales International"** — the word "home" leading a title tag is textbook SEO misconfiguration. Yoast is installed and not set up.
2. **No H1 on the homepage** — confirmed absent. H1 is the highest-weighted on-page SEO signal.
3. **Inventory is stale** — listings dated 2019, last modified 2021. Buyers have no way to know if a listed bus is still available. No "Available/Sold" status anywhere.
4. **70+ listings, zero pricing** — every unit uses "Request a Quote" with no price signal. Buyers comparing dealers will not make the call.
5. **Product images are low-quality/generic** — references to `Untitled-1.jpg` from 2019. Used vehicle buyers are visual. Poor photos = no trust.
6. **About page last updated March 2021** — 5 years stale. New President appointment, RATP Dev delivery, TriMet BEV conversion — none reflected.
7. **Resources page slug exposes internal company structure** — cannibalizes brand searches and routes buyers away from the conversion funnel.
8. **WooCommerce cart live for $40K bus transactions** — no one is adding a bus to a cart. Dead infrastructure, crawl budget waste.

---

## Revenue Impact

TSI claims "largest inventory in the nation with over 1,000 makes and models available" but shows 70+ listings — the other 930 don't exist to Google. No pricing + stale inventory = buyers bounce to competitors.

**Estimated lift from fixes alone: $245K+ annually** (70 units × $35K avg × 10% conversion improvement).

---

## Automation Opportunities

- **Inventory sync** — real-time Available/Pending/Sold status tied to internal inventory system; auto-remove sold units
- **Automated quote response** — immediate reply with specs PDF, 3 comparable alternatives, calendar link for sales call
- **Saved search alerts** — "notify me when a 35ft low-floor diesel comes in" captures buyers 60 days from decision
- **Fleet procurement track** — separate intake form for agencies buying 5–20 buses; routes directly to senior rep
- **Cross-company routing** — buyer who needs rehab before purchase → auto-introduction to CCW

---

## Top 5 Fixes (Priority Order)

1. Fix Yoast — update homepage title, write a 155-character meta description, add H1 to homepage
2. Add pricing or price ranges ("starting at $28,000") to all inventory listings
3. Audit all 70+ listings — mark sold units, add date listed, replace `Untitled-1.jpg` with real photos
4. Verify sitemap in Google Search Console (Yoast is generating it but not confirmed indexed)
5. Update the About page with 2026 milestones
