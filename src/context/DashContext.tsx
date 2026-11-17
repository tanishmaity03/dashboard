import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { loadDash } from "../lib/api";
import type { Dash } from "../lib/types";

type State = { data: Dash | null; error: string };
const Ctx = createContext<State | null>(null);

export function DashProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({ data: null, error: "" });
  useEffect(() => {
    loadDash()
      .then((data) => setState({ data, error: "" }))
      .catch((e) => setState({ data: null, error: e.message }));
  }, []);
  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}
export function useDashState() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useDashState must be used inside <DashProvider>");
  return v;
}
/** For pages: the layout only renders pages once data has loaded, so this is never null. */
export function useDash(): Dash {
  const { data } = useDashState();
  if (!data) throw new Error("Dashboard data not loaded");
  return data;
}
