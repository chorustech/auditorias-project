import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">Ruta no encontrada</p>

      <Link href="/" className="mt-6 px-6 py-3 bg-black text-white rounded-lg">
        Volver al inicio
      </Link>
    </div>
  );
}
