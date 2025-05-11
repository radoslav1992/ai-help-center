'use client';

import { motion } from 'framer-motion';
import { FiCpu, FiZap, FiGlobe, FiBarChart2, FiMessageCircle, FiShield } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const translations = {
  en: {
    title: 'Our Services',
    subtitle: 'We offer a comprehensive range of AI-powered solutions to help your business thrive in the digital age.',
    aiSolutions: 'Custom AI Solutions',
    aiSolutionsDesc: 'Tailored AI solutions designed to solve your specific business challenges and enhance decision-making processes.',
    automation: 'Business Automation',
    automationDesc: 'Streamline workflows and eliminate repetitive tasks with intelligent automation systems that save time and reduce errors.',
    webDev: 'Modern Websites',
    webDevDesc: 'Beautiful, responsive websites built with the latest technologies to ensure optimal performance and user experience.',
    dataAnalytics: 'Data Analytics',
    dataAnalyticsDesc: 'Transform your data into actionable insights with advanced analytics and visualization tools.',
    aiChatbots: 'AI Chatbots',
    aiChatbotsDesc: 'Intelligent conversational agents that provide 24/7 customer support and enhance user engagement.',
    aiSecurity: 'AI Security Solutions',
    aiSecurityDesc: 'Protect your digital assets with AI-powered security systems that detect and prevent threats in real-time.'
  },
  bg: {
    title: 'Нашите Услуги',
    subtitle: 'Предлагаме широка гама от решения, базирани на изкуствен интелект, които помагат на вашия бизнес да процъфтява в дигиталната ера.',
    aiSolutions: 'Персонализирани AI Решения',
    aiSolutionsDesc: 'Персонализирани AI решения, проектирани да решават вашите конкретни бизнес предизвикателства и да подобрят процесите на вземане на решения.',
    automation: 'Бизнес Автоматизация',
    automationDesc: 'Оптимизирайте работните процеси и елиминирайте повтарящите се задачи с интелигентни системи за автоматизация, които спестяват време и намаляват грешките.',
    webDev: 'Модерни Уебсайтове',
    webDevDesc: 'Красиви, адаптивни уебсайтове, изградени с най-новите технологии, които осигуряват оптимална производителност и потребителско изживяване.',
    dataAnalytics: 'Анализ на Данни',
    dataAnalyticsDesc: 'Трансформирайте вашите данни в ценни прозрения с помощта на усъвършенствани инструменти за анализ и визуализация.',
    aiChatbots: 'AI Чатботове',
    aiChatbotsDesc: 'Интелигентни разговорни агенти, които предоставят 24/7 клиентска поддръжка и подобряват потребителското взаимодействие.',
    aiSecurity: 'AI Решения за Сигурност',
    aiSecurityDesc: 'Защитете вашите дигитални активи с AI-базирани системи за сигурност, които откриват и предотвратяват заплахи в реално време.'
  }
};

const Services = () => {
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

  const serviceItems = [
    {
      icon: <FiCpu className="w-6 h-6" />,
      title: t.aiSolutions,
      description: t.aiSolutionsDesc,
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: t.automation,
      description: t.automationDesc,
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: t.webDev,
      description: t.webDevDesc,
    },
    {
      icon: <FiBarChart2 className="w-6 h-6" />,
      title: t.dataAnalytics,
      description: t.dataAnalyticsDesc,
    },
    {
      icon: <FiMessageCircle className="w-6 h-6" />,
      title: t.aiChatbots,
      description: t.aiChatbotsDesc,
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: t.aiSecurity,
      description: t.aiSecurityDesc,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {serviceItems.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-800"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 