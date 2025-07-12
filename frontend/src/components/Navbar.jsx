import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hook/ThemeContext';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: `${colors.surface}f0`,
    backdropFilter: 'blur(10px)',
    borderBottom: `1px solid ${colors.border}`,
    zIndex: 1000,
    transition: 'all 0.3s ease',
  };

  const socialLinksStyle = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  };

  const navContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: isMobile ? '1rem 1rem' : '1rem 20px',
  };

  const brandStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: colors.primary,
    textDecoration: 'none',
    fontFamily: 'Inter, sans-serif',
  };

  const navLinksStyle = {
    display: isMobile ? 'none' : 'flex',
    gap: '2rem',
    alignItems: 'center',
  };

  const navLinkStyle = {
    color: colors.text,
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer'
  };

  const buttonStyle = {
    background: 'none',
    border: `1px solid ${colors.border}`,
    borderRadius: '6px',
    padding: '6px 12px',
    color: colors.text,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.8rem',
    fontFamily: 'Inter, sans-serif',
  };

  const mobileMenuStyle = {
    display: (isMenuOpen && isMobile) ? 'flex' : 'none',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: colors.surface,
    flexDirection: 'column',
    padding: '1.5rem',
    borderTop: `1px solid ${colors.border}`,
    gap: '1.5rem',
    boxShadow: `0 8px 24px ${colors.primary}15`,
  };

  const mobileMenuButtonStyle = {
    display: isMobile ? 'block' : 'none',
    background: 'none',
    border: 'none',
    color: colors.text,
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120; // Account for fixed header
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav style={navbarStyle}>


      {/* Main Navigation */}
      <div style={navContainerStyle}>
        <a href="#" style={brandStyle}>
          Axel Iparrea
        </a>
        
        <div style={navLinksStyle}>
          <span
            style={navLinkStyle}
            onClick={() => scrollToSection('about')}
            onMouseEnter={(e) => e.target.style.color = colors.primary}
            onMouseLeave={(e) => e.target.style.color = colors.text}
          >
            {t('about')}
          </span>
          <span
            style={navLinkStyle}
            onClick={() => scrollToSection('experience')}
            onMouseEnter={(e) => e.target.style.color = colors.primary}
            onMouseLeave={(e) => e.target.style.color = colors.text}
          >
            {t('experience')}
          </span>
          <span
            style={navLinkStyle}
            onClick={() => scrollToSection('projects')}
            onMouseEnter={(e) => e.target.style.color = colors.primary}
            onMouseLeave={(e) => e.target.style.color = colors.text}
          >
            {t('projects')}
          </span>
          <span
            style={navLinkStyle}
            onClick={() => scrollToSection('contact')}
            onMouseEnter={(e) => e.target.style.color = colors.primary}
            onMouseLeave={(e) => e.target.style.color = colors.text}
          >
            {t('contact')}
          </span>
          
          {/* Social Links */}
          <a
            href="https://linkedin.com/in/axel-iparrea"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...buttonStyle,
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = colors.primary;
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
              e.target.style.color = colors.text;
            }}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/axeliparrea"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...buttonStyle,
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = colors.primary;
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
              e.target.style.color = colors.text;
            }}
          >
            GitHub
          </a>
          
          <button
            style={buttonStyle}
            onClick={() => changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
            onMouseEnter={(e) => {
              e.target.style.background = colors.primary;
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
              e.target.style.color = colors.text;
            }}
          >
            {i18n.language === 'en' ? 'ES' : 'EN'}
          </button>
          
          <button
            style={buttonStyle}
            onClick={toggleTheme}
            onMouseEnter={(e) => {
              e.target.style.background = colors.primary;
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
              e.target.style.color = colors.text;
            }}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <button
          style={mobileMenuButtonStyle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div style={mobileMenuStyle}>
        <span
          style={{
            ...navLinkStyle,
            fontSize: '1.1rem',
            padding: '0.5rem 0',
            borderBottom: `1px solid ${colors.border}`,
          }}
          onClick={() => scrollToSection('about')}
        >
          {t('about')}
        </span>
        <span
          style={{
            ...navLinkStyle,
            fontSize: '1.1rem',
            padding: '0.5rem 0',
            borderBottom: `1px solid ${colors.border}`,
          }}
          onClick={() => scrollToSection('experience')}
        >
          {t('experience')}
        </span>
        <span
          style={{
            ...navLinkStyle,
            fontSize: '1.1rem',
            padding: '0.5rem 0',
            borderBottom: `1px solid ${colors.border}`,
          }}
          onClick={() => scrollToSection('projects')}
        >
          {t('projects')}
        </span>
        <span
          style={{
            ...navLinkStyle,
            fontSize: '1.1rem',
            padding: '0.5rem 0',
            borderBottom: `1px solid ${colors.border}`,
          }}
          onClick={() => scrollToSection('contact')}
        >
          {t('contact')}
        </span>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginTop: '1rem',
          justifyContent: 'center'
        }}>
          <button
            style={buttonStyle}
            onClick={() => changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
          >
            {i18n.language === 'en' ? 'ES' : 'EN'}
          </button>
          <button
            style={buttonStyle}
            onClick={toggleTheme}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <div style={{
          ...socialLinksStyle, 
          marginTop: '1rem', 
          justifyContent: 'center'
        }}>
          <a
            href="https://linkedin.com/in/axel-iparrea"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...buttonStyle, 
              textDecoration: 'none', 
              fontSize: '0.85rem',
              padding: '0.5rem 1rem'
            }}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/axeliparrea"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...buttonStyle, 
              textDecoration: 'none', 
              fontSize: '0.85rem',
              padding: '0.5rem 1rem'
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 