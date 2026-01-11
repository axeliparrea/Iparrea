import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hook/ThemeContext';
import { motion } from 'framer-motion';
import LoadingScreen from '../components/LoadingScreen';
import AboutSection from '../components/AboutSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import TerminalComponent from '../components/TerminalComponent';
import MatrixBackground from '../components/MatrixBackground';
import TypingEffect from '../components/ui/TypingEffect';
import { useResponsive } from '../utils/responsive';
import { scrollToSection } from '../utils/scroll';
import { LOADING_SCREEN_DURATION, SOCIAL_LINKS } from '../config/constants';
import { personalInfo } from '../data/personalInfo';
import Button from '../components/ui/Button';

const Home = () => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const { isMobile } = useResponsive();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_SCREEN_DURATION);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const currentLanguage = i18n.language;
  const title = personalInfo.title[currentLanguage] || personalInfo.title.en;
  const subtitle = personalInfo.subtitle[currentLanguage] || personalInfo.subtitle.en;

  // Typing effect words based on language
  const typingWords = currentLanguage === 'es' 
    ? ['Ingeniero de IA', 'Desarrollador Full-Stack', 'Experto en Ciberseguridad', 'Arquitecto de Soluciones']
    : ['AI Engineer', 'Full-Stack Developer', 'Cybersecurity Expert', 'Solutions Architect'];

  return (
    <div style={{
      background: colors.background,
      color: colors.text,
      fontFamily: 'Inter, sans-serif',
      position: 'relative'
    }}>
      <MatrixBackground />
      
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '1rem' : '2rem',
        paddingTop: isMobile ? '6rem' : '8rem',
        paddingBottom: isMobile ? '2rem' : '4rem',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '3rem' : '5rem',
          alignItems: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              textAlign: isMobile ? 'center' : 'left'
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '700',
                marginBottom: '1rem',
                letterSpacing: '-0.02em',
                lineHeight: '1.1',
                color: colors.text,
                background: 'none',
                backgroundColor: 'transparent',
                WebkitBackgroundClip: 'unset',
                WebkitTextFillColor: 'unset',
                backgroundClip: 'unset'
              }}
            >
              Axel Iparrea
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                fontSize: isMobile ? 'clamp(1rem, 4vw, 1.2rem)' : 'clamp(1.2rem, 2vw, 1.8rem)',
                color: colors.primary,
                marginBottom: '1rem',
                fontWeight: '500',
                lineHeight: '1.4',
                minHeight: isMobile ? '1.5rem' : '2rem'
              }}
            >
              <TypingEffect 
                words={typingWords}
                typingSpeed={80}
                deletingSpeed={40}
                pauseDuration={2500}
                cursorColor={colors.primary}
              />
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                fontSize: isMobile ? 'clamp(0.9rem, 3vw, 1rem)' : 'clamp(1rem, 1.5vw, 1.2rem)',
                color: colors.textSecondary,
                marginBottom: '1.5rem',
                lineHeight: '1.6',
                maxWidth: isMobile ? '100%' : '90%'
              }}
            >
              {subtitle}
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              style={{
                display: 'flex',
                gap: isMobile ? '1rem' : '2rem',
                marginBottom: '2rem',
                justifyContent: isMobile ? 'center' : 'flex-start',
                flexWrap: 'wrap'
              }}
            >
              {[
                { value: '4.0', label: 'GPA' },
                { value: currentLanguage === 'es' ? '10+' : '10+', label: currentLanguage === 'es' ? 'Proyectos' : 'Projects' },
                { value: currentLanguage === 'es' ? '3+' : '3+', label: currentLanguage === 'es' ? 'Hackathons' : 'Hackathons' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  style={{
                    textAlign: 'center',
                    padding: isMobile ? '0.5rem' : '0.75rem',
                    background: `${colors.primary}08`,
                    borderRadius: '8px',
                    border: `1px solid ${colors.primary}20`,
                    minWidth: isMobile ? '70px' : '80px'
                  }}
                >
                  <div style={{
                    fontSize: isMobile ? '1.25rem' : '1.5rem',
                    fontWeight: '700',
                    color: colors.primary,
                    lineHeight: '1'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: isMobile ? '0.65rem' : '0.75rem',
                    color: colors.textSecondary,
                    marginTop: '0.25rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{
                display: 'flex',
                gap: isMobile ? '1rem' : '1.5rem',
                flexWrap: 'wrap',
                marginBottom: '2rem',
                justifyContent: isMobile ? 'center' : 'flex-start'
              }}
            >
              <Button
                onClick={() => scrollToSection('projects')}
                variant="primary"
                size={isMobile ? 'small' : 'medium'}
              >
                {t('viewMyWork')}
              </Button>
              
              <a
                href="/Axel-Iparrea-AI-Engineer-Cybersecurity-Expert.pdf"
                download="Axel-Iparrea-AI-Engineer-Cybersecurity-Expert.pdf"
                className="btn btn-secondary"
                style={{
                  background: 'transparent',
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  padding: isMobile ? '0.6rem 1.2rem' : '0.75rem 1.5rem',
                  fontSize: isMobile ? '0.85rem' : '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'inline-block',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                {t('downloadCV')}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                marginBottom: '2rem',
                justifyContent: isMobile ? 'center' : 'flex-start'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: isMobile ? '0.4rem 0.8rem' : '0.5rem 1rem',
                background: `${colors.primary}20`,
                borderRadius: '20px',
                border: `1px solid ${colors.primary}30`
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#22c55e',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }}></div>
                <span style={{
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  color: colors.primary,
                  fontWeight: '500'
                }}>
                  {t('availableForOpportunities')}
                </span>
              </div>
            </motion.div>

            {isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                style={{
                  background: `${colors.surface}80`,
                  padding: '1rem',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}
              >
                <p style={{
                  fontSize: '0.8rem',
                  color: colors.textSecondary
                }}>
                  {t('exploreSkillsProjects')}
                </p>
              </motion.div>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <TerminalComponent />
          </motion.div>
        </div>
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="experience">
        <ExperienceSection />
      </section>

      <section id="projects">
        <ProjectsSection />
      </section>

      <section id="contact" style={{
        padding: isMobile ? '3rem 1rem' : '5rem 0',
        background: colors.surface,
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem'
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: '600',
              marginBottom: '2rem',
              color: colors.text
            }}
          >
            {t('contactTitle')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: isMobile ? '1rem' : '1.2rem',
              color: colors.textSecondary,
              lineHeight: '1.6',
              marginBottom: '3rem'
            }}
          >
            {t('contactDescription')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              display: 'flex',
              gap: isMobile ? '1rem' : '2rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <a
              href={`mailto:${SOCIAL_LINKS.EMAIL}`}
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant="primary"
                size={isMobile ? 'small' : 'medium'}
              >
                {t('sendEmail')}
              </Button>
            </a>
            
            <a
              href={SOCIAL_LINKS.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant="secondary"
                size={isMobile ? 'small' : 'medium'}
              >
                {t('connectOnLinkedIn')}
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Home;