# CragCast Crag Guide

Domain knowledge behind the scores. This is the reasoning that sets each crag's metadata; use it when adding or recalibrating crags.

## The two axes, restated for the PNW
- **Steepness** decides whether rain sheds off or tracks in and seeps. Overhung rock stays climbable *through* rain and comes back first; low-angle slab holds water and seeps longest.
- **Aspect/sun** warms the rock surface past the dew point (burning off overnight condensation) — a friend on a cold damp morning, an enemy that bakes and greases holds on a hot afternoon.
- **Rock type** sets drainage: rain-shadow basalt drains in hours; valley granite seeps for days.
- **Elevation/exposure** sets lag after weather and wind exposure.

## Areas

### Index — Granite, Skykomish Valley, WA (47.8207, −121.5720)
Low in a treed river valley: high ambient humidity at the base, notorious internal seepage, but genuine south sun that turns the walls on as the day warms. The most dew-point-sensitive granite in the region.
- **Lower Town Wall** — S face, low-angle→vertical. Greasy at dawn from valley humidity; morning sun burns it off. Great Northern Slab seeps longest; the steep central lines (Godzilla, City Park) come in first. `steep .45 · sun .8 · drain .28 · lagH 2`
- **Upper Town Wall · Cheeks** — steep/overhung, the **rain refuge**: stays dry through actual rain, comes back first. Higher and windier, so it lags the LTW after a system but shrugs off moisture. `steep .92 · sun .75 · drain .35 · lagH 5`
- **Lookout Point** — slab, drains fast but shaded: quick to dry, slow to warm. Needs sun on it before friction shows. `steep .2 · sun .4 · drain .6 · lagH 2`

### Squamish — Granite, Sea-to-Sky, BC (49.6870, −123.1400)
Coastal granite; wetter and more maritime than Index, but bigger and with more aspect variety.
- **The Chief · Grand Wall** — W/SW, steep; sheds better than the Apron, afternoon sun brings it around late. `steep .7 · sun .7 · drain .35 · lagH 3`
- **The Apron** — low-angle friction slab, the most dew-point-critical terrain here; damp air alone shuts it down. Wants cold, crisp, low-humidity air. `steep .18 · sun .65 · drain .4 · lagH 2`
- **Smoke Bluffs** — short walls, fast access, mixed aspects; the pragmatic marginal-day/busy-day pick. `steep .5 · sun .6 · drain .45 · lagH 1`

### The Exits — Volcanic, I-90 / North Bend, WA (47.4419, −121.6556)
Low, treed, mossy, and the local drizzle-day refuge because the overhung crags stay dry.
- **Exit 38 · Far Side** — steep/overhung, the classic **rain bailout**: dry when everything west is dripping. `steep .9 · sun .5 · drain .4 · lagH 1`
- **Exit 32 · Little Si** — steep World-Wall terrain, short approach, stays dry in light rain; shaded and slow to warm. `steep .72 · sun .45 · drain .4 · lagH 1`
- **Deception Crags** — lower-angle, heavily treed, holds moisture; prime-day-only. `steep .4 · sun .4 · drain .35 · lagH 2`

### Vantage / Frenchman Coulee — Basalt, WA (46.9536, −119.9847)
East of the Cascades in the rain shadow: dries in hours, so it's the go-to when the west side is soaked. Full sun bakes it; summer friction is gone by midday. Wind is a real factor.
- **Sunshine Wall** — S/SW vertical columns, sun-baked; PRIME after rain, an oven at midday in summer. `steep .6 · sun .95 · drain .95 · lagH 0`
- **The Feathers** — freestanding columns, dry almost instantly, but catch the full coulee wind (great as a breeze, miserable as a gale). `steep .55 · sun .85 · drain .95 · lagH 0`
- **Middle Coulee** — shadier basalt, the hot-afternoon shade option. `steep .5 · sun .45 · drain .9 · lagH 0`

## Metadata table
| Area | Crag | steep | sun | drain | lagH |
|---|---|---|---|---|---|
| Index | Lower Town Wall | 0.45 | 0.80 | 0.28 | 2 |
| Index | Upper Town Wall · Cheeks | 0.92 | 0.75 | 0.35 | 5 |
| Index | Lookout Point | 0.20 | 0.40 | 0.60 | 2 |
| Squamish | The Chief · Grand Wall | 0.70 | 0.70 | 0.35 | 3 |
| Squamish | The Apron | 0.18 | 0.65 | 0.40 | 2 |
| Squamish | Smoke Bluffs | 0.50 | 0.60 | 0.45 | 1 |
| The Exits | Exit 38 · Far Side | 0.90 | 0.50 | 0.40 | 1 |
| The Exits | Exit 32 · Little Si | 0.72 | 0.45 | 0.40 | 1 |
| The Exits | Deception Crags | 0.40 | 0.40 | 0.35 | 2 |
| Vantage | Sunshine Wall | 0.60 | 0.95 | 0.95 | 0 |
| Vantage | The Feathers | 0.55 | 0.85 | 0.95 | 0 |
| Vantage | Middle Coulee | 0.50 | 0.45 | 0.90 | 0 |

## Calibration guide (setting the numbers for a new crag)
- `drain`: basalt/rain-shadow ≈ 0.9–0.95; well-featured granite ≈ 0.35–0.6; seepy valley-floor granite ≈ 0.25–0.3; sandstone would be lower still (and don't climb it wet).
- `steep`: slab ≈ 0.15–0.25; vertical ≈ 0.45–0.6; overhung "climbs in the rain" ≈ 0.85–0.95.
- `sun`: deep shade ≈ 0.35–0.45; mixed ≈ 0.6–0.7; open south/southwest ≈ 0.85–0.95.
- `lagH`: roadside low-elevation ≈ 0–1; standard approach ≈ 2–3; high/alpine-ish ≈ 5+.

## Tick-list tiers (how conditions map to what to climb)
- **Marginal / just after rain / high dew point:** steep refuges and fast-draining slab — Cheeks, Exit 38 Far Side, Vantage basalt, Lookout Point slabs (dry fast, warm slow).
- **Decent day, sun's been on the wall:** steep-to-vertical crack lines that shed water — LTW central lines, Chief Grand Wall.
- **Prime, cold, stable, low dew point only:** the seepy slabs and friction testpieces — Great Northern Slab, the Apron, thin face and tips cracks.
- **Prime + committing:** higher/multipitch that lags after weather — Upper Town Wall proper, big Chief routes.
