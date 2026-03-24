import { InsertUpdateUserContent } from "@/content/users/management/insertUpdateUser/InsertUpdateUserContent";
import { getSessionUser } from "@/src/shared/infrastructure/utils/get-session-user";
import { redirect } from "next/dist/client/components/navigation";

export default async function UserInsertPage() {
      const user = await getSessionUser();
    
      if (user?.rol !== "administrador") {
        redirect("/home"); // Redirige a la página principal del dashboard si el usuario no es administrador
      }
  return <InsertUpdateUserContent isUpdate={false} id="" />;
}
