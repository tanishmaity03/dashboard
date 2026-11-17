import { Outlet, useLocation } from "react-router-dom";
import { useDashState } from "../../context/DashContext";
import { useReveal } from "../../hooks/useReveal";
import { Card } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function Layout() {
  const { data, error } = useDashState();
  const { pathname } = useLocation();
  const ref = useReveal<HTMLElement>(`${pathname}:${!!data}`);
  return (
    <div className="min-h-screen">
      <Navbar />
      <main
        ref={ref}
        className="mx-auto w-full max-w-120 px-2 pb-4 pt-13 sm:px-4"
      >
        {error ? (
          <Card title="The dashboard data could not be loaded" hint={error}>
            <p className="text-[13px] text-muted">
              Generate it from the repository root with{" "}
              <code className="rounded-[4.5px] bg-subtle px-0.5">
                python web/scripts/export_data.py
              </code>
              , then reload.
            </p>
          </Card>
        ) : data ? (
          <Outlet />
        ) : (
          <Skeleton />
        )}
      </main>
      <Footer />
    </div>
  );
}
