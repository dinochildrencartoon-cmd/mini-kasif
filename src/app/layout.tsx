import type { Metadata, Viewport } from "next";
import { Inter, Quicksand } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mini Kâşif - Çocuklar İçin Güvenli Eğitici Macera Portalı",
  description: "3-6 yaş arası çocuklar için ekran süresi sınırlı, pedagojik onaylı, eğlenceli ve güvenli dijital öğrenme dünyası. Renkleri, sayıları, şekilleri keşfedin!",
  keywords: "eğitici çocuk oyunu, okul öncesi eğitim, güvenli ekran süresi, çocuklar için renkler, mini kâşif, çocuk gelişim raporu",
  authors: [{ name: "Mini Kâşif Ekibi" }],
  openGraph: {
    title: "Mini Kâşif - Çocuklar İçin Güvenli Eğitici Öğrenme Portalı",
    description: "3-6 yaş arası çocuklar için ekran süresi sınırlı, pedagojik onaylı eğlenceli dijital öğrenme dünyası.",
    locale: "tr_TR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${quicksand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
