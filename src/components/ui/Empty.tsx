export function Empty({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-ui border border-dashed border-line px-3 py-4 text-center">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-[13px] text-muted">{body}</p>
    </div>
  );
}
