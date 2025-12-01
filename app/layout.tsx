import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EM Hub – EM Vidros",
  description:
    "Dashboard gerencial do EM Hub para EM Vidros, com indicadores de diretoria, produção, comercial e estoque.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full overflow-hidden">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-background text-foreground h-full overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}

