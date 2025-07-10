import React from 'react';
import { useTheme } from '../hook/ThemeContext';
import { useLanguage } from '../hook/LanguageContext';

const LoadingScreen = ({ isLoading }) => {
  const { colors } = useTheme();
  const { t } = useLanguage();

  if (!isLoading) return null;

  const loadingStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: colors.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    flexDirection: 'column',
    animation: 'fadeOut 0.5s ease-out 1.5s forwards',
  };

  const profileImageStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20, ${colors.accent}20)`,
    border: `3px solid ${colors.primary}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: colors.primary,
    boxShadow: `0 0 30px ${colors.primary}40`,
    fontFamily: 'JetBrains Mono, monospace',
    animation: 'pulse 1.5s ease-in-out infinite',
  };

  const loadingTextStyle = {
    marginTop: '20px',
    color: colors.textMuted,
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    animation: 'fadeInOut 2s ease-in-out infinite',
  };

  return (
    <>
      <div style={loadingStyle}>
        <div style={profileImageStyle}>
          <span style={{ textShadow: `0 0 20px ${colors.primary}` }}>
            A
          </span>
        </div>
        <div style={loadingTextStyle}>
          {t('loading')}
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 30px ${colors.primary}40;
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 50px ${colors.primary}60;
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 30px ${colors.primary}40;
          }
        }
        
        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }
        
        @media (max-width: 768px) {
          .loading-screen-profile {
            width: 100px;
            height: 100px;
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default LoadingScreen; 