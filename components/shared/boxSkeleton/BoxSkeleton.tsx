export function BoxSkeleton() {
  return (
    <div className="w-full flex flex-col gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          className={`w-full py-6 rounded-2xl bg-linear-to-r from-neutral-200 via-neutral-50 to-neutral-200 bg-skeleton-gradient`}
          key={i}
        />
      ))}
    </div>
  );
}
