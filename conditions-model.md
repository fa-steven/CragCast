# CragCast Conditions Model

The scoring spec. Everything here matches the pure functions in `index.html`. If you change the code, change this doc, and re-run the sanity cases at the bottom.

## Philosophy
A crag is climbable when it's **dry** and has **friction**. Those are separate axes:
- **Dryness** — has water shed/drained, or is the rock wet or seeping? Governed by recent rain, rock drainage, and steepness.
- **Friction** — even bone-dry rock climbs poorly in warm, humid air. Governed by temperature, dew-point spread, and absolute dew point.

A wall can be dry and still score low if the air is warm and muggy (friction gone), and can be cold-and-crisp yet score low if it's still seeping. The model multiplies a friction/comfort core by a wetness gate, then applies a sun term.

## Inputs (per crag, per time sample)
Weather (shared by all crags in an area): `temp` (°F), `dew` (°F), `wind` (mph), `precipNow` (in/hr), `cloud` (%), plus `seepLoad` (decayed recent-rain load, see below).
Crag metadata (what differentiates crags at the same location):
- `steep` 0–1 — overhung/steep sheds water and stays dry (1 = rain refuge).
- `sun` 0–1 — sun exposure during climbing hours.
- `drain` 0–1 — how fast the rock sheds water (seepy granite ≈ 0.28, basalt ≈ 0.95).
- `lagH` — hours the wall lags after weather (elevation/approach); metadata for future use.

## Components (all temps °F internally)
Piecewise-linear interpolation `lerp(x, points)` throughout.

**Temperature (friction band)** — peaks 38–52°F, falls off toward numb/verglas cold and sweaty heat:
`[[22,.12],[32,.55],[38,1],[52,1],[60,.7],[68,.4],[78,.15],[88,.05]]`

**Dew-point spread** — `spread = temp − dew`. Wider = drier air = better:
`[[2,.12],[5,.34],[8,.58],[12,.8],[18,.95],[22,1]]`
…multiplied by an absolute-dew-point penalty (muggy air is bad even at a decent spread):
`dewPen = lerp(dew, [[55,1],[60,.92],[65,.72],[70,.48],[76,.28],[82,.15]])`

**Wind** — a light breeze is ideal (dries sweat/rock); calm is slightly worse, strong is bad (comfort, rope, cold):
`[[0,.82],[4,1],[10,1],[15,.86],[22,.62],[30,.38],[42,.16]]`

**Wetness gate** (`0` soaked → `1` bone dry):
- If actively raining (`precipNow > 0.004`): `min(0.55, 0.06 + 0.5·steep + 0.12·drain)` — steep/overhung crags stay partly climbable.
- Else: `eff = seepLoad · (1 − drain·0.85) · (1 − steep·0.6)`, then
  `lerp(eff, [[0,1],[0.05,.92],[0.15,.78],[0.35,.55],[0.6,.4],[1,.26],[1.6,.16]])`.

**Sun adjustment** (added after the gate) — `clear = 1 − cloud/100`:
- Cool + damp (`temp < 56` and `spread < 10`): `+0.12·sun·clear·(1 − spread/10)` — sun burns off condensation.
- Hot (`temp > 68`): `−0.16·sun·clear·min(1, (temp−68)/15)` — sun bakes the rock, friction fades.

## Combine
```
base   = 0.46·tempScore + 0.32·spreadScore + 0.22·windScore
base  *= wetnessGate
score  = clamp(base + sunAdjust, 0, 1) · 100
```

## Buckets
`wet < 0.24 → WET` (override) · `≥80 PRIME` · `≥64 GOOD` · `≥47 MARGINAL` · `≥30 POOR` · else `WET`.

## Seepage load (the "days before" memory)
`seepLoadAt(hourly, t)` sums hourly precip in the 120 h before `t`, each weighted by `exp(−Δt / 42h)`. So recent rain dominates and anything older than ~5 days has effectively dried. This same value drives both the live seepage gate and the archive dryness curve.

- Dashboard fetches `past_days=5` (enough for the 120 h window).
- Archive fetches `past_days=31`; its dryness curve samples `seepLoadAt` every 6 h against a **neutral reference crag** (`drain 0.4, steep 0.25`) so the line is crag-independent, while per-crag % chips use each crag's real `drain`/`steep`.

## Sanity cases (must hold after any tuning)
Ordering matters more than exact numbers:
- **Cold, dry, clear (45°F / dew 25 / 6 mph):** PRIME, ~99.
- **Active rain:** steep Cheeks (~40) **must beat** Lower Town Wall slab (~23).
- **Two days post-rain:** Vantage basalt (~PRIME) **must beat** seepy granite slab (~MARGINAL).
- **Hot sunny basalt (78°F):** capped mid — heat/bake penalty, not PRIME despite being dry.
- **Muggy warm slab (68°F / dew 62):** MARGINAL at best — tight spread kills friction even when dry.
- **Cool damp AM, sun on a south wall (52°F / dew 49, clear):** lifted by the sun term vs. the same wall shaded.

## Known simplifications / good next steps
- Decay is one global 42 h constant. Deep-seep crags (Index) arguably deserve a longer memory than fast-draining basalt — consider a per-rock decay.
- Drying rate is time-based only. A dew-point-spread or evapotranspiration term would make drying respond to how warm/thirsty the air actually was.
- `lagH` is stored but not yet applied; could delay a wall's forecast recovery after a system.
- Aspect is a scalar `sun`; a true solar-geometry term (azimuth × time of day × season) would time the condensation burn-off per wall.
