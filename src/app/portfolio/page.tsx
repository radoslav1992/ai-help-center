'use client';

import { useEffect, useState } from 'react';
import ScrollToTop from '@/components/ScrollToTop';
import { LanguageProvider } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import ClientOnly from '@/components/ClientOnly';
import { getPortfolioProjects, PortfolioProject } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink, FiFilter } from 'react-icons/fi';

const translations = {
  en: {
    title: 'Our Portfolio',
    subtitle: 'Explore our diverse collection of projects that showcase our expertise in AI solutions, automation, and web development.',
    viewProject: 'View Project',
    allProjects: 'All Projects',
    automatons: 'Automations',
    webDevelopment: 'Web Development',
    aiSolutions: 'AI Solutions',
    dataAnalytics: 'Data Analytics',
    noProjects: 'No projects found with the selected filter.',
    technologies: 'Technologies:',
    loadingProjects: 'Loading projects...',
    error: 'There was an error loading the projects. Please try again later.'
  },
  bg: {
    title: 'Нашето Портфолио',
    subtitle: 'Разгледайте нашата разнообразна колекция от проекти, които демонстрират нашия опит в AI решения, автоматизация и уеб разработка.',
    viewProject: 'Преглед на проекта',
    allProjects: 'Всички проекти',
    automatons: 'Автоматизации',
    webDevelopment: 'Уеб разработка',
    aiSolutions: 'AI решения',
    dataAnalytics: 'Анализ на данни',
    noProjects: 'Няма намерени проекти с избрания филтър.',
    technologies: 'Технологии:',
    loadingProjects: 'Зареждане на проекти...',
    error: 'Възникна грешка при зареждането на проектите. Моля, опитайте отново по-късно.'
  }
};

export default function PortfolioPage() {
  const [language, setLanguage] = useState<'en' | 'bg'>('en');
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<PortfolioProject[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
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
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const data = await getPortfolioProjects();
        setProjects(data);
        setFilteredProjects(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()))
      );
      setFilteredProjects(filtered);
    }
  }, [activeFilter, projects]);

  const t = translations[language];

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const filterOptions = [
    { id: 'all', label: t.allProjects },
    { id: 'automation', label: t.automatons },
    { id: 'web', label: t.webDevelopment },
    { id: 'ai', label: t.aiSolutions },
    { id: 'data', label: t.dataAnalytics }
  ];

  return (
    <LanguageProvider>
      <main className="min-h-screen">
        {/* Portfolio Hero */}
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
        
        {/* Portfolio Filters */}
        <section className="py-8 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => handleFilterChange(filter.id)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${activeFilter === filter.id 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}
                  `}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Portfolio Projects */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">{t.loadingProjects}</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-600 dark:text-red-400">{t.error}</p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 dark:text-gray-400">{t.noProjects}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
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
                            {project.tags.map((tag, index) => (
                              <span 
                                key={index} 
                                className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <a 
                        href={project.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                      >
                        {t.viewProject} <FiExternalLink className="ml-1" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
        
        <ScrollToTop />
      </main>
    </LanguageProvider>
  );
} 