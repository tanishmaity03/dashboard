import { HORIZONS } from "../../constants/method";
import { Segmented } from "../ui/Segmented";

export function HorizonToggle({
  value,
  onChange,
}: {
  value: number;
  onChange: (h: number) => void;
}) {
  return (
    <Segmented
      label="Forecast horizon"
      value={value}
      options={HORIZONS}
      onChange={(v) => onChange(Number(v))}
    />
  );
}
