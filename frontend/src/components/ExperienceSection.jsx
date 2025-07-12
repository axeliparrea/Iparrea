import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hook/ThemeContext';
import { motion } from 'framer-motion';

const ExperienceSection = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredExp, setHoveredExp] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('experience');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8;
        setIsVisible(isInView);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Versión completa para desktop
  const experiences = [
    {
      id: 1,
      year: '2022',
      title: 'Starting my CS Journey',
      company: 'Tecnológico de Monterrey',
      period: 'Aug 2022',
      description: 'Began my Computer Science Engineering degree with curiosity about technology and a passion for problem-solving. Ranked as the top university in Mexico and among the most prestigious in Latin America.',
      learnings: 'Programming fundamentals in C++ and Java, discrete mathematics, data structures, and algorithms',
      projects: 'Calculator application in C++, basic sorting algorithms implementation, console-based student management system',
      skills: ['C++', 'Java', 'Data Structures', 'Algorithms', 'Object-Oriented Programming']
    },
    {
      id: 2,
      year: '2022',
      title: 'First Hackathon Experience',
      company: 'Hack MTY 2022',
      period: 'Sep 2022',
      description: 'Just one month into university, I participated in my first hackathon. This experience opened my eyes to collaborative development and real-world applications, working in a team of 4 developers.',
      learnings: 'Team collaboration, rapid prototyping, web development basics, project management under pressure',
      projects: 'Banorte web application focused on attracting and retaining younger demographics with interactive features',
      skills: ['HTML', 'CSS', 'JavaScript', 'Team Collaboration', 'Rapid Prototyping']
    },
    {
      id: 3,
      year: '2023',
      title: 'Expanding into Full Stack Development',
      company: 'Personal & Academic Development',
      period: 'Jan 2023 - Present',
      description: 'Started developing more complex applications, exploring different technologies and building a solid foundation in both frontend and backend development. Focus on creating scalable and maintainable systems.',
      learnings: 'React ecosystem, C# and .NET framework, Unity game development, database design and management, UI/UX principles',
      projects: 'AWAK Dashboard with real-time analytics, Unity-based games, various web applications with full authentication systems',
      skills: ['React', 'C#', '.NET', 'Unity', 'SQL Server', 'UI/UX Design', 'Database Management']
    },
    {
      id: 4,
      year: '2024',
      title: 'Deepening Technical Specialization',
      company: 'Academic Excellence & Industry Focus',
      period: 'Jan 2024 - Present',
      description: 'Focused on maintaining academic excellence while specializing in AI, cybersecurity, and system architecture. Started working on more sophisticated projects with real-world applications.',
      learnings: 'Advanced AI/ML algorithms, cybersecurity principles, system architecture design, cloud computing fundamentals',
      projects: 'Multi-agent system simulations, cybersecurity integration projects, machine learning models for data analysis',
      skills: ['Python', 'Machine Learning', 'Cybersecurity', 'System Architecture', 'Cloud Computing', 'AI/ML']
    },
    {
      id: 5,
      year: '2025',
      title: 'Professional Recognition & Excellence',
      company: 'SAP Labs & ESAB',
      period: 'Jan 2025 - Present',
      description: 'Achieved significant recognition by winning the SAP Labs Final Showcase with SAPitos 2.0. Currently working as Data Automation & Cloud Engineer at ESAB, applying enterprise-level solutions in real-world scenarios.',
      learnings: 'Enterprise software development, SAP ecosystem integration, cloud automation, data pipeline optimization, AI integration in business processes',
      projects: 'SAPitos 2.0: AI-powered smart supply chain solution, automated data workflows using Python and SQL, Power BI dashboards for business insights',
      skills: ['SAP S/4HANA', 'Python', 'SQL', 'Power BI', 'Power Query', 'Azure', 'Data Engineering', 'Cloud Automation']
    }
  ];

  // Versión simplificada para móviles
  const mobileExperiences = [
    {
      id: 1,
      year: '2022',
      title: 'CS Journey Begins',
      company: 'Tecnológico de Monterrey',
      period: 'Aug 2022',
      keyPoint: 'Started Computer Science degree',
      skills: ['C++', 'Java', 'Algorithms']
    },
    {
      id: 2,
      year: '2022',
      title: 'First Hackathon',
      company: 'Hack MTY 2022',
      period: 'Sep 2022',
      keyPoint: 'Team collaboration & web development',
      skills: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 3,
      year: '2023',
      title: 'Full Stack Development',
      company: 'Academic & Personal',
      period: '2023',
      keyPoint: 'Complex applications & scalable systems',
      skills: ['React', 'C#', '.NET', 'Unity']
    },
    {
      id: 4,
      year: '2024',
      title: 'Technical Specialization',
      company: 'Academic Excellence',
      period: '2024',
      keyPoint: 'AI, cybersecurity & architecture',
      skills: ['Python', 'ML', 'Cybersecurity']
    },
    {
      id: 5,
      year: '2025',
      title: 'Professional Success',
      company: 'SAP Labs & ESAB',
      period: '2025',
      keyPoint: 'SAP Winner & Data Engineer',
      skills: ['SAP', 'Python', 'Azure']
    }
  ];

  const getYearColor = (year) => {
    const yearColors = {
      '2022': '#e11d48', // Red - Beginning
      '2023': '#0ea5e9', // Blue - Growth
      '2024': '#f59e0b', // Orange - Specialization  
      '2025': '#10b981'  // Green - Achievement
    };
    return yearColors[year] || colors.primary;
  };

  // Componente para versión desktop
  const DesktopExperience = ({ exp, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      style={{
        background: colors.surface,
        borderRadius: '16px',
        padding: '2.5rem',
        marginBottom: '3rem',
        marginLeft: '4rem',
        border: `1px solid ${colors.border}`,
        boxShadow: `0 8px 32px ${colors.primary}15`,
        position: 'relative',
        transform: hoveredExp === exp.id ? 'translateX(10px)' : 'translateX(0)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={() => setHoveredExp(exp.id)}
      onMouseLeave={() => setHoveredExp(null)}
    >
      {/* Year Badge */}
      <div
        style={{
          position: 'absolute',
          left: '-3.5rem',
          top: '2.5rem',
          width: '2.5rem',
          height: '2.5rem',
          backgroundColor: getYearColor(exp.year),
          borderRadius: '50%',
          border: `4px solid ${colors.background}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.9rem',
          fontWeight: '700',
          color: '#ffffff',
          zIndex: 2,
          boxShadow: `0 4px 15px ${getYearColor(exp.year)}40`
        }}
      >
        {exp.year.slice(-2)}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: colors.text,
            marginBottom: '0.5rem'
          }}>
            {exp.title}
          </h3>
          <p style={{
            fontSize: '1.1rem',
            color: getYearColor(exp.year),
            fontWeight: '500',
            marginBottom: '0.5rem'
          }}>
            {exp.company}
          </p>
        </div>
        
        <span style={{
          background: `${getYearColor(exp.year)}20`,
          color: getYearColor(exp.year),
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.9rem',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          border: `1px solid ${getYearColor(exp.year)}30`
        }}>
          {exp.period}
        </span>
      </div>

      <p style={{
        fontSize: '1rem',
        color: colors.textSecondary,
        lineHeight: '1.6',
        marginBottom: '2rem'
      }}>
        {exp.description}
      </p>

      {/* Skills Tags */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '2rem'
      }}>
        {exp.skills.map((skill, skillIndex) => (
          <span
            key={skillIndex}
            style={{
              background: `${colors.primary}15`,
              color: colors.primary,
              padding: '0.25rem 0.75rem',
              borderRadius: '12px',
              fontSize: '0.8rem',
              fontWeight: '500',
              border: `1px solid ${colors.primary}30`
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Learning & Growth */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem'
      }}>
        <div>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: colors.text,
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: getYearColor(exp.year),
              borderRadius: '50%'
            }}></div>
            Key Learning
          </h4>
          <p style={{
            fontSize: '0.9rem',
            color: colors.textSecondary,
            lineHeight: '1.6'
          }}>
            {exp.learnings}
          </p>
        </div>

        <div>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: colors.text,
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: getYearColor(exp.year),
              borderRadius: '50%'
            }}></div>
            Notable Projects
          </h4>
          <p style={{
            fontSize: '0.9rem',
            color: colors.textSecondary,
            lineHeight: '1.6'
          }}>
            {exp.projects}
          </p>
        </div>
      </div>
    </motion.div>
  );

  // Componente para versión móvil simplificada
  const MobileExperience = ({ exp, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        background: colors.surface,
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '1rem',
        marginLeft: '2rem',
        border: `1px solid ${colors.border}`,
        boxShadow: `0 4px 16px ${colors.primary}10`,
        position: 'relative'
      }}
    >
      {/* Year Badge móvil */}
      <div
        style={{
          position: 'absolute',
          left: '-1.5rem',
          top: '1rem',
          width: '1.8rem',
          height: '1.8rem',
          backgroundColor: getYearColor(exp.year),
          borderRadius: '50%',
          border: `3px solid ${colors.background}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.7rem',
          fontWeight: '700',
          color: '#ffffff',
          zIndex: 2
        }}
      >
        {exp.year.slice(-2)}
      </div>

      {/* Header compacto */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '0.75rem'
      }}>
        <div style={{ flex: 1, paddingRight: '0.5rem' }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: colors.text,
            marginBottom: '0.25rem',
            lineHeight: '1.2'
          }}>
            {exp.title}
          </h3>
          <p style={{
            fontSize: '0.85rem',
            color: getYearColor(exp.year),
            fontWeight: '500'
          }}>
            {exp.company}
          </p>
        </div>
        
        <span style={{
          background: `${getYearColor(exp.year)}20`,
          color: getYearColor(exp.year),
          padding: '0.25rem 0.5rem',
          borderRadius: '12px',
          fontSize: '0.7rem',
          fontWeight: '600',
          whiteSpace: 'nowrap'
        }}>
          {exp.period}
        </span>
      </div>

      {/* Punto clave */}
      <p style={{
        fontSize: '0.85rem',
        color: colors.textSecondary,
        lineHeight: '1.4',
        marginBottom: '0.75rem'
      }}>
        {exp.keyPoint}
      </p>

      {/* Skills mínimos */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.25rem'
      }}>
        {exp.skills.slice(0, 3).map((skill, skillIndex) => (
          <span
            key={skillIndex}
            style={{
              background: `${colors.primary}15`,
              color: colors.primary,
              padding: '0.15rem 0.5rem',
              borderRadius: '8px',
              fontSize: '0.7rem',
              fontWeight: '500'
            }}
          >
            {skill}
          </span>
        ))}
        {exp.skills.length > 3 && (
          <span style={{
            color: colors.textSecondary,
            fontSize: '0.7rem',
            alignSelf: 'center'
          }}>
            +{exp.skills.length - 3} más
          </span>
        )}
      </div>
    </motion.div>
  );

  return (
    <section
      id="experience"
      style={{
        padding: isMobile ? '2rem 1rem' : '5rem 0',
        background: colors.background,
        borderBottom: `1px solid ${colors.border}`
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '4rem' }}
        >
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: '600',
            color: colors.text,
            marginBottom: '1rem'
          }}>
            My Professional Journey
          </h2>
          <div style={{
            width: '60px',
            height: '4px',
            background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary || colors.primary})`,
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
          <p style={{
            fontSize: isMobile ? '0.9rem' : '1.1rem',
            color: colors.textSecondary,
            marginTop: '1rem',
            maxWidth: '700px',
            margin: '1rem auto 0'
          }}>
            {isMobile ? 
              'Key milestones and achievements' : 
              'From curious beginner to award-winning developer and professional engineer - a journey of continuous learning and innovation'
            }
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* Timeline Line */}
          <div style={{
            position: 'absolute',
            left: isMobile ? '0.5rem' : '2rem',
            top: '0',
            bottom: '0',
            width: '3px',
            background: `linear-gradient(to bottom, ${colors.primary}, ${colors.secondary || colors.primary})`,
            zIndex: 1,
            borderRadius: '2px'
          }}></div>

          {/* Renderizar versión según dispositivo */}
          {isMobile ? 
            mobileExperiences.map((exp, index) => (
              <MobileExperience key={exp.id} exp={exp} index={index} />
            )) :
            experiences.map((exp, index) => (
              <DesktopExperience key={exp.id} exp={exp} index={index} />
            ))
          }
        </div>

        {/* Current Status - Simplificado en móvil */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            textAlign: 'center',
            marginTop: isMobile ? '2rem' : '4rem',
            padding: isMobile ? '2rem 1rem' : '3rem 2rem',
            background: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.background} 100%)`,
            borderRadius: '20px',
            border: `1px solid ${colors.border}`,
            boxShadow: `0 8px 32px ${colors.shadow}`
          }}
        >
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1.5rem',
            background: `${colors.primary}20`,
            borderRadius: '20px',
            marginBottom: '1rem',
            border: `1px solid ${colors.primary}30`
          }}>
            <span style={{
              fontSize: '0.9rem',
              color: colors.primary,
              fontWeight: '600'
            }}>
              Current Status
            </span>
          </div>
          
          <h3 style={{
            fontSize: isMobile ? '1.3rem' : '1.8rem',
            fontWeight: '600',
            color: colors.text,
            marginBottom: '1rem'
          }}>
            {isMobile ? '4.0 GPA & Data Engineer' : '4.0 GPA Student & Professional Data Engineer'}
          </h3>
          
          <p style={{
            fontSize: isMobile ? '0.9rem' : '1.1rem',
            color: colors.textSecondary,
            lineHeight: '1.6',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {isMobile ? 
              'Excelling academically while working professionally as Data Engineer at ESAB. SAP Labs winner and innovative solutions developer.' :
              'Currently excelling academically in my 3rd year at Tecnológico de Monterrey while working professionally as a Data Automation & Cloud Engineer at ESAB. My journey from curious beginner to recognized developer and professional engineer demonstrates my commitment to continuous learning, innovation, and real-world application of technology.'
            }
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? '1rem' : '2rem',
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              textAlign: 'center',
              padding: isMobile ? '0.75rem' : '1rem',
              background: `${colors.primary}10`,
              borderRadius: '12px',
              border: `1px solid ${colors.primary}20`
            }}>
              <div style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: '700',
                color: colors.primary,
                marginBottom: '0.5rem'
              }}>
                4.0
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: colors.textSecondary,
                fontWeight: '500'
              }}>
                GPA
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: isMobile ? '0.75rem' : '1rem',
              background: `${colors.primary}10`,
              borderRadius: '12px',
              border: `1px solid ${colors.primary}20`
            }}>
              <div style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: '700',
                color: colors.primary,
                marginBottom: '0.5rem'
              }}>
                2025
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: colors.textSecondary,
                fontWeight: '500'
              }}>
                SAP Winner
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: isMobile ? '0.75rem' : '1rem',
              background: `${colors.primary}10`,
              borderRadius: '12px',
              border: `1px solid ${colors.primary}20`
            }}>
              <div style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: '700',
                color: colors.primary,
                marginBottom: '0.5rem'
              }}>
                2025
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: colors.textSecondary,
                fontWeight: '500'
              }}>
                ESAB Engineer
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection; 