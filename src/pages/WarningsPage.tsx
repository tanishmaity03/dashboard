import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import {
  WarningChart,
  type WarningRow,
} from "../components/charts/WarningChart";
import { HorizonToggle } from "../components/controls/HorizonToggle";
import { WindowPicker } from "../components/controls/WindowPicker";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { DataTable } from "../components/ui/DataTable";
import { Stat } from "../components/ui/Stat";
import { useDash } from "../context/DashContext";
import { useWindow } from "../hooks/useWindow";
import { downloadCsv } from "../lib/csv";
import { pct } from "../lib/format";
import { bestKey } from "../lib/series";

export default function WarningsPage() {
  const d = useDash();
  const [h, setH] = useState(1);
  const s = d.forecast[String(h)];
  const w = useWindow(s.t, "2023-06-01");
  const key = bestKey(d, h),
    best = d.best[String(h)].best_model;
  const perf = d.perf.filter((r) => r.horizon_h === h);
  const model = perf.find((r) => r.method === best)!,
    base = perf.find((r) => r.method.startsWith("Previous"))!;

  const rows = useMemo<WarningRow[]>(
    () =>
      s.t.slice(w.from, w.to).map((t, i) => {
        const j = w.from + i;
        return {
          t,
          actual: s.actual[j],
          forecast: s[key][j],
          threshold: s.thr[j],
          warning: s.warn[j] ? s[key][j] : null,
        };
      }),
    [s, key, w.from, w.to],
  );

  const sub = (r: typeof model) =>
    `${pct(r.precision)} of warnings were right. ${pct(r.episode_recall)} of ${r.true_episodes} peak episodes detected.`;
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Stat
          label={`${best}, ${h} h ahead`}
          value={`${pct(model.recall)} of peaks caught`}
          sub={sub(model)}
        />
        <Stat
          label="Previous-day baseline"
          value={`${pct(base.recall)} of peaks caught`}
          sub={sub(base)}
        />
      </div>
      <Card
        title="Forecast, threshold and warnings"
        hint="A peak hour is demand above the 95th percentile of the previous 365 days. A warning is raised when the forecast crosses that line. Dots mark hours where a warning was issued."
        action={
          <Button
            variant="primary"
            icon={Download}
            onClick={() => downloadCsv(`warnings_h${h}_${w.start}.csv`, rows)}
          >
            Export window as CSV
          </Button>
        }
      >
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <HorizonToggle value={h} onChange={setH} />
          <WindowPicker times={s.t} w={w} />
        </div>
        <WarningChart rows={rows} modelName={best} />
      </Card>
      <Card
        title="Warning quality on the test set"
        hint="Precision: share of warnings that were real peaks. Recall: share of real peak hours that were warned. An episode is a run of peak hours at most 6 hours apart."
      >
        <DataTable
          columns={[
            "Method",
            "Margin",
            "Peak hours",
            "Precision",
            "Recall",
            "F1",
            "False alarms",
            "Episodes",
            "Episode recall",
          ]}
          rows={perf.map((r) => [
            r.method,
            pct(r.margin),
            r.true_high_hours,
            r.precision.toFixed(3),
            r.recall.toFixed(3),
            r.F1.toFixed(3),
            pct(r.false_alarm_rate, 1),
            r.true_episodes,
            r.episode_recall.toFixed(3),
          ])}
        />
      </Card>
    </div>
  );
}
