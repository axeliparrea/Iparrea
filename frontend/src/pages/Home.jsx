import React, { useState, useEffect } from 'react';
import { useTheme } from '../hook/ThemeContext';
import { useLanguage } from '../hook/LanguageContext';
import ParticleBackground from '../components/ParticleBackground';
import LoadingScreen from '../components/LoadingScreen';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';

const Home = () => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [currentRole, setCurrentRole] = useState('dataEngineer');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole(prev => prev === 'dataEngineer' ? 'fullStackDev' : 'dataEngineer');
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const heroStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.surface} 100%)`,
    overflow: 'hidden',
  };

  const contentStyle = {
    textAlign: 'center',
    zIndex: 2,
    position: 'relative',
    maxWidth: '800px',
    padding: '0 20px',
  };

  const nameStyle = {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: '20px',
    fontFamily: 'JetBrains Mono, monospace',
    textShadow: `0 0 30px ${colors.primary}30`,
    opacity: isVisible ? 1 : 0,
    transform: `translateY(${isVisible ? 0 : 50}px)`,
    transition: 'all 1s ease-out',
  };

  const roleStyle = {
    fontSize: '1.8rem',
    color: colors.primary,
    marginBottom: '30px',
    fontFamily: 'JetBrains Mono, monospace',
    textShadow: `0 0 20px ${colors.primary}50`,
    opacity: isVisible ? 1 : 0,
    transform: `translateY(${isVisible ? 0 : 30}px)`,
    transition: 'all 1s ease-out 0.3s',
  };

  const descriptionStyle = {
    fontSize: '1.2rem',
    color: colors.textMuted,
    lineHeight: '1.6',
    marginBottom: '40px',
    opacity: isVisible ? 1 : 0,
    transform: `translateY(${isVisible ? 0 : 30}px)`,
    transition: 'all 1s ease-out 0.6s',
  };

  const profileContainerStyle = {
    position: 'relative',
    width: '200px',
    height: '200px',
    margin: '40px auto',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${colors.primary}40, ${colors.accent}40)`,
    padding: '4px',
    boxShadow: `0 0 50px ${colors.primary}30`,
    opacity: isVisible ? 1 : 0,
    transform: `scale(${isVisible ? 1 : 0.8})`,
    transition: 'all 1s ease-out 0.9s',
  };

  const profileImageStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${colors.surface}, ${colors.background})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '4rem',
    color: colors.primary,
    fontFamily: 'JetBrains Mono, monospace',
    fontWeight: 'bold',
  };

  const downloadButtonStyle = {
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
    color: colors.background,
    border: 'none',
    borderRadius: '50px',
    padding: '15px 30px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: `0 10px 30px ${colors.primary}40`,
    fontFamily: 'JetBrains Mono, monospace',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '20px',
    opacity: isVisible ? 1 : 0,
    transform: `translateY(${isVisible ? 0 : 30}px)`,
    transition: 'all 1s ease-out 1.2s',
  };

  const scrollIndicatorStyle = {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: colors.textMuted,
    fontSize: '0.9rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    opacity: isVisible ? 1 : 0,
    animation: 'bounce 2s infinite',
  };

  const getCurrentRoleDesc = () => {
    return currentRole === 'dataEngineer' ? t('dataEngineerDesc') : t('fullStackDesc');
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <ParticleBackground />
      
      {/* Hero Section */}
      <section style={heroStyle}>
        <div style={contentStyle}>
          <h1 style={nameStyle}>
            Axel Iparrea Software Engineer
          </h1>
          
          <h2 style={roleStyle}>
            {t(currentRole)}
          </h2>
          
          <p style={descriptionStyle}>
            {getCurrentRoleDesc()}
          </p>
          
          <div style={profileContainerStyle}>
            <div style={profileImageStyle}>
              A
            </div>
          </div>
          
          <button
            style={downloadButtonStyle}
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/Axel_Iparrea_CV.pdf';
              link.download = 'Axel_Iparrea_CV.pdf';
              link.click();
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = `0 15px 40px ${colors.primary}60`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = `0 10px 30px ${colors.primary}40`;
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
            {t('downloadCV')}
          </button>
        </div>
        
        <div style={scrollIndicatorStyle}>
          <span>Scroll to explore</span>
          <div style={{
            width: '2px',
            height: '30px',
            background: `linear-gradient(to bottom, ${colors.primary}, transparent)`,
            borderRadius: '1px',
          }}></div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Contact Section Placeholder */}
      <section id="contact-section" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.surface} 100%)`,
        padding: '100px 0'
      }}>
        <div style={{
          textAlign: 'center',
          color: colors.textMuted,
          fontFamily: 'JetBrains Mono, monospace'
        }}>
          <h2 style={{ color: colors.primary, fontSize: '2rem', marginBottom: '20px' }}>
            Contact Section
          </h2>
          <p>Coming soon...</p>
        </div>
      </section>

      {/* Blog Section Placeholder */}
      <section id="blog-section" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.background} 100%)`,
        padding: '100px 0'
      }}>
        <div style={{
          textAlign: 'center',
          color: colors.textMuted,
          fontFamily: 'JetBrains Mono, monospace'
        }}>
          <h2 style={{ color: colors.primary, fontSize: '2rem', marginBottom: '20px' }}>
            Blog Section
          </h2>
          <p>Coming soon...</p>
        </div>
      </section>
    </div>
  );
};

export default Home;