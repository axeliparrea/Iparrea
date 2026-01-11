import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hook/ThemeContext';
import { motion } from 'framer-motion';
import { useResponsive } from '../utils/responsive';
import { personalInfo } from '../data/personalInfo';
import { skills, mobileSkills } from '../data/skills';
import { IMAGE_PATHS, SOCIAL_LINKS } from '../config/constants';
import SectionHeader from './ui/SectionHeader';
import TechTag from './ui/TechTag';

const AboutSection = () => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const { isMobile } = useResponsive();
  const [isVisible, setIsVisible] = useState(false);
  const currentLanguage = i18n.language;

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('about');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8;
        setIsVisible(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const programmingLanguages = isMobile ? mobileSkills.programmingLanguages : skills.programmingLanguages;
  const frameworksTools = isMobile ? mobileSkills.frameworksTools : skills.frameworksTools;
  const languages = skills.languages;

  const currentWork = {
    title: personalInfo.currentWork.title[currentLanguage] || personalInfo.currentWork.title.en,
    company: personalInfo.currentWork.company,
    period: personalInfo.currentWork.period,
    description: personalInfo.currentWork.description[currentLanguage] || personalInfo.currentWork.description.en,
    descriptionMobile: personalInfo.currentWork.descriptionMobile[currentLanguage] || personalInfo.currentWork.descriptionMobile.en
  };

  const education = {
    degree: personalInfo.education.degree[currentLanguage] || personalInfo.education.degree.en,
    university: personalInfo.education.university,
    period: personalInfo.education.period,
    gpa: personalInfo.education.gpa,
    note: personalInfo.education.note[currentLanguage] || personalInfo.education.note.en
  };

  return (
    <section
      id="about"
      style={{
        padding: isMobile ? '2rem 1rem' : '5rem 0',
        background: colors.background,
        borderBottom: `1px solid ${colors.border}`
      }}
    >
      <div className="container">
        <SectionHeader
          title={t('aboutTitle')}
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            textAlign: 'center',
            marginBottom: isMobile ? '2rem' : '3rem'
          }}
        >
          <div style={{
            width: isMobile ? '120px' : '200px',
            height: isMobile ? '120px' : '200px',
            borderRadius: '50%',
            margin: '0 auto',
            overflow: 'hidden',
            border: `4px solid ${colors.primary}`,
            boxShadow: `0 8px 24px ${colors.primary}25`
          }}>
            <img
              src={IMAGE_PATHS.PROFILE}
              alt={personalInfo.fullName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        </motion.div>

        {isMobile ? (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                background: colors.surface,
                padding: '1.5rem',
                borderRadius: '12px',
                border: `1px solid ${colors.border}`,
                boxShadow: `0 4px 12px ${colors.shadow}`,
                marginBottom: '1.5rem'
              }}
            >
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                color: colors.text,
                marginBottom: '1rem'
              }}>
                {t('currentWork') || 'Current Work'}
              </h3>
              <div style={{
                background: `${colors.primary}10`,
                padding: '1rem',
                borderRadius: '8px',
                border: `1px solid ${colors.primary}30`
              }}>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: '0.5rem'
                }}>
                  {currentWork.title}
                </h4>
                <p style={{
                  color: colors.primary,
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  fontSize: '0.9rem'
                }}>
                  {currentWork.company} • {currentWork.period}
                </p>
                <p style={{
                  color: colors.textSecondary,
                  lineHeight: '1.5',
                  fontSize: '0.85rem'
                }}>
                  {currentWork.descriptionMobile}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                background: colors.surface,
                padding: '1.5rem',
                borderRadius: '12px',
                border: `1px solid ${colors.border}`,
                boxShadow: `0 4px 12px ${colors.shadow}`,
                marginBottom: '1.5rem'
              }}
            >
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                color: colors.text,
                marginBottom: '1rem'
              }}>
                {t('educationTitle')}
              </h3>
              <div style={{
                background: `${colors.primary}10`,
                padding: '1rem',
                borderRadius: '8px',
                border: `1px solid ${colors.primary}30`
              }}>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: '0.25rem'
                }}>
                  {education.degree}
                </h4>
                <p style={{
                  color: colors.primary,
                  marginBottom: '0.25rem',
                  fontWeight: '500',
                  fontSize: '0.9rem'
                }}>
                  {education.university}
                </p>
                <p style={{
                  color: colors.textSecondary,
                  fontSize: '0.85rem'
                }}>
                  {education.period} • GPA: {education.gpa}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                background: colors.surface,
                padding: '1.5rem',
                borderRadius: '12px',
                border: `1px solid ${colors.border}`,
                boxShadow: `0 4px 12px ${colors.shadow}`,
                marginBottom: '1.5rem'
              }}
            >
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                color: colors.text,
                marginBottom: '1rem'
              }}>
                Key Skills
              </h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: '0.5rem'
                }}>
                  Languages
                </h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.25rem'
                }}>
                  {programmingLanguages.map((skill, index) => (
                    <TechTag key={skill} size="small">
                      {skill}
                    </TechTag>
                  ))}
                  <span style={{
                    color: colors.textSecondary,
                    fontSize: '0.75rem',
                    alignSelf: 'center'
                  }}>
                    +{programmingLanguages.length - mobileLanguages.length} más
                  </span>
                </div>
              </div>

              <div>
                <h4 style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: '0.5rem'
                }}>
                  Tools & Frameworks
                </h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.25rem'
                }}>
                  {frameworksTools.map((skill, index) => (
                    <TechTag key={skill} size="small">
                      {skill}
                    </TechTag>
                  ))}
                  <span style={{
                    color: colors.textSecondary,
                    fontSize: '0.75rem',
                    alignSelf: 'center'
                  }}>
                    +{frameworksTools.length - mobileTools.length} más
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                background: colors.surface,
                padding: '1.5rem',
                borderRadius: '12px',
                border: `1px solid ${colors.border}`,
                boxShadow: `0 4px 12px ${colors.shadow}`
              }}
            >
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                color: colors.text,
                marginBottom: '1rem'
              }}>
                Contact
              </h3>
              <div style={{ color: colors.textSecondary, lineHeight: '1.6' }}>
                <p style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <strong style={{ color: colors.text }}>Email:</strong> {t('email')}
                </p>
                <p style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <strong style={{ color: colors.text }}>Location:</strong> {t('location')}
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <a 
                    href={SOCIAL_LINKS.LINKEDIN} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: colors.primary, 
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: '500'
                    }}
                  >
                    LinkedIn
                  </a>
                  <a 
                    href={SOCIAL_LINKS.GITHUB} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: colors.primary, 
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: '500'
                    }}
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              alignItems: 'stretch'
            }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
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
                  {t('personalInformation') || 'Personal Information'}
                </h3>
                <div style={{ color: colors.textSecondary, lineHeight: '1.6' }}>
                  <p style={{ marginBottom: '1rem' }}>
                    <strong style={{ color: colors.text }}>Name:</strong> {t('fullName')}
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    <strong style={{ color: colors.text }}>Email:</strong> {t('email')}
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    <strong style={{ color: colors.text }}>Phone:</strong> {t('phone')}
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    <strong style={{ color: colors.text }}>Location:</strong> {t('location')}
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    <strong style={{ color: colors.text }}>LinkedIn:</strong> 
                    <a 
                      href={SOCIAL_LINKS.LINKEDIN} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: colors.primary, textDecoration: 'none', marginLeft: '0.5rem' }}
                    >
                      linkedin.com/in/axel-iparrea
                    </a>
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    <strong style={{ color: colors.text }}>GitHub:</strong> 
                    <a 
                      href={SOCIAL_LINKS.GITHUB} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: colors.primary, textDecoration: 'none', marginLeft: '0.5rem' }}
                    >
                      github.com/axeliparrea
                    </a>
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
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
                  {t('currentWork') || 'Current Work'}
                </h3>
                <div style={{
                  background: `${colors.primary}10`,
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: `1px solid ${colors.primary}30`
                }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: colors.text,
                    marginBottom: '0.5rem'
                  }}>
                    {currentWork.title}
                  </h4>
                  <p style={{
                    color: colors.primary,
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    {currentWork.company}
                  </p>
                  <p style={{
                    color: colors.textSecondary,
                    marginBottom: '1rem',
                    fontSize: '0.9rem'
                  }}>
                    {currentWork.period}
                  </p>
                  <p style={{
                    color: colors.textSecondary,
                    lineHeight: '1.5',
                    fontSize: '0.95rem'
                  }}>
                    {currentWork.description}
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
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
                {t('educationTitle')}
              </h3>
              <div style={{
                background: `${colors.primary}10`,
                padding: '1.5rem',
                borderRadius: '8px',
                border: `1px solid ${colors.primary}30`
              }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: '0.5rem'
                }}>
                  {education.degree}
                </h4>
                <p style={{
                  color: colors.primary,
                  marginBottom: '0.5rem',
                  fontWeight: '500'
                }}>
                  {education.university}
                </p>
                <p style={{
                  color: colors.textSecondary,
                  marginBottom: '0.5rem'
                }}>
                  {education.period} • GPA: {education.gpa}
                </p>
                <p style={{
                  color: colors.textSecondary,
                  fontSize: '0.9rem',
                  fontStyle: 'italic'
                }}>
                  {education.note}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
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
              <p style={{
                fontSize: '1.1rem',
                color: colors.textSecondary,
                lineHeight: '1.8',
                textAlign: 'center'
              }}>
                {t('aboutDescription')}
              </p>
            </motion.div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginTop: '3rem'
            }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
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
                  Programming Languages
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  {programmingLanguages.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <TechTag size="medium">
                        {skill}
                      </TechTag>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.7 }}
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
                  Frameworks & Tools
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  {frameworksTools.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <TechTag size="medium">
                        {skill}
                      </TechTag>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.8 }}
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
                  {t('languages')}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {languages.map((lang, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: `${colors.primary}10`,
                        borderRadius: '8px',
                        border: `1px solid ${colors.primary}20`
                      }}
                    >
                      <span style={{
                        color: colors.text,
                        fontWeight: '500'
                      }}>
                        {lang.name}
                      </span>
                      <span style={{
                        color: colors.textSecondary,
                        fontSize: '14px'
                      }}>
                        {lang.level}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AboutSection; 
