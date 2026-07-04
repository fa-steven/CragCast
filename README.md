# CragCast

A friction-forecast web app for **Index, Squamish, The Exits, and Vantage**. It pulls live conditions plus the last 5 days of rain history, and scores each crag using the stuff that actually decides a PNW session: dew-point spread, temperature friction band, wind, and — crucially — how fast each wall sheds water based on its steepness, aspect, and rock type.

Same weather cell, different crag scores: the Cheeks stays climbable in rain while the Great Northern Slab seeps; Vantage basalt is PRIME two days after a storm that leaves Squamish's Apron greasy.

## It's one app for both phones (PWA)

This is a Progressive Web App, so a single build installs to the home screen on **both iOS and Android** with a real icon and full-screen launch — no App Store, no separate codebases. It needs to be served over HTTPS for install + offline to work (opening the file directly runs the app, but won't install).

### Fastest way to get it on your phone

**Option A — Netlify Drop (30 seconds, no account needed to start):**
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page.
3. Open the URL it gives you on your phone.

**Option B — GitHub Pages:**
1. Create a repo, add these files, push.
2. Settings → Pages → deploy from `main` / root.
3. Open the `github.io` URL on your phone.

### Install to home screen
- **iPhone (Safari):** open the URL → Share → **Add to Home Screen**.
- **Android (Chrome):** open the URL → menu (⋮) → **Install app** / **Add to Home screen**.

Once installed it launches full-screen, auto-refreshes every 15 min, and the app shell works offline (last-fetched conditions are cached).

## Files
- `index.html` — the entire app (UI + scoring). Works standalone.
- `manifest.webmanifest` — home-screen identity.
- `sw.js` — offline app shell + network-first weather.
- `icon-*.png` — app icons.

## 30-day dry-out history
Tap **30-day** in the header for the archive view. For each area it pulls 31 days of history (`past_days=31` on the same endpoint — gap-free, no ERA5 lag) and shows:
- a **rainfall + ground-dryness chart** — daily rain bars behind a dryness curve (the same decayed rain-load model that scores the crags, sampled every 6 h), so you can see when the last real storm hit and how the rock has trended since;
- **days since measurable rain** and the last soaking, plus a 30-day rain total;
- **per-crag dryness %** right now — the same rain history read through each wall's drainage and steepness, so Vantage basalt can read 95%+ while a seepy granite slab is still in the 60s.

Data is fetched on first open and cached in memory; the refresh icon reloads it.

## Data & scoring
- Weather: [Open-Meteo](https://open-meteo.com) — no API key, CORS-enabled, CC BY 4.0. Dew point comes straight from the API; `past_days=5` drives the live seepage model and `past_days=31` powers the archive view.
- Score (0–100 → WET / POOR / MARGINAL / GOOD / PRIME) combines a temperature friction band (peak ~38–52°F), dew-point spread, wind, and a wetness gate weighted per crag by `drainage` and `steepness`, plus a sun term that *helps* burn off condensation when cool-and-damp and *hurts* when hot-and-sunny.
- Every crag's aspect/steepness/drainage lives in the `AREAS` array in `index.html` — tune them as you learn each wall, or add crags.

## Native wrapper (optional, later)
If you ever want true store builds from this same code, wrap it with Capacitor (`npx cap add ios` / `android`) — the HTML/JS transfers as-is. The PWA covers the actual use case without any of that.

Conditions are a model, not a promise. Verify with eyes and hands on the rock.
