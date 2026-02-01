import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ weight: "400" });

export const metadata: Metadata = {
  title: "Módulos de Auditoría",
  description:
    "Este sitio web aporta al usuario un espacio para realizar auditorias de calidad en los procesos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
