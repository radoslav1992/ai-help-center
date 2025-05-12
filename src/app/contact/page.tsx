'use client';

import { useEffect, useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { LanguageProvider } from '@/context/LanguageContext';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import ClientOnly from '@/components/ClientOnly';
import ScrollToTop from '@/components/ScrollToTop';

const translations = {
  en: {
    title: 'Get in Touch',
    subtitle: 'Have a question or ready to transform your business with AI? Our team is here to help. Fill out the form below or contact us directly.',
    sendMessage: 'Send Us a Message',
    name: 'Your Name',
    email: 'Email Address',
    phone: 'Phone Number',
    company: 'Company Name',
    industry: 'Industry',
    industryPlaceholder: 'Select your industry',
    industries: {
      technology: 'Technology',
      finance: 'Finance',
      healthcare: 'Healthcare',
      education: 'Education',
      retail: 'Retail',
      manufacturing: 'Manufacturing',
      entertainment: 'Entertainment',
      other: 'Other'
    },
    serviceInterested: 'Service Interested In',
    generalInquiry: 'General Inquiry',
    aiSolutions: 'AI Solutions',
    automation: 'Business Automation',
    webDev: 'Web Development',
    dataAnalytics: 'Data Analytics',
    aiChatbots: 'AI Chatbots',
    message: 'Your Message',
    send: 'Send Message',
    sending: 'Sending...',
    contactInfo: 'Contact Information',
    location: 'Our Location',
    locationValue: '43 bul Gotse Delchev, Sofia 1680, Bulgaria',
    phoneTitle: 'Phone Number',
    phoneValue: '',
    emailTitle: 'Email Address',
    businessHours: 'Business Hours',
    monFri: 'Monday - Friday:',
    monFriHours: '9:00 AM - 6:00 PM',
    saturday: 'Saturday:',
    saturdayHours: '10:00 AM - 4:00 PM',
    sunday: 'Sunday:',
    sundayValue: 'Closed',
    followUs: 'Follow Us',
    thankYou: 'Thank You for Reaching Out!',
    receivedMessage: "We've received your message and will get back to you as soon as possible.",
    sendAnother: 'Send Another Message',
    errorMessage: 'There was an error submitting your form. Please try again.',
    requiredField: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
  },
  bg: {
    title: 'Свържете се с нас',
    subtitle: 'Имате въпрос или сте готови да трансформирате бизнеса си с AI? Нашият екип е тук, за да ви помогне. Попълнете формуляра по-долу или се свържете с нас директно.',
    sendMessage: 'Изпратете ни съобщение',
    name: 'Вашето име',
    email: 'Имейл адрес',
    phone: 'Телефонен номер',
    company: 'Име на компанията',
    industry: 'Индустрия',
    industryPlaceholder: 'Изберете вашата индустрия',
    industries: {
      technology: 'Технологии',
      finance: 'Финанси',
      healthcare: 'Здравеопазване',
      education: 'Образование',
      retail: 'Търговия на дребно',
      manufacturing: 'Производство',
      entertainment: 'Развлечения',
      other: 'Друго'
    },
    serviceInterested: 'Услуга, от която се интересувате',
    generalInquiry: 'Общо запитване',
    aiSolutions: 'AI решения',
    automation: 'Бизнес автоматизация',
    webDev: 'Уеб разработка',
    dataAnalytics: 'Анализ на данни',
    aiChatbots: 'AI чатботове',
    message: 'Вашето съобщение',
    send: 'Изпратете съобщение',
    sending: 'Изпращане...',
    contactInfo: 'Информация за контакт',
    location: 'Нашето местоположение',
    locationValue: '43 бул. Гоце Делчев, София 1680, България',
    phoneTitle: 'Телефонен номер',
    phoneValue: '',
    emailTitle: 'Имейл адрес',
    businessHours: 'Работно време',
    monFri: 'Понеделник - Петък:',
    monFriHours: '9:00 - 18:00',
    saturday: 'Събота:',
    saturdayHours: '10:00 - 16:00',
    sunday: 'Неделя:',
    sundayValue: 'Затворено',
    followUs: 'Последвайте ни',
    thankYou: 'Благодарим ви, че се свързахте с нас!',
    receivedMessage: 'Получихме вашето съобщение и ще се свържем с вас възможно най-скоро.',
    sendAnother: 'Изпратете друго съобщение',
    errorMessage: 'Възникна грешка при изпращането на формуляра. Моля, опитайте отново.',
    requiredField: 'Това поле е задължително',
    invalidEmail: 'Моля, въведете валиден имейл адрес',
  }
};

function ContactContent() {
  const [language, setLanguage] = useState<'en' | 'bg'>('en');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1500);
  };

  return (
    <LanguageProvider>
      <main className="min-h-screen">
        {/* Contact Hero */}
        <div className="relative pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-40 left-10 w-32 h-32 rounded-full bg-blue-200/50 dark:bg-blue-900/20 blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-purple-200/50 dark:bg-purple-900/20 blur-xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.title}
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t.subtitle}
            </motion.p>
          </div>
        </div>
        
        {/* Contact Form and Info */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t.sendMessage}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition-colors"
                      placeholder={t.name}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition-colors"
                      placeholder={t.email}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.serviceInterested}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition-colors"
                      placeholder={t.generalInquiry}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition-colors resize-none"
                      placeholder={t.message}
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className={`w-full py-3 px-6 rounded-lg text-white font-medium 
                        ${formStatus === 'submitting' ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'} 
                        transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg`}
                    >
                      {formStatus === 'submitting' ? t.sending : t.send}
                    </button>
                  </div>
                  
                  {formStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-3 rounded-lg"
                    >
                      {t.thankYou}
                    </motion.div>
                  )}
                  
                  {formStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-3 rounded-lg"
                    >
                      {t.errorMessage}
                    </motion.div>
                  )}
                </form>
              </motion.div>
              
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Contact Info */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-white">
                    {t.contactInfo}
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <FiMapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{t.location}</h4>
                        <p className="text-white/90">
                          <a 
                            href="https://maps.google.com/?q=1234+Main+St,+Sofia,+Bulgaria" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {t.locationValue}
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <FiPhone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{t.phoneTitle}</h4>
                        <p className="text-white/90">
                          <a 
                            href="tel:+359123456789" 
                            className="hover:underline"
                          >
                            {t.phoneValue}
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <FiMail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{t.emailTitle}</h4>
                        <p className="text-white/90">
                          <a 
                            href="mailto:info@ai-help-center.com" 
                            className="hover:underline"
                          >
                            info@ai-help-center.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Business Hours */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <FiClock className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t.businessHours}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">{t.monFri}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{t.monFriHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">{t.saturday}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{t.saturdayHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">{t.sunday}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{t.sundayValue}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Map */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t.location}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t.locationValue}
              </p>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-xl h-96">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.5354167011933!2d23.32233387672872!3d42.69718441669258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8682cb317bf5%3A0x400a01269bf5e60!2sSofia%20Center%2C%20Sofia%2C%20Bulgaria!5e0!3m2!1sen!2sus!4v1699305767368!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Location map"
              ></iframe>
            </div>
          </div>
        </section>
        
        <ScrollToTop />
      </main>
    </LanguageProvider>
  );
}

export default function Contact() {
  return (
    <ClientOnly fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
      <ContactContent />
    </ClientOnly>
  );
} 