import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ScenarioProvider } from "@/contexts/ScenarioContext";
import { AuthProvider } from "@/contexts/AuthContext";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <div className="flex flex-col min-h-screen">
          <AuthProvider>
            <Header />
            <ScenarioProvider>
              <main className="flex-grow">{children}</main>
            </ScenarioProvider>
            <Footer />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
