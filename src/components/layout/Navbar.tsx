import { useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import gsap from "gsap";
import { ROUTES } from "../../constants/routes";
import { APP_NAME, REPO_URL } from "../../lib/config";

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `relative py-1 text-[11px] font-semibold uppercase tracking-[.2em] transition-colors duration-150 ease-out after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-white after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 ${
    isActive
      ? "text-white after:scale-x-100"
      : "text-white/60 after:scale-x-0 hover:text-white"
  }`;

/** Full-bleed bar: logo in the far left corner, links centred, call to action in the far right corner. */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (open && panel.current)
      gsap.fromTo(
        panel.current,
        { opacity: 0, y: -9 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
      );
  }, [open]);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/95 text-white backdrop-blur-md">
      <div className="flex h-8 w-full items-center gap-2 px-2 sm:px-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-4">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          aria-label={`${APP_NAME} home`}
          className="flex shrink-0 items-center gap-1 lg:justify-self-start"
        >
          <span className="grid size-4 place-items-center rounded-ui border border-white/20">
            <Zap size={17} />
          </span>
          <span className="text-[15px] font-bold tracking-tight">
            {APP_NAME}
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-4 lg:flex"
        >
          {ROUTES.map((r) => (
            <NavLink key={r.to} to={r.to} end={r.end} className={linkCls}>
              {r.label}
            </NavLink>
          ))}
        </nav>

        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="ml-auto hidden h-4 items-center rounded-ui border border-white/20 px-2 text-[11px] font-semibold uppercase tracking-[.12em] transition-colors duration-150 ease-out hover:border-white/60 hover:bg-white/10 sm:inline-flex lg:ml-0 lg:justify-self-end"
        >
          View code
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex size-4 shrink-0 items-center justify-center rounded-ui border border-white/20 transition-colors duration-150 ease-out hover:bg-white/10 sm:ml-0 lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          ref={panel}
          aria-label="Mobile navigation"
          className="border-t border-white/10 bg-ink px-2 py-2 lg:hidden"
        >
          <div className="mx-auto flex max-w-xl flex-col">
            {ROUTES.map((r) => (
              <NavLink
                key={r.to}
                to={r.to}
                end={r.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex h-5 items-center border-b border-white/10 text-[11px] font-semibold uppercase tracking-[.2em] transition-colors duration-150 ease-out ${isActive ? "text-white" : "text-white/60 hover:text-white"}`
                }
              >
                {r.label}
              </NavLink>
            ))}
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex h-4 items-center justify-center rounded-ui border border-white/20 text-[11px] font-semibold uppercase tracking-[.12em]"
            >
              View code
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
