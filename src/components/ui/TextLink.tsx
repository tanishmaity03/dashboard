import type { ReactNode } from "react";

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-brand underline decoration-line underline-offset-4 transition-colors duration-150 ease-out hover:decoration-brand"
    >
      {children}
    </a>
  );
}
