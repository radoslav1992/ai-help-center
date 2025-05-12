import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiChatbot from "@/components/AiChatbot";

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
  icons: {
    icon: '/favicon.png',
  },
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
        <Navbar />
        {children}
        <Footer />
        <AiChatbot />
      </body>
    </html>
  );
}
