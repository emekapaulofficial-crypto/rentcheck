# RentCheck NG — CEO Operating Playbook
Version 1.0 | Internal working document | Nigeria

## Mission
Help renters compare homes with clearer prices, accountable agents, documented checks and a safer inspection process. Never promise that a listing is risk-free. State exactly what was checked and what remains unconfirmed.

## Non-negotiable controls
1. Never call a listing verified unless the checks and evidence are recorded.
2. Never invent property availability, rent, photos, ownership authority or agent credentials.
3. Do not collect or hold rent/deposits until legal, payment, refund, reconciliation and consumer-protection controls have been reviewed by qualified professionals.
4. Keep identity documents private and available only to authorised staff.
5. Record a reason for every rejection, suspension, complaint resolution and moderation decision.
6. Agents cannot approve their own listings or write verification records.
7. Collect only necessary personal information and establish retention periods.
8. Hide listings promptly when information is stale or a credible risk is reported.

## Roles
- CEO/owner: strategy, budget, policies, partnerships and launch decision.
- Operations lead: application queue, agent onboarding, verification scheduling and escalations.
- Verification staff: gather evidence and record date, source, observations and limitations.
- Admin: application decisions, listing moderation, complaints, audit reviews and commissions.
- Agent: submit accurate information and actual photos, disclose fees and confirm availability.
- Customer: compare, ask questions, inspect and report concerns.

## Agent onboarding SOP
1. Review the application and conduct agreement.
2. Privately inspect the identity document; cross-check contact details through a separate channel where practical.
3. Confirm operating areas, experience and references where appropriate.
4. Explain fee disclosure, anti-fraud rules, no fake listings and no pressure to pay personal accounts.
5. Approve, request information or reject with a written reason.
6. Assign an agent code and explain suspension grounds.
7. Recheck when credible complaints arise and at a defined periodic interval.

## Property verification SOP
Record evidence, reviewer and date for:
- Agent identity checked.
- Property physically viewed, or documented reason it was not.
- Owner/landlord authority to rent checked.
- Rent, fees, availability and important details recently confirmed.

A photo alone does not prove ownership. Do not publish if material facts conflict or a credible fraud alert is unresolved. Set a recheck date. The starter SQL currently blocks approval until at least one verification record exists; the launch operating policy should require all applicable checks before publication and this gate must be enforced before public launch.

## Moderation and complaints
- Review duplicates, implausibly low rent, inconsistent names, pressure to pay immediately and requests to move payments off-platform.
- Acknowledge complaints, assign a reference and triage alleged payment fraud or threats as urgent.
- Preserve evidence and record contact attempts, findings and outcome.
- Hide a listing or suspend an agent when credible risk warrants it.
- Escalate suspected crime or threats to appropriate authorities and obtain qualified legal advice.
- Keep rejected/hidden records for audit instead of silently deleting them.

## Revenue
Possible models include agent subscriptions, clearly disclosed listing/verification fees, partnerships and optional tenant services. Test willingness to pay before committing. Publish all fees before a customer commits. Do not hold rental funds until qualified professionals approve the legal and operational model.

## Weekly CEO dashboard
Track active agents by area; application volume and decision time; listings submitted, approved, rejected and stale; checks in date; enquiries and inspection requests; response time and no-shows; complaints by age/category; confirmed fraud incidents; revenue, costs and cash runway; security incidents and overdue rechecks. Listing growth is not success if accuracy or trust declines.

## First 90 days
### Days 1–30: controlled pilot
Create a dedicated Supabase project; review and apply the schema; test role permissions and storage; recruit a small agent cohort in one area; manually verify every listing; run separate renter, agent and admin test accounts; review complaints daily.
### Days 31–60: measure
Interview renters and agents; track verification and response times, no-shows, stale listings and fee disputes; improve training; test unit economics.
### Days 61–90: decide
Expand only if quality targets are consistently met; automate only with an accountable owner and exception process; test backups and recovery; review access logs and privacy controls; document the go/no-go decision for the next area.

## Launch gates
Do not launch publicly until the schema runs without errors in the dedicated project; RLS/storage policies pass separate-role tests; non-admins cannot call admin actions; agents cannot edit another agent's listings; unpublished listings are not public; verification is auditable; contact and complaint routes work; privacy/terms receive qualified review; backup recovery is tested; and the live deployment is confirmed.

## Current caveats
The schema and pages have not been run together against a live project. The current homepage still contains a SheetDB-based feed, so its data source must be reconciled with the new public_properties view before relying on live listings. Property photos use public URLs to match the current portal; never put sensitive material in that bucket. ID documents belong only in the private agent-docs bucket.
