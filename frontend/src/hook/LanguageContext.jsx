import { createContext, useContext, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
      
      // Hero Section
      dataEngineer: 'Data Engineer',
      fullStackDev: 'Full Stack Developer',
      dataEngineerDesc: 'Specialized in AI, cybersecurity, and data automation',
      fullStackDevDesc: 'Building modern applications with focus on AI and security',
      viewMyWork: 'View My Work',
      downloadCV: 'Download CV',
      availableForOpportunities: 'Available for opportunities',
      showTerminal: '$ show terminal',
      hideTerminal: '$ hide terminal',
      clickToExplore: 'Click to explore',
      
      // About Section
      aboutTitle: 'About Me',
      fullName: 'Axel Eduardo Iparrea Ramos',
      phone: '+52 871-113-7953',
      email: 'axeliparrea@gmail.com',
      location: 'Monterrey, Mexico',
      aboutDescription: 'I am a Computer Science student at Tecnológico de Monterrey with a passion for artificial intelligence and cybersecurity. I enjoy building innovative solutions that combine modern web technologies with AI capabilities, and I am always looking to collaborate on Python projects where I can apply AI and security concepts.',
      
      // Skills
      skills: 'Skills',
      technicalSkills: 'Technical Skills',
      languages: 'Languages',
      tools: 'Tools & Platforms',
      
      // Education
      educationTitle: 'Education',
      degree: 'Computer Science Engineering',
      university: 'Tecnológico de Monterrey',
      graduationYear: '2022 - 2026',
      gpa: 'GPA: 4.0',
      
      // Experience
      experienceTitle: 'My Professional Journey',
      experienceSubtitle: 'From curious beginner to award-winning developer and professional engineer - a journey of continuous learning and innovation',
      currentStatus: 'Current Status',
      currentStatusTitle: '4.0 GPA Student & Professional Data Engineer',
      currentStatusDescription: 'Currently excelling academically in my 3rd year at Tecnológico de Monterrey while working professionally as a Data Automation & Cloud Engineer at ESAB. My journey from curious beginner to recognized developer and professional engineer demonstrates my commitment to continuous learning, innovation, and real-world application of technology.',
      present: 'Present',
      keyLearning: 'Key Learning',
      notableProjects: 'Notable Projects',
      sapWinner: 'SAP Winner',
      esabEngineer: 'ESAB Engineer',
      
      // Projects
      projectsTitle: 'Featured Projects',
      projectsSubtitle: 'A collection of projects showcasing my expertise in data engineering, full-stack development, and innovative solutions.',
      viewProject: 'View Project',
      viewProjectDetails: 'View Project Details',
      loading: 'Loading...',
      technologies: 'Technologies',
      status: 'Status',
      category: 'Category',
      completed: 'Completed',
      inProgress: 'In Progress',
      planning: 'Planning',
      winner: 'Winner',
      participant: 'Participant',
      mobile: 'Mobile',
      web: 'Web',
      automation: 'Automation',
      hackathonsTitle: 'Hackathons & Competitions',
      backToPortfolio: 'Back to Portfolio',
      projectOverview: 'Project Overview',
      technologiesUsed: 'Technologies Used',
      keyFeatures: 'Key Features',
      challengesSolutions: 'Challenges & Solutions',
      viewOnGitHub: 'View on GitHub',
      liveDemo: 'Live Demo',
      period: 'Period',
      
      // Contact
      contactTitle: 'Get In Touch',
      getInTouch: 'Get In Touch',
      contactDescription: 'I\'m always interested in discussing new opportunities, innovative projects, and collaborations in AI, cybersecurity, and data engineering.',
      contactDesc: 'I am always open to discussing new opportunities and interesting projects, especially those involving AI and cybersecurity.',
      sendEmail: 'Send Email',
      connectOnLinkedIn: 'Connect on LinkedIn',
      
      // Footer
      designedBy: 'Designed & Built by Axel Eduardo Iparrea Ramos',
      rightsReserved: 'All rights reserved.',
      
      // Terminal Commands
      terminalWhoami: 'Axel Eduardo Iparrea Ramos - Data Engineer & Full Stack Developer',
      terminalSkills: 'Python | JavaScript | C# | React | SAP | AI/ML | Cybersecurity',
      terminalLocation: 'Monterrey, Mexico 🇲🇽',
      terminalGitStatus: 'On branch main\nWorking on: innovation and technology',
      terminalPassion: 'Artificial Intelligence + Cybersecurity + Automation',
      
      // Project Categories
      aiEnterprise: 'AI & Enterprise',
      webApplication: 'Web Application',
      gameDevelopment: 'Game Development',
      aiSimulation: 'AI & Simulation',
      cybersecurity: 'Cybersecurity',
      frontend: 'Frontend',
      
      // Company Names
      tecMonterrey: 'Tecnológico de Monterrey',
      hackMty: 'Hack MTY 2022',
      personalDevelopment: 'Personal & Academic Development',
      academicExcellence: 'Academic Excellence & Industry Focus',
      sapLabsEsab: 'SAP Labs & ESAB',
      
      // Months
      january: 'January',
      february: 'February',
      march: 'March',
      april: 'April',
      may: 'May',
      june: 'June',
      july: 'July',
      august: 'August',
      september: 'September',
      october: 'October',
      november: 'November',
      december: 'December',
      
      // Common
      and: 'and',
      based: 'Based',
      specialized: 'Specialized',
      building: 'Building',
      solutions: 'solutions',
      applications: 'applications',
      with: 'with',
      focus: 'focus',
      on: 'on',
      in: 'in'
    }
  },
  es: {
    translation: {
      // Navigation
      about: 'Acerca de',
      experience: 'Experiencia',
      projects: 'Proyectos',
      contact: 'Contacto',
      
      // Hero Section
      dataEngineer: 'Ingeniero de Datos',
      fullStackDev: 'Desarrollador Full Stack',
      dataEngineerDesc: 'Especializado en IA, ciberseguridad y automatización de datos',
      fullStackDevDesc: 'Construyendo aplicaciones modernas con enfoque en IA y seguridad',
      viewMyWork: 'Ver Mi Trabajo',
      downloadCV: 'Descargar CV',
      availableForOpportunities: 'Disponible para oportunidades',
      showTerminal: '$ mostrar terminal',
      hideTerminal: '$ ocultar terminal',
      clickToExplore: 'Haz clic para explorar',
      
      // About Section
      aboutTitle: 'Acerca de Mí',
      fullName: 'Axel Eduardo Iparrea Ramos',
      phone: '+52 871-113-7953',
      email: 'axeliparrea@gmail.com',
      location: 'Monterrey, México',
      aboutDescription: 'Soy estudiante de Ingeniería en Ciencias de la Computación en el Tecnológico de Monterrey con pasión por la inteligencia artificial y la ciberseguridad. Disfruto construir soluciones innovadoras que combinan tecnologías web modernas con capacidades de IA, y siempre busco colaborar en proyectos Python donde pueda aplicar conceptos de IA y seguridad.',
      
      // Skills
      skills: 'Habilidades',
      technicalSkills: 'Habilidades Técnicas',
      languages: 'Idiomas',
      tools: 'Herramientas y Plataformas',
      
      // Education
      educationTitle: 'Educación',
      degree: 'Ingeniería en Ciencias de la Computación',
      university: 'Tecnológico de Monterrey',
      graduationYear: '2022 - 2026',
      gpa: 'GPA: 4.0',
      
      // Experience
      experienceTitle: 'Mi Trayectoria Profesional',
      experienceSubtitle: 'De principiante curioso a desarrollador galardonado e ingeniero profesional - un viaje de aprendizaje continuo e innovación',
      currentStatus: 'Estado Actual',
      currentStatusTitle: 'Estudiante con GPA 4.0 e Ingeniero de Datos Profesional',
      currentStatusDescription: 'Actualmente sobresaliendo académicamente en mi 3er año en el Tecnológico de Monterrey mientras trabajo profesionalmente como Ingeniero de Automatización de Datos y Nube en ESAB. Mi viaje de principiante curioso a desarrollador reconocido e ingeniero profesional demuestra mi compromiso con el aprendizaje continuo, la innovación y la aplicación práctica de la tecnología.',
      present: 'Presente',
      keyLearning: 'Aprendizaje Clave',
      notableProjects: 'Proyectos Notables',
      sapWinner: 'Ganador SAP',
      esabEngineer: 'Ingeniero ESAB',
      
      // Projects
      projectsTitle: 'Proyectos Destacados',
      projectsSubtitle: 'Una colección de proyectos que muestran mi experiencia en ingeniería de datos, desarrollo full-stack y soluciones innovadoras.',
      viewProject: 'Ver Proyecto',
      viewProjectDetails: 'Ver Detalles del Proyecto',
      loading: 'Cargando...',
      technologies: 'Tecnologías',
      status: 'Estado',
      category: 'Categoría',
      completed: 'Completado',
      inProgress: 'En Progreso',
      planning: 'Planificación',
      winner: 'Ganador',
      participant: 'Participante',
      mobile: 'Móvil',
      web: 'Web',
      automation: 'Automatización',
      hackathonsTitle: 'Hackathons y Competencias',
      backToPortfolio: 'Volver al Portafolio',
      projectOverview: 'Resumen del Proyecto',
      technologiesUsed: 'Tecnologías Utilizadas',
      keyFeatures: 'Características Principales',
      challengesSolutions: 'Desafíos y Soluciones',
      viewOnGitHub: 'Ver en GitHub',
      liveDemo: 'Demo en Vivo',
      period: 'Período',
      
      // Contact
      contactTitle: 'Ponte en Contacto',
      getInTouch: 'Ponte en Contacto',
      contactDescription: 'Siempre estoy interesado en discutir nuevas oportunidades, proyectos innovadores y colaboraciones en IA, ciberseguridad e ingeniería de datos.',
      contactDesc: 'Siempre estoy abierto a discutir nuevas oportunidades y proyectos interesantes, especialmente aquellos que involucren IA y ciberseguridad.',
      sendEmail: 'Enviar Email',
      connectOnLinkedIn: 'Conectar en LinkedIn',
      
      // Footer
      designedBy: 'Diseñado y Construido por Axel Eduardo Iparrea Ramos',
      rightsReserved: 'Todos los derechos reservados.',
      
      // Terminal Commands
      terminalWhoami: 'Axel Eduardo Iparrea Ramos - Ingeniero de Datos y Desarrollador Full Stack',
      terminalSkills: 'Python | JavaScript | C# | React | SAP | IA/ML | Ciberseguridad',
      terminalLocation: 'Monterrey, México 🇲🇽',
      terminalGitStatus: 'En rama main\nTrabajando en: innovación y tecnología',
      terminalPassion: 'Inteligencia Artificial + Ciberseguridad + Automatización',
      
      // Project Categories
      aiEnterprise: 'IA y Empresarial',
      webApplication: 'Aplicación Web',
      gameDevelopment: 'Desarrollo de Juegos',
      aiSimulation: 'IA y Simulación',
      cybersecurity: 'Ciberseguridad',
      frontend: 'Frontend',
      
      // Company Names
      tecMonterrey: 'Tecnológico de Monterrey',
      hackMty: 'Hack MTY 2022',
      personalDevelopment: 'Desarrollo Personal y Académico',
      academicExcellence: 'Excelencia Académica y Enfoque Industrial',
      sapLabsEsab: 'SAP Labs y ESAB',
      
      // Months
      january: 'Enero',
      february: 'Febrero',
      march: 'Marzo',
      april: 'Abril',
      may: 'Mayo',
      june: 'Junio',
      july: 'Julio',
      august: 'Agosto',
      september: 'Septiembre',
      october: 'Octubre',
      november: 'Noviembre',
      december: 'Diciembre',
      
      // Common
      and: 'y',
      based: 'Basado',
      specialized: 'Especializado',
      building: 'Construyendo',
      solutions: 'soluciones',
      applications: 'aplicaciones',
      with: 'con',
      focus: 'enfoque',
      on: 'en',
      in: 'en'
    }
  }
};

// Initialize i18n
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