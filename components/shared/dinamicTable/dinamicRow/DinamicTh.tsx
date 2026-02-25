export function DinamicTh({ column }: { column: string }) {
  return (
    <th
      className={`font-medium py-4 text-left text-blue-950 ${
        column === ""
          ? "px-0 bg-neutral-100 sticky right-0 whitespace-nowrap"
          : "px-3"
      }`}
    >
      {column}
    </th>
  );
}
