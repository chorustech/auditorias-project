export function Skeleton() {
  return (
    <div className="w-full h-fit flex flex-col gap-4">
      <div className="w-full flex items-center justify-between flex-col lg:flex-row">
        <div className="w-96 py-6 rounded-2xl bg-linear-to-r from-neutral-200 via-neutral-50 to-neutral-200 bg-skeleton-gradient" />
        <div className="w-56 py-6 rounded-2xl bg-linear-to-r from-neutral-200 via-neutral-50 to-neutral-200 bg-skeleton-gradient" />
      </div>

      <div className="w-60 py-6 rounded-2xl bg-linear-to-r from-neutral-200 via-neutral-50 to-neutral-200 bg-skeleton-gradient" />
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            className={`w-full h-24 rounded-2xl bg-linear-to-r from-neutral-200 via-neutral-50 to-neutral-200 bg-skeleton-gradient`}
            key={i}
          />
        ))}
      </div>
      <div className="w-60 py-6 rounded-2xl bg-linear-to-r from-neutral-200 via-neutral-50 to-neutral-200 bg-skeleton-gradient" />
      <div className="grid lg:grid-cols-6 grid-cols-1 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            className={`w-full h-24 rounded-2xl bg-linear-to-r from-neutral-200 via-neutral-50 to-neutral-200 bg-skeleton-gradient`}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
