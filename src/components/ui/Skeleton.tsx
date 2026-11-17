export function Skeleton() {
  return (
    <div
      className="space-y-3"
      aria-busy="true"
      aria-label="Loading dashboard data"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="h-13 rounded-ui border border-line bg-surface" />
        <div className="h-13 rounded-ui border border-line bg-surface" />
      </div>
      <div className="h-48 rounded-ui border border-line bg-surface" />
    </div>
  );
}
