import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hook/ThemeContext';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [scrolled, setScrolled] = useState(false);

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

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: scrolled ? `${colors.surface}f8` : `${colors.surface}f0`,
    backdropFilter: 'blur(20px)',
    borderBottom: `1px solid ${scrolled ? colors.border : 'transparent'}`,
    zIndex: 1000,
    transition: 'all 0.3s ease',
    transform: scrolled ? 'translateY(0)' : 'translateY(0)',
    boxShadow: scrolled ? `0 4px 20px ${colors.shadow}` : 'none',
  };

  const navContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: isMobile ? '0.8rem 1rem' : '1rem 20px',
    transition: 'padding 0.3s ease',
  };

  const brandStyle = {
    fontSize: isMobile ? '1.3rem' : '1.5rem',
    fontWeight: '700',
    color: colors.primary,
    textDecoration: 'none',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.3s ease',
    background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary || colors.primary})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    cursor: 'pointer',
    position: 'relative',
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
    transition: 'all 0.3s ease',
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',
    position: 'relative',
    padding: '0.5rem 0',
  };

  const buttonStyle = {
    background: 'none',
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    padding: '8px 16px',
    color: colors.text,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.85rem',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '500',
    position: 'relative',
    overflow: 'hidden',
  };

  const mobileMenuStyle = {
    display: (isMenuOpen && isMobile) ? 'flex' : 'none',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: `${colors.surface}f8`,
    backdropFilter: 'blur(20px)',
    flexDirection: 'column',
    padding: '2rem 1.5rem',
    borderTop: `1px solid ${colors.border}`,
    gap: '1.5rem',
    boxShadow: `0 8px 32px ${colors.shadow}`,
    animation: 'slideDown 0.3s ease',
  };

  const mobileMenuButtonStyle = {
    display: isMobile ? 'flex' : 'none',
    background: 'none',
    border: 'none',
    color: colors.text,
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    borderRadius: '6px',
  };

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
    setIsMenuOpen(false);
  };

  const NavLink = ({ onClick, children }) => (
    <span
      style={navLinkStyle}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.color = colors.primary;
        e.target.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.target.style.color = colors.text;
        e.target.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </span>
  );

  const Button = ({ onClick, children, variant = 'secondary' }) => (
    <button
      style={{
        ...buttonStyle,
        background: variant === 'primary' ? colors.primary : 'transparent',
        color: variant === 'primary' ? '#ffffff' : colors.text,
        borderColor: variant === 'primary' ? colors.primary : colors.border,
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = `0 4px 12px ${colors.primary}40`;
        } else {
          e.target.style.background = colors.primary;
          e.target.style.color = '#ffffff';
          e.target.style.borderColor = colors.primary;
          e.target.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        } else {
          e.target.style.background = 'transparent';
          e.target.style.color = colors.text;
          e.target.style.borderColor = colors.border;
          e.target.style.transform = 'translateY(0)';
        }
      }}
    >
      {children}
    </button>
  );

  const SocialLink = ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        ...buttonStyle,
        textDecoration: 'none',
        fontSize: '0.85rem',
        fontWeight: '500',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
      onMouseEnter={(e) => {
        e.target.style.background = colors.primary;
        e.target.style.color = '#ffffff';
        e.target.style.borderColor = colors.primary;
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = `0 4px 12px ${colors.primary}40`;
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'transparent';
        e.target.style.color = colors.text;
        e.target.style.borderColor = colors.border;
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }}
    >
      {children}
    </a>
  );

  return (
    <>
      <nav style={navbarStyle}>
        <div style={navContainerStyle}>
          <a 
            href="#" 
            style={brandStyle}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            Axel Iparrea
          </a>
          
          <div style={navLinksStyle}>
            <NavLink onClick={() => scrollToSection('about')}>
              {t('about')}
            </NavLink>
            <NavLink onClick={() => scrollToSection('experience')}>
              {t('experience')}
            </NavLink>
            <NavLink onClick={() => scrollToSection('projects')}>
              {t('projectsNav')}
            </NavLink>
            <NavLink onClick={() => scrollToSection('contact')}>
              {t('contact')}
            </NavLink>
            
            {/* Social Links */}
            <SocialLink href="https://linkedin.com/in/axel-iparrea">
              LinkedIn
            </SocialLink>
            <SocialLink href="https://github.com/axeliparrea">
              GitHub
            </SocialLink>
            
            <Button onClick={() => changeLanguage(i18n.language === 'en' ? 'es' : 'en')}>
              {i18n.language === 'en' ? 'ES' : 'EN'}
            </Button>
            
            <Button onClick={toggleTheme}>
              {isDarkMode ? '☀️' : '🌙'}
            </Button>
          </div>

          <button
            style={mobileMenuButtonStyle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onMouseEnter={(e) => {
              e.target.style.background = `${colors.primary}20`;
              e.target.style.color = colors.primary;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
              e.target.style.color = colors.text;
            }}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        <div style={mobileMenuStyle}>
          <span
            style={{
              ...navLinkStyle,
              fontSize: '1.1rem',
              padding: '0.8rem 0',
              borderBottom: `1px solid ${colors.border}`,
              textAlign: 'center',
            }}
            onClick={() => scrollToSection('about')}
          >
            {t('about')}
          </span>
          <span
            style={{
              ...navLinkStyle,
              fontSize: '1.1rem',
              padding: '0.8rem 0',
              borderBottom: `1px solid ${colors.border}`,
              textAlign: 'center',
            }}
            onClick={() => scrollToSection('experience')}
          >
            {t('experience')}
          </span>
          <span
            style={{
              ...navLinkStyle,
              fontSize: '1.1rem',
              padding: '0.8rem 0',
              borderBottom: `1px solid ${colors.border}`,
              textAlign: 'center',
            }}
            onClick={() => scrollToSection('projects')}
          >
            {t('projectsNav')}
          </span>
          <span
            style={{
              ...navLinkStyle,
              fontSize: '1.1rem',
              padding: '0.8rem 0',
              borderBottom: `1px solid ${colors.border}`,
              textAlign: 'center',
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
            <Button onClick={() => changeLanguage(i18n.language === 'en' ? 'es' : 'en')}>
              {i18n.language === 'en' ? 'ES' : 'EN'}
            </Button>
            <Button onClick={toggleTheme}>
              {isDarkMode ? '☀️' : '🌙'}
            </Button>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '1rem', 
            justifyContent: 'center'
          }}>
            <SocialLink href="https://linkedin.com/in/axel-iparrea">
              LinkedIn
            </SocialLink>
            <SocialLink href="https://github.com/axeliparrea">
              GitHub
            </SocialLink>
          </div>
        </div>
      </nav>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar; 