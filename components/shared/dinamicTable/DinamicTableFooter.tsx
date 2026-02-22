"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { BouncingButton } from "../bouncingButton/BouncingButton";
import { useFilter } from "@/stores/filter/filterStore";

export function DinamicTableFooter({
  loading,
  count,
}: {
  loading: boolean;
  count: number;
}) {
  const { filter } = useFilter();

  return (
    <div className="flex flex-col justify-center items-center p-6 lg:justify-between md:justify-between lg:flex-row md:flex-row">
      <div>
        <p>
          Total:{" "}
          <span className="font-semibold text-[#00A0D0]">
            {loading ? "Cargando" : count}
          </span>{" "}
          resultados
        </p>
      </div>
      <div className="flex gap-4">
        <BouncingButton
          action={() => {}}
          backgroundColorHover="#ffffff"
          backgroundColor="#e5e5e5"
          textColor="#000"
          textColorHover="#00A0D0"
          border="2px solid #ffffff"
          borderHover="2px solid #00A0D0"
          twClassName="w-fit h-fit px-4 py-2 rounded-xl"
        >
          <ChevronLeft className="size-5" />
          <p>Anterior</p>
        </BouncingButton>
        <BouncingButton
          action={() => {}}
          backgroundColorHover="#ffffff"
          backgroundColor="#e5e5e5"
          textColor="#000"
          textColorHover="#00A0D0"
          border="2px solid #ffffff"
          borderHover="2px solid #00A0D0"
          twClassName="w-fit h-fit px-4 py-2 rounded-xl"
        >
          <p>Siguiente</p>
          <ChevronRight className="size-5" />
        </BouncingButton>
      </div>
      <div>
        <p>
          {loading ? (
            <span>Cargando...</span>
          ) : (
            <span>
              Página: {(filter?.page ?? 0) + 1} de{" "}
              {Math.ceil(count ?? 0) / (filter?.perPage ?? 1) === 0
                ? "1"
                : Math.ceil((count ?? 0) / (filter?.perPage ?? 1))}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
