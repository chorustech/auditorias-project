export type UserData = {
  data: UserType[];
  count: number;
  ok: boolean;
  message: string;
};

export type UserType = {
  id: number;
  numEmpleado: number;
  nombre: string;
  email: string;
  rol: string;
  estado: string
};
