# Private preview on Cloudflare Pages with Cloudflare Access

Your choice (2026-11-20): a free review link that only the email addresses you list can open. I have no Cloudflare connector, so you do these steps yourself. It takes about 15 minutes.

## 1. Lock the address first

1. Make a free Cloudflare account. Open **Zero Trust**, and pick the free plan when it asks. It may ask for a card even at $0.
2. Go to **Access**, then **Applications**, then **Add an application**, then **Self-hosted**.
3. **Name:** Church offices preview.
4. Add two hostnames:
   - `claude-for-church-offices.pages.dev`
   - `*.claude-for-church-offices.pages.dev` (this covers each build's own link)
5. **Policy:** Action Allow, Include, Emails, then your address. Add anyone else who should review.
6. **Login method:** One-time PIN, which is the default. Save.

If Cloudflare won't save a hostname for a project that doesn't exist yet, do step 2 first and come straight back here. The first build takes a few minutes, so the address is open only briefly, and nobody else knows it.

## 2. Connect the repo

1. Go to **Workers & Pages**, then **Create**, then **Pages**, then **Connect to Git**, and pick `jroll12/aiforchurch`.
2. **Project name:** `claude-for-church-offices`. This must match the hostnames in step 1.
3. **Production branch:** `claude/upbeat-cray-ehwzda`.
4. **Build command:** `npm run build`. **Output directory:** `dist`.
5. **Environment variables:**
   - `NODE_VERSION` = `22.23.4`
   - `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD` = `1`
6. Save and deploy.

## 3. Check the lock

1. Open `https://claude-for-church-offices.pages.dev` in a private browser window.
2. You should see a Cloudflare login asking for your email, not the site. Enter your email, then type in the code you are sent.
3. Then check that Home, `/course/`, `/topics/newsletter/` and one PDF under `/downloads/` all open.

Every push to the branch rebuilds the site. `public/_headers` keeps search engines off the member pages and downloads (qa/questions.md D58).

## At launch

The same Access application can be member access (qa/questions.md D51):

- Keep the policy on `/course/`, `/topics/`, `/resources/` and `/downloads/` only.
- List attendees' emails, or use a one-time PIN for anyone who registered.
- Open the public pages to everyone.

That is a decision for your review pass.
