export function DinamicRow({
  twBgColor,
  children,
}: {
  twBgColor: string;
  children: React.ReactNode;
}) {
  return (
    <tr
      className={`border-b border-neutral-200 hover:bg-[#d9f2f9] group transition-all relative duration-200 ${twBgColor}`}
    >
      {children}
    </tr>
  );
}
