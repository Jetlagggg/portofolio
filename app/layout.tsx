import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yoshua Pandawinatha — Portofolio",
  description:
    "Portofolio Yoshua Pandawinatha, mahasiswa Teknik Informatika di Samarinda. Proyek pengembangan web, IoT, dan eksplorasi analisis data.",
  openGraph: {
    title: "Yoshua Pandawinatha — Portofolio",
    description:
      "Portofolio Yoshua Pandawinatha: proyek web, IoT, dan eksplorasi analisis data dari Samarinda.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
