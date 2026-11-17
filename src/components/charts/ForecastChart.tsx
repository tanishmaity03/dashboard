import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { axis, gridStroke, tip } from "../../lib/chartTheme";
import { fmtT, gw } from "../../lib/format";
import { MODELS, type ModelKey } from "../../lib/series";

export type ForecastRow = { t: string } & Record<ModelKey, number>;

export function ForecastChart({
  rows,
  selected,
}: {
  rows: ForecastRow[];
  selected: ModelKey[];
}) {
  return (
    <div className="h-40">
      <ResponsiveContainer>
        <LineChart data={rows}>
          <CartesianGrid stroke={gridStroke} vertical={false} />
          <XAxis dataKey="t" tickFormatter={fmtT} minTickGap={54} {...axis} />
          <YAxis
            tickFormatter={gw}
            domain={["auto", "auto"]}
            unit=" GW"
            width={63}
            {...axis}
          />
          <Tooltip
            {...tip}
            formatter={(v: number) => `${v.toLocaleString()} MW`}
            labelFormatter={fmtT}
          />
          {MODELS.filter((m) => selected.includes(m.key)).map((m) => (
            <Line
              key={m.key}
              dataKey={m.key}
              name={m.label}
              stroke={m.color}
              strokeWidth={m.width}
              strokeDasharray={m.dash}
              dot={false}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
