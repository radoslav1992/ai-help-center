'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { getFeaturedProjects, PortfolioProject } from '@/lib/supabase';

const translations = {
  en: {
    title: 'Featured Projects',
    subtitle: 'Take a look at some of our best work across different industries and technologies.',
    viewProject: 'View Project',
    viewAllProjects: 'View All Projects',
    technologies: 'Technologies:',
    loadingProjects: 'Loading projects...',
    noProjects: 'No featured projects available at the moment.',
    error: 'There was an error loading the projects. Please try again later.'
  },
  bg: {
    title: 'Избрани Проекти',
    subtitle: 'Разгледайте някои от най-добрите ни работи в различни индустрии и технологии.',
    viewProject: 'Преглед на проекта',
    viewAllProjects: 'Вижте всички проекти',
    technologies: 'Технологии:',
    loadingProjects: 'Зареждане на проекти...',
    noProjects: 'В момента няма избрани проекти.',
    error: 'Възникна грешка при зареждането на проектите. Моля, опитайте отново по-късно.'
  }
};

const PortfolioHighlight = () => {
  const [language, setLanguage] = useState<'en' | 'bg'>('en');
  const [featuredProjects, setFeaturedProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setIsLoading(true);
        const data = await getFeaturedProjects();
        setFeaturedProjects(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching featured projects:', err);
        setError('Failed to load projects');
        setIsLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  const t = translations[language];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.title}
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.subtitle}
          </motion.p>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">{t.loadingProjects}</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">{t.error}</p>
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">{t.noProjects}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.slice(0, 3).map((project) => (
              <motion.div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image_url}
                    alt={language === 'en' ? project.title : project.title_bg}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {language === 'en' ? project.title : project.title_bg}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {language === 'en' ? project.description : project.description_bg}
                  </p>
                  {project.tags.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t.technologies}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag, index) => (
                          <span 
                            key={index} 
                            className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2 py-1 rounded">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  <a 
                    href={project.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                  >
                    {t.viewProject}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link 
            href="/portfolio" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-lg"
          >
            {t.viewAllProjects} <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHighlight; 