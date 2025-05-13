'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiGlobe } from 'react-icons/fi';
import Image from 'next/image';

const translations = {
  en: {
    home: 'Home',
    services: 'Services',
    portfolio: 'Portfolio',
    about: 'About',
    contact: 'Contact',
    getStarted: 'Get Started',
  },
  bg: {
    home: 'Начало',
    services: 'Услуги',
    portfolio: 'Портфолио',
    about: 'За нас',
    contact: 'Контакти',
    getStarted: 'Започнете',
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<'en' | 'bg'>('en');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if there's a language preference stored
    const storedLanguage = localStorage.getItem('language') as 'en' | 'bg' | null;
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'bg')) {
      setLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'bg' : 'en';
    setLanguage(newLanguage);
    
    // Dispatch a custom event for other components to listen to
    const event = new CustomEvent('languageChange', { detail: { language: newLanguage } });
    window.dispatchEvent(event);
    localStorage.setItem('language', newLanguage);
  };

  const t = translations[language];

  const navLinks = [
    { name: t.home, href: '/' },
    { name: t.services, href: '/services' },
    { name: t.portfolio, href: '/portfolio' },
    { name: t.about, href: '/about' },
    { name: t.contact, href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="relative w-10 h-10 mr-2">
                <Image 
                  src="/logo.png" 
                  alt="AI Help Center Logo" 
                  fill 
                  className="object-contain" 
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Help Center
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center">
            <div className="flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                {t.getStarted}
              </Link>
              <button 
                onClick={toggleLanguage}
                className="ml-4 p-2 rounded-full text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Change language"
              >
                <FiGlobe className="w-5 h-5" />
                <span className="ml-1 text-xs font-semibold">{language.toUpperCase()}</span>
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleLanguage}
              className="p-2 mr-2 rounded-full text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Change language"
            >
              <FiGlobe className="w-5 h-5" />
              <span className="ml-1 text-xs font-semibold">{language.toUpperCase()}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md text-base font-medium hover:from-blue-700 hover:to-purple-700 mt-4"
              onClick={() => setIsOpen(false)}
            >
              {t.getStarted}
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 