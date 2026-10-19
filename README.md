# RentCheck NG — Section 1 rebuilt (v2)

`index.html` was rebuilt: it now reads only **approved listings** from Supabase (`public_properties` view, created by `supabase/schema.sql`) instead of SheetDB. Changes: no stock fallback photos (listings without photos show none), honest "Not yet verified" vs recorded verification labels, itemised cost breakdown with total upfront, all 36 states + FCT, verified-only filter, sorting, load-more, saved homes (this device only), WhatsApp inquiry to the listing's agent, report-listing link, loading/empty/error states, keyboard-accessible controls.
The previous page is kept as `index-section1-old.html` for rollback (it still uses SheetDB).
Setup: see SECTION2_SETUP.md. Until the Supabase URL/key are set, the page shows a "not connected" message and no listings.
Limits: reports and inquiries still open WhatsApp and are not stored (Section 3); saved homes are not synced to an account.

---
# RentCheck NG — Section 1 rebuild (Foundation and marketplace)

This package is the first implementation stage of the RentCheck NG property-rental marketplace plan. It is based on the uploaded `rentcheck-main` project and retains the existing property-feed integration and listing spreadsheet.

## Included
- `index.html` — responsive marketplace homepage and frontend.
- `RentCheckNG_Agent_Listing_Template.xlsx` — original property listing template.
- `PROJECT_PLAN.md` — four-section project plan and current implementation status.

## Section 1 features
- Responsive navigation and homepage sections for renters, agents, owners, and trust/safety.
- Search by neighbourhood/city, state, property type, maximum annual rent and bedroom count.
- Sort results by recent/default order or rent amount.
- Property cards with photos, annual rent, known fee fields and agent contact.
- Property detail modal showing available description, location, known fees and contact action.
- Save/favourite property buttons persist on the same browser/device using local storage (not synced to an account).
- Agent application, owner property submission and concern-report forms prepare WhatsApp messages for review.
- Illustrative agent/admin dashboard sections and visual assets. These are previews, not connected account dashboards.

## Important limitations
This is not yet a complete production backend. Agent applications, owner submissions and complaints are not automatically stored in a database; the forms prepare WhatsApp messages. There is no secure agent login, admin login, server-side permission model, verification workflow, inspection booking database, customer account system, or commission ledger yet. Those are planned for Sections 2–4.

The property feed URL and WhatsApp contact were retained from the submitted HTML. Confirm that they are yours and intended for public use before deployment. The site requires network access for the SheetDB feed, fonts, icons and remote photos. Some remote photos are illustrative fallback images and must not be presented as verified photos of an actual rental property.

## Preview locally
Open `index.html` in a modern browser. The listing feed needs internet access. If the feed cannot be reached, the page displays an error state rather than inventing listings.

## Four-section implementation plan
1. **Foundation and marketplace** — current stage: frontend improvements; inspect and validate the live feed and property detail/search experience.
2. **Agent network and verification** — secure agent application, approval, profiles, listing submissions, verification records and admin review.
3. **Customer operations** — persistent inquiries, inspection scheduling, notifications, saved listings/accounts and complaint management.
4. **Admin, revenue and launch** — admin controls, commission ledger, reporting, security checks, policies, end-to-end testing and controlled launch.

## Validation performed
- Extracted inline JavaScript and checked syntax with `node --check`.
- The repository still needs to be identified in GitHub before these changes can be committed there. Do not push to an unrelated repository.
