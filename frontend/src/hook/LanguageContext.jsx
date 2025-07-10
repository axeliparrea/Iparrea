import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    about: 'about',
    book: 'book',
    portfolio: 'portfolio',
    blog: 'blog',
    contact: 'contact',
    
    // Hero Section
    dataEngineer: 'data engineer',
    fullStackDev: 'full stack dev',
    dataEngineerDesc: 'Data Automation & Cloud Engineer specializing in Python, SAP, and Azure cloud solutions',
    fullStackDesc: 'Full Stack Developer who builds scalable web applications with React, Node.js, and modern technologies',
    
    // About
    aboutMe: 'About Me',
    aboutDesc: 'Computer Science student at Tecnológico de Monterrey with hands-on experience in data automation, cloud engineering, and full-stack development. Currently working at ESAB as a Data Automation & Cloud Engineer.',
    recentAchievement: 'Recent Achievement',
    education: 'Education',
    currentRole: 'Current Role',
    sapWinner: '1st Place Winner SAP Labs Collaboration 2025',
    computerScience: 'Computer Science Tecnológico de Monterrey',
    esabRole: 'Data Automation & Cloud Engineer ESAB',
    
    // Skills
    technicalSkills: 'Technical Skills',
    programmingLanguages: 'Programming Languages',
    frameworksTools: 'Frameworks & Tools',
    specializations: 'Specializations',
    
    // Projects
    featuredProjects: 'Featured Projects',
    sapitosTitle: 'SAPITOS - SAP Smart Supply Chain',
    sapitosDesc: '🏆 1st Place Winner - AI-powered smart supply chain solution using SAP S/4HANA',
    legalMatchTitle: 'LegalMatch Android App',
    legalMatchDesc: 'Android app for law firm with AI integration using Gemini and Kotlin',
    cybersecurityTitle: 'Cybersecurity with Kali Linux',
    cybersecurityDesc: 'Penetration testing and network security using advanced tools and techniques',
    
    // Experience
    experience: 'Experience',
    esabTitle: 'Data Automation & Cloud Engineer',
    esabCompany: 'ESAB',
    esabPeriod: 'Jan 2025 – present',
    tecTitle: 'Full Stack Developer Intern',
    tecCompany: 'Tecnológico de Monterrey',
    tecPeriod: 'Sep 2024 – Nov 2024',
  },
  es: {
    // Navigation
    about: 'acerca',
    book: 'libro',
    portfolio: 'portafolio',
    blog: 'blog',
    contact: 'contacto',
    
    // Hero Section
    dataEngineer: 'ingeniero de datos',
    fullStackDev: 'desarrollador full stack',
    dataEngineerDesc: 'Ingeniero de Automatización de Datos y Nube especializado en Python, SAP y soluciones Azure',
    fullStackDesc: 'Desarrollador Full Stack que construye aplicaciones web escalables con React, Node.js y tecnologías modernas',
    
    // About
    aboutMe: 'Acerca de Mí',
    aboutDesc: 'Estudiante de Ciencias de la Computación en el Tecnológico de Monterrey con experiencia práctica en automatización de datos, ingeniería en la nube y desarrollo full-stack. Actualmente trabajando en ESAB como Ingeniero de Automatización de Datos y Nube.',
    recentAchievement: 'Logro Reciente',
    education: 'Educación',
    currentRole: 'Rol Actual',
    sapWinner: 'Ganador 1er Lugar Colaboración SAP Labs 2025',
    computerScience: 'Ciencias de la Computación Tecnológico de Monterrey',
    esabRole: 'Ingeniero de Automatización de Datos y Nube ESAB',
    
    // Skills
    technicalSkills: 'Habilidades Técnicas',
    programmingLanguages: 'Lenguajes de Programación',
    frameworksTools: 'Frameworks y Herramientas',
    specializations: 'Especializaciones',
    
    // Projects
    featuredProjects: 'Proyectos Destacados',
    sapitosTitle: 'SAPITOS - Cadena de Suministro Inteligente SAP',
    sapitosDesc: '🏆 Ganador 1er Lugar - Solución de cadena de suministro inteligente con IA usando SAP S/4HANA',
    legalMatchTitle: 'App Android LegalMatch',
    legalMatchDesc: 'Aplicación Android para bufete de abogados con integración de IA usando Gemini y Kotlin',
    cybersecurityTitle: 'Ciberseguridad con Kali Linux',
    cybersecurityDesc: 'Pruebas de penetración y seguridad de redes usando herramientas y técnicas avanzadas',
    
    // Experience
    experience: 'Experiencia',
    esabTitle: 'Ingeniero de Automatización de Datos y Nube',
    esabCompany: 'ESAB',
    esabPeriod: 'Ene 2025 – presente',
    tecTitle: 'Desarrollador Full Stack Interno',
    tecCompany: 'Tecnológico de Monterrey',
    tecPeriod: 'Sep 2024 – Nov 2024',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 