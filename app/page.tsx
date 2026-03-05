import AuthButtons from "@/components/shared/AuthButtons";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <h1>Bienvenido</h1>
      <AuthButtons />
    </main>
  );
}
