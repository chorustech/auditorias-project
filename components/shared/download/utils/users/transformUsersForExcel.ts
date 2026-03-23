/* DATA */
import { usersColumnsHeaders } from "@/components/shared/download/data/users/usersColumnsHeaders";

/* TYPES */
import { UserPrimitive } from "@/src/users";

export function transformUsersForExcel(users: UserPrimitive[]): string[][] {
  const rows: string[][] = [];

  if (users.length > 0) {
    rows.push(usersColumnsHeaders);

    users.map((user) => {
      const final_user: string[] = [];

      final_user.push(user.id.toString());
      final_user.push(user.numEmpleado.toString());
      final_user.push(user.nombre);
      final_user.push(user.email);
      final_user.push(user.rol);
      final_user.push(user.estado ? "ACTIVO" : "INACTIVO");

      rows.push(final_user);
    });
  }

  return rows;
}
