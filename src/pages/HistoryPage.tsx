import { useMemo, useState } from "react";
import { Heatmap } from "../components/charts/Heatmap";
import { HistoryChart } from "../components/charts/HistoryChart";
import { Card } from "../components/ui/Card";
import { fieldCls } from "../components/ui/Field";
import { useDash } from "../context/DashContext";

const REGIONS = [
  "national",
  "northern",
  "western",
  "eastern",
  "southern",
  "north_eastern",
];

export default function HistoryPage() {
  const d = useDash();
  const [region, setRegion] = useState("national");
  const rows = useMemo(
    () =>
      d.history.t.map((t, i) => {
        const sl = d.history[region].slice(Math.max(0, i - 15), i + 16);
        return {
          t,
          daily: d.history[region][i],
          mean30: Math.round(sl.reduce((x, y) => x + y, 0) / sl.length),
        };
      }),
    [d, region],
  );

  return (
    <div className="space-y-3">
      <Card
        title="Daily demand since 2019"
        hint="Demand grows about 5% a year, which is why a fixed peak threshold would fail and the warnings use a rolling one."
      >
        <div className="mb-2">
          <select
            aria-label="Region"
            className={fieldCls}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r === "national"
                  ? "All India"
                  : `${r.replace("_", "-")} region`}
              </option>
            ))}
          </select>
        </div>
        <HistoryChart rows={rows} />
      </Card>
      <Card
        title="When India uses power"
        hint="All-India average demand by hour of day (rows) and month (columns). Darker is higher. Summer afternoons and evenings drive the peaks."
      >
        <Heatmap grid={d.heat} />
      </Card>
    </div>
  );
}
