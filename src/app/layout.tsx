import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ScenarioProvider } from "@/contexts/ScenarioContext";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PoliceTrain - Интерактивная тренировочная платформа",
  description: "Виртуальная платформа для подготовки полицейских к различным ситуациям",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <ScenarioProvider>
            <main className="flex-grow">{children}</main>
          </ScenarioProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
