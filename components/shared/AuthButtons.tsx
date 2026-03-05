"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (session) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <p>
          Hola, {session.user?.name} ({session.user?.role})
        </p>
        <Button onClick={() => signOut()}>Cerrar Sesión</Button>
      </div>
    );
  }

  return <Button onClick={() => signIn("azure-ad")}>Iniciar Sesión</Button>;
}
