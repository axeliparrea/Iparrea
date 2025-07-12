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

const Home = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={{
      background: colors.background,
      color: colors.text,
      fontFamily: 'Inter, sans-serif',
      position: 'relative'
    }}>
      {/* Matrix Background */}
      <MatrixBackground />
      
      {/* Hero Section */}
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
          {/* Left Side - Info */}
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
                color: colors.text
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
                color: colors.textSecondary,
                marginBottom: '1rem',
                fontWeight: '500',
                lineHeight: '1.4'
              }}
            >
              {t('dataEngineer')} & {t('fullStackDev')}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                fontSize: isMobile ? 'clamp(0.9rem, 3vw, 1rem)' : 'clamp(1rem, 1.5vw, 1.2rem)',
                color: colors.textSecondary,
                marginBottom: '2rem',
                lineHeight: '1.6',
                maxWidth: isMobile ? '100%' : '90%'
              }}
            >
              {t('specialized')} {t('in')} SAP data {t('solutions')}, AI/ML, {t('and')} cybersecurity. 
              Award-winning developer {t('building')} innovative {t('solutions')} {t('in')} Monterrey, Mexico.
            </motion.p>
            
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
              <button
                onClick={() => scrollToSection('projects')}
                className="btn btn-primary"
                style={{
                  background: colors.primary,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: isMobile ? '0.6rem 1.2rem' : '0.75rem 1.5rem',
                  fontSize: isMobile ? '0.85rem' : '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 2px 8px ${colors.primary}30`,
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                {t('viewMyWork')}
              </button>
              
              <a
                href="/Axel_Iparrea_ComputerScience.pdf"
                download="Axel_Iparrea_CV.pdf"
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

            {/* Mobile Terminal Note */}
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
                  fontSize: '0.9rem',
                  color: colors.textSecondary,
                  marginBottom: '0.5rem'
                }}>
                  💻 {t('terminalInteractiveBelow')}
                </p>
                <p style={{
                  fontSize: '0.8rem',
                  color: colors.textSecondary
                }}>
                  {t('exploreSkillsProjects')}
                </p>
              </motion.div>
            )}
          </motion.div>
          
          {/* Right Side - Terminal (Always Active) */}
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

      {/* About Section */}
      <section id="about">
        <AboutSection />
      </section>

      {/* Experience Section */}
      <section id="experience">
        <ExperienceSection />
      </section>

      {/* Projects Section */}
      <section id="projects">
        <ProjectsSection />
      </section>

      {/* Contact Section */}
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
              href="mailto:axeliparrea@gmail.com"
              className="btn btn-primary"
              style={{
                background: colors.primary,
                color: '#ffffff',
                textDecoration: 'none',
                padding: isMobile ? '0.6rem 1.2rem' : '0.75rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'inline-block',
                fontSize: isMobile ? '0.85rem' : '0.95rem'
              }}
            >
              {t('sendEmail')}
            </a>
            
            <a
              href="https://linkedin.com/in/axel-iparrea"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                background: 'transparent',
                color: colors.text,
                textDecoration: 'none',
                padding: isMobile ? '0.6rem 1.2rem' : '0.75rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'inline-block',
                border: `1px solid ${colors.border}`,
                fontSize: isMobile ? '0.85rem' : '0.95rem'
              }}
            >
              {t('connectOnLinkedIn')}
            </a>
          </motion.div>
        </div>
      </section>

      {/* CSS Animation */}
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