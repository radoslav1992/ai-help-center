'use client';

import { useEffect, useState } from 'react';
import ScrollToTop from '@/components/ScrollToTop';
import Services from '@/components/Services';
import { LanguageProvider } from '@/context/LanguageContext';
import { FiCpu, FiZap, FiGlobe, FiBarChart2, FiMessageCircle, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ClientOnly from '@/components/ClientOnly';

const translations = {
  en: {
    title: 'Our Services',
    subtitle: 'Explore our comprehensive range of AI solutions, automation services, and web development offerings designed to transform your business.',
    aiSolutions: 'Custom AI Solutions',
    aiSolutionsDesc: 'We develop tailored AI solutions that address your specific business challenges. Our team of AI experts works closely with you to understand your needs and create systems that deliver real value.',
    automation: 'Business Automation',
    automationDesc: 'Streamline your operations with our intelligent automation solutions. We help you identify and automate repetitive tasks, freeing up your team to focus on higher-value activities.',
    webDev: 'Modern Web Development',
    webDevDesc: 'We build beautiful, responsive websites and web applications using the latest technologies. Our focus is on creating exceptional user experiences that drive engagement and conversion.',
    dataAnalytics: 'Data Analytics',
    dataAnalyticsDesc: 'Transform your raw data into actionable insights with our advanced analytics solutions. We help you make data-driven decisions that drive business growth.',
    machineFeature: 'Machine learning models for predictive analytics',
    nlpFeature: 'Natural language processing for document analysis',
    computerVisionFeature: 'Computer vision for image and video recognition',
    recommendationFeature: 'AI-powered recommendation systems',
    workflowFeature: 'Workflow automation for business processes',
    docProcessingFeature: 'Document processing and data extraction',
    reportingFeature: 'Automated reporting and analytics',
    integrationFeature: 'Integration with existing business systems',
    responsiveFeature: 'Responsive website design and development',
    pwaFeature: 'Progressive web applications (PWAs)',
    ecommerceFeature: 'E-commerce solutions with AI-powered features',
    seoFeature: 'SEO optimization for better visibility',
    dashboardsFeature: 'Business intelligence dashboards',
    predictiveFeature: 'Predictive analytics for forecasting',
    behaviorFeature: 'Customer behavior analysis',
    monitoringFeature: 'Real-time data monitoring and alerts'
  },
  bg: {
    title: 'Нашите Услуги',
    subtitle: 'Разгледайте нашите всеобхватни решения за изкуствен интелект, услуги за автоматизация и предложения за уеб разработка, проектирани да трансформират вашия бизнес.',
    aiSolutions: 'Персонализирани AI Решения',
    aiSolutionsDesc: 'Ние разработваме персонализирани AI решения, които отговарят на вашите специфични бизнес предизвикателства. Нашият екип от AI експерти работи в тясно сътрудничество с вас, за да разбере вашите нужди и да създаде системи, които носят реална стойност.',
    automation: 'Бизнес Автоматизация',
    automationDesc: 'Оптимизирайте вашите операции с нашите интелигентни решения за автоматизация. Ние ви помагаме да идентифицирате и автоматизирате повтарящи се задачи, освобождавайки вашия екип да се фокусира върху дейности с по-висока стойност.',
    webDev: 'Модерна Уеб Разработка',
    webDevDesc: 'Ние изграждаме красиви, адаптивни уебсайтове и уеб приложения, използвайки най-новите технологии. Нашият фокус е върху създаването на изключително потребителско изживяване, което стимулира ангажираността и конверсията.',
    dataAnalytics: 'Анализ на Данни',
    dataAnalyticsDesc: 'Трансформирайте вашите необработени данни в практически прозрения с нашите усъвършенствани решения за анализ. Ние ви помагаме да вземате решения, базирани на данни, които стимулират бизнес растежа.',
    machineFeature: 'Модели за машинно обучение за прогнозен анализ',
    nlpFeature: 'Обработка на естествен език за анализ на документи',
    computerVisionFeature: 'Компютърно зрение за разпознаване на изображения и видео',
    recommendationFeature: 'Системи за препоръки, базирани на изкуствен интелект',
    workflowFeature: 'Автоматизация на работни процеси за бизнес процеси',
    docProcessingFeature: 'Обработка на документи и извличане на данни',
    reportingFeature: 'Автоматизирано отчитане и анализи',
    integrationFeature: 'Интеграция със съществуващи бизнес системи',
    responsiveFeature: 'Адаптивен дизайн и разработка на уебсайтове',
    pwaFeature: 'Прогресивни уеб приложения (PWAs)',
    ecommerceFeature: 'E-commerce решения с функции, базирани на изкуствен интелект',
    seoFeature: 'SEO оптимизация за по-добра видимост',
    dashboardsFeature: 'Бизнес разузнавателни табла',
    predictiveFeature: 'Прогнозен анализ за прогнозиране',
    behaviorFeature: 'Анализ на поведението на клиентите',
    monitoringFeature: 'Наблюдение и предупреждения в реално време'
  }
};

export default function ServicesPage() {
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
    };

    window.addEventListener('languageChange' as any, handleLanguageChange as any);

    return () => {
      window.removeEventListener('languageChange' as any, handleLanguageChange as any);
    };
  }, []);

  const t = translations[language];

  return (
    <LanguageProvider>
      <motion.main 
        className="min-h-screen page-transition"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Services Hero */}
        <div className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
        
        {/* Services List */}
        <Services />
        
        {/* Service Details */}
        <section id="service-details" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* AI Solutions */}
              <motion.div 
                id="ai-solutions" 
                className="scroll-mt-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t.aiSolutions}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t.aiSolutionsDesc}
                </p>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{t.machineFeature}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{t.nlpFeature}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{t.computerVisionFeature}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{t.recommendationFeature}</span>
                  </li>
                </ul>
              </motion.div>
              
              {/* Business Automation */}
              <motion.div 
                id="automation" 
                className="scroll-mt-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t.automation}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t.automationDesc}
                </p>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{t.workflowFeature}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{t.docProcessingFeature}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{t.reportingFeature}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{t.integrationFeature}</span>
                  </li>
                </ul>
              </motion.div>
              
              {/* Web Development */}
              <motion.div 
                id="web-development" 
                className="scroll-mt-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t.webDev}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t.webDevDesc}
                </p>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{t.responsiveFeature}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{t.pwaFeature}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{t.ecommerceFeature}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{t.seoFeature}</span>
                  </li>
                </ul>
              </motion.div>
              
              {/* Data Analytics */}
              <motion.div 
                id="data-analytics" 
                className="scroll-mt-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t.dataAnalytics}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t.dataAnalyticsDesc}
                </p>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{t.dashboardsFeature}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{t.predictiveFeature}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{t.behaviorFeature}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{t.monitoringFeature}</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
        
        <ScrollToTop />
      </motion.main>
    </LanguageProvider>
  );
} 