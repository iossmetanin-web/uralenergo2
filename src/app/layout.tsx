import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Inter — Wide grotesque sans for headings (Cyrillic support)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

// JetBrains Mono — Monospace for data (Cyrillic support)
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

// Playfair Display — Display serif italic for drama (Cyrillic support)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  style: ["italic", "normal"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "УРАЛЭНЕРГО — Трансформаторы и КТП | Завод полного цикла",
  description: "Завод полного цикла по производству трансформаторов и КТП. Отгружаем типовое оборудование за 1 день. Проектируем аналоги ABB и Siemens с надежностью на 15% выше конкурентов.",
  keywords: ["трансформаторы", "КТП", "УРАЛЭНЕРГО", "энергетика", "промышленность", "Россети", "Росатом"],
  authors: [{ name: "УРАЛЭНЕРГО" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "УРАЛЭНЕРГО — Трансформаторы и КТП",
    description: "Запуск объекта в срок без риска аварий. Завод полного цикла.",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "УРАЛЭНЕРГО — Трансформаторы и КТП",
    description: "Запуск объекта в срок без риска аварий",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#121212" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} antialiased bg-[#121212] text-[#F5F3EE] font-sans`}
      >
        {/* Global Noise Overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
