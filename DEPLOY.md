# Deploying the preview to a shareable URL

The build output in `dist/` (and the ready-to-drag ZIP `alrujuh-prototype-preview.zip`)
is a **fully static site** — no server, no build step, no external requests. Any static
host will serve it.

Current status:

- ✅ **LIVE PREVIEW: <https://diginestpro.github.io/alrujuh-prototype/>**
  - Home (slider + performance snapshot): <https://diginestpro.github.io/alrujuh-prototype/>
  - Performance page: <https://diginestpro.github.io/alrujuh-prototype/performance.html>
- ✅ GitHub repo (now **public**): <https://github.com/diginestpro/alrujuh-prototype>
- ✅ GitHub Pages enabled on `main` / root, build status **built**
- ℹ️ The account is on the GitHub **Free** plan, which only allows Pages on public repos.
  Making the repo private again would take the Pages site offline unless the account is
  upgraded to Pro/Team.
- ✅ `gh` CLI is authenticated and the git credential helper is configured, so
  `python _publish.py` works without further login.

Other hosting options are kept below in case you want to move it (e.g. to a private host).

---

## Option 1 — GitHub Pages ✅ ALREADY LIVE

Done for you — the repo was switched to public and Pages enabled on `main` / root:

- Site: <https://diginestpro.github.io/alrujuh-prototype/>
- Performance page: <https://diginestpro.github.io/alrujuh-prototype/performance.html>

To redeploy after any edit:

```powershell
python _stage.py       # rebuild dist/
python _publish.py     # sync + push + confirm Pages
```

**Trade-off:** the repo (and its source) is publicly visible/searchable.
Free GitHub accounts can only use Pages on public repos; upgrading to Pro/Team allows
Pages on private repos (then set the repo back to private and the site keeps working).

---

## Option 2 — Netlify Drop · no account, ~20 seconds

1. Open <https://app.netlify.com/drop>
2. Drag **`alrujuh-prototype-preview.zip`** (or the `dist` folder) onto the page.
3. You get an instant HTTPS URL like `https://random-name-123.netlify.app`.

No signup required for the initial drop; create a free account only if you want to keep
the site permanently or use a nicer subdomain. Best option if you don't want the source
in a public repo.

---

## Option 3 — Vercel CLI · source stays private, stable URL

Vercel CLI 54.7.1 is already installed. One interactive login, then it's scriptable:

```powershell
vercel login                       # opens the browser once
cd publish
vercel deploy --prod --yes         # → https://<project>.vercel.app
```

For repeat deploys afterwards just re-run `vercel deploy --prod --yes`.
(Non-interactive alternative: create a token at vercel.com/account/tokens and set
`$env:VERCEL_TOKEN`, then `vercel deploy --prod --yes --token $env:VERCEL_TOKEN`.)

---

## Option 4 — Instant temporary link (Cloudflare quick tunnel)

Useful for "look at it right now" without any account, but the link dies when this PC
or the terminal stops:

```powershell
python -m http.server 8080 --directory dist
# in a second terminal (downloads cloudflared once):
winget install --id Cloudflare.cloudflared
cloudflared tunnel --url http://localhost:8080
```

Cloudflared prints a `https://<random>.trycloudflare.com` URL — share that.

---

## Refreshing the preview after edits

```powershell
python _stage.py       # rebuild dist/ from the source pages + integrity checks
python _publish.py     # sync to publish/ and push (Option 1)
```

`_publish.py` options:

```powershell
python _publish.py --repo diginestpro/another-repo --message "Review v2"
python _publish.py --public     # create the repo as public
```

---

## What gets published

Only `dist/` — i.e. the built pages, CSS, JS, site photos and favicon:

```
index.html  about.html  services.html  projects.html  performance.html  clients.html  contact.html
assets/css/style.css  assets/css/motion.css  assets/js/main.js  assets/js/motion.js
assets/img/site/*.jpg  favicon.svg  .nojekyll
```

The working files (`_stage.py`, `_publish.py`, `_fav.py`, `WIX-NOTES.md`, `CLAUDE.md`) are
**not** published.
