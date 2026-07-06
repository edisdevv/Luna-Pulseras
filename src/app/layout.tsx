import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import { CarritoProvider } from "@/context/CarritoContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { NOMBRE_TIENDA } from "@/lib/constantes";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-worksans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${NOMBRE_TIENDA} — Pulseras de piedra hechas a mano`,
  description:
    "Pulseras artesanales de piedras naturales, hechas a mano. Compra online y despacho en Concepción.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${fraunces.variable} ${workSans.variable} font-body`}>
        <AuthProvider>
          <CarritoProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <footer className="border-t border-arena bg-crema py-8 text-center text-sm text-cafe/70 font-body">
              <p>
                {NOMBRE_TIENDA} · Hecho a mano en Concepción, Chile
              </p>
            </footer>
          </CarritoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
