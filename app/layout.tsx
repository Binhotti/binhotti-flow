import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Nexo Finance",
  description: "Seu dinheiro, com clareza.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
