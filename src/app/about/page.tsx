'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiCheck, FiTrendingUp } from 'react-icons/fi';
import Image from 'next/image';

const translations = {
  en: {
    title: 'About Us',
    subtitle: 'Learn more about AI Help Center and our mission to transform businesses with intelligent AI solutions.',
    ourStory: 'Our Story',
    storyContent: 'AI Help Center was founded in 2020 with a simple vision: to make cutting-edge AI technology accessible to businesses of all sizes. What started as a small team of passionate AI engineers has grown into a full-service agency helping companies around the world leverage the power of artificial intelligence.',
    storyContent2: 'We believe that AI should be a tool for empowerment, not replacement. Our solutions are designed to augment human capabilities, streamline operations, and unlock new opportunities for growth and innovation.',
    ourMission: 'Our Mission',
    missionContent: 'We are on a mission to democratize AI technology and help businesses stay competitive in the digital age. Through custom solutions, thoughtful implementation, and ongoing support, we aim to be your trusted partner in digital transformation.',
    ourValues: 'Our Values',
    innovation: 'Innovation',
    innovationDesc: 'We constantly explore new technologies and approaches to deliver cutting-edge solutions.',
    excellence: 'Excellence',
    excellenceDesc: 'We are committed to delivering high-quality work that exceeds expectations.',
    integrity: 'Integrity',
    integrityDesc: 'We believe in transparency, honesty, and ethical use of AI technology.',
    collaboration: 'Collaboration',
    collaborationDesc: 'We work closely with our clients to ensure solutions that truly meet their needs.',
    ourTeam: 'Our Team',
    teamDesc: 'We are a diverse team of AI engineers, data scientists, web developers, and business strategists united by our passion for technology and innovation.',
    whyChooseUs: 'Why Choose Us',
    experience: 'Experience',
    experienceDesc: 'Over 5 years of experience in AI development and implementation',
    expertise: 'Expertise',
    expertiseDesc: 'Specialized knowledge in machine learning, natural language processing, and automation',
    customSolutions: 'Custom Solutions',
    customSolutionsDesc: 'Tailored approaches to address your specific business challenges',
    ongoingSupport: 'Ongoing Support',
    ongoingSupportDesc: '24/7 support and maintenance to ensure your solutions continue to perform',
    ourClients: 'Our Clients',
    clientsDesc: 'We have had the privilege of working with businesses across various industries, from startups to established enterprises.',
    joinUs: 'Join Us on This Journey',
    joinUsDesc: 'Ready to transform your business with AI? Get in touch with us today to discuss how we can help you achieve your goals.',
    contact: 'Contact Us'
  },
  bg: {
    title: 'За нас',
    subtitle: 'Научете повече за AI Help Center и нашата мисия да трансформираме бизнеса с интелигентни AI решения.',
    ourStory: 'Нашата История',
    storyContent: 'AI Help Center е основан през 2020 година с проста визия: да направи съвременната AI технология достъпна за бизнеси от всякакъв размер. Това, което започна като малък екип от страстни AI инженери, се превърна в агенция с пълно обслужване, помагаща на компании по целия свят да се възползват от силата на изкуствения интелект.',
    storyContent2: 'Вярваме, че AI трябва да бъде инструмент за овластяване, а не за заместване. Нашите решения са проектирани да разширят човешките способности, да оптимизират операциите и да отключат нови възможности за растеж и иновации.',
    ourMission: 'Нашата Мисия',
    missionContent: 'Нашата мисия е да демократизираме AI технологията и да помогнем на бизнесите да останат конкурентни в дигиталната ера. Чрез персонализирани решения, внимателно прилагане и постоянна поддръжка, ние се стремим да бъдем вашият доверен партньор в дигиталната трансформация.',
    ourValues: 'Нашите Ценности',
    innovation: 'Иновации',
    innovationDesc: 'Ние постоянно изследваме нови технологии и подходи, за да предоставяме съвременни решения.',
    excellence: 'Съвършенство',
    excellenceDesc: 'Ние сме ангажирани да предоставяме висококачествена работа, която надминава очакванията.',
    integrity: 'Почтеност',
    integrityDesc: 'Вярваме в прозрачността, честността и етичното използване на AI технологията.',
    collaboration: 'Сътрудничество',
    collaborationDesc: 'Работим в тясно сътрудничество с нашите клиенти, за да осигурим решения, които наистина отговарят на техните нужди.',
    ourTeam: 'Нашият Екип',
    teamDesc: 'Ние сме разнообразен екип от AI инженери, учени по данни, уеб разработчици и бизнес стратези, обединени от нашата страст към технологиите и иновациите.',
    whyChooseUs: 'Защо да изберете нас',
    experience: 'Опит',
    experienceDesc: 'Над 5 години опит в разработването и внедряването на AI',
    expertise: 'Експертиза',
    expertiseDesc: 'Специализирани познания в машинно обучение, обработка на естествен език и автоматизация',
    customSolutions: 'Персонализирани решения',
    customSolutionsDesc: 'Персонализирани подходи за решаване на вашите конкретни бизнес предизвикателства',
    ongoingSupport: 'Постоянна поддръжка',
    ongoingSupportDesc: '24/7 поддръжка и обслужване, за да гарантираме, че вашите решения продължават да работят',
    ourClients: 'Нашите Клиенти',
    clientsDesc: 'Имахме привилегията да работим с бизнеси от различни индустрии, от стартъпи до утвърдени предприятия.',
    joinUs: 'Присъединете се към нас в това пътуване',
    joinUsDesc: 'Готови ли сте да трансформирате бизнеса си с AI? Свържете се с нас днес, за да обсъдим как можем да ви помогнем да постигнете вашите цели.',
    contact: 'Свържете се с нас'
  }
};

export default function AboutPage() {
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
      <main className="min-h-screen">
        <Navbar />
        
        {/* About Hero */}
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
        
        {/* Our Story Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t.ourStory}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t.storyContent}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.storyContent2}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-500/90 to-purple-600/90 rounded-xl overflow-hidden p-8 text-white"
              >
                <h3 className="text-2xl font-bold mb-4">{t.ourMission}</h3>
                <p className="text-white/90">
                  {t.missionContent}
                </p>
                
                <div className="w-32 h-32 mx-auto mt-12 relative">
                  <div className="relative w-full h-full">
                    <Image
                      src="/logo.png"
                      alt="AI Help Center Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {t.ourValues}
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  <FiTrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t.innovation}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.innovationDesc}</p>
              </motion.div>
              
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                  <FiAward className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t.excellence}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.excellenceDesc}</p>
              </motion.div>
              
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                  <FiCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t.integrity}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.integrityDesc}</p>
              </motion.div>
              
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4">
                  <FiUsers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t.collaboration}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t.collaborationDesc}</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Our Team Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {t.ourTeam}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t.teamDesc}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t.whyChooseUs}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <FiAward className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{t.experience}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{t.experienceDesc}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <FiCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{t.expertise}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{t.expertiseDesc}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                      <FiUsers className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{t.customSolutions}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{t.customSolutionsDesc}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                      <FiTrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{t.ongoingSupport}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{t.ongoingSupportDesc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-white"
              >
                <h3 className="text-2xl font-semibold mb-6">{t.joinUs}</h3>
                <p className="mb-8 text-white/90">{t.joinUsDesc}</p>
                
                <a href="/contact" className="inline-block bg-white text-blue-600 hover:text-blue-800 font-medium px-6 py-3 rounded-lg transition-colors">
                  {t.contact}
                </a>
              </motion.div>
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </LanguageProvider>
  );
} 