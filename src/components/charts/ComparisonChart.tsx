import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { axis, gridStroke, legendStyle, RED, tip } from "../../lib/chartTheme";

export type BarRow = { model: string; h1?: number; h24?: number };

export function ComparisonChart({ rows }: { rows: BarRow[] }) {
  return (
    <div className="h-40">
      <ResponsiveContainer>
        <BarChart data={rows} barGap={4}>
          <CartesianGrid stroke={gridStroke} vertical={false} />
          <XAxis dataKey="model" interval={0} {...axis} />
          <YAxis unit=" MW" width={72} {...axis} />
          <Tooltip
            {...tip}
            formatter={(v: number) => `${v.toFixed(0)} MW`}
            cursor={{ fill: "#fef2f2" }}
          />
          <Legend iconType="square" wrapperStyle={legendStyle} />
          <Bar
            dataKey="h1"
            name="1 hour ahead"
            fill={RED.strong}
            radius={[4.5, 4.5, 0, 0]}
            animationDuration={250}
            animationEasing="ease-out"
          />
          <Bar
            dataKey="h24"
            name="24 hours ahead"
            fill={RED.soft}
            radius={[4.5, 4.5, 0, 0]}
            animationDuration={250}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
