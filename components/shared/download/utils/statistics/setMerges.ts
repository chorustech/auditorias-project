/* TYPES */
import { Merges } from "@/components/shared/download/types/shared/merges";

export function setMerges(): Merges[] {
  const merges: Merges[] = [];

  merges.push({ s: { c: 0, r: 2 }, e: { c: 2, r: 2 } });
  merges.push({ s: { c: 0, r: 5 }, e: { c: 3, r: 5 } });
  merges.push({ s: { c: 0, r: 9 }, e: { c: 7, r: 9 } });

  return merges;
}
