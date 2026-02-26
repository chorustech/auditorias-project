"use server";

export type UserData = {
  data: UserType[];
  count: number;
};

export type UserType = {
  id: number;
  numEmpleado: string;
  nombre: string;
  email: string;
  rol: string;
};

export async function getUsers(): Promise<UserData> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return {
    data: [
      {
        id: 1,
        numEmpleado: "2308",
        nombre: "Pirita Dreemurr",
        email: "pirita@gmail.com",
        rol: "Admin",
      },
      {
        id: 2,
        numEmpleado: "512",
        nombre: "Cornalina Dreemurr",
        email: "cornalina@gmail.com",
        rol: "Calidad",
      },
    ],
    count: 2,
  };
}
