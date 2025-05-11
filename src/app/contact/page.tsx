'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import Image from 'next/image';
import { submitContactForm, ContactSubmission } from '@/lib/supabase';

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
    locationValue: '43 bul. Gotse Delchev, Sofia, Bulgaria',
    phoneTitle: 'Phone Number',
    phoneValue: '(123) 456-7890',
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
    locationValue: '43 бул. Гоце Делчев, София, България',
    phoneTitle: 'Телефонен номер',
    phoneValue: '(123) 456-7890',
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

export default function ContactPage() {
  const [language, setLanguage] = useState<'en' | 'bg'>('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    message: '',
    service: 'general',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

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

  const validateForm = (): boolean => {
    const errors = {
      name: '',
      email: '',
      company: '',
      industry: '',
      message: '',
    };
    let isValid = true;

    // Validate name
    if (!formData.name.trim()) {
      errors.name = t.requiredField;
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = t.requiredField;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t.invalidEmail;
      isValid = false;
    }

    // Validate company
    if (!formData.company.trim()) {
      errors.company = t.requiredField;
      isValid = false;
    }

    // Validate industry
    if (!formData.industry) {
      errors.industry = t.requiredField;
      isValid = false;
    }

    // Validate message
    if (!formData.message.trim()) {
      errors.message = t.requiredField;
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear the error for this field when the user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Submit to Supabase
      const submission: ContactSubmission = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        industry: formData.industry,
        service: formData.service,
        message: formData.message
      };

      const result = await submitContactForm(submission);
      
      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          industry: '',
          message: '',
          service: 'general',
        });
      } else {
        throw new Error('Failed to submit contact form');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitError(t.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Navbar />
        
        {/* Contact Hero */}
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
        
        {/* Contact Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                  {t.sendMessage}
                </h2>
                
                {submitSuccess ? (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                    <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">
                      {t.thankYou}
                    </h3>
                    <p className="text-green-700 dark:text-green-400">
                      {t.receivedMessage}
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      {t.sendAnother}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t.name} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
                        />
                        {formErrors.name && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t.email} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t.phone}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t.company} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border ${formErrors.company ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
                        />
                        {formErrors.company && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.company}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t.industry} <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border ${formErrors.industry ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
                        >
                          <option value="" disabled>{t.industryPlaceholder}</option>
                          <option value="technology">{t.industries.technology}</option>
                          <option value="finance">{t.industries.finance}</option>
                          <option value="healthcare">{t.industries.healthcare}</option>
                          <option value="education">{t.industries.education}</option>
                          <option value="retail">{t.industries.retail}</option>
                          <option value="manufacturing">{t.industries.manufacturing}</option>
                          <option value="entertainment">{t.industries.entertainment}</option>
                          <option value="other">{t.industries.other}</option>
                        </select>
                        {formErrors.industry && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.industry}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t.serviceInterested}
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                        >
                          <option value="general">{t.generalInquiry}</option>
                          <option value="ai-solutions">{t.aiSolutions}</option>
                          <option value="automation">{t.automation}</option>
                          <option value="web-development">{t.webDev}</option>
                          <option value="data-analytics">{t.dataAnalytics}</option>
                          <option value="ai-chatbots">{t.aiChatbots}</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t.message} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-2 border ${formErrors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
                      ></textarea>
                      {formErrors.message && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                      )}
                    </div>
                    
                    {submitError && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
                        {submitError}
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t.sending}
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <FiSend className="mr-2" />
                          {t.send}
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
              
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                  {t.contactInfo}
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <FiMapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t.location}</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">
                        {t.locationValue}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <FiPhone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t.phoneTitle}</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">
                        {t.phoneValue}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <FiMail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t.emailTitle}</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">
                        <a href="mailto:info@aihelpcenter.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          info@aihelpcenter.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t.businessHours}
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex justify-between">
                      <span>{t.monFri}</span>
                      <span>{t.monFriHours}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>{t.saturday}</span>
                      <span>{t.saturdayHours}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>{t.sunday}</span>
                      <span>{t.sundayValue}</span>
                    </li>
                  </ul>
                </div>
                
                {/* Company Logo */}
                <div className="mt-12 flex justify-center">
                  <div className="relative w-64 h-64">
                    <Image 
                      src="/logo-with-text.png"
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
        
        <Footer />
      </main>
    </LanguageProvider>
  );
} 