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

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 'sapitos',
      title: 'SAPitos 2.0',
      subtitle: 'AI-Powered Smart Supply Chain',
      description: 'Winner of SAP Labs Final Showcase 2025. An award-winning smart supply chain solution for boutique apparel SME, focused on automating and optimizing logistics using SAP technologies with AI-powered features.',
      image: '/src/assets/pictures/AIRCLOUD.png',
      videoId: null, // Solo imagen
      technologies: ['JavaScript', 'SAP S/4HANA', 'SAP Analytics Cloud', 'Machine Learning', 'AI Assistant'],
      status: 'Completed',
      category: 'AI & Enterprise',
      period: '2025',
      color: '#00A86B'
    },
    {
      id: 'awak-dashboard',
      title: 'AWAK Dashboard',
      subtitle: 'User Progress Visualization',
      description: 'A comprehensive dashboard for visualizing user progress in their onboarding process. Built with C# and modern web technologies, this tool provides detailed insights into user engagement and progression analytics.',
      image: '/src/assets/pictures/poseaxel.png',
      videoId: null, // Solo imagen
      technologies: ['C#', '.NET', 'SQL Server', 'Bootstrap', 'Chart.js'],
      status: 'Completed',
      category: 'Web Application',
      period: '2024',
      color: '#4F46E5'
    },
    {
      id: 'awak-game',
      title: 'AWAK Game',
      subtitle: 'Unity Game Development',
      description: 'Interactive Unity game project developed as part of a collaborative team effort. Features engaging gameplay mechanics and modern game development practices using Unity engine and C#.',
      image: '/src/assets/pictures/AIRCLOUD.png',
      videoId: null, // Solo imagen
      technologies: ['Unity', 'C#', 'Game Development', 'Collaborative Development'],
      status: 'Completed',
      category: 'Game Development',
      period: '2024',
      color: '#FF6B6B'
    },
    {
      id: 'sistema-multiagente',
      title: 'Sistema Multiagente',
      subtitle: 'Multi-Agent System Simulation',
      description: 'Advanced multi-agent system simulation developed in C#. This project demonstrates complex interactions between autonomous agents and showcases understanding of artificial intelligence and distributed systems concepts.',
      image: '/src/assets/pictures/poseaxel.png',
      videoId: null, // Solo imagen
      technologies: ['C#', '.NET', 'AI Algorithms', 'System Simulation', 'Multi-Agent Systems'],
      status: 'Completed',
      category: 'AI & Simulation',
      period: '2024',
      color: '#10B981'
    },
    {
      id: 'cybersecurity-integration',
      title: 'Cybersecurity Integration',
      subtitle: 'Security Class Project',
      description: 'Comprehensive cybersecurity project developed in Kotlin focusing on security integration and implementation. This academic project demonstrates advanced security concepts and practical application of cybersecurity principles.',
      image: '/src/assets/pictures/AIRCLOUD.png',
      videoId: null, // Solo imagen
      technologies: ['Kotlin', 'Cybersecurity', 'Security Integration', 'Mobile Security'],
      status: 'Completed',
      category: 'Cybersecurity',
      period: '2024',
      color: '#F59E0B'
    },
    {
      id: 'portfolio',
      title: 'Personal Portfolio',
      subtitle: 'Professional Web Portfolio',
      description: 'A modern, responsive portfolio website showcasing my professional work and technical skills. Built with React and optimized for performance with smooth animations and interactive elements.',
      image: '/src/assets/pictures/poseaxel.png',
      videoId: null, // Aquí puedes poner el ID del video de YouTube
      technologies: ['React', 'Vite', 'CSS3', 'Framer Motion', 'JavaScript'],
      status: 'Completed',
      category: 'Frontend',
      period: '2024',
      color: '#8B5CF6'
    }
  ];

  const hackathons = [
    {
      title: 'SAP Labs Final Showcase 2025',
      status: 'Winner',
      description: 'AI-powered smart supply chain solution for boutique apparel SME using SAP technologies',
      color: '#22c55e'
    },
    {
      title: 'Hack MTY 2022',
      status: 'Participant',
      description: 'Developed engaging web application for attracting and retaining younger demographics',
      color: '#3b82f6'
    }
  ];

  const handleProjectClick = (projectId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigating) return;
    
    setNavigating(true);
    
    // Add a small delay to prevent double clicks and improve user experience
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

  const ProjectCard = ({ project, index }) => (
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
        transition: 'all 0.3s ease',
        transform: hoveredProject === project.id ? 'translateY(-8px)' : 'translateY(0)',
        opacity: navigating ? 0.7 : 1
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
              transform: 'translate(-50%, -50%)',
              fontSize: '3rem',
              color: `${project.color}80`,
              fontWeight: '700',
              transition: 'all 0.3s ease',
              transform: hoveredProject === project.id ? 'translate(-50%, -50%) scale(1.1)' : 'translate(-50%, -50%) scale(1)'
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
      <div style={{ 
        padding: window.innerWidth < 768 ? '1.25rem' : '1.5rem' 
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
            transition: 'all 0.3s ease',
            opacity: navigating ? 0.7 : 1,
            transform: hoveredProject === project.id ? 'translateY(-2px)' : 'translateY(0)',
            boxShadow: hoveredProject === project.id ? `0 6px 20px ${project.color}40` : `0 2px 10px ${project.color}20`
          }}
          onClick={(e) => handleProjectClick(project.id, e)}
        >
          {navigating ? 'Loading...' : 'View Project Details →'}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section
      id="projects"
      style={{
        padding: window.innerWidth < 768 ? '3rem 1rem' : '5rem 0',
        background: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.background} 100%)`,
        borderBottom: `1px solid ${colors.border}`
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{
            fontSize: '2.5rem',
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
            fontSize: '1.1rem',
            color: colors.textSecondary,
            marginTop: '1rem',
            maxWidth: '600px',
            margin: '1rem auto 0'
          }}>
            A collection of projects showcasing my expertise in data engineering, full-stack development, and innovative solutions.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: window.innerWidth < 768 ? '2rem' : '2rem',
          marginBottom: window.innerWidth < 768 ? '3rem' : '4rem',
          padding: window.innerWidth < 768 ? '0 0.5rem' : '0'
        }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Hackathons Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            background: colors.surface,
            padding: window.innerWidth < 768 ? '1.5rem' : '2rem',
            borderRadius: '16px',
            border: `1px solid ${colors.border}`,
            boxShadow: `0 4px 12px ${colors.shadow}`,
            margin: window.innerWidth < 768 ? '0 0.5rem' : '0'
          }}
        >
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            color: colors.text,
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            Hackathons & Competitions
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: window.innerWidth < 768 ? '1.5rem' : '1.5rem',
            marginTop: window.innerWidth < 768 ? '1.5rem' : '2rem',
            padding: window.innerWidth < 768 ? '0 0.5rem' : '0'
          }}>
            {hackathons.map((hackathon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  background: colors.background,
                  padding: window.innerWidth < 768 ? '1.25rem' : '1.5rem',
                  borderRadius: '12px',
                  border: `1px solid ${colors.border}`,
                  textAlign: 'center'
                }}
              >
                <h4 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: '0.75rem'
                }}>
                  {hackathon.title}
                </h4>
                
                <span style={{
                  background: hackathon.color,
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  display: 'inline-block',
                  marginBottom: '1rem'
                }}>
                  {hackathon.status}
                </span>
                
                <p style={{
                  fontSize: '0.95rem',
                  color: colors.textSecondary,
                  lineHeight: '1.5'
                }}>
                  {hackathon.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection; 