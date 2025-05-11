import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "AI Help Center | AI Solutions & Automations",
  description: "Professional AI solutions, automations, and modern websites for businesses. Boost productivity and customer engagement with cutting-edge AI technology.",
  keywords: "AI solutions, automation, AI agency, website development, AI integration, business automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased bg-white dark:bg-gray-950`}
      >
        {children}
      </body>
    </html>
  );
}
