'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const translations = {
  en: {
    title1: 'Transform Your Business with',
    title2: 'Intelligent AI Solutions',
    description: 'We build custom AI solutions, automations, and modern websites that help businesses increase productivity and deliver exceptional customer experiences.',
    getStarted: 'Get Started',
    exploreServices: 'Explore Services',
    aiSolutions: 'AI Solutions',
    aiSolutionsDesc: 'Custom AI integration',
    automation: 'Automation',
    automationDesc: 'Streamline workflows',
    webDev: 'Web Development',
    webDevDesc: 'Modern websites',
    support: '24/7 Support',
    supportDesc: 'Always available',
    aiHelpCenter: 'AI Help Center',
    partnerText: 'Your partner for intelligent solutions'
  },
  bg: {
    title1: 'Трансформирайте бизнеса си с',
    title2: 'Интелигентни AI решения',
    description: 'Ние изграждаме персонализирани AI решения, автоматизации и модерни уебсайтове, които помагат на бизнеса да повиши продуктивността и да предостави изключително клиентско изживяване.',
    getStarted: 'Започнете',
    exploreServices: 'Разгледайте услугите',
    aiSolutions: 'AI Решения',
    aiSolutionsDesc: 'Персонализирана AI интеграция',
    automation: 'Автоматизация',
    automationDesc: 'Оптимизиране на работния процес',
    webDev: 'Уеб Разработка',
    webDevDesc: 'Модерни уебсайтове',
    support: '24/7 Поддръжка',
    supportDesc: 'Винаги на разположение',
    aiHelpCenter: 'AI Help Center',
    partnerText: 'Вашият партньор за интелигентни решения'
  }
};

const Hero = () => {
  const [language, setLanguage] = useState<'en' | 'bg'>('en');

  useEffect(() => {
    // Check if there's a language preference stored
    const storedLanguage = localStorage.getItem('language') as 'en' | 'bg' | null;
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'bg')) {
      setLanguage(storedLanguage);
    }

    // Listen for custom language change events
    const handleLanguageChange = (e: CustomEvent) => {
      setLanguage(e.detail.language);
      localStorage.setItem('language', e.detail.language);
    };

    window.addEventListener('languageChange' as any, handleLanguageChange as any);

    return () => {
      window.removeEventListener('languageChange' as any, handleLanguageChange as any);
    };
  }, []);

  const t = translations[language];

  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-300/30 dark:bg-purple-900/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-300/30 dark:bg-blue-900/20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Hero content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block">{t.title1}</span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.title2}
              </span>
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
              {t.description}
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/contact" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-center">
                {t.getStarted}
              </Link>
              <Link href="/services" className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 text-center">
                {t.exploreServices}
              </Link>
            </div>
          </motion.div>
          
          {/* Hero image */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
                <div className="relative z-10 text-white text-center p-6">
                  <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                    <div className="relative w-24 h-24">
                      <Image
                        src="/logo.png"
                        alt="AI Help Center Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{t.aiHelpCenter}</h3>
                  <p className="text-white/80">{t.partnerText}</p>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold">{t.aiSolutions}</h4>
                      <p className="text-sm text-white/70">{t.aiSolutionsDesc}</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold">{t.automation}</h4>
                      <p className="text-sm text-white/70">{t.automationDesc}</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold">{t.webDev}</h4>
                      <p className="text-sm text-white/70">{t.webDevDesc}</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-semibold">{t.support}</h4>
                      <p className="text-sm text-white/70">{t.supportDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 