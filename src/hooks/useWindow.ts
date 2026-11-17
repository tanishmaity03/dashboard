import { useState } from "react";

/** Date window over an hourly series: start date plus a number of days. */
export function useWindow(times: string[], initialStart: string) {
  const [start, setStart] = useState(initialStart);
  const [days, setDays] = useState(7);
  const from = Math.max(
    0,
    times.findIndex((t) => t >= start),
  );
  return {
    start,
    setStart,
    days,
    setDays,
    from,
    to: Math.min(times.length, from + days * 24),
  };
}
export type Window = ReturnType<typeof useWindow>;
