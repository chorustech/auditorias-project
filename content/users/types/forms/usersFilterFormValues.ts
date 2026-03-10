export type UsersFilterFormValues = {
  page: number;
  perPage: string;
  order: "Ascendente" | "Descendente";
  orderBy: "ID" | "nro. Empleado" | "Nombre" | "Correo" | "Rol" | "Estado";
  filterBy:
    | "ID"
    | "nro. Empleado"
    | "Nombre"
    | "Correo"
    | "Rol"
    | "Estado"
    | "Ninguno";
  operator?: "=" | "!=" | "<" | "<=" | ">" | ">=";
  id?: number;
  numEmpleado?: number;
  nombre?: string;
  correo?: string;
  rol?: string;
  estado?: string;
};
