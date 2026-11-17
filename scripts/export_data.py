"""Export results/ + processed data into compact JSON for the React dashboard.
Run from the repo root:  python web/scripts/export_data.py"""
import json
from pathlib import Path
import pandas as pd

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "web" / "public" / "data"; OUT.mkdir(parents=True, exist_ok=True)
R = ROOT / "results"
cols = {"actual": "actual_mw", "persistence": "persistence_mw", "previousDay": "previous_day_mw",
        "linear": "linear_regression_mw", "rf": "random_forest_mw", "gb": "gradient_boosting_mw"}

data = {"best": json.load(open(R / "tables" / "best_params.json")),
        "final": pd.read_csv(R / "tables" / "final_test_results.csv").to_dict("records"),
        "perf": pd.read_csv(R / "tables" / "peak_warning_performance_test.csv").to_dict("records"),
        "forecast": {}}
for h in (1, 24):
    p = pd.read_csv(R / f"predictions_test_h{h}.csv", parse_dates=["target_time"])
    w = pd.read_csv(R / f"peak_warnings_test_h{h}.csv", parse_dates=["target_time"])
    d = {"t": p["target_time"].dt.strftime("%Y-%m-%dT%H:%M").tolist()}
    d.update({k: p[c].round(0).astype(int).tolist() for k, c in cols.items()})
    d["thr"] = w["threshold_mw"].round(0).astype(int).tolist()
    d["warn"] = w["warning"].astype(int).tolist()
    d["high"] = w["true_high"].astype(int).tolist()
    data["forecast"][str(h)] = d

hist = pd.read_csv(ROOT / "data" / "processed" / "india_demand_weather.csv", parse_dates=["datetime"]).set_index("datetime")
regions = ["national", "northern", "western", "eastern", "southern", "north_eastern"]
daily = hist[regions].resample("D").mean().round(0)
data["history"] = {"t": daily.index.strftime("%Y-%m-%d").tolist(), **{r: daily[r].astype(int).tolist() for r in regions}}
heat = hist.assign(hour=hist.index.hour, month=hist.index.month).pivot_table(index="hour", columns="month", values="national", aggfunc="mean").round(0)
data["heat"] = heat.astype(int).values.tolist()
json.dump(data, open(OUT / "dashboard.json", "w"), separators=(",", ":"))
print("wrote", OUT / "dashboard.json", round((OUT / "dashboard.json").stat().st_size / 1e6, 2), "MB")
