import { useTheme } from '../hook/ThemeContext';

const LoadingScreen = () => {
  const { colors } = useTheme();

  const loadingStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: colors.background,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  };

  const logoStyle = {
    fontSize: '3rem',
    fontWeight: '600',
    color: colors.primary,
    marginBottom: '2rem',
    fontFamily: 'Inter, sans-serif',
  };

  const spinnerStyle = {
    border: `3px solid ${colors.border}`,
    borderTop: `3px solid ${colors.primary}`,
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  };

  const textStyle = {
    color: colors.textMuted,
    fontSize: '0.9rem',
    marginTop: '1rem',
    fontFamily: 'Inter, sans-serif',
  };

  return (
    <div style={loadingStyle}>
      <div style={logoStyle}>
        Axel Iparrea
      </div>
      <div style={spinnerStyle}></div>
      <div style={textStyle}>
        Loading...
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen; 