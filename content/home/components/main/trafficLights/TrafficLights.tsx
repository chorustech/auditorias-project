import { TrafficLightArea } from "@/content/home/components/main/trafficLights/TrafficLigthArea";

export function TrafficLights({
  trafficLightsObject,
}: {
  trafficLightsObject: {
    name: string;
    count: number;
  }[];
}) {
  return (
    <div className="w-full h-fit mb-4 grid lg:grid-cols-3 grid-cols-1 gap-6">
      {trafficLightsObject.map((trafficLight, index) => (
        <TrafficLightArea key={index} trafficLightObject={trafficLight} />
      ))}
    </div>
  );
}
