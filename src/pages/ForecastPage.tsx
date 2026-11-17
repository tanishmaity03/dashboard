import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import {
  ForecastChart,
  type ForecastRow,
} from "../components/charts/ForecastChart";
import { HorizonToggle } from "../components/controls/HorizonToggle";
import { ModelPicker } from "../components/controls/ModelPicker";
import { WindowPicker } from "../components/controls/WindowPicker";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { DataTable } from "../components/ui/DataTable";
import { Empty } from "../components/ui/Empty";
import { useDash } from "../context/DashContext";
import { useWindow } from "../hooks/useWindow";
import { downloadCsv } from "../lib/csv";
import { bestKey, MODELS, type ModelKey } from "../lib/series";

export default function ForecastPage() {
  const d = useDash();
  const [h, setH] = useState(1);
  const s = d.forecast[String(h)];
  const peak = s.actual.indexOf(Math.max(...s.actual));
  const w = useWindow(s.t, s.t[Math.max(0, peak - 72)].slice(0, 10));
  const [selected, setSelected] = useState<ModelKey[]>([
    "actual",
    bestKey(d, 1),
    "previousDay",
  ]);

  const rows = useMemo(
    () =>
      s.t.slice(w.from, w.to).map((t, i) => ({
        t,
        ...(Object.fromEntries(
          MODELS.map((m) => [m.key, s[m.key][w.from + i]]),
        ) as Record<ModelKey, number>),
      })) as ForecastRow[],
    [s, w.from, w.to],
  );

  const errors = MODELS.filter(
    (m) => m.key !== "actual" && selected.includes(m.key),
  ).map((m) => {
    const e = rows.map((r) => Math.abs(r[m.key] - r.actual));
    return [
      m.label,
      (e.reduce((a, b) => a + b, 0) / e.length).toFixed(0),
      (
        (e.reduce((a, b, i) => a + b / rows[i].actual, 0) / e.length) *
        100
      ).toFixed(2),
    ];
  });

  return (
    <div className="space-y-3">
      <Card
        title="Hourly forecast against actual demand"
        hint={`Each line is a model's prediction for an hour, made ${h === 1 ? "1 hour" : "24 hours"} before it. These dates are the held-out test period, never used for training or tuning. The window opens on the highest-demand week.`}
        action={
          <Button
            variant="primary"
            icon={Download}
            onClick={() => downloadCsv(`forecast_h${h}_${w.start}.csv`, rows)}
          >
            Export window as CSV
          </Button>
        }
      >
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <HorizonToggle
            value={h}
            onChange={(v) => {
              setH(v);
              setSelected(["actual", bestKey(d, v), "previousDay"]);
            }}
          />
          <WindowPicker times={s.t} w={w} />
        </div>
        <div className="mb-2">
          <ModelPicker selected={selected} onChange={setSelected} />
        </div>
        <ForecastChart rows={rows} selected={selected} />
      </Card>
      <Card
        title="Error in this window"
        hint="Mean absolute error (MAE) is the average miss in megawatts. MAPE is the same miss as a percentage of actual demand."
      >
        {errors.length ? (
          <DataTable
            columns={["Model", "MAE (MW)", "MAPE (%)"]}
            rows={errors}
          />
        ) : (
          <Empty
            title="No forecast lines selected"
            body="Tick at least one model above to compare its error with the actual demand."
          />
        )}
      </Card>
    </div>
  );
}
