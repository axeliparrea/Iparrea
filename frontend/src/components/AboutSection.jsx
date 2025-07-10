import React, { useState, useEffect } from 'react';
import { useTheme } from '../hook/ThemeContext';
import { useLanguage } from '../hook/LanguageContext';

const AboutSection = () => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check if about section is visible
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isInViewport);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionStyle = {
    minHeight: '100vh',
    position: 'relative',
    background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.surface} 50%, ${colors.background} 100%)`,
    padding: '100px 0',
    overflow: 'hidden',
  };

  const containerStyle = {
    transform: `translateY(${scrollY * 0.1}px)`,
    opacity: isVisible ? 1 : 0.3,
    transition: 'opacity 0.6s ease-out',
  };

  const titleStyle = {
    fontSize: `${Math.max(2, 4 - scrollY * 0.002)}rem`,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: '40px',
    fontFamily: 'JetBrains Mono, monospace',
    textShadow: `0 0 20px ${colors.primary}40`,
    transform: `scale(${Math.max(0.8, 1.2 - scrollY * 0.0005)})`,
    transition: 'all 0.3s ease-out',
  };

  const cardStyle = {
    background: `rgba(${colors.surface.replace('#', '').match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.1)`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${colors.border}`,
    borderRadius: '20px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: `0 8px 32px ${colors.primary}20`,
    transition: 'all 0.3s ease',
  };

  const leftCardStyle = {
    ...cardStyle,
    transform: `translateX(${isVisible ? 0 : -50}px)`,
    opacity: isVisible ? 1 : 0,
    transition: 'all 0.8s ease-out',
  };

  const rightCardStyle = {
    ...cardStyle,
    transform: `translateX(${isVisible ? 0 : 50}px)`,
    opacity: isVisible ? 1 : 0,
    transition: 'all 0.8s ease-out 0.2s',
  };

  const centerCardStyle = {
    ...cardStyle,
    transform: `translateY(${isVisible ? 0 : 50}px)`,
    opacity: isVisible ? 1 : 0,
    transition: 'all 0.8s ease-out 0.4s',
  };

  return (
    <section id="about-section" style={sectionStyle}>
      <div className="container" style={containerStyle}>
        <div className="row">
          <div className="col-12">
            <h2 style={titleStyle}>
              {t('aboutTitle')}
            </h2>
          </div>
        </div>

        <div className="row">
          {/* Personal Information */}
          <div className="col-12 col-md-6 col-lg-4">
            <div style={leftCardStyle}>
              <h3 style={{ color: colors.primary, marginBottom: '20px', fontFamily: 'JetBrains Mono, monospace' }}>
                {t('personalInfo')}
              </h3>
              <h4 style={{ color: colors.text, marginBottom: '15px', fontSize: '1.1rem' }}>
                {t('fullName')}
              </h4>
              <p style={{ color: colors.textMuted, marginBottom: '10px', fontSize: '0.9rem' }}>
                📞 {t('phone')}
              </p>
              <p style={{ color: colors.textMuted, marginBottom: '15px', fontSize: '0.9rem' }}>
                📧 {t('email')}
              </p>
              <p style={{ color: colors.textMuted, fontSize: '0.9rem', lineHeight: '1.5' }}>
                {t('aboutPersonalDesc')}
              </p>
            </div>

            {/* Current Role */}
            <div style={leftCardStyle}>
              <h3 style={{ color: colors.primary, marginBottom: '20px', fontFamily: 'JetBrains Mono, monospace' }}>
                {t('currentRole')}
              </h3>
              <h4 style={{ color: colors.text, marginBottom: '10px', fontSize: '1rem' }}>
                {t('currentRoleTitle')}
              </h4>
              <p style={{ color: colors.textMuted, fontSize: '0.9rem', lineHeight: '1.5' }}>
                {t('currentRoleDesc')}
              </p>
            </div>
          </div>

          {/* Education */}
          <div className="col-12 col-md-6 col-lg-4">
            <div style={rightCardStyle}>
              <h3 style={{ color: colors.primary, marginBottom: '20px', fontFamily: 'JetBrains Mono, monospace' }}>
                {t('education')}
              </h3>
              <h4 style={{ color: colors.text, marginBottom: '10px', fontSize: '1.1rem' }}>
                {t('educationTitle')}
              </h4>
              <p style={{ color: colors.textMuted, marginBottom: '10px', fontSize: '0.95rem', fontWeight: '500' }}>
                {t('educationSchool')}
              </p>
              <p style={{ color: colors.textMuted, marginBottom: '15px', fontSize: '0.9rem' }}>
                📍 {t('educationLocation')}
              </p>
              <p style={{ color: colors.textMuted, fontSize: '0.9rem', lineHeight: '1.5' }}>
                {t('educationDesc')}
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div className="col-12 col-md-12 col-lg-4">
            <div style={centerCardStyle}>
              <h3 style={{ color: colors.primary, marginBottom: '20px', fontFamily: 'JetBrains Mono, monospace' }}>
                {t('achievements')}
              </h3>
              
              {/* SAP Achievement */}
              <div style={{ 
                background: `linear-gradient(135deg, ${colors.primary}10, ${colors.accent}10)`,
                border: `1px solid ${colors.primary}30`,
                borderRadius: '15px',
                padding: '20px',
                marginBottom: '20px'
              }}>
                <h4 style={{ color: colors.primary, marginBottom: '10px', fontSize: '1rem' }}>
                  {t('sapAchievement')}
                </h4>
                <p style={{ color: colors.textMuted, fontSize: '0.9rem', lineHeight: '1.5' }}>
                  {t('sapAchievementDesc')}
                </p>
              </div>

              {/* Tech Stack Badges */}
              <div style={{ marginTop: '20px' }}>
                <h4 style={{ color: colors.text, marginBottom: '15px', fontSize: '0.9rem' }}>
                  Key Technologies
                </h4>
                <div className="d-flex flex-wrap gap-2">
                  {['Python', 'SAP', 'Azure', 'React', 'SQL', 'Power BI'].map((tech) => (
                    <span 
                      key={tech}
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary}20, ${colors.accent}20)`,
                        color: colors.primary,
                        padding: '6px 12px',
                        borderRadius: '15px',
                        border: `1px solid ${colors.primary}30`,
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 