import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  variant?: "primary" | "secondary";
  icon?: LucideIcon;
  children: ReactNode;
  onClick?: () => void;
  href?: string;
};
const base =
  "inline-flex h-4 shrink-0 items-center justify-center gap-1 rounded-ui border px-2 text-[13px] font-semibold " +
  "transition-[background-color,border-color,transform] duration-150 ease-out active:scale-[0.98]";
const styles = {
  primary:
    "border-brand bg-brand text-white hover:border-brand-dark hover:bg-brand-dark",
  secondary:
    "border-line bg-surface text-ink hover:border-faint hover:bg-subtle",
};

/** Primary = the one main action on a page. Everything else is secondary. */
export function Button({
  variant = "secondary",
  icon: Icon,
  children,
  onClick,
  href,
}: Props) {
  const cls = `${base} ${styles[variant]}`;
  const inner = (
    <>
      {Icon && <Icon size={15} />}
      {children}
    </>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
