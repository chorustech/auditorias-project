export const POINTER_AREAS = [
  "baldwin-state",
  "baldwin-reserve-supply",
  "baldwin-reserve-stacking",
  "baldwin-reserve-packing",
  "baldwin-reserve-general",
  "display-area",
  "pizza-tray",
  "eola",
  "ncr",
  "rac",
] as const;

export type PointerArea = (typeof POINTER_AREAS)[number];

export const isPointerArea = (value: string): value is PointerArea => {
  return POINTER_AREAS.includes(value as PointerArea);
};
