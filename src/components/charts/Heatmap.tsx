import { RED } from "../../lib/chartTheme";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Hour of day (rows) by month (columns). Darker red = higher demand. */
export function Heatmap({ grid }: { grid: number[][] }) {
  const flat = grid.flat(),
    lo = Math.min(...flat),
    hi = Math.max(...flat);
  return (
    <div className="overflow-x-auto">
      <div
        className="grid min-w-[576px]"
        style={{ gridTemplateColumns: "27px repeat(12, 1fr)" }}
      >
        <span />
        {MONTHS.map((m) => (
          <span key={m} className="text-center text-[11px] text-muted">
            {m}
          </span>
        ))}
        {grid.map((row, h) => [
          <span key={`h${h}`} className="text-[11px] leading-2 text-muted">
            {h}h
          </span>,
          ...row.map((v, m) => (
            <div
              key={`${h}-${m}`}
              title={`${h}:00 in ${MONTHS[m]}: ${v.toLocaleString()} MW`}
              className="h-2 border border-surface"
              style={{
                background: `color-mix(in srgb, ${RED.dark} ${Math.round(((v - lo) / (hi - lo)) * 100)}%, ${RED.wash})`,
              }}
            />
          )),
        ])}
      </div>
    </div>
  );
}
