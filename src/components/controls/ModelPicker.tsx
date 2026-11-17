import { MODELS, type ModelKey } from "../../lib/series";
import { SeriesSwatch } from "../charts/SeriesSwatch";

export function ModelPicker({
  selected,
  onChange,
}: {
  selected: ModelKey[];
  onChange: (s: ModelKey[]) => void;
}) {
  return (
    <div
      className="flex flex-wrap gap-1"
      role="group"
      aria-label="Models to show"
    >
      {MODELS.map((m) => (
        <label
          key={m.key}
          className="flex h-3 cursor-pointer items-center gap-1 rounded-ui border border-line px-1 text-[13px] transition-colors duration-150 ease-out hover:bg-subtle"
        >
          <input
            type="checkbox"
            className="accent-ink"
            checked={selected.includes(m.key)}
            disabled={m.key === "actual"}
            onChange={() =>
              onChange(
                selected.includes(m.key)
                  ? selected.filter((k) => k !== m.key)
                  : [...selected, m.key],
              )
            }
          />
          <SeriesSwatch k={m.key} />
          {m.label}
        </label>
      ))}
    </div>
  );
}
