'use client';

import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const translations = {
  en: {
    description: 'Providing cutting-edge AI solutions and services to help businesses thrive in the digital age.',
    quickLinks: 'Quick Links',
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    contact: 'Contact',
    blog: 'Blog',
    ourServices: 'Our Services',
    aiSolutions: 'AI Solutions',
    automation: 'Business Automation',
    webDev: 'Web Development',
    dataAnalytics: 'Data Analytics',
    aiChatbots: 'AI Chatbots',
    contactUs: 'Contact Us',
    location: 'Our Location',
    locationValue: '123 AI Street, Tech City, TC 12345',
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
    allRights: 'All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service'
  },
  bg: {
    description: 'Предоставяме съвременни AI решения и услуги, които помагат на бизнеса да процъфтява в дигиталната ера.',
    quickLinks: 'Бързи Връзки',
    home: 'Начало',
    about: 'За нас',
    services: 'Услуги',
    contact: 'Контакти',
    blog: 'Блог',
    ourServices: 'Нашите Услуги',
    aiSolutions: 'AI Решения',
    automation: 'Бизнес Автоматизация',
    webDev: 'Уеб Разработка',
    dataAnalytics: 'Анализ на Данни',
    aiChatbots: 'AI Чатботове',
    contactUs: 'Свържете се с нас',
    location: 'Нашето местоположение',
    locationValue: 'ул. AI 123, Тех Сити, ТС 12345',
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
    allRights: 'Всички права запазени.',
    privacyPolicy: 'Политика за поверителност',
    termsOfService: 'Общи условия'
  }
};

const Footer = () => {
  const [language, setLanguage] = useState<'en' | 'bg'>('en');
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
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center mb-5">
              <div className="relative w-10 h-10 mr-2">
                <Image 
                  src="/logo.png" 
                  alt="AI Help Center Logo" 
                  fill 
                  className="object-contain" 
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Help Center
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              {t.description}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FiLinkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FiTwitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FiFacebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FiInstagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">{t.quickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t.about}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t.services}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t.contact}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t.blog}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">{t.ourServices}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services#ai-solutions" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t.aiSolutions}
                </Link>
              </li>
              <li>
                <Link href="/services#automation" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t.automation}
                </Link>
              </li>
              <li>
                <Link href="/services#web-development" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t.webDev}
                </Link>
              </li>
              <li>
                <Link href="/services#data-analytics" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t.dataAnalytics}
                </Link>
              </li>
              <li>
                <Link href="/services#ai-chatbots" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t.aiChatbots}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">{t.contactUs}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FiMapPin className="w-5 h-5 text-blue-400 mr-3 mt-1" />
                <span>{t.locationValue}</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="w-5 h-5 text-blue-400 mr-3" />
                <span>{t.phoneValue}</span>
              </li>
              <li className="flex items-center">
                <FiMail className="w-5 h-5 text-blue-400 mr-3" />
                <a href="mailto:info@aihelpcenter.com" className="hover:text-blue-400 transition-colors">
                  info@aihelpcenter.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">
            &copy; {currentYear} AI Help Center. {t.allRights}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-gray-500 hover:text-blue-400 transition-colors text-sm">
              {t.privacyPolicy}
            </Link>
            <Link href="/terms-of-service" className="text-gray-500 hover:text-blue-400 transition-colors text-sm">
              {t.termsOfService}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 