# RentCheck NG v3

What changed from the version you sent:
- **Agent portal** (`agent.html`): create account, log in, forgot password, apply, then add properties.
- **Up to 30 photos per listing** with drag-and-drop, automatic shrinking, reorder, cover photo, and edit later.
- **Private owner details**: relationship, name, phone, email, address and proof documents. Visible only to the agent and staff.
- **Admin queue** (`admin.html`): photo thumbnails, owner details and proof documents beside the verification checks.
- **Homepage** now reads approved listings from Supabase (the old SheetDB feed and stock photos are gone), shows all 36 states + FCT, a photo gallery, "Checked by RentCheck NG" or "Not yet verified", and a "Show more" button.
- **Navigation**: one menu (Find a home, List your property, Become an agent, Trust & safety, Contact, Agent login) on every page, and a new `agents.html` page.
- Removed the fake dashboard previews and the duplicate `Agent.html` / `Admin.html` files. All file names are lowercase.
- Fixed a bug where saving a listing with a blank fee field failed.

Start with `SETUP.md`.
