import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <h1>Bienvenido</h1>
      <button>
        <Link href={"/home"}>
          Ir al panel de administración
        </Link>
      </button>
    </main>
  );
}
