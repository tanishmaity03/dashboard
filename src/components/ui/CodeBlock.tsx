export function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-ui border border-line bg-canvas p-2 text-[12px] leading-2">
      {children}
    </pre>
  );
}
