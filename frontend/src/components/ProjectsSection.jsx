import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hook/ThemeContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../utils/responsive';
import { projects as projectsData } from '../data/projects';
import { hackathons as hackathonsData } from '../data/hackathons';
import YouTubeVideo from './YouTubeVideo';
import SectionHeader from './ui/SectionHeader';
import TechTag from './ui/TechTag';
import StatusBadge from './ui/StatusBadge';

const ProjectsSection = () => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const { isMobile } = useResponsive();
  const [navigating, setNavigating] = useState(false);
  const navigate = useNavigate();
  const currentLanguage = i18n.language;

  // Map projects data with translations
  const projects = projectsData.map(project => ({
    ...project,
    title: project.title[currentLanguage] || project.title.en,
    subtitle: project.subtitle[currentLanguage] || project.subtitle.en,
    description: project.description[currentLanguage] || project.description.en,
    descriptionMobile: project.descriptionMobile[currentLanguage] || project.descriptionMobile.en,
    status: project.status[currentLanguage] || project.status.en,
    category: project.category[currentLanguage] || project.category.en
  }));

  // Map hackathons data with translations
  const hackathons = hackathonsData.map(hackathon => ({
    ...hackathon,
    title: hackathon.title[currentLanguage] || hackathon.title.en,
    subtitle: hackathon.subtitle[currentLanguage] || hackathon.subtitle.en,
    status: hackathon.status[currentLanguage] || hackathon.status.en,
    description: hackathon.description[currentLanguage] || hackathon.description.en
  }));

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


  const MobileProjectCard = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: `0 16px 32px ${project.color}25`
      }}
      transition={{ 
        duration: 0.3, 
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      style={{
        background: `linear-gradient(135deg, ${colors.surface} 0%, ${project.color}08 100%)`,
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${project.color}30`,
        boxShadow: `0 8px 24px ${project.color}15`,
        cursor: navigating ? 'wait' : 'pointer',
        opacity: navigating ? 0.7 : 1,
        position: 'relative',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
      onClick={(e) => handleProjectClick(project.id, e)}
    >
      <div style={{
        height: '80px',
        background: `linear-gradient(135deg, ${project.color}25, ${project.color}15)`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
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
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />
        )}
        
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

      <div style={{ padding: '0.8rem' }}>
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
            {project.category.split(' ')[0]}
          </span>
        </div>

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

        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.2rem',
          marginBottom: '0.6rem'
        }}>
          {(project.technologiesMobile || project.technologies.slice(0, 2)).slice(0, 2).map((tech, techIndex) => (
            <TechTag key={techIndex} size="small">
              {tech}
            </TechTag>
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

      
        <div style={{
          position: 'absolute',
          top: '0.4rem',
          left: '0.4rem',
          width: '6px',
          height: '6px',
          background: project.color,
          borderRadius: '50%',
          boxShadow: `0 0 8px ${project.color}`
        }}></div>
    </motion.div>
  );


  const DesktopProjectCard = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -12, 
        scale: 1.03,
        boxShadow: `0 20px 40px ${project.color}20, 0 8px 16px ${colors.shadow}`
      }}
      transition={{ 
        duration: 0.4, 
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      className="project-card"
      style={{
        background: colors.surface,
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${colors.border}`,
        boxShadow: `0 4px 12px ${colors.shadow}`,
        cursor: navigating ? 'wait' : 'pointer',
        position: 'relative',
        opacity: navigating ? 0.7 : 1,
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      onClick={(e) => handleProjectClick(project.id, e)}
    >
      
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
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        )}
        
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 2
        }}>
          <StatusBadge status={project.status} size="medium" />
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

      
      <div style={{ 
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
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

        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          {project.technologies.map((tech, techIndex) => (
            <TechTag key={techIndex} size="medium">
              {tech}
            </TechTag>
          ))}
        </div>

        
        <motion.div
          className="project-button"
          whileHover={{ 
            scale: 1.05,
            boxShadow: `0 4px 20px ${project.color}40`
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ 
            duration: 0.2, 
            ease: "easeOut"
          }}
          style={{
            background: `linear-gradient(135deg, ${project.color}, ${project.color}80)`,
            color: '#fff',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: '14px',
            cursor: navigating ? 'wait' : 'pointer',
            opacity: navigating ? 0.7 : 1,
            boxShadow: `0 2px 10px ${project.color}20`,
            marginTop: 'auto'
          }}
          onClick={(e) => handleProjectClick(project.id, e)}
        >
          {navigating ? t('loading') : t('viewProjectDetails')}
        </motion.div>
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
        <SectionHeader
          title={t('projectsTitle')}
          subtitle={isMobile ? 
            'Key projects and achievements' : 
            'A collection of projects showcasing my expertise in AI solutions, ERP integration, and innovative automation.'
          }
          align="center"
        />

        
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

        
        <motion.div
          initial={{ opacity: 1, y: 0 }}
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
                initial={{ opacity: 1, scale: 1 }}
                whileHover={{ 
                  y: -4, 
                  scale: 1.02,
                  boxShadow: `0 8px 24px ${hackathon.color}20`
                }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                style={{
                  background: colors.background,
                  padding: isMobile ? '1rem' : '1.5rem',
                  borderRadius: '12px',
                  border: `1px solid ${colors.border}`,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
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
                
                <StatusBadge 
                  status={hackathon.status} 
                  size={isMobile ? 'small' : 'medium'}
                />
                
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
