import type { Window } from "../../hooks/useWindow";
import { Field, fieldCls } from "../ui/Field";

export function WindowPicker({ times, w }: { times: string[]; w: Window }) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      <Field label="From">
        <input
          type="date"
          aria-label="Window start date"
          className={fieldCls}
          min={times[0].slice(0, 10)}
          max={times.at(-1)!.slice(0, 10)}
          value={w.start}
          onChange={(e) => e.target.value && w.setStart(e.target.value)}
        />
      </Field>
      <Field label="Show">
        <select
          aria-label="Window length"
          className={fieldCls}
          value={w.days}
          onChange={(e) => w.setDays(+e.target.value)}
        >
          {[3, 7, 14, 30, 60].map((n) => (
            <option key={n} value={n}>
              {n} days
            </option>
          ))}
        </select>
      </Field>
    </div>
  );
}
