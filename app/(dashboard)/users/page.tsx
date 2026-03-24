import { SelectUsersContent } from "@/content/users/management/selectUsers/SelectUsersContent";
import { getSessionUser } from "@/src/shared/infrastructure/utils/get-session-user";
import { redirect } from "next/navigation";

export default async function UsersPage() {
    const user = await getSessionUser();
  
    if (user?.rol !== "administrador") {
      redirect("/home"); // Redirige a la página principal del dashboard si el usuario no es administrador
    }
  return <SelectUsersContent />;
}
