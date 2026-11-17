type Option<T> = { v: T; l: string };
type Props<T> = {
  value: T;
  options: Option<T>[];
  onChange: (v: T) => void;
  label: string;
};

export function Segmented<T extends string | number>({
  value,
  options,
  onChange,
  label,
}: Props<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex rounded-ui border border-line bg-surface p-0.5"
    >
      {options.map((o) => (
        <button
          key={String(o.v)}
          type="button"
          aria-pressed={value === o.v}
          onClick={() => onChange(o.v)}
          className={`h-3 rounded-[4.5px] px-2 text-[13px] font-semibold transition-colors duration-150 ease-out ${value === o.v ? "bg-subtle text-ink" : "text-muted hover:text-ink"}`}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}
