export const ROUTES = [
  { to: "/", label: "Forecasts", end: true },
  { to: "/compare", label: "Models", end: false },
  { to: "/history", label: "History", end: false },
  { to: "/warnings", label: "Warnings", end: false },
  { to: "/method", label: "Method", end: false },
] as const;
