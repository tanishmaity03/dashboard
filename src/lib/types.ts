export type Series = {
  t: string[];
  actual: number[];
  persistence: number[];
  previousDay: number[];
  linear: number[];
  rf: number[];
  gb: number[];
  thr: number[];
  warn: number[];
  high: number[];
};
export type FinalRow = {
  horizon_h: number;
  model: string;
  "MAE (MW)": number;
  "RMSE (MW)": number;
  "MAPE (%)": number;
  R2: number;
  "Skill vs best baseline (%)": number;
};
export type PerfRow = {
  horizon_h: number;
  method: string;
  margin: number;
  true_high_hours: number;
  base_rate_pct: number;
  precision: number;
  recall: number;
  F1: number;
  false_alarm_rate: number;
  true_episodes: number;
  episode_recall: number;
  episode_precision: number;
};
export type BestParams = {
  best_model: string;
  cv_mae_pct: Record<string, number>;
} & Record<string, unknown>;
export type Dash = {
  best: Record<string, BestParams>;
  final: FinalRow[];
  perf: PerfRow[];
  forecast: Record<string, Series>;
  history: { t: string[] } & Record<string, number[]>;
  heat: number[][];
};
