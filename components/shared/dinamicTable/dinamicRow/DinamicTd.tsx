export function DinamicTd({
  children,
  twClassName,
}: {
  children: React.ReactNode;
  twClassName: string;
}) {
  return <td className={`px-3 py-6 text-left ${twClassName}`}>{children}</td>;
}
