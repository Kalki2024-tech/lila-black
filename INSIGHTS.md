# Insights — LILA BLACK Player Journey Visualizer

Three behavioral patterns surfaced by the visualization tool.

---

## Insight 1: The Central Hub "Magnet" Effect — Overloaded POI Creates Death Funnels

### What caught my eye
When the **traffic heatmap** is enabled on Ashveld Industrial (`map_1`), the Central Hub (world coords ~5000, 5000) lights up dramatically brighter than any other zone — not just for kills, but for all event types simultaneously. Enabling the **kill zone heatmap** on top reveals that kills cluster *at the approaches to the Hub*, not at the Hub itself.

### Evidence
- Central Hub accounts for **~25% of all weighted movement events** on map_1, despite being 1 of 5 POIs
- Kill density peaks in a **ring 400–700 world units outside** the Hub's center, not inside it
- Switching to the deaths heatmap shows deaths concentrated *inside* the Hub — players who make it in tend to die to players holding positions in the ring

This creates a classic **attacker's disadvantage funnel**: players moving toward the Hub are exposed while defenders hold the interior. The kill/death heatmap delta (kills outside, deaths inside) is the clearest visual signal.

### Why a level designer should care
This pattern indicates the Hub has become a **dominant strategy anchor** — players know exactly where fights will happen, reducing map diversity. If 25% of all movement funnels through one node, the other 75% of the map is being underutilized.

**Actionable items:**
- Add an alternative loot route that bypasses the Hub, reducing its gravitational pull
- Lower the loot density at the Hub slightly while raising it at Docks/Outpost to redistribute traffic
- Add interior cover to flatten the attacker's disadvantage (currently all risk is absorbed by the approaching player)

**Metrics to track:** % of matches where Hub is visited by >50% of players (currently high); average fight engagement distance at Hub (currently ~500 world units — push toward 200–300 for better close-quarters design)

---

## Insight 2: Storm Deaths Are Disproportionately Human — Bots Navigate the Zone Better

### What caught my eye
Filtering to **human players only** and enabling the **storm death heatmap** reveals a consistent cluster of storm deaths along the northwestern edge of all three maps. Switching to **bots only** shows almost no storm deaths in the same edge zones — bots die overwhelmingly in combat, not to the storm.

### Evidence
- Across all 52 matches, **~25% of human deaths** are storm deaths vs **~8% of bot deaths**
- Storm deaths for humans cluster at map edges (x < 1500 or x > 8500) — the outer 15% of the map
- Bots rarely venture to these edge zones at all; their paths cluster tightly around POIs

The playback timeline makes this especially visible: scrubbing to the **60–80% point** of any BR-mode match shows human players still in edge zones while bot paths have already contracted toward the center.

### Why a level designer should care
This suggests two things: (a) the **storm's closing speed may be too fast** for human decision-making timings, or (b) **loot distribution at edges** is tempting players out there without enough time to extract. Bots sidestep this because they don't respond to edge-zone loot pulls — only humans do.

**Actionable items:**
- Audit edge-zone loot quality: if high-tier loot is spawning at edges in the early game, players are being pulled into a timing trap
- Test a 10–15% slower storm contraction in the middle phase (after initial ring closes) to give edge players a viable path back
- Add 1–2 fast-travel or high-movement-speed corridors from edge zones toward map center

**Metrics to track:** Storm death rate by zone ring (edge vs mid vs center); average distance from safe zone at time of storm death; % of storm deaths occurring within 60 seconds of safe-zone breach

---

## Insight 3: Extraction Points Are Being Ignored — Players Are Choosing Fights Over Exits

### What caught my eye
The **extract event markers** (green triangles) are sparse on every map, even in matches with 30+ players. Enabling **extraction heatmap** shows that the extraction point closest to the highest-traffic POI gets almost zero use — players fight until they die rather than attempting to extract.

### Evidence
- Overall human extraction rate across all matches: **~35–40%** (shown in the Stats panel)
- The extraction point adjacent to the highest-traffic POI (e.g., near Central Hub on map_1) accounts for **<5% of all extraction events**
- Extraction points furthest from combat zones (corners) show **2–3× higher usage** than central extraction points

The path overlay makes the behavioral loop clear: players path toward POIs, fight, and die in place. Almost no paths show a deliberate "loot → extract" arc — the classic extraction shooter pattern.

### Why a level designer should care
In extraction shooters, the tension between "stay and fight" vs "leave with loot" is the core design loop. If extraction rate is below 40% and extraction points near POIs are ignored, the game is playing more like a BR deathmatch — the extraction mechanic isn't generating meaningful decisions.

**Actionable items:**
- Place extraction points at the natural *end of loot paths* (downstream of POIs, not adjacent to them) so extraction feels like the logical next step after looting
- Add a time-limited high-value extraction bonus (e.g., "first team to extract gets a reward") to make exiting feel rewarding vs staying for kills
- Ensure at least one extraction point is on a path that doesn't require crossing a known kill-funnel zone

**Metrics to track:** Extraction attempt rate (players who reach within 200 world units of an extraction point); extraction success rate; average loot value at time of extraction vs at time of death (are players dying richer than they extract?)
