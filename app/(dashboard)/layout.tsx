import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{ width: 200, background: "#111", color: "#fff", padding: 20 }}
      >
        <h3>Menú</h3>
        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link href="/home">Home</Link>
          <Link href="/options">Options</Link>
        </nav>
      </aside>

      {/* Contenido */}
      <main style={{ padding: 40, flex: 1 }}>{children}</main>
    </div>
  );
}
