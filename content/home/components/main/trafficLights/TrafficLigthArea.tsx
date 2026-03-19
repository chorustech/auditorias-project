export function TrafficLightArea({
  trafficLightObject,
}: {
  trafficLightObject: {
    name: string;
    count: number;
  };
}) {
  const getTwTextColor = (negativeReports: number) => {
    if (negativeReports < 10) {
      return "text-green-500";
    } else if (negativeReports >= 10 && negativeReports < 20) {
      return "text-yellow-500";
    } else {
      return "text-red-500";
    }
  };

  return (
    <div className="border border-neutral-200 rounded-xl w-full h-fit p-4 flex gap-2 flex-col items-center justify-center">
      <p className={`${getTwTextColor(trafficLightObject.count)} text-center`}>
        {trafficLightObject.name}
      </p>

      <p className="text-neutral-400">{trafficLightObject.count} Reportes</p>
    </div>
  );
}
