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
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
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
        padding: window.innerWidth < 768 ? '1rem' : '2rem',
        paddingTop: window.innerWidth < 768 ? '7rem' : '8rem',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: window.innerWidth < 768 ? '2rem' : '4rem',
          alignItems: 'center'
        }}>
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              textAlign: 'left'
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
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
                fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
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
                fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                color: colors.textSecondary,
                marginBottom: '2rem',
                lineHeight: '1.6'
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
                gap: '1.5rem',
                flexWrap: 'wrap',
                marginBottom: '2rem'
              }}
            >
              <button
                onClick={() => scrollToSection('projects')}
                style={{
                  background: colors.primary,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 2px 8px ${colors.primary}30`,
                  fontFamily: 'Inter, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = '1';
                }}
              >
                {t('viewMyWork')}
              </button>
              
              <a
                href="/Axel_Iparrea_ComputerScience.pdf"
                download="Axel_Iparrea_CV.pdf"
                style={{
                  background: 'transparent',
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'inline-block',
                  fontFamily: 'Inter, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = colors.primary;
                  e.target.style.color = '#ffffff';
                  e.target.style.borderColor = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = colors.text;
                  e.target.style.borderColor = colors.border;
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
                marginBottom: '2rem'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
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
                  fontSize: '0.9rem',
                  color: colors.primary,
                  fontWeight: '500'
                }}>
                  {t('availableForOpportunities')}
                </span>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              onClick={() => setShowTerminal(!showTerminal)}
              style={{
                background: `${colors.surface}`,
                color: colors.text,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'Monaco, monospace'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = colors.primary;
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = colors.surface;
                e.target.style.color = colors.text;
              }}
            >
              {showTerminal ? t('hideTerminal') : t('showTerminal')}
            </motion.button>
          </motion.div>
          
          {/* Right Side - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {showTerminal ? (
              <TerminalComponent />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                  width: window.innerWidth < 768 ? '300px' : '400px',
                  height: window.innerWidth < 768 ? '300px' : '400px',
                  background: colors.surface,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${colors.border}`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  fontSize: '6rem',
                  fontWeight: '700',
                  color: `${colors.primary}30`,
                  fontFamily: 'Monaco, monospace'
                }}>
                  {'{ }'}
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '2rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: colors.textSecondary,
                  fontSize: '0.9rem',
                  fontFamily: 'Monaco, monospace'
                }}>
                  {t('clickToExplore')}
                </div>
              </motion.div>
            )}
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
        padding: window.innerWidth < 768 ? '3rem 1rem' : '5rem 0',
        background: colors.surface,
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: '2.5rem',
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
              fontSize: '1.2rem',
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
              gap: '2rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <a
              href="mailto:axeliparrea@gmail.com"
              style={{
                background: colors.primary,
                color: '#ffffff',
                textDecoration: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'inline-block',
                fontSize: '0.95rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1';
              }}
            >
              {t('sendEmail')}
            </a>
            
            <a
              href="https://linkedin.com/in/axel-iparrea"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'transparent',
                color: colors.text,
                textDecoration: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'inline-block',
                border: `1px solid ${colors.border}`,
                fontSize: '0.95rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = colors.primary;
                e.target.style.color = '#ffffff';
                e.target.style.borderColor = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = colors.text;
                e.target.style.borderColor = colors.border;
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