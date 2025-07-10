import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../hook/ThemeContext';
import { useLanguage } from '../hook/LanguageContext';

const SkillsSection = () => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('programmingLanguages');
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const skillsSection = document.getElementById('skills-section');
      if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
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
    transform: `translateY(${scrollY * 0.03}px)`,
    opacity: isVisible ? 1 : 0.3,
    transition: 'opacity 0.6s ease-out',
  };

  const titleStyle = {
    fontSize: `${Math.max(2, 4 - scrollY * 0.002)}rem`,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: '20px',
    fontFamily: 'JetBrains Mono, monospace',
    textShadow: `0 0 20px ${colors.primary}40`,
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: '60px',
    fontFamily: 'JetBrains Mono, monospace',
  };

  const skillsData = {
    programmingLanguages: {
      title: t('programmingLanguages'),
      skills: [
        { name: 'JavaScript', level: 95, color: '#F7DF1E' },
        { name: 'Python', level: 90, color: '#3776AB' },
        { name: 'C++', level: 85, color: '#00599C' },
        { name: 'C#', level: 88, color: '#239120' },
        { name: 'HTML5/CSS', level: 95, color: '#E34F26' },
        { name: 'C', level: 80, color: '#A8B9CC' },
        { name: 'Kotlin', level: 85, color: '#7F52FF' },
        { name: 'PHP', level: 75, color: '#777BB4' },
        { name: 'Shell', level: 80, color: '#89E051' },
        { name: 'Assembly', level: 70, color: '#6E4C13' },
        { name: 'Matlab', level: 78, color: '#FF6B00' },
        { name: 'Perl', level: 65, color: '#39457E' },
        { name: 'Ruby', level: 70, color: '#CC342D' }
      ]
    },
    frameworksTools: {
      title: t('frameworksTools'),
      skills: [
        { name: 'React', level: 95, color: '#61DAFB' },
        { name: '.NET Core 8.0', level: 90, color: '#5C2D91' },
        { name: 'Node.js', level: 88, color: '#339933' },
        { name: 'Express.js', level: 85, color: '#000000' },
        { name: 'Next.js', level: 80, color: '#000000' },
        { name: 'Unity', level: 82, color: '#000000' },
        { name: 'Prisma', level: 85, color: '#2D3748' },
        { name: 'Tailwind CSS', level: 90, color: '#06B6D4' },
        { name: 'Axios', level: 85, color: '#5A29E4' },
        { name: 'Bootstrap', level: 88, color: '#7952B3' }
      ]
    },
    cloudPlatforms: {
      title: t('cloudPlatforms'),
      skills: [
        { name: 'Azure', level: 90, color: '#0078D4' },
        { name: 'AWS', level: 85, color: '#FF9900' },
        { name: 'SAP Cloud', level: 88, color: '#0FAAFF' },
        { name: 'Power BI', level: 85, color: '#F2C811' }
      ]
    },
    databases: {
      title: t('databases'),
      skills: [
        { name: 'MySQL', level: 88, color: '#4479A1' },
        { name: 'SQL Server', level: 85, color: '#CC2927' },
        { name: 'SAP HANA', level: 80, color: '#0FAAFF' },
        { name: 'Supabase', level: 82, color: '#3ECF8E' }
      ]
    },
    methodologies: {
      title: t('methodologies'),
      skills: [
        { name: 'Agile', level: 90, color: '#FF6B6B' },
        { name: 'Scrum', level: 85, color: '#4ECDC4' },
        { name: 'DevOps', level: 80, color: '#326CE5' },
        { name: 'CI/CD', level: 78, color: '#FFA500' }
      ]
    },
    languages: {
      title: t('languages'),
      skills: [
        { name: 'English', level: 100, color: '#0066CC' },
        { name: 'Spanish', level: 100, color: '#FF6B35' },
        { name: 'Italian', level: 60, color: '#009246' }
      ]
    }
  };

  const SkillOrb = ({ skill, index, isActive }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const orbRef = useRef(null);

    useEffect(() => {
      if (isActive) {
        const interval = setInterval(() => {
          setRotation(prev => ({
            x: prev.x + 1,
            y: prev.y + 0.5
          }));
        }, 50);
        return () => clearInterval(interval);
      }
    }, [isActive]);

    const handleMouseMove = (e) => {
      if (orbRef.current) {
        const rect = orbRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        setRotation({
          x: mouseY * 0.1,
          y: mouseX * 0.1
        });
      }
    };

    const orbStyle = {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${skill.color}60, ${skill.color}20)`,
      border: `3px solid ${skill.color}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      transform: `
        perspective(200px) 
        rotateX(${rotation.x}deg) 
        rotateY(${rotation.y}deg)
        scale(${isHovered ? 1.1 : 1})
      `,
      boxShadow: `
        0 0 20px ${skill.color}40,
        inset 0 0 20px ${skill.color}20
      `,
      position: 'relative',
      overflow: 'hidden',
      animationDelay: `${index * 0.1}s`,
      opacity: isActive ? 1 : 0.7,
    };

    const textStyle = {
      color: colors.text,
      fontSize: '0.7rem',
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'JetBrains Mono, monospace',
      textShadow: `0 0 10px ${colors.background}`,
      transform: `rotateX(${-rotation.x}deg) rotateY(${-rotation.y}deg)`,
      transition: 'transform 0.3s ease',
    };

    const levelBarStyle = {
      position: 'absolute',
      bottom: '5px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '3px',
      background: `${colors.background}40`,
      borderRadius: '2px',
      overflow: 'hidden',
    };

    const levelFillStyle = {
      height: '100%',
      width: `${skill.level}%`,
      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
      borderRadius: '2px',
      transition: 'width 0.5s ease',
    };

    return (
      <div
        ref={orbRef}
        style={orbStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={textStyle}>
          {skill.name}
        </div>
        <div style={levelBarStyle}>
          <div style={levelFillStyle}></div>
        </div>
        {isHovered && (
          <div style={{
            position: 'absolute',
            top: '-30px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: colors.surface,
            color: colors.text,
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.6rem',
            fontFamily: 'JetBrains Mono, monospace',
            border: `1px solid ${colors.border}`,
            whiteSpace: 'nowrap'
          }}>
            {skill.level}%
          </div>
        )}
      </div>
    );
  };

  const categoryButtonStyle = (category) => ({
    background: selectedCategory === category 
      ? `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`
      : 'transparent',
    color: selectedCategory === category ? colors.background : colors.text,
    border: `2px solid ${colors.primary}`,
    borderRadius: '25px',
    padding: '10px 20px',
    margin: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontFamily: 'JetBrains Mono, monospace',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: selectedCategory === category 
      ? `0 0 20px ${colors.primary}40`
      : 'none',
  });

  return (
    <section id="skills-section" style={sectionStyle}>
      <div className="container" style={containerStyle} ref={containerRef}>
        <div className="row">
          <div className="col-12">
            <h2 style={titleStyle}>
              {t('skillsTitle')}
            </h2>
            <p style={subtitleStyle}>
              {t('skillsDesc')}
            </p>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <div className="d-flex flex-wrap justify-content-center">
              {Object.keys(skillsData).map((category) => (
                <button
                  key={category}
                  style={categoryButtonStyle(category)}
                  onClick={() => setSelectedCategory(category)}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== category) {
                      e.target.style.background = `${colors.primary}20`;
                      e.target.style.boxShadow = `0 0 15px ${colors.primary}30`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== category) {
                      e.target.style.background = 'transparent';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  {skillsData[category].title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Display */}
        <div className="row">
          <div className="col-12">
            <div style={{
              background: `rgba(${colors.surface.replace('#', '').match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.05)`,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${colors.border}`,
              borderRadius: '30px',
              padding: '40px',
              minHeight: '400px',
            }}>
              <h3 style={{
                color: colors.primary,
                fontSize: '1.8rem',
                fontFamily: 'JetBrains Mono, monospace',
                textAlign: 'center',
                marginBottom: '30px',
                textShadow: `0 0 15px ${colors.primary}40`,
              }}>
                {skillsData[selectedCategory].title}
              </h3>
              
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skillsData[selectedCategory].skills.map((skill, index) => (
                  <SkillOrb
                    key={skill.name}
                    skill={skill}
                    index={index}
                    isActive={isVisible}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="row mt-4">
          <div className="col-12 text-center">
            <p style={{
              color: colors.textMuted,
              fontSize: '0.9rem',
              fontStyle: 'italic',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              Hover over the skills to interact with them • Click categories to explore different areas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 