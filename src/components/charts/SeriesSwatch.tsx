import { MODELS } from "../../lib/series";

export function SeriesSwatch({ k }: { k: string }) {
  const m = MODELS.find((x) => x.key === k)!;
  return (
    <svg width="27" height="9" aria-hidden>
      <line
        x1="0"
        x2="27"
        y1="4.5"
        y2="4.5"
        stroke={m.color}
        strokeWidth={m.width + 0.4}
        strokeDasharray={m.dash}
      />
    </svg>
  );
}
