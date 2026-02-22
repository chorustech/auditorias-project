export function SectionContainer({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full h-full overflow-y-auto">{children}</section>
  );
}
