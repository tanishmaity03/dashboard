export const fmtT = (s: string) => s.slice(5, 16).replace("T", " ");
export const gw = (v: number) => `${v / 1000}`;
export const pct = (v: number, d = 0) => `${(v * 100).toFixed(d)}%`;
export const nice = (m: string) =>
  m
    .replace("Baseline: ", "")
    .replace("_", " ")
    .replace(/^./, (c) => c.toUpperCase()) +
  (m.startsWith("Baseline") ? " baseline" : "");
