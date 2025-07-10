import React, { useState, useEffect } from 'react';
import { useTheme } from '../hook/ThemeContext';
import { useLanguage } from '../hook/LanguageContext';

const ExperienceSection = () => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const experienceSection = document.getElementById('experience-section');
      if (experienceSection) {
        const rect = experienceSection.getBoundingClientRect();
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
    transform: `translateY(${scrollY * 0.05}px)`,
    opacity: isVisible ? 1 : 0.3,
    transition: 'opacity 0.6s ease-out',
  };

  const titleStyle = {
    fontSize: `${Math.max(2, 4 - scrollY * 0.002)}rem`,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: '60px',
    fontFamily: 'JetBrains Mono, monospace',
    textShadow: `0 0 20px ${colors.primary}40`,
  };

  const experienceCardStyle = {
    background: `rgba(${colors.surface.replace('#', '').match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.1)`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${colors.border}`,
    borderRadius: '20px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: `0 8px 32px ${colors.primary}20`,
    transition: 'all 0.8s ease',
    transform: `translateY(${isVisible ? 0 : 50}px)`,
    opacity: isVisible ? 1 : 0,
  };

  const experiences = [
    {
      title: t('esabTitle'),
      company: t('esabCompany'),
      period: t('esabPeriod'),
      location: t('esabLocation'),
      descriptions: [t('esabDesc1'), t('esabDesc2'), t('esabDesc3'), t('esabDesc4')],
      technologies: ['Python', 'SQL', 'Power BI', 'Power Query', 'Azure', 'SAP'],
      status: '💼 Current Role',
      delay: '0s'
    },
    {
      title: t('tecTitle'),
      company: t('tecCompany'),
      period: t('tecPeriod'),
      location: t('tecLocation'),
      descriptions: [t('tecDesc1'), t('tecDesc2'), t('tecDesc3'), t('tecDesc4')],
      technologies: ['Prisma', 'Express.js', 'Node.js', 'TypeScript', 'React', 'Tailwind CSS'],
      status: '🎓 Internship',
      delay: '0.3s'
    }
  ];

  const badgeStyle = {
    background: `linear-gradient(135deg, ${colors.primary}20, ${colors.accent}20)`,
    color: colors.primary,
    padding: '4px 8px',
    borderRadius: '10px',
    border: `1px solid ${colors.primary}30`,
    fontSize: '0.7rem',
    fontWeight: 'bold',
    fontFamily: 'JetBrains Mono, monospace',
    display: 'inline-block',
    margin: '2px',
  };

  return (
    <section id="experience-section" style={sectionStyle}>
      <div className="container" style={containerStyle}>
        <div className="row">
          <div className="col-12">
            <h2 style={titleStyle}>
              {t('experience')}
            </h2>
          </div>
        </div>

        <div className="row">
          {experiences.map((exp, index) => (
            <div key={index} className="col-12 col-lg-6 mb-4">
              <div 
                style={{
                  ...experienceCardStyle,
                  transitionDelay: exp.delay,
                }}
              >
                <div style={{
                  borderBottom: `2px solid ${colors.primary}30`,
                  paddingBottom: '15px',
                  marginBottom: '20px',
                }}>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h3 style={{ 
                      color: colors.primary, 
                      fontSize: '1.3rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      margin: 0,
                      flex: 1
                    }}>
                      {exp.title}
                    </h3>
                    <span style={{
                      ...badgeStyle,
                      background: index === 0 
                        ? `linear-gradient(135deg, ${colors.accent}40, ${colors.primary}40)`
                        : `linear-gradient(135deg, ${colors.primary}30, ${colors.accent}30)`,
                      marginLeft: '10px'
                    }}>
                      {exp.status}
                    </span>
                  </div>
                  <h4 style={{ 
                    color: colors.text, 
                    fontSize: '1rem',
                    margin: '5px 0',
                    fontWeight: 'bold'
                  }}>
                    {exp.company}
                  </h4>
                  <p style={{ 
                    color: colors.textMuted, 
                    fontSize: '0.9rem',
                    margin: '5px 0',
                    fontStyle: 'italic'
                  }}>
                    {exp.period}
                  </p>
                  <p style={{ 
                    color: colors.textMuted, 
                    fontSize: '0.8rem',
                    margin: 0,
                  }}>
                    📍 {exp.location}
                  </p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  {exp.descriptions.map((desc, i) => (
                    <p key={i} style={{ 
                      color: colors.textMuted, 
                      fontSize: '0.85rem',
                      lineHeight: '1.6',
                      marginBottom: '10px'
                    }}>
                      • {desc}
                    </p>
                  ))}
                </div>

                <div>
                  <h5 style={{ 
                    color: colors.text, 
                    fontSize: '0.8rem',
                    marginBottom: '10px',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}>
                    Key Technologies:
                  </h5>
                  <div className="d-flex flex-wrap gap-1">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} style={badgeStyle}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection; 