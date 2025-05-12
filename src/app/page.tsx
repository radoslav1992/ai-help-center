'use client';

import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ScrollToTop from '@/components/ScrollToTop';
import { LanguageProvider } from '@/context/LanguageContext';
import PortfolioHighlight from '@/components/PortfolioHighlight';
import { motion } from 'framer-motion';
import ClientOnly from '@/components/ClientOnly';

function HomeContent() {
  return (
    <LanguageProvider>
      <motion.main 
        className="min-h-screen page-transition"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <Services />
        <PortfolioHighlight />
        <ScrollToTop />
      </motion.main>
    </LanguageProvider>
  );
}

export default function Home() {
  return (
    <ClientOnly fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </ClientOnly>
  );
}
