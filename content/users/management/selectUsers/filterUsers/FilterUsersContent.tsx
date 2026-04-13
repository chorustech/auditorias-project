"use client";

/* COMPONENTS */
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { SimpleCombobox } from "@/components/shared/form/dinamicInput/DinamicCustomComboBox";
import { DinamicInputNumber } from "@/components/shared/form/dinamicInput/DinamicInputNumber";

/* DATA */
import {
  usersFilterBy,
  usersOperator,
  usersOrder,
  usersOrderBy,
  estados,
  roles,
  usersPerPage,
} from "@/content/users/data/comboboxItems/comboboxItems";

/* HOOKS */
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useState } from "react";

/* ICONS */
import { Filter, Loader } from "lucide-react";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";
import { useUsersFilter } from "@/stores/filter/users/filterUsersStore";
import { useModal } from "@/stores/modal/modalStore";

/* TYPES */
import { UsersFilterFormValues } from "@/content/users/types/forms/usersFilterFormValues";
import { DinamicInputText } from "@/components/shared/form/dinamicInput/DinamicInputText";

export function FilterUsersContent() {
  const [filtering, setFiltering] = useState(false);
  const { setAnnouncement } = useAnnouncement();
  const { modal, setModal } = useModal();
  const { setFilter } = useUsersFilter();

  const methods = useForm<UsersFilterFormValues>({
    defaultValues: {
      page: 1,
      perPage: undefined,
      order: undefined,
      orderBy: undefined,
      filterBy: undefined,
      operator: undefined,
      id: undefined,
      numEmpleado: undefined,
      nombre: undefined,
      correo: undefined,
      rol: undefined,
      estado: undefined,
    },
  });

  const filterByValue = useWatch({
    control: methods.control,
    name: "filterBy",
    defaultValue: undefined,
  });

  const onSubmit = (data: UsersFilterFormValues) => {
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
          : data.orderBy === "nro. Empleado"
            ? "numEmpleado"
            : data.orderBy === "Nombre"
              ? "nombre"
              : data.orderBy === "Correo"
                ? "email"
                : data.orderBy === "Estado"
                  ? "estado"
                  : "rol";

      // CHECKFILTERS
      const checkFilters = data.filterBy === "Ninguno" ? false : true;

      if (checkFilters) {
        // FILTERS
        let field: "id" | "numEmpleado" | "nombre" | "email" | "estado" | "rol";
        let operator: "=" | "!=" | "<" | "<=" | ">" | ">=";
        let value: string | number | boolean;

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
        } else if (data.filterBy === "nro. Empleado") {
          field = "numEmpleado";

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
        } else if (data.filterBy === "Nombre") {
          field = "nombre";
          operator = "=";

          if (data.nombre !== undefined) {
            value = data.nombre;
          } else {
            value = "";
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
        } else if (data.filterBy === "Correo") {
          field = "email";
          operator = "=";

          if (data.correo !== undefined) {
            value = data.correo;
          } else {
            value = "";
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
        } else if (data.filterBy === "Estado") {
          field = "estado";
          operator = "=";
          // estado es boolean en la DB
          value = data.estado === "ACTIVO" ? true : false;

          setFilter({
            page,
            perPage,
            order,
            orderBy,
            checkFilters,
            filters: [{ field, operator, value }],
          });
        } else {
          // Rol
          field = "rol";
          operator = "=";
          value =
            data.rol !== undefined
              ? data.rol.toLowerCase() // "Administrador" → "administrador"
              : "auditor";

          setFilter({
            page,
            perPage,
            order,
            orderBy,
            checkFilters,
            filters: [{ field, operator, value }],
          });
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
          <DinamicInputNumber<UsersFilterFormValues>
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
          <SimpleCombobox<UsersFilterFormValues>
            name="perPage"
            items={usersPerPage}
            label="Usuarios por página"
            placeholder="Seleccionar usuarios por página"
            rules={{
              required: "Los usuarios por página son necesarios",
            }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full h-fit grid-cols-1">
          {/* ORDER */}
          <SimpleCombobox<UsersFilterFormValues>
            name="order"
            items={usersOrder}
            label="Orden"
            placeholder="Seleccionar orden"
            rules={{
              required: "El orden es necesario",
            }}
          />

          {/* ORDER BY */}
          <SimpleCombobox<UsersFilterFormValues>
            name="orderBy"
            items={usersOrderBy}
            label="Ordenar por"
            placeholder="Seleccionar ordenar por"
            rules={{
              required: "El ordenar por es necesario",
            }}
          />
        </div>

        {/* FILTRAR POR */}
        <SimpleCombobox<UsersFilterFormValues>
          name="filterBy"
          items={usersFilterBy}
          label="Filtrar por"
          placeholder="Seleccionar filtrar por"
          rules={{
            required: "Filtrar por es necesario",
          }}
        />

        {filterByValue === "ID" && (
          <div className="grid lg:grid-cols-2 gap-4 w-full h-fit grid-cols-1">
            {/* ID */}
            <DinamicInputNumber<UsersFilterFormValues>
              name="id"
              label="ID"
              placeholder="Ingrese el ID del usuario"
              min={1}
              max={99}
              rules={{
                required: "El ID del usuario es necesario",
              }}
            />

            {/* OPERATOR */}
            <SimpleCombobox<UsersFilterFormValues>
              name="operator"
              items={usersOperator}
              label="Operador"
              placeholder="Seleccionar operador"
              rules={{
                required: "El operador es necesario",
              }}
            />
          </div>
        )}

        {filterByValue === "nro. Empleado" && (
          <div className="grid lg:grid-cols-2 gap-4 w-full h-fit grid-cols-1">
            {/* ID */}
            <DinamicInputNumber<UsersFilterFormValues>
              name="numEmpleado"
              label="nro. Empleado"
              placeholder="Ingrese el nro. Empleado"
              min={1}
              max={99}
              rules={{
                required: "El nro. Empleado es necesario",
              }}
            />

            {/* OPERATOR */}
            <SimpleCombobox<UsersFilterFormValues>
              name="operator"
              items={usersOperator}
              label="Operador"
              placeholder="Seleccionar operador"
              rules={{
                required: "El operador es necesario",
              }}
            />
          </div>
        )}

        {/* NOMBRE */}
        {filterByValue === "Nombre" && (
          <DinamicInputText<UsersFilterFormValues>
            name="nombre"
            label="Nombre"
            placeholder="Ingrese el nombre de empleado"
            rules={{
              required: "El nombre de empleado es necesario",
              minLength: {
                value: 2,
                message:
                  "El nombre de empleado debe tener al menos 2 caracteres",
              },
              maxLength: {
                value: 50,
                message:
                  "El nombre de empleado no puede tener más de 50 caracteres",
              },
            }}
          />
        )}

        {/* CORREO */}
        {filterByValue === "Correo" && (
          <DinamicInputText<UsersFilterFormValues>
            name="correo"
            label="Correo"
            placeholder="Ingrese el correo de empleado"
            rules={{
              required: "El correo de empleado es necesario",
              minLength: {
                value: 2,
                message:
                  "El correo de empleado debe tener al menos 2 caracteres",
              },
              maxLength: {
                value: 50,
                message:
                  "El correo de empleado no puede tener más de 50 caracteres",
              },
            }}
          />
        )}

        {/* ROL */}
        {filterByValue === "Rol" && (
          <SimpleCombobox<UsersFilterFormValues>
            name="rol"
            items={roles}
            label="Rol"
            placeholder="Seleccionar rol"
            rules={{
              required: "El rol es necesario",
            }}
          />
        )}

        {/* ESTADO */}
        {filterByValue === "Estado" && (
          <SimpleCombobox<UsersFilterFormValues>
            name="estado"
            items={estados}
            label="Estado"
            placeholder="Seleccionar estado"
            rules={{
              required: "El estado es necesario",
            }}
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
