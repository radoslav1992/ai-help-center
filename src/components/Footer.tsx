'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiGithub, FiArrowRight, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Image from 'next/image';

const translations = {
  en: {
    description: 'Providing cutting-edge AI solutions and services to help businesses thrive in the digital age.',
    getStarted: 'Get Started',
    quickLinks: 'Quick Links',
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    contact: 'Contact',
    blog: 'Blog',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    ourServices: 'Our Services',
    aiSolutions: 'AI Solutions',
    automation: 'Business Automation',
    webDev: 'Web Development',
    dataAnalytics: 'Data Analytics',
    aiChatbots: 'AI Chatbots',
    contactUs: 'Contact Us',
    location: 'Our Location',
    locationValue: '43 bul Gotse Delchev, Sofia 1680, Bulgaria',
    phone: 'Phone Number',
    phoneValue: '(123) 456-7890',
    email: 'Email Address',
    businessHours: 'Business Hours',
    monFri: 'Monday - Friday:',
    monFriHours: '9:00 AM - 6:00 PM',
    saturday: 'Saturday:',
    saturdayHours: '10:00 AM - 4:00 PM',
    sunday: 'Sunday:',
    sundayValue: 'Closed',
    followUs: 'Follow Us',
    connect: 'Stay Connected',
    subscribe: 'Subscribe to our newsletter',
    subscribeButton: 'Subscribe',
    subscribeInfo: 'Get the latest news and updates from our team.',
    allRights: 'All rights reserved.',
  },
  bg: {
    description: 'Предоставяме съвременни AI решения и услуги, които помагат на бизнеса да процъфтява в дигиталната ера.',
    getStarted: 'Започнете',
    quickLinks: 'Бързи Връзки',
    home: 'Начало',
    about: 'За нас',
    services: 'Услуги',
    contact: 'Контакти',
    blog: 'Блог',
    legal: 'Правна информация',
    privacy: 'Политика за поверителност',
    terms: 'Условия за ползване',
    ourServices: 'Нашите Услуги',
    aiSolutions: 'AI Решения',
    automation: 'Бизнес Автоматизация',
    webDev: 'Уеб Разработка',
    dataAnalytics: 'Анализ на Данни',
    aiChatbots: 'AI Чатботове',
    contactUs: 'Свържете се с нас',
    location: 'Нашето местоположение',
    locationValue: 'бул. Гоце Делчев 43, София 1680, България',
    phone: 'Телефонен номер',
    phoneValue: '(123) 456-7890',
    email: 'Имейл адрес',
    businessHours: 'Работно време',
    monFri: 'Понеделник - Петък:',
    monFriHours: '9:00 - 18:00',
    saturday: 'Събота:',
    saturdayHours: '10:00 - 16:00',
    sunday: 'Неделя:',
    sundayValue: 'Затворено',
    followUs: 'Последвайте ни',
    connect: 'Останете свързани',
    subscribe: 'Абонирайте се за нашия бюлетин',
    subscribeButton: 'Абонирай се',
    subscribeInfo: 'Получавайте най-новите новини и актуализации от нашия екип.',
    allRights: 'Всички права запазени.',
  }
};

