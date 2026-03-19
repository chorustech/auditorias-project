"use client";

/* LIBS */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
} from "recharts";

export function Grafic({
  discontentObject,
}: {
  discontentObject: { report: string; positive: number; negative: number }[];
}) {
  const minWidth = discontentObject.length * 200;
  const width = minWidth + 500;

  return (
    <div className="w-full overflow-x-auto lg:h-full h-96 mb-4">
      {discontentObject.length === 0 ? (
        <p>No se encontrarón Reportes</p>
      ) : (
        <div className="h-full" style={{ minWidth }}>
          <ResponsiveContainer
            width={width}
            height="100%"
            className={"border-0 outline-none"}
          >
            <BarChart data={discontentObject} barGap={20} barCategoryGap="20%">
              <XAxis dataKey="report" interval={0} />
              <YAxis domain={[0, "dataMax + 10"]} />
              <Bar dataKey="positive" fill="#22c55e">
                <LabelList dataKey="positive" position="top" />
              </Bar>
              <Bar dataKey="negative" fill="#ef4444">
                <LabelList dataKey="negative" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
