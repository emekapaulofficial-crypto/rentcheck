# RentCheck NG — Project plan and implementation status

## Product goal
Build a Nigerian property-rental marketplace where renters can discover properties, understand known costs, contact responsible agents, arrange inspections, and report concerns. The company recruits and manages local agents and oversees listing quality and operations.

## Four delivery sections
1. **Foundation and marketplace:** homepage, location search, filters, property cards, detail views, mobile experience.
2. **Agent network and verification:** applications, agent approval, agent profiles, property submissions, verification checklist and moderation.
3. **Customer operations:** inquiries, inspection scheduling, notifications, customer support and complaint records.
4. **Admin, revenue and launch:** admin controls, commission tracking, analytics, security, legal review, testing and rollout.

## Current state
Section 1 has a redesigned frontend and working client-side search/filter/sort against the existing SheetDB feed, plus property details and device-local favourites. This is not a backend implementation. Agent/owner/report forms use WhatsApp handoff and do not create database records. Dashboard views are previews.

## Technical guardrails
- Inspect the existing source and deployment before replacing code.
- Keep actual property data separate from demo/fallback imagery.
- Never label a listing verified unless the defined checks have been completed and recorded.
- Enforce role permissions on the server/database when backend work begins.
- Keep identity documents private and collect only necessary personal data.
- Do not handle rent/deposits until payment, refund, reconciliation and compliance requirements are resolved.
- Test changes before production deployment and preserve a rollback path.

## Open decisions
- Exact GitHub repository URL and default branch.
- Existing live website URL and deployment provider.
- Backend/database choice and whether a Supabase project already exists.
- First launch city and initial agent onboarding policy.
- Commission basis and whether the website will process any money.