const Footer = () => {
  const [language, setLanguage] = useState<'en' | 'bg'>('en');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();
  
  useEffect(() => {
    // Check if there's a language preference stored
    const storedLanguage = localStorage.getItem('language') as 'en' | 'bg' | null;
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'bg')) {
      setLanguage(storedLanguage);
    }

    // Listen for custom language change events
    const handleLanguageChange = (e: CustomEvent) => {
      setLanguage(e.detail.language);
    };

    window.addEventListener('languageChange' as any, handleLanguageChange as any);

    return () => {
      window.removeEventListener('languageChange' as any, handleLanguageChange as any);
    };
  }, []);

  const t = translations[language];
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }, 1000);
  };

  const linkVariants = {
    hover: {
      x: 5,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const footerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple-100/30 dark:bg-purple-900/10 blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        {/* Main footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About section */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="col-span-1 lg:col-span-1"
            >
              <motion.div variants={footerItem}>
                <Link href="/" className="flex items-center mb-6">
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
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t.description}
                </p>
                
                <Link href="/contact" className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                  {t.getStarted}
                  <FiArrowRight className="ml-2" />
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Quick links & Legal */}
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="col-span-1"
            >
              <motion.h3 variants={footerItem} className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t.quickLinks}
              </motion.h3>
              <motion.ul variants={staggerContainer} className="space-y-3">
                <motion.li variants={footerItem}>
                  <motion.div whileHover="hover">
                    <Link href="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors flex items-center">
                      <motion.span variants={linkVariants}>{t.home}</motion.span>
                    </Link>
                  </motion.div>
                </motion.li>
                <motion.li variants={footerItem}>
                  <motion.div whileHover="hover">
                    <Link href="/services" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors flex items-center">
                      <motion.span variants={linkVariants}>{t.services}</motion.span>
                    </Link>
                  </motion.div>
                </motion.li>
                <motion.li variants={footerItem}>
                  <motion.div whileHover="hover">
                    <Link href="/about" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors flex items-center">
                      <motion.span variants={linkVariants}>{t.about}</motion.span>
                    </Link>
                  </motion.div>
                </motion.li>
                <motion.li variants={footerItem}>
                  <motion.div whileHover="hover">
                    <Link href="/contact" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors flex items-center">
                      <motion.span variants={linkVariants}>{t.contact}</motion.span>
                    </Link>
                  </motion.div>
                </motion.li>
                <motion.li variants={footerItem}>
                  <motion.div whileHover="hover">
                    <Link href="/blog" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors flex items-center">
                      <motion.span variants={linkVariants}>{t.blog}</motion.span>
                    </Link>
                  </motion.div>
                </motion.li>
              </motion.ul>
              
              <motion.h3 variants={footerItem} className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                {t.legal}
              </motion.h3>
              <motion.ul variants={staggerContainer} className="space-y-3">
                <motion.li variants={footerItem}>
                  <motion.div whileHover="hover">
                    <Link href="/privacy-policy" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors flex items-center">
                      <motion.span variants={linkVariants}>{t.privacy}</motion.span>
                    </Link>
                  </motion.div>
                </motion.li>
                <motion.li variants={footerItem}>
                  <motion.div whileHover="hover">
                    <Link href="/terms-of-service" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors flex items-center">
                      <motion.span variants={linkVariants}>{t.terms}</motion.span>
                    </Link>
                  </motion.div>
                </motion.li>
              </motion.ul>
            </motion.div>
            
            {/* Contact and social */}
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="col-span-1"
            >
              <motion.h3 variants={footerItem} className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t.contactUs}
              </motion.h3>
              <motion.ul variants={staggerContainer} className="space-y-4 mb-6">
                <motion.li variants={footerItem} className="flex items-start">
                  <FiMapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">{t.locationValue}</span>
                </motion.li>
                <motion.li variants={footerItem} className="flex items-center">
                  <FiPhone className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">{t.phoneValue}</span>
                </motion.li>
                <motion.li variants={footerItem} className="flex items-center">
                  <FiMail className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
                  <a href="mailto:info@aihelpcenter.com" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                    info@aihelpcenter.com
                  </a>
                </motion.li>
              </motion.ul>
              
              <motion.h3 variants={footerItem} className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t.followUs}
              </motion.h3>
              <motion.div variants={footerItem} className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors duration-300">
                  <FiFacebook className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-400 transition-colors duration-300">
                  <FiTwitter className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 transition-colors duration-300">
                  <FiInstagram className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-700 hover:text-white dark:hover:bg-blue-700 transition-colors duration-300">
                  <FiLinkedin className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>
            
            {/* Newsletter */}
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="col-span-1"
            >
              <motion.h3 variants={footerItem} className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t.connect}
              </motion.h3>
              
              <motion.div variants={footerItem} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700">
                <h4 className="text-gray-900 dark:text-white font-medium mb-3">{t.subscribe}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{t.subscribeInfo}</p>
                
                {subscribed ? (
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Thank you for subscribing!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <svg className="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        t.subscribeButton
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
              
              {/* Map */}
              <motion.div 
                variants={footerItem} 
                className="rounded-lg overflow-hidden shadow-md relative h-36 mt-6 border border-gray-100 dark:border-gray-700"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.4984396459944!2d23.24886117585968!3d42.65816171684147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa83e2834af2ef%3A0xda3cae5ac889d553!2sul.%20%22Gotse%20Delchev%22%2043%2C%201680%20Sofia%20Center%2C%20Sofia%2C%20Bulgaria!5e0!3m2!1sen!2sus!4v1698712345678!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AI Help Center Location"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                ></iframe>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Copyright bar */}
        <div className="border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} AI Help Center. {t.allRights}
            </div>
            <div className="text-gray-500 dark:text-gray-500 text-sm">
              Designed with <span className="text-red-500">♥</span> in Sofia, Bulgaria
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 