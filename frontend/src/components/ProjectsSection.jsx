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

// ─── Animation Variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] }
  }
};

const hackathonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] }
  }
};

// ─── Mobile Card ─────────────────────────────────────────────────────────────
const MobileProjectCard = ({ project, colors, navigating, onProjectClick }) => (
  <motion.div
    variants={cardVariants}
    whileTap={{ scale: 0.96 }}
    style={{
      background: `linear-gradient(145deg, ${colors.surface} 0%, ${project.color}08 100%)`,
      borderRadius: '14px',
      overflow: 'hidden',
      border: `1px solid ${project.color}30`,
      borderTop: `3px solid ${project.color}`,
      boxShadow: `0 4px 20px ${project.color}12`,
      cursor: navigating ? 'wait' : 'pointer',
      opacity: navigating ? 0.7 : 1,
      display: 'flex',
      flexDirection: 'column'
    }}
    onClick={(e) => onProjectClick(project.id, e)}
  >
    <div style={{
      height: '130px',
      background: `linear-gradient(135deg, ${project.color}28, ${project.color}14)`,
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0
    }}>
      {project.videoId ? (
        <YouTubeVideo
          videoId={project.videoId}
          title={project.title}
          width="100%" height="100%"
          aspectRatio="16/9"
          showControls={false} autoplay={false}
        />
      ) : (
        <img
          src={project.image} alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px',
        background: `linear-gradient(to top, ${colors.surface}dd, transparent)`
      }} />
      <div style={{
        position: 'absolute', top: '0.5rem', right: '0.5rem',
        background: `${project.color}ee`, color: '#fff',
        padding: '0.15rem 0.45rem', borderRadius: '6px',
        fontSize: '10px', fontWeight: '700'
      }}>
        {project.period}
      </div>
    </div>

    <div style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
      <span style={{
        background: `${project.color}18`, color: project.color,
        padding: '0.12rem 0.45rem', borderRadius: '6px',
        fontSize: '9px', fontWeight: '700',
        textTransform: 'uppercase', letterSpacing: '0.5px',
        alignSelf: 'flex-start', marginBottom: '0.4rem'
      }}>
        {project.category.split(' ')[0]}
      </span>

      <h3 style={{
        fontSize: '0.88rem', fontWeight: '700', color: colors.text,
        marginBottom: '0.3rem', lineHeight: '1.2',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
      }}>
        {project.title}
      </h3>

      <p style={{
        fontSize: '0.71rem', color: colors.textSecondary, lineHeight: '1.45',
        marginBottom: '0.6rem', flex: 1,
        display: '-webkit-box', WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical', overflow: 'hidden'
      }}>
        {project.descriptionMobile}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.65rem' }}>
        {(project.technologiesMobile || project.technologies).slice(0, 3).map((tech, i) => (
          <TechTag key={i} size="small">{tech}</TechTag>
        ))}
        {project.technologies.length > 3 && (
          <span style={{ color: colors.textSecondary, fontSize: '10px', alignSelf: 'center' }}>
            +{project.technologies.length - 3}
          </span>
        )}
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`,
        color: '#fff', padding: '0.42rem', borderRadius: '8px',
        textAlign: 'center', fontWeight: '700', fontSize: '11px',
        textTransform: 'uppercase', letterSpacing: '0.5px',
        boxShadow: `0 3px 12px ${project.color}30`
      }}>
        {navigating ? '...' : 'Ver →'}
      </div>
    </div>
  </motion.div>
);

// ─── Desktop Card ─────────────────────────────────────────────────────────────
const DesktopProjectCard = ({ project, colors, navigating, onProjectClick, viewLabel }) => {
  const isFeatured = project.id === 'sapitos';

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -14,
        rotateX: -2,
        scale: 1.015,
        boxShadow: `0 28px 56px ${project.color}22, 0 8px 24px ${colors.shadow}`
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="project-card"
      style={{
        background: colors.surface,
        borderRadius: '18px',
        overflow: 'hidden',
        border: `1px solid ${isFeatured ? project.color + '45' : colors.border}`,
        borderTop: `3px solid ${project.color}`,
        boxShadow: isFeatured
          ? `0 8px 32px ${project.color}20`
          : `0 4px 16px ${colors.shadow}`,
        cursor: navigating ? 'wait' : 'pointer',
        opacity: navigating ? 0.7 : 1,
        display: 'flex', flexDirection: 'column',
        height: '100%',
        transformStyle: 'preserve-3d'
      }}
      onClick={(e) => onProjectClick(project.id, e)}
    >
      {isFeatured && (
        <div
          className="featured-banner"
          style={{
            color: '#fff', textAlign: 'center',
            padding: '0.4rem', fontSize: '11px',
            fontWeight: '800', letterSpacing: '1.5px',
            textTransform: 'uppercase'
          }}
        >
          🏆 SAP Labs Winner 2025
        </div>
      )}

      <div style={{
        height: '210px',
        background: `linear-gradient(135deg, ${project.color}22, ${project.color}40)`,
        position: 'relative', overflow: 'hidden'
      }}>
        {project.videoId ? (
          <YouTubeVideo
            videoId={project.videoId} title={project.title}
            width="100%" height="100%"
            aspectRatio="16/9" showControls={false} autoplay={false}
          />
        ) : (
          <img src={project.image} alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}

        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
          background: `linear-gradient(to top, ${colors.surface}cc, transparent)`
        }} />

        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 2 }}>
          <StatusBadge status={project.status} size="medium" />
        </div>

        <div style={{
          position: 'absolute', bottom: '1rem', left: '1rem',
          background: `${colors.surface}e8`, backdropFilter: 'blur(10px)',
          padding: '0.4rem 0.9rem', borderRadius: '8px',
          fontSize: '13px', fontWeight: '500', color: colors.text, zIndex: 2
        }}>
          {project.period}
        </div>

        {project.videoId && (
          <div style={{
            position: 'absolute', top: '1rem', left: '1rem',
            background: `${colors.primary}e8`, backdropFilter: 'blur(10px)',
            padding: '0.4rem 0.9rem', borderRadius: '8px',
            fontSize: '12px', fontWeight: '700', color: '#fff', zIndex: 2,
            display: 'flex', alignItems: 'center', gap: '0.4rem'
          }}>
            ▶ Demo
          </div>
        )}
      </div>

      <div style={{
        padding: '1.5rem', display: 'flex',
        flexDirection: 'column', flex: 1
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', marginBottom: '0.85rem'
        }}>
          <div style={{ flex: 1, paddingRight: '1rem' }}>
            <h3 style={{
              fontSize: '1.25rem', fontWeight: '700',
              color: colors.text, marginBottom: '0.3rem', lineHeight: '1.2'
            }}>
              {project.title}
            </h3>
            <p style={{ fontSize: '0.95rem', color: project.color, fontWeight: '600' }}>
              {project.subtitle}
            </p>
          </div>
          <span style={{
            background: `${project.color}18`, color: project.color,
            padding: '0.3rem 0.8rem', borderRadius: '20px',
            fontSize: '11px', fontWeight: '700',
            whiteSpace: 'nowrap', border: `1px solid ${project.color}25`
          }}>
            {project.category}
          </span>
        </div>

        <p style={{
          fontSize: '0.9rem', color: colors.textSecondary,
          lineHeight: '1.65', marginBottom: '1.25rem',
          display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>
          {project.description}
        </p>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.45rem',
          marginBottom: '1.5rem'
        }}>
          {project.technologies.slice(0, 5).map((tech, i) => (
            <TechTag key={i} size="medium">{tech}</TechTag>
          ))}
          {project.technologies.length > 5 && (
            <span style={{
              color: colors.textSecondary, fontSize: '0.78rem',
              alignSelf: 'center', fontWeight: '500'
            }}>
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        <motion.div
          className="project-button"
          whileHover={{ scale: 1.03, boxShadow: `0 6px 24px ${project.color}45` }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: `linear-gradient(135deg, ${project.color}, ${project.color}aa)`,
            color: '#fff', padding: '0.85rem 1.5rem',
            borderRadius: '10px', textAlign: 'center',
            fontWeight: '700', fontSize: '14px',
            cursor: navigating ? 'wait' : 'pointer',
            boxShadow: `0 4px 16px ${project.color}25`,
            marginTop: 'auto', letterSpacing: '0.3px'
          }}
          onClick={(e) => onProjectClick(project.id, e)}
        >
          {navigating ? '...' : `${viewLabel} →`}
        </motion.div>
      </div>
    </motion.div>
  );
};

// ─── Hackathon Card ───────────────────────────────────────────────────────────
const HackathonCard = ({ hackathon, colors, isMobile }) => (
  <motion.div
    variants={hackathonVariants}
    whileHover={{ y: -6, scale: 1.02, rotateX: -1 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    style={{
      background: colors.background,
      padding: isMobile ? '1rem' : '1.5rem',
      borderRadius: '14px',
      border: `1px solid ${hackathon.color}25`,
      borderTop: `3px solid ${hackathon.color}`,
      textAlign: 'center',
      transformStyle: 'preserve-3d'
    }}
  >
    <div style={{
      width: '36px', height: '36px',
      background: `${hackathon.color}18`,
      borderRadius: '50%',
      margin: '0 auto 0.75rem',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: `2px solid ${hackathon.color}30`
    }}>
      <div style={{
        width: '10px', height: '10px',
        background: hackathon.color,
        borderRadius: '50%',
        boxShadow: `0 0 8px ${hackathon.color}`
      }} />
    </div>

    <h4 style={{
      fontSize: isMobile ? '0.85rem' : '1.1rem',
      fontWeight: '700', color: colors.text,
      marginBottom: '0.6rem', lineHeight: '1.3'
    }}>
      {isMobile
        ? hackathon.title.replace('Final Showcase', '').replace('2025', '').trim()
        : hackathon.title}
    </h4>

    <StatusBadge status={hackathon.status} size={isMobile ? 'small' : 'medium'} />

    {!isMobile && (
      <p style={{
        fontSize: '0.88rem', color: colors.textSecondary,
        lineHeight: '1.55', marginTop: '0.75rem',
        display: '-webkit-box', WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical', overflow: 'hidden'
      }}>
        {hackathon.description}
      </p>
    )}

    <div style={{
      marginTop: '0.75rem',
      fontSize: '0.78rem', color: hackathon.color,
      fontWeight: '600'
    }}>
      {hackathon.period}
    </div>
  </motion.div>
);

// ─── Main Section ─────────────────────────────────────────────────────────────
const ProjectsSection = () => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const { isMobile } = useResponsive();
  const [navigating, setNavigating] = useState(false);
  const navigate = useNavigate();
  const currentLanguage = i18n.language;

  const projects = projectsData.map(project => ({
    ...project,
    title: project.title[currentLanguage] || project.title.en,
    subtitle: project.subtitle[currentLanguage] || project.subtitle.en,
    description: project.description[currentLanguage] || project.description.en,
    descriptionMobile: project.descriptionMobile?.[currentLanguage] || project.descriptionMobile?.en || project.description[currentLanguage] || project.description.en,
    status: project.status[currentLanguage] || project.status.en,
    category: project.category[currentLanguage] || project.category.en
  }));

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

  return (
    <section
      id="projects"
      style={{
        padding: isMobile ? '2.5rem 1rem' : '5.5rem 0',
        background: `linear-gradient(180deg, ${colors.surface} 0%, ${colors.background} 100%)`,
        borderBottom: `1px solid ${colors.border}`
      }}
    >
      <div className="container">
        <SectionHeader
          title={t('projectsTitle')}
          subtitle={
            isMobile
              ? 'Proyectos clave y logros'
              : 'AI solutions, ERP integration & innovative automation — built for impact.'
          }
          align="center"
        />

        <motion.div
          className={isMobile ? 'projects-mobile-grid' : ''}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: isMobile ? '0.85rem' : '2rem',
            marginBottom: isMobile ? '2.5rem' : '4.5rem',
            perspective: '1200px'
          }}
        >
          {projects.map((project) =>
            isMobile ? (
              <MobileProjectCard
                key={project.id}
                project={project}
                colors={colors}
                navigating={navigating}
                onProjectClick={handleProjectClick}
              />
            ) : (
              <DesktopProjectCard
                key={project.id}
                project={project}
                colors={colors}
                navigating={navigating}
                onProjectClick={handleProjectClick}
                viewLabel={t('viewProjectDetails')}
              />
            )
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: colors.surface,
            padding: isMobile ? '1.5rem' : '2.5rem',
            borderRadius: '20px',
            border: `1px solid ${colors.border}`,
            boxShadow: `0 8px 32px ${colors.shadow}`
          }}
        >
          <h3 style={{
            fontSize: isMobile ? '1.2rem' : '1.6rem',
            fontWeight: '700', color: colors.text,
            marginBottom: isMobile ? '1rem' : '1.5rem',
            textAlign: 'center'
          }}>
            {isMobile ? 'Competitions' : 'Hackathons & Competitions'}
          </h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile
                ? 'repeat(auto-fit, minmax(140px, 1fr))'
                : 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: isMobile ? '0.75rem' : '1.5rem'
            }}
          >
            {hackathons.map((hackathon, index) => (
              <HackathonCard
                key={index}
                hackathon={hackathon}
                colors={colors}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
