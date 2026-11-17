import type { Dash } from "./types";

/* Data is drawn in reds. Series are also told apart by weight and dash pattern. */
export const MODELS = [
  {
    key: "actual",
    label: "Actual demand",
    color: "#3f0d0d",
    width: 2,
    dash: "",
  },
  {
    key: "gb",
    label: "Gradient Boosting",
    color: "#dc2626",
    width: 1.6,
    dash: "",
  },
  {
    key: "rf",
    label: "Random Forest",
    color: "#b91c1c",
    width: 1.6,
    dash: "6 3",
  },
  {
    key: "linear",
    label: "Linear Regression",
    color: "#fb7185",
    width: 1.4,
    dash: "2 3",
  },
  {
    key: "previousDay",
    label: "Previous-day baseline",
    color: "#f87171",
    width: 1.4,
    dash: "9 3 2 3",
  },
  {
    key: "persistence",
    label: "Persistence baseline",
    color: "#fca5a5",
    width: 1.4,
    dash: "",
  },
] as const;
export type ModelKey = (typeof MODELS)[number]["key"];

export const bestKey = (d: Dash, h: number): ModelKey =>
  d.best[String(h)].best_model === "Gradient Boosting" ? "gb" : "rf";
