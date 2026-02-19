export function DinamicTableSkeleton() {
  return (
    <table className="w-full">
      <thead>
        {Array.from({ length: 3 }).map((_, i) => (
          <tr key={i} className="animate-pulse">
            <td className="p-2 bg-gray-200" />
            <td className="p-2 bg-gray-200" />
            <td className="p-2 bg-gray-200" />
            <td className="p-2 bg-gray-200" />
          </tr>
        ))}
      </thead>
      <tbody>
        {Array.from({ length: 3 }).map((_, i) => (
          <tr key={i} className="animate-pulse">
            <td className="p-2 bg-gray-200" />
            <td className="p-2 bg-gray-200" />
            <td className="p-2 bg-gray-200" />
            <td className="p-2 bg-gray-200" />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
