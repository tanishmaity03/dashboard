import type { ReactNode } from "react";

export const fieldCls =
  "h-4 rounded-ui border border-line bg-surface px-2 text-[13px] font-medium text-ink transition-colors duration-150 ease-out hover:border-faint";

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex items-center gap-1 text-[13px] text-muted">
      {label}
      {children}
    </label>
  );
}
