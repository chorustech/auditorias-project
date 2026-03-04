import { InsertUpdateUserContent } from "@/content/users/management/insertUpdateUser/InsertUpdateUserContent";

export default async function UserUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <InsertUpdateUserContent isUpdate id={id} />;
}
