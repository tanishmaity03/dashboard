import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { axis, gridStroke, legendStyle, RED, tip } from "../../lib/chartTheme";
import { fmtT, gw } from "../../lib/format";

export type WarningRow = {
  t: string;
  actual: number;
  forecast: number;
  threshold: number;
  warning: number | null;
};

export function WarningChart({
  rows,
  modelName,
}: {
  rows: WarningRow[];
  modelName: string;
}) {
  return (
    <div className="h-40">
      <ResponsiveContainer>
        <ComposedChart data={rows}>
          <CartesianGrid stroke={gridStroke} vertical={false} />
          <XAxis dataKey="t" tickFormatter={fmtT} minTickGap={54} {...axis} />
          <YAxis
            tickFormatter={gw}
            unit=" GW"
            domain={["auto", "auto"]}
            width={63}
            {...axis}
          />
          <Tooltip
            {...tip}
            formatter={(v: number) =>
              v == null ? "none" : `${v.toLocaleString()} MW`
            }
            labelFormatter={fmtT}
          />
          <Legend iconType="plainline" wrapperStyle={legendStyle} />
          <Line
            dataKey="actual"
            name="Actual demand"
            stroke={RED.darkest}
            dot={false}
            strokeWidth={1.8}
            isAnimationActive={false}
          />
          <Line
            dataKey="forecast"
            name={`${modelName} forecast`}
            stroke={RED.mid}
            dot={false}
            strokeWidth={1.2}
            isAnimationActive={false}
          />
          <Line
            dataKey="threshold"
            name="Peak threshold"
            stroke={RED.dark}
            strokeDasharray="6 4"
            dot={false}
            strokeWidth={1.2}
            isAnimationActive={false}
          />
          <Scatter
            dataKey="warning"
            name="Warning issued"
            fill={RED.main}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
