export function SectionContainer({ children }: { children: React.ReactNode }) {
  return <section className="w-full h-full p-4 overflow-y-auto">{children}</section>;
}
