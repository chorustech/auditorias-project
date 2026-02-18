export function DinamicTableSkeleton() {
  return (
    <table>
      <thead>
        {Array.from({ length: 3 }).map((_, i) => (
          <tr key={i} className="animate-pulse">
            <td className="p-2 bg-gray-200 rounded" />
            <td className="p-2 bg-gray-200 rounded" />
            <td className="p-2 bg-gray-200 rounded" />
            <td className="p-2 bg-gray-200 rounded" />
          </tr>
        ))}
      </thead>
      <tbody>
        {Array.from({ length: 3 }).map((_, i) => (
          <tr key={i} className="animate-pulse">
            <td className="p-2 bg-gray-200 rounded" />
            <td className="p-2 bg-gray-200 rounded" />
            <td className="p-2 bg-gray-200 rounded" />
            <td className="p-2 bg-gray-200 rounded" />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
