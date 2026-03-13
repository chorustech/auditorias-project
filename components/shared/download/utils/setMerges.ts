/* DATA */
import {
  baldwinReserveGeneralMerges,
  baldwinReservePackingMerges,
  baldwinReserveStackingMerges,
  baldwinReserveSupplyMerges,
  baldwinStateMerges,
  displayAreaMerges,
  pizzaTrayMerges,
} from "@/components/shared/download/data/reportsMerges";

/* TYPES */
import { Merges } from "@/components/shared/download/types/merges";

/* UTILS */
import { PointerArea } from "@/utils/pointerArea";

export function setMerges(pointer: PointerArea): Merges[] {
  const merges: Merges[] = [];

  switch (pointer) {
    case "baldwin-state":
      baldwinStateMerges.map((m) => merges.push(m));
      break;

    case "baldwin-reserve-supply":
      baldwinReserveSupplyMerges.map((m) => merges.push(m));
      break;

    case "baldwin-reserve-stacking":
      baldwinReserveStackingMerges.map((m) => merges.push(m));
      break;

    case "baldwin-reserve-packing":
      baldwinReservePackingMerges.map((m) => merges.push(m));
      break;

    case "baldwin-reserve-general":
      baldwinReserveGeneralMerges.map((m) => merges.push(m));
      break;

    case "display-area":
      displayAreaMerges.map((m) => merges.push(m));
      break;

    case "pizza-tray":
      pizzaTrayMerges.map((m) => merges.push(m));
      break;
  }

  return merges;
}
