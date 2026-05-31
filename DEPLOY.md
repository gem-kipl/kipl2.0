# Deploying Krystal Ingredients (Vercel)

The frontend is a standard **Next.js 14** app. WordPress (`kipl1.gemaromatics.com`)
stays as the headless content backend. You run **two Vercel projects from this one
repo** — one per subdomain — differing only by the `NEXT_PUBLIC_EDITION` flag.

---

## 1. One-time: connect the repo
1. Go to **vercel.com → Add New → Project**.
2. **Import** `gem-kipl/kipl2.0` (authorize Vercel for the `gem-kipl` org if asked).
3. Framework preset auto-detects **Next.js**. Leave build/output defaults
   (`next build`). Root directory = repo root. Click **Deploy**.

That first deploy creates **Project A**. Then duplicate it for **Project B** (step 3).

---

## 2. Environment variables (set in Project → Settings → Environment Variables)

| Variable | Project A — **Aurum** | Project B — **Current** |
|---|---|---|
| `NEXT_PUBLIC_EDITION` | `aurum` | `current` |
| `WP_API_URL` | `https://kipl1.gemaromatics.com/wp-json` | same |
| `NEXT_PUBLIC_SITE_URL` | `https://<aurum-subdomain>` | `https://<current-subdomain>` |
| `RESEND_API_KEY` | *(optional — for RFQ emails)* | same |
| `CONTACT_TO_EMAIL` | `sales@krystalingredients.com` | same |
| `CONTACT_FROM_EMAIL` | `Krystal <noreply@yourdomain>` | same |

Set them for **Production, Preview, and Development**. Redeploy after changing.

---

## 3. Two subdomains from one repo
- **Project A** (Aurum): import the repo, set `NEXT_PUBLIC_EDITION=aurum`, then
  **Settings → Domains** → add your Aurum subdomain (e.g. `www.krystalingredients.com`).
- **Project B** (Current): **Add New → Project → Import the same repo again**, set
  `NEXT_PUBLIC_EDITION=current`, add the second subdomain
  (e.g. `app.krystalingredients.com`).

Both auto-redeploy on every `git push` to `main`.

### DNS (at your domain registrar / Hostinger DNS)
Point each subdomain at Vercel as instructed in **Settings → Domains** — usually a
`CNAME` to `cname.vercel-dns.com` (Vercel shows the exact record per domain).

---

## 4. Notes
- **No CORS setup needed** — the frontend reads WordPress on the server (SSR/ISR),
  not from the browser.
- **Content updates** (products, certifications, pages, and the Site Content panel)
  appear automatically within the ISR window (~5 min), or instantly on redeploy.
- **Images:** `next/image` is already allow-listed for the WP host in
  `next.config.js`. Add a CDN host there if you serve media from one.
- **Local dev:** `cp .env.example .env.local`, fill values, `npm install`,
  `npm run dev`. For the Aurum edition locally: `NEXT_PUBLIC_EDITION=aurum npm run dev`.

---

## 5. After first deploy — quick check
- Aurum site loads dark/amber; `/products` shows the live WordPress catalogue.
- Current site loads with the Aurum/Verdant toggle.
- `/sitemap.xml` and `/robots.txt` resolve.
- Submit a test RFQ on `/contact` (emails require `RESEND_API_KEY`).
