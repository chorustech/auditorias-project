/* DATA */
import { usersColumnsHeaders } from "@/components/shared/download/data/users/usersColumnsHeaders";

/* TYPES */
import { UserType } from "@/temp/Users/Infrastructure/Types/userData";

export function transformUsersForExcel(users: UserType[]): string[][] {
  const rows: string[][] = [];

  console.log(users);

  if (users.length > 0) {
    rows.push(usersColumnsHeaders);

    users.map((user) => {
      const final_user: string[] = [];

      final_user.push(user.id.toString());
      final_user.push(user.numEmpleado.toString());
      final_user.push(user.nombre);
      final_user.push(user.email);
      final_user.push(user.rol);
      final_user.push(user.estado);

      rows.push(final_user);
    });
  }

  console.log(rows);

  return rows;
}
