export function autoSizeColumns(rows: string[][]) {
  const colWidths: number[] = [];

  rows.forEach((row) => {
    row.forEach((cell, i) => {
      const text = cell ? cell.toString() : "";

      const longestLine = Math.max(
        ...text.split("\n").map((line) => line.length),
      );

      colWidths[i] = Math.max(colWidths[i] || 10, longestLine);
    });
  });

  return colWidths.map((w) => ({
    wch: Math.min(w + 4, 40),
  }));
}
