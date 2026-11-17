import type { Dash } from "./types";

export async function loadDash(): Promise<Dash> {
  const res = await fetch(`${import.meta.env.BASE_URL}data/dashboard.json`);
  if (!res.ok)
    throw new Error(`Could not load data/dashboard.json (HTTP ${res.status}).`);
  return res.json();
}
