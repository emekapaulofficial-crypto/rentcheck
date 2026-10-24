# RentCheck NG: setup in 6 steps (no coding)

You need a free account at supabase.com and a place to host the files (Cloudflare Pages, Netlify or similar).

## 1. Create the database
1. supabase.com > **New project**. Pick the region closest to Nigeria. Save the database password.
2. **SQL Editor** > New query > paste ALL of `supabase/schema.sql` > **Run**. It must finish with no error.
3. New query again > paste ALL of `supabase/upgrade-2.sql` > **Run**.

## 2. Connect the website
1. Supabase > **Project Settings > API**. Copy the **Project URL** and the **anon public** key.
2. Open `rc-common.js`. Replace `YOUR_SUPABASE_PROJECT_URL` and `YOUR_SUPABASE_ANON_KEY`.
3. Never copy or share the `service_role` key.

## 3. Create the first admin (you)
1. Open `agent.html` on your site, choose **Create account**, and register with your own email.
2. Supabase > SQL Editor > run (put your email in): 
   `update profiles set role='admin' where id=(select id from auth.users where email='YOUR_EMAIL');`
3. Now open `admin.html` and sign in.

## 4. Test before inviting anyone (about 20 minutes)
- [ ] Register a second test account on `agent.html` and submit an application with an ID photo.
- [ ] In `admin.html`, approve it. The test account now has an Agent ID.
- [ ] As that agent, add a property with 5+ photos and owner details. Check that photos upload and the owner section saves.
- [ ] In `admin.html` > Property queue: you can see the photos and the private owner details.
- [ ] Record all four checks, then approve. The home now shows on `index.html` with "Checked by RentCheck NG".
- [ ] Open `index.html` as a visitor: owner details are NOT visible anywhere.
- [ ] Suspend the test agent: their listing disappears from the homepage.
- [ ] Confirm "Confirm email" is ON in Supabase > Authentication > Providers > Email.

## 5. Put it online
Upload the whole folder to your host, including the `fonts` folder. Keep the file names as they are (all lowercase).

## 6. Before you say you are a registered company
Until the CAC certificate arrives, the site says "Company registration in progress". After registration, add your company name and RC number in `about.html` and `rc-nav.js` (footer). Have a lawyer read `terms.html`, `privacy.html` and the agent rules before you invite agents.

## Where to change things
- Menu and footer on EVERY page (including the homepage): `rc-nav.js` (one place).
- Homepage sections: `index.html`. Homepage layout and styling: `home.css`.
- Icons: `rc-icons.js` (no external icon font).
- Font: `fonts/` (self-hosted, so pages load fast and do not depend on Google).
- Colours and fonts for the WHOLE site: the `:root` block at the top of `site-pages.css`.
- Photo limits: `MAX_PH` and `MIN_PH` at the top of the script in `agent.html`.
- WhatsApp number for company messages: `SUPPORT_WHATSAPP_NUMBER` in `index.html`.

## Known limits (next round)
- Inquiries, inspection requests and reports still open WhatsApp. They are not saved in the database yet.
- Saved homes stay on the visitor's own phone (no customer accounts yet).
- Photos are public by link once uploaded, even before approval.
- Admin cannot yet review complaints or commissions inside `admin.html`.
- This was tested here against a simulated database, not your live Supabase project. Run the checklist in step 4.
