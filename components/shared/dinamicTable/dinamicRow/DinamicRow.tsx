export function DinamicRow({
  twBgColor,
  children,
}: {
  twBgColor: string;
  children: React.ReactNode;
}) {
  return (
    <tr
      className={`border-b border-neutral-200 hover:bg-[#00A0D0]/20 transition-all relative duration-200 ${twBgColor}`}
    >
      {children}
    </tr>
  );
}
