import { createContext, useContext, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';

const resources = {
  en: {
    translation: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
      
      technicalLead: 'Solutions Architect',
      fullStackDev: 'Full Stack Developer',
      technicalLeadDesc: 'Specialized in AI solutions, ERP integration, and intelligent automation',
      fullStackDevDesc: 'Building modern applications with focus on AI and security',
      viewMyWork: 'View My Work',
      downloadCV: 'Download CV',
      availableForOpportunities: 'Always curious about new projects and ideas',
      showTerminal: '$ show terminal',
      hideTerminal: '$ hide terminal',
      clickToExplore: 'Click to explore',
      aboutTitle: enTranslations.aboutTitle,
      fullName: enTranslations.fullName,
      phone: '+52 871-113-7953',
      email: enTranslations.email,
      location: enTranslations.location,
      aboutDescription: 'I am a Computer Science student at Tecnológico de Monterrey with a passion for artificial intelligence and cybersecurity. I enjoy building innovative solutions that combine modern web technologies with AI capabilities, and I am always looking to collaborate on Python projects where I can apply AI and security concepts.',
      
      skills: 'Skills',
      technicalSkills: 'Technical Skills',
      languages: 'Languages',
      tools: 'Tools & Platforms',
      
      educationTitle: enTranslations.educationTitle,
      degree: 'Computer Science Engineering',
      university: 'Tecnológico de Monterrey',
      graduationYear: '2022 - 2026',
      gpa: 'GPA: 4.0',
      
      experienceTitle: 'My Professional Journey',
      experienceSubtitle: 'From curious beginner to award-winning developer and professional engineer - a journey of continuous learning and innovation',
      currentStatus: 'Current Status',
      currentStatusTitle: '4.0 GPA Student & Solutions Architect',
      currentStatusDescription: 'Currently excelling academically in my 3rd year at Tecnológico de Monterrey while working professionally as a Solutions Architect at ESAB. My journey from curious beginner to recognized developer and professional engineer demonstrates my commitment to continuous learning, innovation, and real-world application of technology.',
      present: 'Present',
      keyLearning: 'Key Learning',
      notableProjects: 'Notable Projects',
      sapWinner: 'SAP Winner',
      esabEngineer: 'ESAB Engineer',
      
      projectsTitle: enTranslations.projectsTitle,
      projectsSubtitle: 'A collection of projects showcasing my expertise in data engineering, full-stack development, and innovative solutions.',
      viewProject: 'View Project',
      viewProjectDetails: enTranslations.projectDetails,
      loading: enTranslations.loading,
      technologies: 'Technologies',
      status: 'Status',
      category: 'Category',
      completed: enTranslations.completed,
      inProgress: enTranslations.inProgress,
      planning: enTranslations.planning,
      winner: enTranslations.winner,
      participant: enTranslations.participant,
      mobile: 'Mobile',
      web: 'Web',
      automation: 'Automation',
      hackathonsTitle: enTranslations.hackathonsTitle,
      backToPortfolio: 'Back to Portfolio',
      projectOverview: 'Project Overview',
      technologiesUsed: 'Technologies Used',
      keyFeatures: 'Key Features',
      challengesSolutions: 'Challenges & Solutions',
      viewOnGitHub: 'View on GitHub',
      liveDemo: 'Live Demo',
      period: 'Period',
      
      contactTitle: 'Get In Touch',
      getInTouch: 'Get In Touch',
      contactDescription: 'I\'m always interested in discussing new opportunities, innovative projects, and collaborations in AI, ERP integration, and intelligent automation.',
      contactDesc: 'I am always open to discussing new opportunities and interesting projects, especially those involving AI and cybersecurity.',
      sendEmail: 'Send Email',
      connectOnLinkedIn: 'Connect on LinkedIn',
      
      designedBy: 'Designed & Built by Axel Eduardo Iparrea Ramos',
      rightsReserved: 'All rights reserved.',
      
      terminalWhoami: 'Axel Eduardo Iparrea Ramos - Solutions Architect',
      terminalSkills: 'Python | JavaScript | C# | React | SAP | AI/ML | Cybersecurity',
      terminalLocation: 'Monterrey, Mexico 🇲🇽',
      terminalGitStatus: 'On branch main\nWorking on: innovation and technology',
      terminalPassion: 'Artificial Intelligence + Cybersecurity + Automation',
      
      aiEnterprise: 'AI & Enterprise',
      webApplication: 'Web Application',
      gameDevelopment: 'Game Development',
      aiSimulation: 'AI & Simulation',
      cybersecurity: 'Cybersecurity',
      frontend: 'Frontend',
      
      ...enTranslations
    }
  },
  es: {
    translation: {
      about: 'Acerca de',
      experience: 'Experiencia',
      projects: 'Proyectos',
      contact: 'Contacto',
      
      technicalLead: 'Arquitecto de Soluciones',
      fullStackDev: 'Desarrollador Full Stack',
      technicalLeadDesc: 'Especializado en soluciones de IA, integración ERP y automatización inteligente',
      fullStackDevDesc: 'Construyendo aplicaciones modernas con enfoque en IA y seguridad',
      viewMyWork: 'Ver Mi Trabajo',
      downloadCV: 'Descargar CV',
      availableForOpportunities: 'Siempre curioso por nuevos proyectos e ideas',
      showTerminal: '$ mostrar terminal',
      hideTerminal: '$ ocultar terminal',
      clickToExplore: 'Haz clic para explorar',
      
      aboutTitle: esTranslations.aboutTitle,
      fullName: esTranslations.fullName,
      phone: '+52 871-113-7953',
      email: esTranslations.email,
      location: esTranslations.location,
      aboutDescription: 'Soy estudiante de Ingeniería en Ciencias de la Computación en el Tecnológico de Monterrey con pasión por la inteligencia artificial y la ciberseguridad. Disfruto construir soluciones innovadoras que combinan tecnologías web modernas con capacidades de IA, y siempre busco colaborar en proyectos Python donde pueda aplicar conceptos de IA y seguridad.',
      
      skills: 'Habilidades',
      technicalSkills: 'Habilidades Técnicas',
      languages: 'Idiomas',
      tools: 'Herramientas y Plataformas',
      
      educationTitle: esTranslations.educationTitle,
      degree: 'Ingeniería en Ciencias de la Computación',
      university: 'Tecnológico de Monterrey',
      graduationYear: '2022 - 2026',
      gpa: 'GPA: 4.0',
      
      experienceTitle: 'Mi Trayectoria Profesional',
      experienceSubtitle: 'De principiante curioso a desarrollador galardonado e ingeniero profesional - un viaje de aprendizaje continuo e innovación',
      currentStatus: 'Estado Actual',
      currentStatusTitle: 'Estudiante con GPA 4.0 y Arquitecto de Soluciones',
      currentStatusDescription: 'Actualmente sobresaliendo académicamente en mi 3er año en el Tecnológico de Monterrey mientras trabajo profesionalmente como Arquitecto de Soluciones en ESAB. Mi viaje de principiante curioso a desarrollador reconocido e ingeniero profesional demuestra mi compromiso con el aprendizaje continuo, la innovación y la aplicación práctica de la tecnología.',
      present: 'Presente',
      keyLearning: 'Aprendizaje Clave',
      notableProjects: 'Proyectos Notables',
      sapWinner: 'Ganador SAP',
      esabEngineer: 'Ingeniero ESAB',
      
      projectsTitle: esTranslations.projectsTitle,
      projectsSubtitle: 'Una colección de proyectos que muestran mi experiencia en ingeniería de datos, desarrollo full-stack y soluciones innovadoras.',
      viewProject: 'Ver Proyecto',
      viewProjectDetails: esTranslations.projectDetails,
      loading: esTranslations.loading,
      technologies: 'Tecnologías',
      status: 'Estado',
      category: 'Categoría',
      completed: esTranslations.completed,
      inProgress: esTranslations.inProgress,
      planning: esTranslations.planning,
      winner: esTranslations.winner,
      participant: esTranslations.participant,
      mobile: 'Móvil',
      web: 'Web',
      automation: 'Automatización',
      hackathonsTitle: esTranslations.hackathonsTitle,
      backToPortfolio: 'Volver al Portafolio',
      projectOverview: 'Resumen del Proyecto',
      technologiesUsed: 'Tecnologías Utilizadas',
      keyFeatures: 'Características Principales',
      challengesSolutions: 'Desafíos y Soluciones',
      viewOnGitHub: 'Ver en GitHub',
      liveDemo: 'Demo en Vivo',
      period: 'Período',
      
      contactTitle: 'Ponte en Contacto',
      getInTouch: 'Ponte en Contacto',
      contactDescription: 'Siempre estoy interesado en discutir nuevas oportunidades, proyectos innovadores y colaboraciones en IA, integración ERP y automatización inteligente.',
      contactDesc: 'Siempre estoy abierto a discutir nuevas oportunidades y proyectos interesantes, especialmente aquellos que involucren IA y ciberseguridad.',
      sendEmail: 'Enviar Email',
      connectOnLinkedIn: 'Conectar en LinkedIn',
      
      designedBy: 'Diseñado y Construido por Axel Eduardo Iparrea Ramos',
      rightsReserved: 'Todos los derechos reservados.',
      
      terminalWhoami: 'Axel Eduardo Iparrea Ramos - Arquitecto de Soluciones',
      terminalSkills: 'Python | JavaScript | C# | React | SAP | IA/ML | Ciberseguridad',
      terminalLocation: 'Monterrey, México 🇲🇽',
      terminalGitStatus: 'En rama main\nTrabajando en: innovación y tecnología',
      terminalPassion: 'Inteligencia Artificial + Ciberseguridad + Automatización',
      
      aiEnterprise: 'IA y Empresarial',
      webApplication: 'Aplicación Web',
      gameDevelopment: 'Desarrollo de Juegos',
      aiSimulation: 'IA y Simulación',
      cybersecurity: 'Ciberseguridad',
      frontend: 'Frontend',
      
      ...esTranslations
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

const LanguageContext = createContext({});

export const LanguageProvider = ({ children }) => {
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const contextValue = {
    changeLanguage,
    currentLanguage: i18n.language,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export default LanguageContext; 