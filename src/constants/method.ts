export const HORIZONS = [
  { v: 1, l: "1 hour ahead" },
  { v: 24, l: "24 hours ahead" },
];

export const PIPELINE: {
  stage: string;
  what: string;
  files: { label: string; path: string }[];
}[] = [
  {
    stage: "Fetch weather",
    what: "Hourly weather for five regional cities from Open-Meteo, joined to demand.",
    files: [{ label: "src/fetch_weather.py", path: "src/fetch_weather.py" }],
  },
  {
    stage: "Explore",
    what: "Seasonality, weather correlation, stationarity.",
    files: [{ label: "03_eda.ipynb", path: "notebooks/03_eda.ipynb" }],
  },
  {
    stage: "Features",
    what: "Lags, rolling means, calendar and weather features built only from data known at forecast time.",
    files: [
      { label: "src/features.py", path: "src/features.py" },
      {
        label: "04_feature_engineering.ipynb",
        path: "notebooks/04_feature_engineering.ipynb",
      },
    ],
  },
  {
    stage: "Splits and metrics",
    what: "Chronological train 2019-21, validation 2022, test 2023-24.",
    files: [{ label: "src/evaluate.py", path: "src/evaluate.py" }],
  },
  {
    stage: "Tune and test",
    what: "Time-series cross-validation on 2019-22, then a single run on the test set.",
    files: [
      {
        label: "06_tuning_and_final_evaluation.ipynb",
        path: "notebooks/06_tuning_and_final_evaluation.ipynb",
      },
    ],
  },
  {
    stage: "Peak warnings",
    what: "Rolling threshold, validation-chosen margin, hour and episode metrics.",
    files: [
      { label: "src/peaks.py", path: "src/peaks.py" },
      {
        label: "07_peak_demand_warnings.ipynb",
        path: "notebooks/07_peak_demand_warnings.ipynb",
      },
    ],
  },
];

export const VERIFY_STEPS = `pip install -r requirements.txt
python -m unittest discover -s tests -t .      # leakage, alignment and warning-metric tests
# run notebooks 01 to 07 in order, then refresh this dashboard:
python web/scripts/export_data.py
cd web && npm install && npm run dev`;

export const WARNING_SNIPPET = `# src/peaks.py: a warning is raised when the forecast crosses the threshold, minus a safety margin
def sweep(actual, pred, thr, margins=MARGINS):
    true_high = np.asarray(actual) > np.asarray(thr)
    return pd.DataFrame([{"margin": m, **warning_metrics(true_high, np.asarray(pred) > np.asarray(thr) * (1 - m))}
                         for m in margins])

# notebooks/07: the threshold only looks backwards, so it is known when the forecast is made
thr_origin = demand.rolling(24 * 365).quantile(0.95)`;

export const LIMITS = [
  "Weather at the target hour is actual weather standing in for a weather forecast, so weather gains are optimistic.",
  "The peak rate is about 12.7% rather than 5% because the trailing 365-day threshold lags demand growth.",
  "The threshold definition and the 6-hour episode gap are modelling choices. Results cover one grid and about 16 test months.",
];
