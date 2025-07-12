import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hook/ThemeContext';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('about');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8;
        setIsVisible(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const programmingLanguages = [
    'Python', 'JavaScript', 'C#', 'C++', 'Java', 'Kotlin', 'HTML5', 'CSS3', 'SQL', 'TypeScript'
  ];

  const frameworksTools = [
    'React', 'Node.js', '.NET Core', 'Unity', 'Express.js', 'SAP S/4HANA', 'Power BI', 'Power Query',
    'Bootstrap', 'Tailwind CSS', 'Axios', 'Azure', 'Git', 'Linux', 'Agile methodology'
  ];

  const languages = [
    { name: 'English', level: 'Native' },
    { name: 'Spanish', level: 'Native' },
    { name: 'Italian', level: 'Basic' }
  ];

  const currentWork = {
    title: 'Data Automation & Cloud Engineer',
    company: 'ESAB',
    period: 'Jan 2025 - Present',
    description: 'Developing automated data workflows using Python and SQL, enhancing operational efficiency and accuracy. Creating dynamic dashboards with Power BI and Power Query, delivering actionable insights and real-time visualization.'
  };

  const education = {
    degree: 'Computer Science Engineering',
    university: 'Tecnológico de Monterrey',
    period: '2022 - 2026',
    gpa: '4.0',
    note: 'Ranked as the top university in Mexico and among the most prestigious in Latin America'
  };

  return (
    <section
      id="about"
      style={{
        padding: window.innerWidth < 768 ? '3rem 1rem' : '5rem 0',
        background: colors.background,
        borderBottom: `1px solid ${colors.border}`
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            color: colors.text,
            marginBottom: '1rem'
          }}>
            {t('aboutTitle')}
          </h2>
          <div style={{
            width: '60px',
            height: '4px',
            background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary || colors.primary})`,
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}
        >
          <div style={{
            width: window.innerWidth < 768 ? '150px' : '200px',
            height: window.innerWidth < 768 ? '150px' : '200px',
            borderRadius: '50%',
            margin: '0 auto',
            overflow: 'hidden',
            border: `4px solid ${colors.primary}`,
            boxShadow: `0 8px 24px ${colors.primary}25`
          }}>
            <img
              src="/assets/pictures/poseaxel.png"
              alt="Axel Eduardo Iparrea Ramos"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: window.innerWidth < 768 ? '1.5rem' : '2rem',
          alignItems: 'stretch'
        }}>
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              background: colors.surface,
              padding: '2rem',
              borderRadius: '12px',
              border: `1px solid ${colors.border}`,
              boxShadow: `0 4px 12px ${colors.shadow}`
            }}
          >
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: colors.text,
              marginBottom: '1.5rem'
            }}>
              Personal Information
            </h3>
            <div style={{ color: colors.textSecondary, lineHeight: '1.6' }}>
              <p style={{ marginBottom: '1rem' }}>
                <strong style={{ color: colors.text }}>Name:</strong> {t('fullName')}
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong style={{ color: colors.text }}>Email:</strong> {t('email')}
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong style={{ color: colors.text }}>Phone:</strong> {t('phone')}
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong style={{ color: colors.text }}>Location:</strong> {t('location')}
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong style={{ color: colors.text }}>LinkedIn:</strong> 
                <a 
                  href="https://linkedin.com/in/axel-iparrea" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: colors.primary, textDecoration: 'none', marginLeft: '0.5rem' }}
                >
                  linkedin.com/in/axel-iparrea
                </a>
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong style={{ color: colors.text }}>GitHub:</strong> 
                <a 
                  href="https://github.com/axeliparrea" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: colors.primary, textDecoration: 'none', marginLeft: '0.5rem' }}
                >
                  github.com/axeliparrea
                </a>
              </p>
            </div>
          </motion.div>

          {/* Current Work */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              background: colors.surface,
              padding: '2rem',
              borderRadius: '12px',
              border: `1px solid ${colors.border}`,
              boxShadow: `0 4px 12px ${colors.shadow}`
            }}
          >
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: colors.text,
              marginBottom: '1.5rem'
            }}>
              Current Work
            </h3>
            <div style={{
              background: `${colors.primary}10`,
              padding: '1.5rem',
              borderRadius: '8px',
              border: `1px solid ${colors.primary}30`
            }}>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: colors.text,
                marginBottom: '0.5rem'
              }}>
                {currentWork.title}
              </h4>
              <p style={{
                color: colors.primary,
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                {currentWork.company}
              </p>
              <p style={{
                color: colors.textSecondary,
                marginBottom: '1rem',
                fontSize: '0.9rem'
              }}>
                {currentWork.period}
              </p>
              <p style={{
                color: colors.textSecondary,
                lineHeight: '1.5',
                fontSize: '0.95rem'
              }}>
                {currentWork.description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            background: colors.surface,
            padding: '2rem',
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            boxShadow: `0 4px 12px ${colors.shadow}`,
            marginTop: '3rem'
          }}
        >
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: colors.text,
            marginBottom: '1.5rem'
          }}>
            {t('educationTitle')}
          </h3>
          <div style={{
            background: `${colors.primary}10`,
            padding: '1.5rem',
            borderRadius: '8px',
            border: `1px solid ${colors.primary}30`
          }}>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: colors.text,
              marginBottom: '0.5rem'
            }}>
              {education.degree}
            </h4>
            <p style={{
              color: colors.primary,
              marginBottom: '0.5rem',
              fontWeight: '500'
            }}>
              {education.university}
            </p>
            <p style={{
              color: colors.textSecondary,
              marginBottom: '0.5rem'
            }}>
              {education.period} • GPA: {education.gpa}
            </p>
            <p style={{
              color: colors.textSecondary,
              fontSize: '0.9rem',
              fontStyle: 'italic'
            }}>
              {education.note}
            </p>
          </div>
        </motion.div>

        {/* About Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            background: colors.surface,
            padding: '2rem',
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            boxShadow: `0 4px 12px ${colors.shadow}`,
            marginTop: '3rem'
          }}
        >
          <p style={{
            fontSize: '1.1rem',
            color: colors.textSecondary,
            lineHeight: '1.8',
            textAlign: 'center'
          }}>
            {t('aboutDescription')}
          </p>
        </motion.div>

        {/* Skills and Languages */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: window.innerWidth < 768 ? '1.5rem' : '2rem',
          marginTop: window.innerWidth < 768 ? '2rem' : '3rem'
        }}>
          {/* Programming Languages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              background: colors.surface,
              padding: '2rem',
              borderRadius: '12px',
              border: `1px solid ${colors.border}`,
              boxShadow: `0 4px 12px ${colors.shadow}`
            }}
          >
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: colors.text,
              marginBottom: '1.5rem'
            }}>
              Programming Languages
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              {programmingLanguages.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  style={{
                    background: `${colors.primary}15`,
                    color: colors.primary,
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    border: `1px solid ${colors.primary}30`
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Frameworks & Tools */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              background: colors.surface,
              padding: '2rem',
              borderRadius: '12px',
              border: `1px solid ${colors.border}`,
              boxShadow: `0 4px 12px ${colors.shadow}`
            }}
          >
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: colors.text,
              marginBottom: '1.5rem'
            }}>
              Frameworks & Tools
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              {frameworksTools.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  style={{
                    background: `${colors.primary}15`,
                    color: colors.primary,
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    border: `1px solid ${colors.primary}30`
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              background: colors.surface,
              padding: '2rem',
              borderRadius: '12px',
              border: `1px solid ${colors.border}`,
              boxShadow: `0 4px 12px ${colors.shadow}`
            }}
          >
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: colors.text,
              marginBottom: '1.5rem'
            }}>
              {t('languages')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {languages.map((lang, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem',
                    background: `${colors.primary}10`,
                    borderRadius: '8px',
                    border: `1px solid ${colors.primary}20`
                  }}
                >
                  <span style={{
                    color: colors.text,
                    fontWeight: '500'
                  }}>
                    {lang.name}
                  </span>
                  <span style={{
                    color: colors.textSecondary,
                    fontSize: '14px'
                  }}>
                    {lang.level}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 