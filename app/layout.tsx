import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Undangan Pernikahan Muhammad Rizky Akbar & Ika Rahim | 31 Juli 2026",
  description:
    "Dengan rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara untuk menghadiri pernikahan Muhammad Rizky Akbar & Ika Rahim pada 31 Juli 2026 di Kp. Pondok Soga, Desa Sukatenang, Bekasi.",
  keywords: [
    "undangan pernikahan",
    "Muhammad Rizky Akbar",
    "Ika Rahim",
    "wedding invitation",
    "pernikahan 2026",
    "Bekasi",
  ],
  openGraph: {
    title: "Undangan Pernikahan Rizky & Ika",
    description: "31 Juli 2026 | Kp. Pondok Soga, Bekasi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Undangan Pernikahan Rizky & Ika",
    description: "31 Juli 2026 | Kp. Pondok Soga, Bekasi",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0D0A0B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
