import type { ReactNode } from "react";

type Props = {
  title: string;
  hint?: string;
  action?: ReactNode;
  children?: ReactNode;
};
export function Card({ title, hint, action, children }: Props) {
  return (
    <section
      data-reveal
      className="rounded-ui border border-line bg-surface p-3 shadow-soft"
    >
      <header
        className={`flex flex-wrap items-start justify-between gap-2 ${children ? "mb-2" : ""}`}
      >
        <div>
          <h2 className="text-[15px] font-bold leading-2">{title}</h2>
          {hint && (
            <p className="mt-1 max-w-80 text-[13px] text-muted">{hint}</p>
          )}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
