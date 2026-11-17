import { Download } from "lucide-react";
import { ComparisonChart } from "../components/charts/ComparisonChart";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { DataTable } from "../components/ui/DataTable";
import { Stat } from "../components/ui/Stat";
import { useDash } from "../context/DashContext";
import { downloadCsv } from "../lib/csv";
import { nice } from "../lib/format";

export default function ComparePage() {
  const d = useDash();
  const models = [...new Set(d.final.map((r) => r.model))];
  const get = (m: string, h: number) => d.final.find((r) => r.model === m && r.horizon_h === h);
  const bars = models.map((m) => ({ model: nice(m), h1: get(m, 1)?.["MAE (MW)"], h24: get(m, 24)?.["MAE (MW)"] }));
  const top = (h: number) => d.final.filter((r) => r.horizon_h === h).sort((a, b) => a["MAE (MW)"] - b["MAE (MW)"])[0];

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        {[1, 24].map((h) => {
          const t = top(h), p = get("Baseline: persistence", h)!, gain = (1 - t["MAE (MW)"] / p["MAE (MW)"]) * 100;
          return <Stat key={h} label={`Best model, ${h} hour${h > 1 ? "s" : ""} ahead`} value={`${t["MAPE (%)"].toFixed(2)}% error`}
            sub={`${nice(t.model)}. MAE ${t["MAE (MW)"].toFixed(0)} MW, ${gain > 0 ? `${gain.toFixed(0)}% lower than` : `${Math.abs(gain).toFixed(0)}% higher than`} persistence.`} />;
        })}
      </div>
      <Card title="Test-set error by model" hint="Lower is better. Persistence repeats the latest hour, and the previous-day baseline repeats the same hour yesterday. A model is only useful if it beats both."
        action={<Button variant="primary" icon={Download} onClick={() => downloadCsv("final_test_results.csv", d.final)}>Export results as CSV</Button>}>
        <ComparisonChart rows={bars} />
      </Card>
      <Card title="All test metrics" hint="Test period: Jan 2023 to Apr 2024. Skill is the MAE reduction against the better of the two baselines.">
        <DataTable columns={["Horizon", "Model", "MAE (MW)", "RMSE (MW)", "MAPE (%)", "R²", "Skill (%)"]}
          rows={d.final.map((r) => [`${r.horizon_h} h`, nice(r.model), r["MAE (MW)"].toFixed(0), r["RMSE (MW)"].toFixed(0), r["MAPE (%)"].toFixed(2), r.R2.toFixed(3), r["Skill vs best baseline (%)"].toFixed(1)])} />
      </Card>
    </div>
  );
}
