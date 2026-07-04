# CLAUDE.md — CragCast

Project memory for Claude Code. Auto-loaded each session. Keep it short and high-signal; deep detail lives in `docs/` (referenced below), not here.

## What this is
CragCast is a **PWA** (installable on iOS + Android from one codebase) that scores rock-climbing **friction conditions** for four PNW areas — Index, Squamish, The Exits, Vantage — and their individual crags. It pulls live + historical weather from Open-Meteo and turns it into a per-crag send score. The whole app is one self-contained file.

## Stack & layout
- `index.html` — the entire app: UI, data fetch, scoring, archive view. No build step, no framework, no dependencies. Vanilla JS + inline CSS. Fonts: Space Grotesk (display) + IBM Plex Mono (data).
- `manifest.webmanifest`, `sw.js`, `icon-*.png` — PWA install + offline shell.
- `docs/conditions-model.md` — **the scoring spec** (physics, weights, constants). Read this before touching any scoring code.
- `docs/crag-guide.md` — crag domain knowledge + the metadata table for every crag.
- `README.md` / `SETUP.md` — deploy + install.

## Hard invariants — do not break these
1. **No `localStorage`/`sessionStorage` in `index.html`.** State is in-memory only, so the same file renders inside the Claude.ai artifact sandbox. (The service worker handles offline for the deployed copy.)
2. **Cold = good.** The color scale runs cold→warm = good→bad (teal PRIME → rust/violet WET), mirroring the friction physics. Never invert it to the conventional hot=good.
3. **Weather is per-area; differentiation is per-crag.** All crags in an area share one Open-Meteo grid cell. What separates them is the crag metadata (`steep`, `sun`, `drain`, `lagH`) applied in scoring — not separate API calls. Keep it that way.
4. **Scoring must stay physically honest.** The model encodes real behavior (steep sheds rain, basalt drains fast, tight dew-point spread kills friction, sun burns off condensation when cool but bakes when hot). If you change weights, re-run the sanity cases in `docs/conditions-model.md` and confirm the ordering still holds (e.g. after rain: steep/basalt > seepy slab).

## Conventions
- Open-Meteo `/v1/forecast`, no API key, CORS-enabled. Fetch in **imperial** (`temperature_unit=fahrenheit`, `wind_speed_unit=mph`, `precipitation_unit=inch`), `timezone=auto`. Convert to metric client-side; don't refetch on unit toggle.
- Dashboard uses `past_days=5, forecast_days=7`. Archive view uses `past_days=31`. `past_days` max is 92.
- Temps are Fahrenheit **internally** everywhere in scoring. Only display converts.
- Keep `index.html` dependency-free and single-file. Don't add a bundler or framework without asking.
- Make minimal changes; don't refactor unrelated code. After edits, verify JS parses (`node --check` on the extracted script) before declaring done.

## Common tasks
- **Add a crag:** add an entry to the `AREAS` array in `index.html` with `{name, steep, sun, drain, lagH, tags, note}`. See `docs/crag-guide.md` for what the numbers mean and how to calibrate.
- **Tune the model:** edit the pure functions (`tempScore`, `spreadScore`, `windScore`, `wetnessFactor`, `sunAdjust`, `scoreCrag`) — all side-effect-free and testable in isolation. Spec + test cases in `docs/conditions-model.md`.
- **Deploy:** static host. Drag folder to Netlify Drop, or push to GitHub Pages. Must be HTTPS for install + service worker.

## Domain quick-reference
Friction wants cold (~38–52°F), dry (large dew-point spread, low absolute dew point), a light breeze, and a dry-out window beforehand. Rock type and steepness decide how fast a wall comes back after rain: Vantage basalt in hours; Index granite seeps for days; overhung walls (the Cheeks, Exit 38 Far Side) stay climbable through rain. Full treatment in `docs/crag-guide.md`.
