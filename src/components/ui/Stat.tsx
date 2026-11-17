export function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div
      data-reveal
      className="rounded-ui border border-line bg-surface p-3 shadow-soft"
    >
      <p className="text-[13px] text-muted">{label}</p>
      <p className="mt-1 text-[27px] font-bold leading-4 tracking-tight">
        {value}
      </p>
      <p className="mt-1 text-[13px] text-muted">{sub}</p>
    </div>
  );
}
