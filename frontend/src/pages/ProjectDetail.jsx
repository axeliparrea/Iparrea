import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hook/ThemeContext';
import { motion } from 'framer-motion';
import YouTubeVideo from '../components/YouTubeVideo';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [project, setProject] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const projectData = {
    'sapitos': {
      title: 'SAPitos 2.0',
      subtitle: 'AI-Powered Smart Supply Chain',
      description: 'Winner of SAP Labs Final Showcase 2025. An award-winning smart supply chain solution for boutique apparel SME, focused on automating and optimizing logistics using SAP technologies with AI-powered features.',
      fullDescription: 'SAPitos 2.0 is an innovative smart supply chain solution that won the SAP Labs Final Showcase 2025. This project was developed for a boutique apparel SME, focusing on automating and optimizing their logistics operations using cutting-edge SAP technologies combined with AI capabilities. The solution includes predictive analytics for inventory management, automated ordering systems, and real-time supply chain monitoring. The AI assistant feature helps business owners make data-driven decisions and provides intelligent recommendations for supply chain optimization.',
      detailedDescription: 'This comprehensive supply chain management system revolutionizes how boutique apparel companies handle their logistics. Built with a focus on small and medium enterprises (SMEs), SAPitos 2.0 integrates seamlessly with existing SAP S/4HANA systems while adding powerful AI capabilities. The system features predictive demand forecasting using machine learning algorithms, automated inventory replenishment, real-time supplier performance monitoring, and intelligent cost optimization recommendations. The AI assistant provides natural language querying capabilities, allowing users to ask business questions and receive data-driven insights instantly.',
      image: '/src/assets/pictures/AIRCLOUD.png',
      videoId: 'kBZe4lqsfXc', // Video demo de SAPitos 2.0
      technologies: ['JavaScript', 'SAP S/4HANA', 'SAP Analytics Cloud', 'Machine Learning', 'AI Assistant', 'Predictive Analytics', 'Supply Chain Management'],
      status: 'Completed',
      category: 'AI & Enterprise',
      period: '2025',
      color: '#00A86B',
      githubUrl: 'https://github.com/axeliparrea/Sapitos-2.0',
      demoUrl: null,
      features: [
        'AI-powered inventory prediction',
        'Automated supply chain optimization',
        'Real-time analytics dashboard',
        'Predictive demand forecasting',
        'Intelligent business recommendations',
        'SAP S/4HANA integration',
        'Natural language AI assistant',
        'Cost optimization algorithms'
      ],
      challenges: [
        'Integrating multiple SAP systems seamlessly',
        'Developing accurate ML models for demand prediction',
        'Creating intuitive user interfaces for complex data',
        'Ensuring real-time data processing at scale',
        'Implementing secure data handling for enterprise environments'
      ]
    },
    'awak-dashboard': {
      title: 'AWAK Dashboard',
      subtitle: 'User Progress Visualization',
      description: 'A comprehensive dashboard for visualizing user progress in their onboarding process. Built with C# and modern web technologies, this tool provides detailed insights into user engagement and progression analytics.',
      fullDescription: 'The AWAK Dashboard is a sophisticated web application designed to visualize and track user progress throughout their onboarding journey. Built using C# and modern web technologies, this dashboard provides administrators with comprehensive insights into user engagement, progression analytics, and performance metrics. The application features interactive charts, real-time data updates, and customizable reporting tools that help organizations understand user behavior patterns and optimize their onboarding processes.',
      detailedDescription: 'This enterprise-grade dashboard solution transforms how organizations monitor and improve their user onboarding processes. Built with ASP.NET Core and modern frontend technologies, the system provides real-time tracking of user interactions, engagement metrics, and completion rates. The dashboard features customizable widgets, drill-down analytics, automated reporting, and alert systems for identifying users who may need additional support. Integration with SQL Server ensures robust data management and quick query performance even with large datasets.',
      image: '/src/assets/pictures/poseaxel.png',
      videoId: 'HiyWYd23EK4', // Video demo de AWAQ WEB Dashboard
      technologies: ['C#', '.NET', 'SQL Server', 'Bootstrap', 'Chart.js', 'JavaScript', 'HTML5', 'CSS3'],
      status: 'Completed',
      category: 'Web Application',
      period: '2024',
      color: '#4F46E5',
      githubUrl: 'https://github.com/Ale-Coeto/awak-dashboard',
      demoUrl: null,
      features: [
        'Real-time user progress tracking',
        'Interactive data visualizations',
        'Customizable reporting dashboard',
        'User engagement analytics',
        'Performance metrics monitoring',
        'Administrative control panel',
        'Automated alert system',
        'Export functionality for reports'
      ],
      challenges: [
        'Implementing real-time data updates efficiently',
        'Creating responsive visualizations for different screen sizes',
        'Optimizing database queries for large datasets',
        'Ensuring data security and privacy compliance',
        'Building intuitive admin interfaces for complex data'
      ]
    },
    'awak-game': {
      title: 'AWAK Game',
      subtitle: 'Unity Game Development',
      description: 'Interactive Unity game project developed as part of a collaborative team effort. Features engaging gameplay mechanics and modern game development practices using Unity engine and C#.',
      fullDescription: 'AWAK Game is an interactive Unity-based game project that showcases modern game development practices and collaborative software development. Built using Unity engine and C#, this game demonstrates advanced gameplay mechanics, engaging user experiences, and professional game development workflows. The project involved working closely with a team of developers, implementing version control practices, and following industry-standard development methodologies.',
      detailedDescription: 'This collaborative game development project demonstrates professional game development practices using Unity 2D/3D engine. The game features engaging gameplay mechanics, smooth character controls, interactive environments, and polished visual effects. The development process included sprint planning, code reviews, asset management, and continuous integration practices. The team utilized Git for version control, implemented design patterns for maintainable code, and followed agile development methodologies to deliver a high-quality gaming experience.',
      image: '/src/assets/pictures/AIRCLOUD.png',
      videoId: null, // Aquí puedes agregar el ID del video de YouTube del gameplay
      technologies: ['Unity', 'C#', 'Game Development', 'Collaborative Development', 'Version Control', 'Agile Methodology'],
      status: 'Completed',
      category: 'Game Development',
      period: '2024',
      color: '#FF6B6B',
      githubUrl: 'https://github.com/Oscar-gg/awak-game',
      demoUrl: null,
      features: [
        'Interactive gameplay mechanics',
        'Modern Unity engine implementation',
        'Collaborative development workflow',
        'Professional game architecture',
        'Version control integration',
        'Team-based development practices',
        'Polished visual effects',
        'Smooth character controls'
      ],
      challenges: [
        'Coordinating team development across different time zones',
        'Implementing complex game mechanics with clean code',
        'Managing version control conflicts in Unity projects',
        'Optimizing game performance for different platforms',
        'Maintaining consistent art style and gameplay feel'
      ]
    },
    'sistema-multiagente': {
      title: 'Sistema Multiagente',
      subtitle: 'Multi-Agent System Simulation',
      description: 'Advanced multi-agent system simulation developed in C#. This project demonstrates complex interactions between autonomous agents and showcases understanding of artificial intelligence and distributed systems concepts.',
      fullDescription: 'Sistema Multiagente is a sophisticated simulation project that demonstrates advanced concepts in artificial intelligence and distributed systems. Developed in C#, this project implements complex interactions between autonomous agents, showcasing understanding of multi-agent systems, AI algorithms, and distributed computing principles. The system simulates real-world scenarios where multiple intelligent agents interact, cooperate, and compete within a shared environment.',
      detailedDescription: 'This advanced artificial intelligence project implements a comprehensive multi-agent system where autonomous agents demonstrate emergent behaviors through complex interactions. The simulation includes various agent types with different behavioral patterns, communication protocols, and decision-making algorithms. Agents can collaborate, compete, learn from their environment, and adapt their strategies based on outcomes. The system features real-time visualization of agent interactions, performance metrics tracking, and configurable simulation parameters for research and educational purposes.',
      image: '/src/assets/pictures/poseaxel.png',
      videoId: 'mT7RA7i_xBg', // Video demo de Sistema Multiagente
      technologies: ['C#', '.NET', 'AI Algorithms', 'System Simulation', 'Multi-Agent Systems', 'Distributed Computing', 'Object-Oriented Programming'],
      status: 'Completed',
      category: 'AI & Simulation',
      period: '2024',
      color: '#10B981',
      githubUrl: 'https://github.com/AbdielFritsche/SistemaMultiagente',
      demoUrl: null,
      features: [
        'Multi-agent system architecture',
        'Complex agent interactions',
        'AI algorithm implementation',
        'Distributed system simulation',
        'Real-time agent behavior monitoring',
        'Scalable system design',
        'Emergent behavior patterns',
        'Configurable simulation parameters'
      ],
      challenges: [
        'Designing efficient agent communication protocols',
        'Implementing complex AI algorithms for decision-making',
        'Managing system scalability with increasing agent numbers',
        'Ensuring simulation accuracy and realistic behaviors',
        'Optimizing performance for real-time visualization'
      ]
    },
    'cybersecurity-integration': {
      title: 'Cybersecurity Integration',
      subtitle: 'Security Class Project',
      description: 'Comprehensive cybersecurity project developed in Kotlin focusing on security integration and implementation. This academic project demonstrates advanced security concepts and practical application of cybersecurity principles.',
      fullDescription: 'This comprehensive cybersecurity project was developed as part of advanced security coursework, focusing on practical implementation of cybersecurity principles and security integration techniques. Built using Kotlin, the project demonstrates understanding of modern security practices, threat assessment, vulnerability management, and security architecture design. The project includes implementation of various security protocols, encryption techniques, and security monitoring systems.',
      detailedDescription: 'This advanced cybersecurity implementation project showcases practical application of security principles in mobile and web environments. The project includes implementation of multiple encryption algorithms, secure authentication systems, threat detection mechanisms, and vulnerability assessment tools. Built with Kotlin for Android platforms, the application demonstrates secure coding practices, data protection techniques, and security protocol implementation. The project also includes comprehensive security testing, penetration testing scenarios, and security audit capabilities.',
      image: '/src/assets/pictures/AIRCLOUD.png',
      videoId: null, // Aquí puedes agregar el ID del video de YouTube demostrando las funcionalidades de seguridad
      technologies: ['Kotlin', 'Cybersecurity', 'Security Integration', 'Mobile Security', 'Encryption', 'Security Protocols', 'Threat Assessment'],
      status: 'Completed',
      category: 'Cybersecurity',
      period: '2024',
      color: '#F59E0B',
      githubUrl: 'https://github.com/A01285442/Repositorio-Integracion-Seguridad-403',
      demoUrl: null,
      features: [
        'Advanced security implementation',
        'Threat assessment capabilities',
        'Security protocol integration',
        'Mobile security features',
        'Encryption and decryption systems',
        'Security monitoring tools',
        'Vulnerability assessment',
        'Penetration testing scenarios'
      ],
      challenges: [
        'Implementing robust security measures without compromising usability',
        'Ensuring system vulnerability protection against known attacks',
        'Integrating multiple security protocols seamlessly',
        'Maintaining performance with security overhead',
        'Creating comprehensive security testing suites'
      ]
    },
    'portfolio': {
      title: 'Personal Portfolio',
      subtitle: 'Professional Web Portfolio',
      description: 'A modern, responsive portfolio website showcasing my professional work and technical skills. Built with React and optimized for performance with smooth animations and interactive elements.',
      fullDescription: 'This personal portfolio website represents a modern, responsive web application built with React and optimized for performance. The portfolio showcases professional work, technical skills, and personal projects through an engaging and interactive user interface. Built with Vite for fast development and optimized bundling, the site features smooth animations powered by Framer Motion, responsive design principles, and modern web development practices.',
      detailedDescription: 'This comprehensive portfolio website demonstrates advanced frontend development skills using modern React ecosystem tools. The application features a fully responsive design that works seamlessly across desktop, tablet, and mobile devices. Built with performance in mind, the site uses code splitting, lazy loading, and optimized bundling to ensure fast load times. The design includes smooth animations, interactive elements, multi-language support, dark/light theme switching, and SEO optimization. The site serves as both a showcase of technical skills and a practical example of modern web development best practices.',
      image: '/src/assets/pictures/poseaxel.png',
      videoId: null, // Aquí puedes agregar el ID del video de YouTube recorriendo el portfolio
      technologies: ['React', 'Vite', 'CSS3', 'Framer Motion', 'JavaScript', 'Responsive Design', 'Modern Web Development'],
      status: 'Completed',
      category: 'Frontend',
      period: '2024',
      color: '#8B5CF6',
      githubUrl: 'https://github.com/axeliparrea/Iparrea',
      demoUrl: window.location.origin, // La URL actual del portfolio
      features: [
        'Modern React architecture',
        'Smooth animations with Framer Motion',
        'Responsive design implementation',
        'Performance optimized bundle',
        'Interactive user interface',
        'Professional presentation',
        'Multi-language support',
        'Dark/Light theme switching'
      ],
      challenges: [
        'Optimizing performance and bundle size for fast loading',
        'Implementing smooth animations without affecting performance',
        'Ensuring cross-browser compatibility across all devices',
        'Creating engaging user experiences with accessibility in mind',
        'Balancing visual appeal with professional presentation'
      ]
    }
  };

  useEffect(() => {
    const currentProject = projectData[projectId];
    if (currentProject) {
      setProject(currentProject);
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [projectId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!project) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.background
      }}>
        <div style={{
          textAlign: 'center',
          color: colors.text
        }}>
          <h2>Project not found</h2>
          <p>The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.background,
      paddingTop: isMobile ? '60px' : '80px'
    }}>
      {/* Back Button */}
      <section style={{
        padding: isMobile ? '0.5rem 0' : '1rem 0',
        borderBottom: `1px solid ${colors.border}`
      }}>
        <div className="container">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="back-button"
            style={{
              background: 'none',
              border: `2px solid ${colors.border}`,
              color: colors.text,
              padding: isMobile ? '0.5rem 1rem' : '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: isMobile ? '12px' : '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ← Back to Portfolio
          </motion.button>
        </div>
      </section>

      {/* Hero Section */}
      <section style={{
        background: `linear-gradient(135deg, ${project.color}10, ${colors.surface})`,
        padding: isMobile ? '2rem 0' : '4rem 0',
        borderBottom: `1px solid ${colors.border}`
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: isMobile ? '2rem' : '3rem',
              alignItems: 'center'
            }}
          >
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span style={{
                  background: `${project.color}20`,
                  color: project.color,
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {project.category}
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  fontSize: isMobile ? '2rem' : '3rem',
                  fontWeight: '700',
                  color: colors.text,
                  marginTop: isMobile ? '0.5rem' : '1rem',
                  marginBottom: '0.5rem'
                }}
              >
                {project.title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  fontSize: isMobile ? '1rem' : '1.3rem',
                  color: project.color,
                  fontWeight: '500',
                  marginBottom: isMobile ? '1rem' : '1.5rem'
                }}
              >
                {project.subtitle}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{
                  fontSize: isMobile ? '0.9rem' : '1.1rem',
                  color: colors.textSecondary,
                  lineHeight: '1.6',
                  marginBottom: isMobile ? '1.5rem' : '2rem'
                }}
              >
                {isMobile ? project.description : project.description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{
                  display: 'flex',
                  gap: isMobile ? '0.75rem' : '1rem',
                  flexWrap: 'wrap',
                  flexDirection: isMobile ? 'column' : 'row'
                }}
              >
                <div style={{
                  display: 'flex',
                  gap: isMobile ? '0.75rem' : '1rem',
                  flexWrap: 'wrap'
                }}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}, ${project.color}80)`,
                        color: '#fff',
                        padding: isMobile ? '0.6rem 1.2rem' : '0.75rem 1.5rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        fontSize: isMobile ? '0.85rem' : '1rem'
                      }}
                    >
                      View on GitHub
                    </a>
                  )}
                  
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: colors.surface,
                        color: colors.text,
                        padding: isMobile ? '0.6rem 1.2rem' : '0.75rem 1.5rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        border: `1px solid ${colors.border}`,
                        transition: 'all 0.3s ease',
                        fontSize: isMobile ? '0.85rem' : '1rem'
                      }}
                    >
                      Live Demo
                    </a>
                  )}
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '0.75rem' : '1rem',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'flex-start' : 'center'
                }}>
                  <span style={{
                    color: colors.textSecondary,
                    fontSize: isMobile ? '12px' : '14px'
                  }}>
                    Status: <strong style={{ color: colors.text }}>{project.status}</strong>
                  </span>
                  <span style={{
                    color: colors.textSecondary,
                    fontSize: isMobile ? '12px' : '14px'
                  }}>
                    Period: <strong style={{ color: colors.text }}>{project.period}</strong>
                  </span>
                </div>
              </motion.div>
            </div>
            
            {/* Media Section - Image or Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: `0 8px 32px ${colors.shadow}`,
                border: `1px solid ${colors.border}`
              }}
            >
              {project.videoId ? (
                <YouTubeVideo 
                  videoId={project.videoId}
                  title={`${project.title} - Demo Video`}
                  width="100%"
                  height="100%"
                  aspectRatio="16/9"
                  showControls={true}
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: isMobile ? '2rem 0' : '4rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: isMobile ? '1.5rem' : '3rem'
          }}>
            {/* Project Overview */}
            <div style={{ gridColumn: '1 / -1' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  background: colors.surface,
                  padding: isMobile ? '1.5rem' : '2rem',
                  borderRadius: '12px',
                  border: `1px solid ${colors.border}`,
                  boxShadow: `0 4px 12px ${colors.shadow}`
                }}
              >
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: '1.5rem'
                }}>
                  Project Overview
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: colors.textSecondary,
                  lineHeight: '1.8'
                }}>
                  {project.fullDescription}
                </p>
              </motion.div>
            </div>

            {/* Technologies Used */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                background: colors.surface,
                padding: '2rem',
                borderRadius: '12px',
                border: `1px solid ${colors.border}`,
                boxShadow: `0 4px 12px ${colors.shadow}`
              }}
            >
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: colors.text,
                marginBottom: '1.5rem'
              }}>
                Technologies Used
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      background: `${project.color}20`,
                      color: project.color,
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '500',
                      border: `1px solid ${project.color}30`
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                background: colors.surface,
                padding: '2rem',
                borderRadius: '12px',
                border: `1px solid ${colors.border}`,
                boxShadow: `0 4px 12px ${colors.shadow}`
              }}
            >
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: colors.text,
                marginBottom: '1.5rem'
              }}>
                Key Features
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {project.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.75rem 0',
                      borderBottom: index < project.features.length - 1 ? `1px solid ${colors.border}` : 'none'
                    }}
                  >
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: project.color,
                      marginRight: '1rem'
                    }}></span>
                    <span style={{
                      color: colors.textSecondary,
                      fontSize: '1rem'
                    }}>
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Challenges & Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              background: colors.surface,
              padding: '2rem',
              borderRadius: '12px',
              border: `1px solid ${colors.border}`,
              boxShadow: `0 4px 12px ${colors.shadow}`,
              marginTop: '3rem'
            }}
          >
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: colors.text,
              marginBottom: '1.5rem'
            }}>
              Challenges & Solutions
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {project.challenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  style={{
                    background: `${project.color}10`,
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: `1px solid ${project.color}20`
                  }}
                >
                  <p style={{
                    color: colors.textSecondary,
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {challenge}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail; 