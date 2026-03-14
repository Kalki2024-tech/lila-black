# Architecture — LILA BLACK Player Journey Visualizer

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React 18 + Vite | Fast dev builds, HMR, trivial Vercel deploy |
| Rendering | HTML5 Canvas (2 stacked) | Paths + events on one canvas, heatmap blend on a second |
| State | Zustand | Zero-boilerplate store; selectors avoid re-renders |
| Styling | Tailwind CSS + CSS variables | Utility classes for layout; variables for the dark gaming theme |
| Data | JSON (generated from parquet schema) | Browser-native, zero extra parsing libraries |
| Hosting | Vercel | Free tier, auto-deploy from GitHub, global CDN |

## Data Flow

```
Raw parquet telemetry
        │
        ▼
scripts/generateData.js   ← Node.js, runs once
  • Simulates 52 matches × 3 maps × 5 days
  • Schema mirrors real parquet: event_id, match_id, map_id,
    date, player_id, is_bot, event_type, x, y, timestamp_ms
  • Outputs → src/data/simulated/{matches,events,maps}.json
        │
        ▼
Vite build (import JSON directly)
  • JSON bundled as ES module — no fetch, no loading spinner
  • Total bundle: ~2 MB (97k events)
        │
        ▼
useStore.js (Zustand)
  • Holds: allMatches, allEvents, mapsConfig
  • Derived selectors: getMatchEvents(), getFilteredEvents()
  • Playback state: isPlaying, playbackTime, playbackSpeed
        │
        ▼
MapCanvas.jsx
  • Layer 1 (img tag): minimap PNG background
  • Layer 2 (heatCanvasRef): heatmap blobs, mixBlendMode=screen
  • Layer 3 (canvasRef): player paths, event markers, POI labels
  • requestAnimationFrame loop drives playback tick
        │
        ▼
User sees live map with overlays
```

## Coordinate Mapping

World space is **0–10000 × 0–10000** (defined in the data schema).  
Canvas size is **dynamic** (responsive, max 700px).

```js
cx = (worldX / 10000) * canvasWidth
cy = (worldY / 10000) * canvasHeight
```

This is a simple linear scale assuming the minimap image covers the full world extent with no padding. If the real data uses a different origin or padding, adjust `WORLD_SIZE` and add an offset in `coordMapper.js`.

## Heatmap Approach

Rather than a library (heatmap.js had ES module issues), the heatmap is drawn directly onto a second canvas using **radial gradients per point**, then composited with `mixBlendMode: screen`. This keeps the bundle small and allows custom color ramps per mode (kills = red, deaths = orange, traffic = cyan→purple).

## Assumptions

| Ambiguity | Decision |
|---|---|
| No real parquet data provided | Simulated data mirrors documented schema |
| World coordinate bounds | Assumed 0–10000 × 0–10000 square |
| Minimap pixel mapping | Linear scale, no padding offset |
| Bot detection | `is_bot` field in event schema |
| Storm mechanic | Mixed BR + extraction: storm deaths near map edges |
| Match start time | Stored as `start_time_ms`; playback offsets from this |

## Trade-offs

| Decision | Trade-off |
|---|---|
| JSON instead of parquet in browser | Simpler (no WASM parquet parser), but larger bundle |
| Canvas over SVG/WebGL | Good perf for ~97k events; WebGL would be needed at 10M+ |
| Static JSON import vs fetch | No loading state needed; cost is slightly larger initial JS chunk |
| Single-file components | Easier to read; would split hooks out with more time |

## What I'd Do With More Time

1. **Real parquet parsing** — use `hyparquet` (WASM) to load `.parquet` files directly in the browser, removing the pre-processing step
2. **Spatial indexing** — QuadTree for O(log n) hover hit-testing instead of O(n) linear scan
3. **WebGL heatmap** — `deck.gl` HeatmapLayer for millions of events without frame drops
4. **Replay trail fading** — recent path segments brighter, older ones fading out
5. **Squad overlay** — color paths by team_id to show squad movement patterns
6. **Export** — PNG/video export of the map state for async sharing with designers
