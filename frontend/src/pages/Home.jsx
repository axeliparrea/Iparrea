import React, { useEffect, useState } from 'react';
import { useTheme } from '../hook/ThemeContext';
import { useLanguage } from '../hook/LanguageContext';

const Home = () => {
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    console.log('Home loaded, colors:', colors);
    console.log('isDark:', isDark);
  }, [colors, isDark]);

  const containerStyle = {
    background: colors.background,
    color: colors.text,
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '80px',
  };

  const heroStyle = {
    background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.surface} 50%, ${colors.background} 100%)`,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    padding: '20px',
  };

  const profileImageStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20, ${colors.accent}20)`,
    border: `3px solid ${colors.primary}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    fontWeight: 'bold',
    color: colors.primary,
    margin: '0 auto',
    boxShadow: `0 0 30px ${colors.primary}40`,
    fontFamily: 'JetBrains Mono, monospace',
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: '20px',
    textShadow: `0 0 20px ${colors.primary}40`,
    fontFamily: 'JetBrains Mono, monospace',
    textAlign: 'center',
  };

  const descriptionStyle = {
    fontSize: '1.2rem',
    color: colors.textMuted,
    marginBottom: '30px',
    lineHeight: '1.6',
    fontFamily: 'Inter, sans-serif',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-12 col-md-8 col-lg-6 text-center">
            
            {/* Profile Image */}
            <div style={profileImageStyle}>
              <span style={{ textShadow: `0 0 20px ${colors.primary}` }}>
                A
              </span>
            </div>

            {/* Title */}
            <h1 style={titleStyle}>
              AIR Portfolio
            </h1>

            {/* Description */}
            <p style={descriptionStyle}>
              {t('dataEngineerDesc')}
            </p>

            {/* Tech Stack */}
            <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
              {['Python', 'React', 'Azure', 'SAP'].map((tech, index) => (
                <span 
                  key={tech}
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}20, ${colors.accent}20)`,
                    color: colors.primary,
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: `1px solid ${colors.primary}30`,
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily: 'JetBrains Mono, monospace',
                    boxShadow: `0 0 15px ${colors.primary}20`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Debug Info */}
            <div style={{
              position: 'fixed',
              top: '100px',
              left: '10px',
              padding: '10px',
              background: 'rgba(0,0,0,0.8)',
              color: 'white',
              fontSize: '12px',
              fontFamily: 'monospace',
              zIndex: 1000,
              borderRadius: '4px',
            }}>
              <div>Theme: {isDark ? 'dark' : 'light'}</div>
              <div>Background: {colors.background}</div>
              <div>Text: {colors.text}</div>
              <div>Primary: {colors.primary}</div>
              <div>isLoaded: {isLoaded ? 'true' : 'false'}</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;