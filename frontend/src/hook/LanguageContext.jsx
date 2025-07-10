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
    
    // Loading Screen
    loading: 'Loading...',
    
    // CV Download
    downloadCV: 'Download CV',
    
    // Hero Section
    dataEngineer: 'data engineer',
    fullStackDev: 'full stack dev',
    dataEngineerDesc: 'Data Automation & Cloud Engineer specializing in Python, SAP, and Azure cloud solutions',
    fullStackDesc: 'Full Stack Developer who builds scalable web applications with React, Node.js, and modern technologies',
    
    // About Section (Personal info, education, achievements only)
    aboutMe: 'About Me',
    aboutTitle: 'Who Am I?',
    aboutPersonalDesc: 'Computer Science student at Tecnológico de Monterrey with hands-on experience in data automation, cloud engineering, and full-stack development. Currently working at ESAB as a Data Automation & Cloud Engineer.',
    
    // Personal Info
    fullName: 'Axel Eduardo Iparrea Ramos',
    phone: '+52 871-113-7953',
    email: 'axeliparrea@gmail.com',
    personalInfo: 'Personal Information',
    
    // Education
    education: 'Education',
    educationTitle: 'Computer Science',
    educationSchool: 'Tecnológico de Monterrey',
    educationLocation: 'Monterrey, México',
    educationDesc: 'Ranked as the top university in Mexico and among the most prestigious in Latin America. Developed strong competencies in software engineering, web technologies, and cybersecurity.',
    
    // Achievements
    achievements: 'Recent Achievements',
    sapAchievement: '🏆 1st Place Winner SAP Labs Final Showcase 2025',
    sapAchievementDesc: 'Led a multidisciplinary team to build SAPITOS, an award-winning AI-powered smart supply chain solution.',
    currentRole: 'Current Role',
    currentRoleTitle: 'Data Automation & Cloud Engineer at ESAB',
    currentRoleDesc: 'Automating data workflows, creating dynamic dashboards, and developing cloud-based solutions.',
    
    // Projects Section
    projects: 'Featured Projects',
    projectsTitle: 'My Work & Projects',
    projectsDesc: 'A showcase of my technical projects, from AI-powered solutions to mobile applications.',
    
    // SAP Project
    sapProject: 'SAP Labs Collaboration – 1st Place Project',
    sapTitle: 'AI-Powered Smart Supply Chain (SAPITOS)',
    sapSubtitle: '🏆 Winner – SAP Labs Final Showcase 2025',
    sapPeriod: 'Feb 2025 – present',
    sapDesc1: 'Collaborated with a multidisciplinary team to build SAPITOS, an award-winning smart supply chain solution.',
    sapDesc2: 'Developed cloud-based infrastructure using SAP S/4HANA to manage inventory and delivery processes.',
    sapDesc3: 'Implemented advanced analytics dashboards with SAP Analytics Cloud for real-time monitoring.',
    sapDesc4: 'Designed predictive ML model with SAP HANA ML to forecast inventory needs.',
    
    // LegalMatch Project
    legalMatchProject: 'LegalMatch Android App',
    legalMatchPeriod: 'Aug 2024 – Oct 2024',
    legalMatchDesc1: 'Developed a feature-rich Android app for BuffeTEC law firm, enabling clients to schedule appointments.',
    legalMatchDesc2: 'Integrated AI through Gemini to automatically enhance case details and streamline processes.',
    legalMatchDesc3: 'Built with Kotlin and Jetpack Compose for seamless UI experience.',
    legalMatchDesc4: 'Leveraged Supabase for backend authentication and database management.',
    
    // Other Projects
    awaqProject: 'AWAQ Web Page Onboarding',
    awaqPeriod: 'Feb 2024 – Jun 2024',
    awaqDesc: 'Developed comprehensive web page using Razor Pages in .NET Core 8.0 with administrative dashboard.',
    
    mobilityProject: 'Urban Mobility Multi-Agent Simulation',
    mobilityPeriod: 'Apr 2024 – Jun 2024',
    mobilityDesc: 'Engineered real-time urban intersection simulation using Python (AgentPy) and Unity.',
    
    cybersecurityProject: 'Cybersecurity KALI Linux',
    cybersecurityPeriod: 'Jan 2021',
    cybersecurityDesc1: 'Skilled in penetration testing and network security using Kali Linux.',
    cybersecurityDesc2: 'Expert in proxy chains and network proxies to anonymize attacks and bypass defenses.',
    cybersecurityDesc3: 'Proficient with tools like Nmap, Metasploit, and Wireshark for vulnerability assessment.',
    cybersecurityDesc4: 'Strong background in password encryption/decryption and wireless security testing.',
    
    // Experience Section
    experience: 'Professional Experience',
    
    // ESAB Experience
    esabTitle: 'Data Automation & Cloud Engineer',
    esabCompany: 'ESAB',
    esabPeriod: 'Jan 2025 – present',
    esabLocation: 'Monterrey, Mexico',
    esabDesc1: 'Automated data workflows using Python and SQL, enhancing operational efficiency and accuracy.',
    esabDesc2: 'Developed dynamic dashboards with Power BI and Power Query, delivering actionable insights.',
    esabDesc3: 'Created automation bots integrated with Azure, streamlining operations and reducing costs.',
    esabDesc4: 'Leveraged SAP process knowledge, particularly in finance, ensuring seamless data integration.',
    
    // Tec Experience
    tecTitle: 'Full Stack Developer Intern',
    tecCompany: 'Tecnológico de Monterrey',
    tecPeriod: 'Sep 2024 – Nov 2024',
    tecLocation: 'Monterrey, Mexico',
    tecDesc1: 'Maintained and enhanced the Wellness App using Prisma, MVC architecture, and Express.',
    tecDesc2: 'Implemented full-stack solutions with Node.js, TypeScript, React, Axios, and Tailwind CSS.',
    tecDesc3: 'Optimized backend functionality and refined API integrations to improve system performance.',
    tecDesc4: 'Built scalable and maintainable systems, ensuring efficient client-server communication.',
    
    // Skills Section
    skills: 'Technical Skills',
    skillsTitle: 'Skills & Technologies',
    skillsDesc: 'Interactive showcase of my technical expertise across different domains.',
    programmingLanguages: 'Programming Languages',
    frameworksTools: 'Frameworks & Tools',
    cloudPlatforms: 'Cloud Platforms',
    databases: 'Databases',
    languages: 'Languages',
    methodologies: 'Methodologies',
    
    // Participation
    participation: 'Participation',
    hackMtyTitle: 'Hack Mty 2022',
    hackMtyDate: 'Sep 24, 2022',
    hackMtyDesc: 'Developed an engaging web application for Banorte aimed at attracting younger demographic using MERN stack.',
  },
  es: {
    // Navigation
    about: 'acerca',
    book: 'libro',
    portfolio: 'portafolio',
    blog: 'blog',
    contact: 'contacto',
    
    // Loading Screen
    loading: 'Cargando...',
    
    // CV Download
    downloadCV: 'Descargar CV',
    
    // Hero Section
    dataEngineer: 'ingeniero de datos',
    fullStackDev: 'desarrollador full stack',
    dataEngineerDesc: 'Ingeniero de Automatización de Datos y Nube especializado en Python, SAP y soluciones Azure',
    fullStackDesc: 'Desarrollador Full Stack que construye aplicaciones web escalables con React, Node.js y tecnologías modernas',
    
    // About Section (Personal info, education, achievements only)
    aboutMe: 'Acerca de Mí',
    aboutTitle: '¿Quién Soy?',
    aboutPersonalDesc: 'Estudiante de Ciencias de la Computación en el Tecnológico de Monterrey con experiencia práctica en automatización de datos, ingeniería en la nube y desarrollo full-stack. Actualmente trabajando en ESAB como Ingeniero de Automatización de Datos y Nube.',
    
    // Personal Info
    fullName: 'Axel Eduardo Iparrea Ramos',
    phone: '+52 871-113-7953',
    email: 'axeliparrea@gmail.com',
    personalInfo: 'Información Personal',
    
    // Education
    education: 'Educación',
    educationTitle: 'Ciencias de la Computación',
    educationSchool: 'Tecnológico de Monterrey',
    educationLocation: 'Monterrey, México',
    educationDesc: 'Clasificada como la universidad número uno en México y entre las más prestigiosas de América Latina. Desarrollé competencias sólidas en ingeniería de software, tecnologías web y ciberseguridad.',
    
    // Achievements
    achievements: 'Logros Recientes',
    sapAchievement: '🏆 Ganador 1er Lugar Showcase Final SAP Labs 2025',
    sapAchievementDesc: 'Lideré un equipo multidisciplinario para construir SAPITOS, una solución ganadora de cadena de suministro inteligente con IA.',
    currentRole: 'Rol Actual',
    currentRoleTitle: 'Ingeniero de Automatización de Datos y Nube en ESAB',
    currentRoleDesc: 'Automatizando flujos de trabajo de datos, creando dashboards dinámicos y desarrollando soluciones en la nube.',
    
    // Projects Section
    projects: 'Proyectos Destacados',
    projectsTitle: 'Mi Trabajo y Proyectos',
    projectsDesc: 'Una muestra de mis proyectos técnicos, desde soluciones con IA hasta aplicaciones móviles.',
    
    // SAP Project
    sapProject: 'Colaboración SAP Labs – Proyecto 1er Lugar',
    sapTitle: 'Cadena de Suministro Inteligente con IA (SAPITOS)',
    sapSubtitle: '🏆 Ganador – Showcase Final SAP Labs 2025',
    sapPeriod: 'Feb 2025 – presente',
    sapDesc1: 'Colaboré con un equipo multidisciplinario para construir SAPITOS, una solución ganadora de cadena de suministro inteligente.',
    sapDesc2: 'Desarrollé infraestructura basada en la nube usando SAP S/4HANA para gestionar inventario y procesos de entrega.',
    sapDesc3: 'Implementé dashboards de análisis avanzados con SAP Analytics Cloud para monitoreo en tiempo real.',
    sapDesc4: 'Diseñé modelo ML predictivo con SAP HANA ML para pronosticar necesidades de inventario.',
    
    // LegalMatch Project
    legalMatchProject: 'App Android LegalMatch',
    legalMatchPeriod: 'Ago 2024 – Oct 2024',
    legalMatchDesc1: 'Desarrollé una app Android rica en funciones para el bufete BuffeTEC, permitiendo agendar citas.',
    legalMatchDesc2: 'Integré IA a través de Gemini para mejorar automáticamente detalles de casos y optimizar procesos.',
    legalMatchDesc3: 'Construí con Kotlin y Jetpack Compose para experiencia UI sin problemas.',
    legalMatchDesc4: 'Aproveché Supabase para autenticación backend y gestión de base de datos.',
    
    // Other Projects
    awaqProject: 'Página Web AWAQ Onboarding',
    awaqPeriod: 'Feb 2024 – Jun 2024',
    awaqDesc: 'Desarrollé página web integral usando Razor Pages en .NET Core 8.0 con dashboard administrativo.',
    
    mobilityProject: 'Simulación Multi-Agente de Movilidad Urbana',
    mobilityPeriod: 'Abr 2024 – Jun 2024',
    mobilityDesc: 'Desarrollé simulación de intersección urbana en tiempo real usando Python (AgentPy) y Unity.',
    
    cybersecurityProject: 'Ciberseguridad KALI Linux',
    cybersecurityPeriod: 'Ene 2021',
    cybersecurityDesc1: 'Habilidoso en pruebas de penetración y seguridad de redes usando Kali Linux.',
    cybersecurityDesc2: 'Experto en cadenas de proxy y proxies de red para anonimizar ataques y eludir defensas.',
    cybersecurityDesc3: 'Competente con herramientas como Nmap, Metasploit y Wireshark para evaluación de vulnerabilidades.',
    cybersecurityDesc4: 'Fuerte trasfondo en encriptación/desencriptación de contraseñas y pruebas de seguridad inalámbrica.',
    
    // Experience Section
    experience: 'Experiencia Profesional',
    
    // ESAB Experience
    esabTitle: 'Ingeniero de Automatización de Datos y Nube',
    esabCompany: 'ESAB',
    esabPeriod: 'Ene 2025 – presente',
    esabLocation: 'Monterrey, México',
    esabDesc1: 'Automaticé flujos de trabajo de datos usando Python y SQL, mejorando la eficiencia operacional.',
    esabDesc2: 'Desarrollé dashboards dinámicos con Power BI y Power Query, entregando insights accionables.',
    esabDesc3: 'Creé bots de automatización integrados con Azure, optimizando operaciones y reduciendo costos.',
    esabDesc4: 'Aproveché el conocimiento de procesos SAP, particularmente en finanzas, asegurando integración de datos.',
    
    // Tec Experience
    tecTitle: 'Desarrollador Full Stack Interno',
    tecCompany: 'Tecnológico de Monterrey',
    tecPeriod: 'Sep 2024 – Nov 2024',
    tecLocation: 'Monterrey, México',
    tecDesc1: 'Mantuve y mejoré la Wellness App usando Prisma, arquitectura MVC y Express.',
    tecDesc2: 'Implementé soluciones full-stack con Node.js, TypeScript, React, Axios y Tailwind CSS.',
    tecDesc3: 'Optimicé funcionalidad backend y refiné integraciones API para mejorar rendimiento del sistema.',
    tecDesc4: 'Construí sistemas escalables y mantenibles, asegurando comunicación eficiente cliente-servidor.',
    
    // Skills Section
    skills: 'Habilidades Técnicas',
    skillsTitle: 'Habilidades y Tecnologías',
    skillsDesc: 'Muestra interactiva de mi experiencia técnica en diferentes dominios.',
    programmingLanguages: 'Lenguajes de Programación',
    frameworksTools: 'Frameworks y Herramientas',
    cloudPlatforms: 'Plataformas en la Nube',
    databases: 'Bases de Datos',
    languages: 'Idiomas',
    methodologies: 'Metodologías',
    
    // Participation
    participation: 'Participación',
    hackMtyTitle: 'Hack Mty 2022',
    hackMtyDate: '24 Sep, 2022',
    hackMtyDesc: 'Desarrollé una aplicación web atractiva para Banorte dirigida a atraer demografía más joven usando stack MERN.',
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