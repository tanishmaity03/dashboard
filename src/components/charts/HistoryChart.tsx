import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { axis, gridStroke, legendStyle, RED, tip } from "../../lib/chartTheme";
import { gw } from "../../lib/format";

export type HistoryRow = { t: string; daily: number; mean30: number };

export function HistoryChart({ rows }: { rows: HistoryRow[] }) {
  return (
    <div className="h-36">
      <ResponsiveContainer>
        <LineChart data={rows}>
          <CartesianGrid stroke={gridStroke} vertical={false} />
          <XAxis dataKey="t" minTickGap={72} {...axis} />
          <YAxis
            tickFormatter={gw}
            unit=" GW"
            domain={["auto", "auto"]}
            width={63}
            {...axis}
          />
          <Tooltip
            {...tip}
            formatter={(v: number) => `${v.toLocaleString()} MW`}
          />
          <Legend iconType="plainline" wrapperStyle={legendStyle} />
          <Line
            dataKey="daily"
            name="Daily mean"
            stroke={RED.soft}
            dot={false}
            strokeWidth={1}
            isAnimationActive={false}
          />
          <Line
            dataKey="mean30"
            name="30-day mean"
            stroke={RED.strong}
            dot={false}
            strokeWidth={2}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
