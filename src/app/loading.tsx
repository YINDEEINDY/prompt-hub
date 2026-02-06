export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 h-10 w-64 animate-pulse rounded-lg bg-[var(--bg-card)]" />
      <div className="mb-6 h-5 w-96 animate-pulse rounded bg-[var(--bg-card)]" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]" />
        ))}
      </div>
    </div>
  );
}
