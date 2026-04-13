"use client";

/* COMPONENTS */
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { SimpleCombobox } from "@/components/shared/form/dinamicInput/DinamicCustomComboBox";
import { DinamicInputDate } from "@/components/shared/form/dinamicInput/DinamicInputDate";
import { DinamicInputNumber } from "@/components/shared/form/dinamicInput/DinamicInputNumber";

/* DATA */
import {
  reportsFilterBy,
  reportsOperator,
  reportsOrder,
  reportsOrderBy,
  reportsPerPage,
} from "@/content/reports/data/comboboxItems/comboboxItems";

/* HOOKS */
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useState } from "react";

/* ICONS */
import { Filter, Loader } from "lucide-react";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";
import { useReportsFilter } from "@/stores/filter/reports/filterReportsStore";
import { useModal } from "@/stores/modal/modalStore";

/* TYPES */
import { ReportsFilterFormValues } from "@/content/reports/types/forms/reportsFilterFormValues";
import { ReporteAuditoriaConDetalles } from "@/src/reporte-auditoria/domain";
import { Metadata } from "@/src/reporte-auditoria/domain/entities";
import { toISODate } from "@/utils/date";

export function FilterReportsContent() {
  const [filtering, setFiltering] = useState(false);
  const { setAnnouncement } = useAnnouncement();
  const { modal, setModal } = useModal();
  const { setFilter } = useReportsFilter();

  const methods = useForm<ReportsFilterFormValues>({
    defaultValues: {
      page: 1,
      perPage: undefined,
      order: undefined,
      orderBy: undefined,
      filterBy: undefined,
      operator: undefined,
      id: undefined,
      fecha_unica: undefined,
      fecha_intervalo: undefined,
    },
  });

  const filterByValue = useWatch({
    control: methods.control,
    name: "filterBy",
    defaultValue: undefined,
  });

  const onSubmit = (data: ReportsFilterFormValues) => {
    try {
      setFiltering(true);

      console.log(data);

      // PAGE
      const page = data.page - 1;

      // PERPAGE
      let perPage: number = 10;

      if (data.perPage === "100") {
        perPage = 100;
      } else if (data.perPage === "50") {
        perPage = 50;
      } else if (data.perPage === "25") {
        perPage = 25;
      }

      // ORDER
      const order = data.order === "Ascendente" ? "asc" : "desc";

      // ORDER BY
      const orderBy =
        data.orderBy === "ID"
          ? "id"
          : data.orderBy === "Fecha"
            ? "timestamp"
            : "auditor";

      // CHECKFILTERS
      const checkFilters = data.filterBy === "Ninguno" ? false : true;

      if (checkFilters) {
        // FILTERS
        let field: keyof ReporteAuditoriaConDetalles<Metadata>;
        let operator: "=" | "!=" | "<" | "<=" | ">" | ">=";
        let value: string | number;

        if (data.filterBy === "ID") {
          field = "id";

          if (data.operator !== undefined) {
            operator = data.operator;
          } else {
            operator = "=";
          }

          if (data.id !== undefined) {
            value = data.id;
          } else {
            value = 1;
          }

          setFilter({
            page: page,
            perPage: perPage,
            order: order,
            orderBy: orderBy,
            checkFilters: checkFilters,
            filters: [
              {
                field: field,
                operator: operator,
                value: value,
              },
            ],
          });
        } else if (data.filterBy === "Fecha") {
          field = "timestamp";

          if (data.operator !== undefined) {
            operator = data.operator;
          } else {
            operator = "=";
          }

          if (data.fecha_unica !== undefined) {
            value = toISODate(data.fecha_unica);
            console.log(
              "Fecha unica despues de la conversion: ",
              data.fecha_unica,
            );
          } else {
            value = "2026-01-01";
          }

          setFilter({
            page: page,
            perPage: perPage,
            order: order,
            orderBy: orderBy,
            checkFilters: checkFilters,
            filters: [
              {
                field: field,
                operator: operator,
                value: value,
              },
            ],
          });
        } else {
          const fecha_intervalo = data.fecha_intervalo;

          if (fecha_intervalo !== undefined) {
            const fecha_comienzo = fecha_intervalo.from;
            const fecha_termino = fecha_intervalo.to;

            const filtro_1: {
              field: "timestamp";
              operator: ">=";
              value: string;
            } = {
              field: "timestamp",
              operator: ">=",
              value:
                fecha_comienzo !== undefined
                  ? toISODate(fecha_comienzo)
                  : "2026-01-01",
            };

            const filtro_2: {
              field: "timestamp";
              operator: "<=";
              value: string;
            } = {
              field: "timestamp",
              operator: "<=",
              value:
                fecha_termino !== undefined
                  ? toISODate(fecha_termino)
                  : "2026-02-01",
            };

            setFilter({
              page: page,
              perPage: perPage,
              order: order,
              orderBy: orderBy,
              checkFilters: true,
              filters: [filtro_1, filtro_2],
            });
          } else {
            setFilter({
              page: page,
              perPage: perPage,
              order: order,
              orderBy: orderBy,
              checkFilters: false,
              filters: [],
            });
          }
        }
      } else {
        setFilter({
          page: page,
          perPage: perPage,
          order: order,
          orderBy: orderBy,
          checkFilters: false,
          filters: [],
        });
      }

      methods.reset();

      setAnnouncement({
        isActivated: true,
        isOk: true,
        message: "Filtro aplicado",
      });
      setModal({
        isActivated: false,
        title: modal.title ?? "",
        body: modal.body,
      });
    } catch (error) {
      console.log("Error", error);
    } finally {
      setFiltering(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full overflow-y-auto max-h-60 pr-4 pl-4">
        <div className="grid lg:grid-cols-2 gap-4 w-full h-fit grid-cols-1">
          {/* PAGE */}
          <DinamicInputNumber<ReportsFilterFormValues>
            name="page"
            label="Página"
            placeholder="Ingrese el número de página"
            min={1}
            max={99}
            rules={{
              required: "El número de página es necesario",
            }}
          />

          {/* PER PAGE */}
          <SimpleCombobox<ReportsFilterFormValues>
            name="perPage"
            items={reportsPerPage}
            label="Reportes por página"
            placeholder="Seleccionar reportes por página"
            rules={{
              required: "Los reportes por página son necesarios",
            }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full h-fit grid-cols-1">
          {/* ORDER */}
          <SimpleCombobox<ReportsFilterFormValues>
            name="order"
            items={reportsOrder}
            label="Orden"
            placeholder="Seleccionar orden"
            rules={{
              required: "El orden es necesario",
            }}
          />

          {/* ORDER BY */}
          <SimpleCombobox<ReportsFilterFormValues>
            name="orderBy"
            items={reportsOrderBy}
            label="Ordenar por"
            placeholder="Seleccionar ordenar por"
            rules={{
              required: "El ordenar por es necesario",
            }}
          />
        </div>

        {/* FILTRAR POR */}
        <SimpleCombobox<ReportsFilterFormValues>
          name="filterBy"
          items={reportsFilterBy}
          label="Filtrar por"
          placeholder="Seleccionar filtrar por"
          rules={{
            required: "Filtrar por es necesario",
          }}
        />

        {filterByValue === "ID" && (
          <div className="grid lg:grid-cols-2 gap-4 w-full h-fit grid-cols-1">
            {/* ID */}
            <DinamicInputNumber<ReportsFilterFormValues>
              name="id"
              label="ID"
              placeholder="Ingrese el ID de reporte"
              min={1}
              max={99}
              rules={{
                required: "El ID de reporte es necesario",
              }}
            />

            {/* OPERATOR */}
            <SimpleCombobox<ReportsFilterFormValues>
              name="operator"
              items={reportsOperator}
              label="Operador"
              placeholder="Seleccionar operador"
              rules={{
                required: "El operador es necesario",
              }}
            />
          </div>
        )}

        {filterByValue === "Fecha" && (
          <div className="grid lg:grid-cols-2 gap-4 w-full h-fit grid-cols-1">
            {/* FECHA_UNICA */}
            <DinamicInputDate<ReportsFilterFormValues>
              name="fecha_unica"
              label="Fecha"
              placeholder="Seleccione una fecha"
              rules={{
                required: "La fecha es necesaria",
              }}
              mode="single"
            />

            {/* OPERATOR */}
            <SimpleCombobox<ReportsFilterFormValues>
              name="operator"
              items={reportsOperator}
              label="Operador"
              placeholder="Seleccionar operador"
              rules={{
                required: "El operador es necesario",
              }}
            />
          </div>
        )}

        {/* FECHA_INTERVALO */}
        {filterByValue === "Entre fechas" && (
          <DinamicInputDate<ReportsFilterFormValues>
            name="fecha_intervalo"
            label="Entre fechas"
            placeholder="Seleccione un intervalo"
            rules={{
              required: "El intervalo es necesario",
            }}
            mode="range"
          />
        )}
      </div>

      <div className="flex gap-4 mt-6">
        {/* BOTÓN CANCELAR */}
        <BouncingButton
          action={
            filtering
              ? () => {}
              : () => {
                  setModal({
                    isActivated: false,
                    title: modal.title ?? "",
                    body: modal.body,
                  });
                }
          }
          backgroundColorHover="#00A0D0"
          backgroundColor="#ffffff"
          textColor="#00A0D0"
          textColorHover="#ffffff"
          border="2px solid #00A0D0"
          borderHover="2px solid #00A0D0"
          twClassName="w-full h-fit px-4 py-2 rounded-2xl"
          disabled={filtering ? true : false}
        >
          <span>Cancelar</span>
        </BouncingButton>

        {/* BOTÓN FILTRAR */}
        <BouncingButton
          action={filtering ? () => {} : methods.handleSubmit(onSubmit)}
          backgroundColorHover="#00A0D0"
          backgroundColor="#00A0D0"
          textColor="#ffffff"
          textColorHover="#ffffff"
          border="2px solid #00A0D0"
          borderHover="2px solid #00A0D0"
          twClassName="w-full h-fit px-4 py-2 rounded-2xl"
          disabled={filtering ? true : false}
        >
          {filtering ? (
            <>
              <span className="text-transparent">E</span>
              <Loader className="size-4 animate-spin" />
              <span className="text-transparent">E</span>
            </>
          ) : (
            <>
              <Filter className="size-4" />
              <span>Filtrar</span>
            </>
          )}
        </BouncingButton>
      </div>
    </FormProvider>
  );
}
