import React, { useState, useEffect } from 'react';
import { useTheme } from '../hook/ThemeContext';
import { useLanguage } from '../hook/LanguageContext';

const ProjectsSection = () => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const projectsSection = document.getElementById('portfolio-section');
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
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

  const projectCardStyle = {
    background: `rgba(${colors.surface.replace('#', '').match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.1)`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${colors.border}`,
    borderRadius: '20px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: `0 8px 32px ${colors.primary}20`,
    transition: 'all 0.3s ease',
    transform: `translateY(${isVisible ? 0 : 50}px)`,
    opacity: isVisible ? 1 : 0,
  };

  const projectHeaderStyle = {
    borderBottom: `2px solid ${colors.primary}30`,
    paddingBottom: '15px',
    marginBottom: '20px',
  };

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

  const projects = [
    {
      title: t('sapTitle'),
      subtitle: t('sapSubtitle'),
      period: t('sapPeriod'),
      descriptions: [t('sapDesc1'), t('sapDesc2'), t('sapDesc3'), t('sapDesc4')],
      technologies: ['SAP S/4HANA', 'SAP Analytics Cloud', 'SAP HANA ML', 'Python', 'AI/ML'],
      status: '🏆 Winner',
      delay: '0s'
    },
    {
      title: t('legalMatchProject'),
      subtitle: 'Mobile App Development',
      period: t('legalMatchPeriod'),
      descriptions: [t('legalMatchDesc1'), t('legalMatchDesc2'), t('legalMatchDesc3'), t('legalMatchDesc4')],
      technologies: ['Kotlin', 'Jetpack Compose', 'Supabase', 'Android', 'AI (Gemini)'],
      status: '📱 Mobile',
      delay: '0.2s'
    },
    {
      title: t('awaqProject'),
      subtitle: 'Web Development',
      period: t('awaqPeriod'),
      descriptions: [t('awaqDesc')],
      technologies: ['.NET Core 8.0', 'Razor Pages', 'C#', 'SQL Server', 'Bootstrap'],
      status: '🌐 Web',
      delay: '0.4s'
    },
    {
      title: t('mobilityProject'),
      subtitle: 'Simulation & Gaming',
      period: t('mobilityPeriod'),
      descriptions: [t('mobilityDesc')],
      technologies: ['Python', 'AgentPy', 'Unity', 'C#', 'Multi-Agent Systems'],
      status: '🎮 Simulation',
      delay: '0.6s'
    },
    {
      title: t('cybersecurityProject'),
      subtitle: 'Cybersecurity & Penetration Testing',
      period: t('cybersecurityPeriod'),
      descriptions: [t('cybersecurityDesc1'), t('cybersecurityDesc2'), t('cybersecurityDesc3'), t('cybersecurityDesc4')],
      technologies: ['Kali Linux', 'Nmap', 'Metasploit', 'Wireshark', 'Network Security'],
      status: '🔒 Security',
      delay: '0.8s'
    }
  ];

  return (
    <section id="portfolio-section" style={sectionStyle}>
      <div className="container" style={containerStyle}>
        <div className="row">
          <div className="col-12">
            <h2 style={titleStyle}>
              {t('projectsTitle')}
            </h2>
            <p style={subtitleStyle}>
              {t('projectsDesc')}
            </p>
          </div>
        </div>

        <div className="row">
          {projects.map((project, index) => (
            <div key={index} className="col-12 col-lg-6 mb-4">
              <div 
                style={{
                  ...projectCardStyle,
                  transitionDelay: project.delay,
                }}
              >
                <div style={projectHeaderStyle}>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h3 style={{ 
                      color: colors.primary, 
                      fontSize: '1.2rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      margin: 0,
                      flex: 1
                    }}>
                      {project.title}
                    </h3>
                    <span style={{
                      ...badgeStyle,
                      background: `linear-gradient(135deg, ${colors.accent}30, ${colors.primary}30)`,
                      marginLeft: '10px'
                    }}>
                      {project.status}
                    </span>
                  </div>
                  <h4 style={{ 
                    color: colors.text, 
                    fontSize: '0.9rem',
                    margin: '5px 0',
                    fontWeight: 'normal'
                  }}>
                    {project.subtitle}
                  </h4>
                  <p style={{ 
                    color: colors.textMuted, 
                    fontSize: '0.8rem',
                    margin: 0,
                    fontStyle: 'italic'
                  }}>
                    {project.period}
                  </p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  {project.descriptions.map((desc, i) => (
                    <p key={i} style={{ 
                      color: colors.textMuted, 
                      fontSize: '0.85rem',
                      lineHeight: '1.5',
                      marginBottom: '8px'
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
                    Technologies Used:
                  </h5>
                  <div className="d-flex flex-wrap gap-1">
                    {project.technologies.map((tech, i) => (
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

        {/* Participation Section */}
        <div className="row mt-5">
          <div className="col-12">
            <h3 style={{
              color: colors.primary,
              fontSize: '1.5rem',
              fontFamily: 'JetBrains Mono, monospace',
              textAlign: 'center',
              marginBottom: '30px'
            }}>
              {t('participation')}
            </h3>
          </div>
          <div className="col-12 col-md-6 offset-md-3">
            <div style={projectCardStyle}>
              <div style={projectHeaderStyle}>
                <h4 style={{ 
                  color: colors.primary, 
                  fontSize: '1.1rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  margin: 0
                }}>
                  {t('hackMtyTitle')}
                </h4>
                <p style={{ 
                  color: colors.textMuted, 
                  fontSize: '0.8rem',
                  margin: '5px 0 0 0',
                  fontStyle: 'italic'
                }}>
                  {t('hackMtyDate')}
                </p>
              </div>
              <p style={{ 
                color: colors.textMuted, 
                fontSize: '0.85rem',
                lineHeight: '1.5',
                marginBottom: '15px'
              }}>
                {t('hackMtyDesc')}
              </p>
              <div className="d-flex flex-wrap gap-1">
                {['MongoDB', 'Express.js', 'React', 'Node.js', 'Banorte API'].map((tech, i) => (
                  <span key={i} style={badgeStyle}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 