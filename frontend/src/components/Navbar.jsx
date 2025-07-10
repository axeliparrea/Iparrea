import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hook/ThemeContext';
import { useLanguage } from '../hook/LanguageContext';
import logoImage from '../assets/pictures/AIRCLOUD.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { colors, isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navbarStyle = {
    backgroundColor: colors.surface,
    borderBottom: `1px solid ${colors.border}`,
    transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
    transition: 'transform 0.3s ease-in-out',
    backdropFilter: 'blur(10px)',
    boxShadow: isDark ? '0 4px 20px rgba(0, 255, 136, 0.1)' : '0 4px 20px rgba(0, 0, 0, 0.1)',
  };

  const linkStyle = {
    color: colors.text,
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'lowercase',
  };

  const linkHoverStyle = {
    backgroundColor: colors.primary,
    color: colors.background,
    boxShadow: `0 0 20px ${colors.primary}40`,
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top py-2" style={navbarStyle}>
      <div className="container-fluid px-4">
        {/* Logo */}
        <Link className="navbar-brand py-1" to="/" style={{ color: colors.text }}>
          <img 
            src={logoImage} 
            alt="AIR Logo" 
            width="40" 
            height="40" 
            className="rounded-circle"
            style={{ 
              border: `2px solid ${colors.primary}`,
              boxShadow: `0 0 15px ${colors.primary}30`
            }}
          />
          <span className="ms-2 fw-bold" style={{ 
            color: colors.primary,
            fontFamily: 'monospace',
            fontSize: '18px'
          }}>
            AIR
          </span>
        </Link>

        {/* Toggle button for mobile */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={toggleMenu}
          style={{ color: colors.primary }}
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Navigation menu */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          {/* Centered navigation links */}
          <ul className="navbar-nav mx-auto mb-0 d-flex gap-2">
            {['about', 'book', 'portfolio', 'blog', 'contact'].map((item) => (
              <li className="nav-item" key={item}>
                <Link 
                  className="nav-link px-3 py-2" 
                  to={`/${item}`}
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, linkHoverStyle);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, linkStyle);
                  }}
                >
                  {t(item)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Controls and Social media */}
          <div className="d-flex align-items-center gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="btn btn-link border-0 p-1"
              style={{ 
                color: colors.primary,
                fontSize: '18px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.textShadow = `0 0 10px ${colors.primary}`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.textShadow = 'none';
              }}
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="btn btn-link border-0 p-1"
              style={{ 
                color: colors.primary,
                fontSize: '12px',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                border: `1px solid ${colors.primary}`,
                borderRadius: '4px',
                padding: '4px 8px',
                background: 'transparent',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = colors.primary;
                e.target.style.color = colors.background;
                e.target.style.boxShadow = `0 0 15px ${colors.primary}40`;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = colors.primary;
                e.target.style.boxShadow = 'none';
              }}
            >
              {language.toUpperCase()}
            </button>

            {/* Social media icons */}
            <div className="d-flex align-items-center gap-2">
              <a 
                href="https://www.linkedin.com/in/axel-iparrea" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="d-flex align-items-center"
                style={{ 
                  color: colors.textMuted,
                  transition: 'all 0.3s ease',
                  padding: '8px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = colors.primary;
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.filter = `drop-shadow(0 0 10px ${colors.primary})`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = colors.textMuted;
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.filter = 'none';
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
              <a 
                href="https://github.com/axeliparrea" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="d-flex align-items-center"
                style={{ 
                  color: colors.textMuted,
                  transition: 'all 0.3s ease',
                  padding: '8px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = colors.primary;
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.filter = `drop-shadow(0 0 10px ${colors.primary})`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = colors.textMuted;
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.filter = 'none';
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/axel_iparrea/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="d-flex align-items-center"
                style={{ 
                  color: colors.textMuted,
                  transition: 'all 0.3s ease',
                  padding: '8px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = colors.primary;
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.filter = `drop-shadow(0 0 10px ${colors.primary})`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = colors.textMuted;
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.filter = 'none';
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 715.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 