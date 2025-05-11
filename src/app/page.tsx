'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import PortfolioHighlight from '@/components/PortfolioHighlight';

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <Services />
        <PortfolioHighlight />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
