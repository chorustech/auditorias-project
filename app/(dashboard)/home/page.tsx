"use server";

import { SectionContainer } from "@/components/shared/sectionContainer/SectionContainer";
import { HomeContent } from "@/content/home/HomeContent";
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookieStore = await cookies();
  const user = cookieStore.get("user");

  if (user) {
    const _user = JSON.parse(user.value);
    console.log("User cookie found.");

    if (_user.rol == "administrador") {
      console.log("Es admin we")
    } else {
      console.log("POs no es")
    }
  }

  return (
    <SectionContainer>
      <HomeContent />
    </SectionContainer>
  );
}
