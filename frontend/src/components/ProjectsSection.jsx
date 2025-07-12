import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hook/ThemeContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import YouTubeVideo from './YouTubeVideo';

const ProjectsSection = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [navigating, setNavigating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('projects');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8;
        setIsVisible(isInView);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const projects = [
    {
      id: 'sapitos',
      title: t('projects.sapitos.title'),
      subtitle: t('projects.sapitos.subtitle'),
      description: t('projects.sapitos.description'),
      descriptionMobile: 'SAP Labs winner 2025. AI-powered supply chain solution using SAP technologies.',
      image: '/assets/pictures/AIRCLOUD.png',
      videoId: null,
      technologies: ['JavaScript', 'SAP S/4HANA', 'SAP Analytics Cloud', 'Machine Learning', 'AI Assistant'],
      technologiesMobile: ['SAP', 'AI', 'JavaScript'],
      status: t('completed'),
      category: t('projects.sapitos.category'),
      period: '2025',
      color: '#00A86B'
    },
    {
      id: 'awak-dashboard',
      title: t('projects.awakDashboard.title'),
      subtitle: t('projects.awakDashboard.subtitle'),
      description: t('projects.awakDashboard.description'),
      descriptionMobile: 'Dashboard for user progress visualization with real-time analytics.',
      image: '/assets/pictures/poseaxel.png',
      videoId: null,
      technologies: ['C#', '.NET', 'SQL Server', 'Bootstrap', 'Chart.js'],
      technologiesMobile: ['C#', '.NET', 'SQL'],
      status: t('completed'),
      category: t('projects.awakDashboard.category'),
      period: '2024',
      color: '#4F46E5'
    },
    {
      id: 'awak-game',
      title: t('projects.awakGame.title'),
      subtitle: t('projects.awakGame.subtitle'),
      description: t('projects.awakGame.description'),
      descriptionMobile: 'Interactive Unity game with modern gameplay mechanics.',
      image: '/assets/pictures/AIRCLOUD.png',
      videoId: null,
      technologies: ['Unity', 'C#', 'Game Development', 'Collaborative Development'],
      technologiesMobile: ['Unity', 'C#', 'Game Dev'],
      status: t('completed'),
      category: t('projects.awakGame.category'),
      period: '2024',
      color: '#FF6B6B'
    },
    {
      id: 'sistema-multiagente',
      title: t('projects.sistemaMultiagente.title'),
      subtitle: t('projects.sistemaMultiagente.subtitle'),
      description: t('projects.sistemaMultiagente.description'),
      descriptionMobile: 'AI multi-agent system simulation with complex agent interactions.',
      image: '/assets/pictures/poseaxel.png',
      videoId: null,
      technologies: ['C#', '.NET', 'AI Algorithms', 'System Simulation', 'Multi-Agent Systems'],
      technologiesMobile: ['C#', 'AI', 'Simulation'],
      status: t('completed'),
      category: t('projects.sistemaMultiagente.category'),
      period: '2024',
      color: '#10B981'
    },
    {
      id: 'cybersecurity-integration',
      title: t('projects.cybersecurityIntegration.title'),
      subtitle: t('projects.cybersecurityIntegration.subtitle'),
      description: t('projects.cybersecurityIntegration.description'),
      descriptionMobile: 'Security integration project with advanced cybersecurity principles.',
      image: '/assets/pictures/AIRCLOUD.png',
      videoId: null,
      technologies: ['Kotlin', 'Cybersecurity', 'Security Integration', 'Mobile Security'],
      technologiesMobile: ['Kotlin', 'Security', 'Mobile'],
      status: t('completed'),
      category: t('projects.cybersecurityIntegration.category'),
      period: '2024',
      color: '#F59E0B'
    },
    {
      id: 'portfolio',
      title: t('projects.portfolio.title'),
      subtitle: t('projects.portfolio.subtitle'),
      description: t('projects.portfolio.description'),
      descriptionMobile: 'Modern responsive portfolio with smooth animations.',
      image: '/assets/pictures/poseaxel.png',
      videoId: null,
      technologies: ['React', 'Vite', 'CSS3', 'Framer Motion', 'JavaScript'],
      technologiesMobile: ['React', 'CSS3', 'Animation'],
      status: t('completed'),
      category: t('projects.portfolio.category'),
      period: '2024',
      color: '#8B5CF6'
    }
  ];

  const hackathons = [
    {
      title: t('hackathons.sapLabs.title'),
      status: t('hackathons.sapLabs.status'),
      description: t('hackathons.sapLabs.description'),
      color: '#22c55e'
    },
    {
      title: t('hackathons.hackMty.title'),
      status: t('hackathons.hackMty.status'),
      description: t('hackathons.hackMty.description'),
      color: '#3b82f6'
    }
  ];

  const handleProjectClick = (projectId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigating) return;
    
    setNavigating(true);
    
    setTimeout(() => {
      navigate(`/project/${projectId}`);
      setNavigating(false);
    }, 150);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#22c55e';
      case 'In Progress': return '#f59e0b';
      case 'Planning': return '#8b5cf6';
      default: return colors.textSecondary;
    }
  };

  // Componente para versión móvil simplificada (2 columnas)
  const MobileProjectCard = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: `linear-gradient(135deg, ${colors.surface} 0%, ${project.color}08 100%)`,
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${project.color}30`,
        boxShadow: `0 8px 24px ${project.color}15`,
        cursor: navigating ? 'wait' : 'pointer',
        opacity: navigating ? 0.7 : 1,
        position: 'relative'
      }}
      onClick={(e) => handleProjectClick(project.id, e)}
    >
      {/* Header ultra-compacto */}
      <div style={{
        height: '80px',
        background: `linear-gradient(135deg, ${project.color}25, ${project.color}15)`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Efecto de fondo dinámico */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '60px',
          height: '60px',
          background: `${project.color}20`,
          borderRadius: '50%',
          filter: 'blur(15px)'
        }}></div>
        
        <div style={{
          fontSize: '1.8rem',
          color: project.color,
          fontWeight: '700',
          textShadow: `0 2px 8px ${project.color}30`
        }}>
          {project.title.charAt(0)}
        </div>
        
        <div style={{
          position: 'absolute',
          top: '0.4rem',
          right: '0.4rem',
          background: project.color,
          color: '#fff',
          padding: '0.2rem 0.4rem',
          borderRadius: '8px',
          fontSize: '8px',
          fontWeight: '700',
          boxShadow: `0 2px 8px ${project.color}40`
        }}>
          {project.period}
        </div>
      </div>

      {/* Contenido ultra-compacto */}
      <div style={{ padding: '0.8rem' }}>
        {/* Título y categoría */}
        <div style={{ marginBottom: '0.5rem' }}>
          <h3 style={{
            fontSize: '0.85rem',
            fontWeight: '700',
            color: colors.text,
            marginBottom: '0.2rem',
            lineHeight: '1.2',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {project.title}
          </h3>
          <span style={{
            background: `${project.color}20`,
            color: project.color,
            padding: '0.1rem 0.4rem',
            borderRadius: '6px',
            fontSize: '7px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {project.category.split(' ')[0]} {/* Solo primera palabra */}
          </span>
        </div>

        {/* Descripción mínima */}
        <p style={{
          fontSize: '0.7rem',
          color: colors.textSecondary,
          lineHeight: '1.3',
          marginBottom: '0.6rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {project.descriptionMobile}
        </p>

        {/* Tecnologías súper mínimas */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.2rem',
          marginBottom: '0.6rem'
        }}>
          {project.technologiesMobile.slice(0, 2).map((tech, techIndex) => (
            <span
              key={techIndex}
              style={{
                background: `${colors.primary}15`,
                color: colors.primary,
                padding: '0.1rem 0.3rem',
                borderRadius: '4px',
                fontSize: '7px',
                fontWeight: '600'
              }}
            >
              {tech}
            </span>
          ))}
          <span style={{
            color: colors.textSecondary,
            fontSize: '7px',
            alignSelf: 'center',
            fontWeight: '500'
          }}>
            +{project.technologies.length - 2}
          </span>
        </div>

        {/* Botón minimalista */}
        <div
          style={{
            background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`,
            color: '#fff',
            padding: '0.4rem',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: '700',
            fontSize: '8px',
            cursor: navigating ? 'wait' : 'pointer',
            boxShadow: `0 4px 12px ${project.color}30`,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          {navigating ? t('loading') : 'Ver →'}
        </div>
      </div>

      {/* Indicador de estado minimalista */}
      <div style={{
        position: 'absolute',
        top: '0.4rem',
        left: '0.4rem',
        width: '6px',
        height: '6px',
        background: getStatusColor(project.status),
        borderRadius: '50%',
        boxShadow: `0 0 8px ${getStatusColor(project.status)}`
      }}></div>
    </motion.div>
  );

  // Componente para versión desktop completa
  const DesktopProjectCard = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="project-card"
      style={{
        background: colors.surface,
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${colors.border}`,
        boxShadow: `0 4px 12px ${colors.shadow}`,
        cursor: navigating ? 'wait' : 'pointer',
        position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: hoveredProject === project.id ? 'translateY(-8px)' : 'translateY(0)',
        opacity: navigating ? 0.7 : 1,
        willChange: 'transform, box-shadow'
      }}
      onMouseEnter={() => !navigating && setHoveredProject(project.id)}
      onMouseLeave={() => !navigating && setHoveredProject(null)}
      onClick={(e) => handleProjectClick(project.id, e)}
    >
      {/* Project Image or Video */}
      <div style={{
        height: '200px',
        background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {project.videoId ? (
          <YouTubeVideo 
            videoId={project.videoId}
            title={`${project.title} - Demo Video`}
            width="100%"
            height="100%"
            aspectRatio="16/9"
            showControls={false}
            autoplay={false}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              fontSize: '3rem',
              color: `${project.color}80`,
              fontWeight: '700',
              transition: 'transform 0.3s ease',
              transform: hoveredProject === project.id ? 'translate(-50%, -50%) scale(1.1)' : 'translate(-50%, -50%) scale(1)',
              willChange: 'transform'
            }}
          >
            {project.title.charAt(0)}
          </div>
        )}
        
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: getStatusColor(project.status),
          color: '#fff',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
          zIndex: 2
        }}>
          {project.status}
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          background: `${colors.surface}f0`,
          backdropFilter: 'blur(10px)',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          color: colors.text,
          zIndex: 2
        }}>
          {project.period}
        </div>

        {project.videoId && (
          <div style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            background: `${colors.primary}f0`,
            backdropFilter: 'blur(10px)',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#fff',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ▶️ Video Demo
          </div>
        )}
      </div>

      {/* Project Content */}
      <div style={{ padding: '1.5rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '1rem'
        }}>
          <div>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              color: colors.text,
              marginBottom: '0.25rem'
            }}>
              {project.title}
            </h3>
            <p style={{
              fontSize: '1rem',
              color: colors.primary,
              fontWeight: '500'
            }}>
              {project.subtitle}
            </p>
          </div>
          
          <span style={{
            background: `${project.color}20`,
            color: project.color,
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            {project.category}
          </span>
        </div>

        <p style={{
          fontSize: '0.95rem',
          color: colors.textSecondary,
          lineHeight: '1.6',
          marginBottom: '1.5rem'
        }}>
          {project.description}
        </p>

        {/* Technologies */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="tech-tag"
              style={{
                background: `${colors.primary}10`,
                color: colors.primary,
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500',
                border: `1px solid ${colors.primary}30`
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div
          className="project-button"
          style={{
            background: `linear-gradient(135deg, ${project.color}, ${project.color}80)`,
            color: '#fff',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: '14px',
            cursor: navigating ? 'wait' : 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            opacity: navigating ? 0.7 : 1,
            transform: hoveredProject === project.id ? 'translateY(-2px)' : 'translateY(0)',
            boxShadow: hoveredProject === project.id ? `0 6px 20px ${project.color}40` : `0 2px 10px ${project.color}20`,
            willChange: 'transform, box-shadow'
          }}
          onClick={(e) => handleProjectClick(project.id, e)}
        >
          {navigating ? t('loading') : t('viewProjectDetails')}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section
      id="projects"
      style={{
        padding: isMobile ? '2rem 1rem' : '5rem 0',
        background: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.background} 100%)`,
        borderBottom: `1px solid ${colors.border}`
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '4rem' }}
        >
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: '600',
            color: colors.text,
            marginBottom: '1rem'
          }}>
            {t('projectsTitle')}
          </h2>
          <div style={{
            width: '60px',
            height: '4px',
            background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
          <p style={{
            fontSize: isMobile ? '0.9rem' : '1.1rem',
            color: colors.textSecondary,
            marginTop: '1rem',
            maxWidth: '600px',
            margin: '1rem auto 0'
          }}>
            {isMobile ? 
              'Key projects and achievements' : 
              'A collection of projects showcasing my expertise in data engineering, full-stack development, and innovative solutions.'
            }
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: isMobile ? '0.75rem' : '2rem',
          marginBottom: isMobile ? '2rem' : '4rem',
          padding: isMobile ? '0' : '0'
        }}>
          {projects.map((project, index) => 
            isMobile ? (
              <MobileProjectCard key={project.id} project={project} index={index} />
            ) : (
              <DesktopProjectCard key={project.id} project={project} index={index} />
            )
          )}
        </div>

        {/* Hackathons Section - Simplificado en móvil */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            background: colors.surface,
            padding: isMobile ? '1.5rem' : '2rem',
            borderRadius: '16px',
            border: `1px solid ${colors.border}`,
            boxShadow: `0 4px 12px ${colors.shadow}`
          }}
        >
          <h3 style={{
            fontSize: isMobile ? '1.3rem' : '1.8rem',
            fontWeight: '600',
            color: colors.text,
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {isMobile ? 'Competitions' : 'Hackathons & Competitions'}
          </h3>
          
          <div style={{
            display: isMobile ? 'flex' : 'grid',
            flexDirection: isMobile ? 'column' : undefined,
            gridTemplateColumns: isMobile ? undefined : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: isMobile ? '1rem' : '1.5rem',
            marginTop: isMobile ? '1rem' : '2rem'
          }}>
            {hackathons.map((hackathon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: isMobile ? 1 : 1.05 }}
                style={{
                  background: colors.background,
                  padding: isMobile ? '1rem' : '1.5rem',
                  borderRadius: '12px',
                  border: `1px solid ${colors.border}`,
                  textAlign: 'center'
                }}
              >
                <h4 style={{
                  fontSize: isMobile ? '1rem' : '1.2rem',
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: '0.75rem',
                  lineHeight: '1.2'
                }}>
                  {isMobile ? hackathon.title.replace('Final Showcase', '').trim() : hackathon.title}
                </h4>
                
                <span style={{
                  background: hackathon.color,
                  color: '#fff',
                  padding: isMobile ? '0.25rem 0.75rem' : '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: isMobile ? '10px' : '12px',
                  fontWeight: '600',
                  display: 'inline-block',
                  marginBottom: '1rem'
                }}>
                  {hackathon.status}
                </span>
                
                {!isMobile && (
                  <p style={{
                    fontSize: '0.95rem',
                    color: colors.textSecondary,
                    lineHeight: '1.5'
                  }}>
                    {hackathon.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection; 