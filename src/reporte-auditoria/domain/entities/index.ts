import { EmpaqueMetadata, GeneralesMetadata, ProcesoStackingMetadata, SurtidoMaterialesMetadata } from "./baldwin-reserve";
import { BaldwinStateMetadata } from "./baldwin-state";
import { PizzaTrayMetadata } from "./pizza-tray";
import { EolaMetadata } from "./eola";
import { RacMetadata } from "./rac";
import { NcrMetadata } from "./ncr";
import { DisplayAreaMetadata } from "./display-area";


export type Metadata = EmpaqueMetadata | GeneralesMetadata | ProcesoStackingMetadata | SurtidoMaterialesMetadata | PizzaTrayMetadata | BaldwinStateMetadata | EolaMetadata | RacMetadata | NcrMetadata | DisplayAreaMetadata;
export type { PizzaTrayMetadata, BaldwinStateMetadata, SurtidoMaterialesMetadata, EmpaqueMetadata, GeneralesMetadata, ProcesoStackingMetadata, EolaMetadata, RacMetadata, NcrMetadata, DisplayAreaMetadata };
