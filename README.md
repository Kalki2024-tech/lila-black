# LILA BLACK — Player Journey Visualizer

A web-based telemetry visualization tool for the LILA BLACK level design team.
Explore player movement, combat events, heatmaps, and match playback across all maps.

**Live Demo:** `https://lila-viz.vercel.app` *(deploy URL after Vercel setup)*

---

## Features

- 🗺️ **Three maps** — Ashveld Industrial, Kaval Ruins, Veltros Outlands
- 👤 **Human vs bot** visual distinction (paths, markers, filters)
- 📍 **Event markers** — kills, deaths, loot pickups, storm deaths, extractions
- 🌡️ **Heatmap overlays** — kill zones, death zones, high-traffic areas
- 🎮 **Timeline playback** — play/pause/scrub with 1×/2×/4×/8× speed
- 🔍 **Filters** — by map, date, and individual match
- 📊 **Stats panel** — live combat/objective/movement stats
- 🖱️ **Hover tooltips** — click any event marker for full details

---

## Running Locally

### Prerequisites
- Node.js 18+
- npm 9+

### Setup

```bash
git clone https://github.com/YOUR_USERNAME/lila-viz
cd lila-viz
npm install
npm run dev
```

Open `http://localhost:5173`

### Regenerating Simulated Data

```bash
node scripts/generateData.js
```

### Regenerating Minimap Images

```bash
pip install Pillow
python3 scripts/generateMaps.py
```

---

## Deploying to Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deploys on push.

---

## Project Structure

```
lila-viz/
├── public/minimaps/          # Map PNG images (generated)
├── scripts/
│   ├── generateData.js       # Simulated telemetry data generator
│   └── generateMaps.py       # Minimap image generator (Python/Pillow)
├── src/
│   ├── components/
│   │   ├── MapCanvas.jsx     # Core canvas renderer
│   │   ├── FilterPanel.jsx   # Map/date/match filters
│   │   ├── Timeline.jsx      # Playback controls
│   │   ├── EventLegend.jsx   # Layer toggles + heatmap controls
│   │   ├── StatsPanel.jsx    # Match statistics
│   │   └── Tooltip.jsx       # Hover event details
│   ├── data/simulated/       # Generated JSON datasets
│   ├── store/useStore.js     # Zustand global state
│   ├── utils/
│   │   ├── coordMapper.js    # World ↔ canvas coordinate mapping
│   │   └── dataLoader.js     # Data access helpers
│   └── App.jsx
├── ARCHITECTURE.md           # Tech + data flow documentation
└── INSIGHTS.md               # Three level design insights from the data
```

---

## Swapping in Real Data

When the actual `player_data.zip` is available:

1. Parse the parquet files using `hyparquet` or Python `pandas`
2. Transform to match the event schema in `src/data/simulated/events.json`
3. Replace the JSON files in `src/data/simulated/`
4. Update `WORLD_SIZE` in `src/utils/coordMapper.js` if the coordinate bounds differ
5. Replace `public/minimaps/` with the actual minimap images
6. Adjust `worldToCanvas` offset if the minimap has padding around the play area

---

## Data Schema

```jsonc
// Event
{
  "event_id": "ev_000001",
  "match_id": "match_0001",
  "map_id": "map_1",
  "date": "2025-01-01",
  "match_type": "extraction",       // "extraction" | "br"
  "timestamp_ms": 45200,            // absolute ms within the day
  "player_id": "p_0001_001",
  "is_bot": false,
  "team_id": "team_0",
  "event_type": "kill",             // kill|death|loot|storm_death|extract|move
  "x": 4821.3,                      // world coords 0–10000
  "y": 5102.7,
  "killer_id": "p_0001_005"         // null unless kill/death
}
```

---

## License

Built for the LILA Games APM Written Test assignment.
