# Section 2 setup — agent network and verification

## 1. Create the Supabase project
1. supabase.com > New project (pick the closest region). Save the database password.
2. SQL Editor > paste all of `supabase/schema.sql` > Run. It must finish with no errors.
3. Authentication > Providers > Email: keep enabled. For the pilot, leave "Confirm email" ON.
4. Project Settings > API: copy **Project URL** and the **anon public** key into `rc-common.js`.
   Never use or share the `service_role` key.

## 2. Create the first admin (once)
1. First create an account on `agent.html` with the staff email.
2. In SQL Editor run: `update profiles set role='admin' where id=(select id from auth.users where email='YOUR_STAFF_EMAIL');`
3. Admins are created only this way. There is no in-app route to become admin or agent.

## 3. Test checklist (do all before inviting agents)
- [ ] New account applies on `agent.html`; status shows "Submitted".
- [ ] That account cannot see the dashboard or insert into `properties` (try in browser console).
- [ ] Admin sees the application, opens the ID via a short-lived link, approves; applicant now gets an Agent ID (RCNG-xxxx).
- [ ] Reject/need-info/suspend require a note and appear in the Audit log.
- [ ] Approved agent submits a listing with photos; it is NOT visible in `select * from public_properties`.
- [ ] Admin records a check, approves; listing now appears in `public_properties` with its labels.
- [ ] Suspend the agent: the listing disappears from `public_properties`.
- [ ] A second agent cannot read or edit the first agent's listings.
- [ ] Agent cannot change own `role`, `agent_code` or `status` (try `update profiles set role='admin'` from the console: role must stay unchanged).

## 4. Known gaps (not done in this package)
- `index.html` still reads listings from SheetDB. Switching it to `public_properties` is the first step of the next round, after the tests above pass.
- No password-reset page, no rate limiting beyond Supabase defaults, no email notifications (Section 3).
- Photos in `property-photos` are publicly readable by URL even before approval.
- The SQL and pages were syntax-checked but NOT run against a live Supabase project; they have not been tested end to end.
- Agent legal agreement, ID-handling privacy notice and the verification standard need your legal review.
