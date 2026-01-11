import { useTranslation } from 'react-i18next';
import { useTheme } from '../hook/ThemeContext';
import { motion } from 'framer-motion';
import { useResponsive } from '../utils/responsive';
import { experiences as experiencesData, mobileExperiences as mobileExperiencesData } from '../data/experiences';
import { YEAR_COLORS } from '../config/constants';
import SectionHeader from './ui/SectionHeader';
import TechTag from './ui/TechTag';

const ExperienceSection = () => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const { isMobile } = useResponsive();
  const currentLanguage = i18n.language;


  // Map experiences data with translations
  const experiences = experiencesData.map(exp => ({
    ...exp,
    title: exp.title[currentLanguage] || exp.title.en,
    description: exp.description[currentLanguage] || exp.description.en,
    learnings: exp.learnings[currentLanguage] || exp.learnings.en,
    projects: exp.projects[currentLanguage] || exp.projects.en
  }));

  const mobileExperiences = mobileExperiencesData.map(exp => ({
    ...exp,
    title: exp.title[currentLanguage] || exp.title.en,
    keyPoint: exp.keyPoint || exp.description[currentLanguage] || exp.description?.en || ''
  }));

  const getYearColor = (year) => {
    return YEAR_COLORS[year] || colors.primary;
  };


  const DesktopExperience = ({ exp, index }) => (
    <motion.div
      initial={{ opacity: 1, x: 0 }}
      style={{
        background: colors.surface,
        borderRadius: '16px',
        padding: '2.5rem',
        marginBottom: '3rem',
        marginLeft: '4rem',
        border: `1px solid ${colors.border}`,
        boxShadow: `0 8px 32px ${colors.primary}15`,
        position: 'relative'
      }}
    >
      
      <div
        style={{
          position: 'absolute',
          left: '-3.5rem',
          top: '2.5rem',
          width: '2.5rem',
          height: '2.5rem',
          backgroundColor: getYearColor(exp.year),
          borderRadius: '50%',
          border: `4px solid ${colors.background}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.9rem',
          fontWeight: '700',
          color: '#ffffff',
          zIndex: 2,
          boxShadow: `0 4px 15px ${getYearColor(exp.year)}40`
        }}
      >
        {exp.year.slice(-2)}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: colors.text,
            marginBottom: '0.5rem'
          }}>
            {exp.title}
          </h3>
          <p style={{
            fontSize: '1.1rem',
            color: getYearColor(exp.year),
            fontWeight: '500',
            marginBottom: '0.5rem'
          }}>
            {exp.company}
          </p>
        </div>
        
        <span style={{
          background: `${getYearColor(exp.year)}20`,
          color: getYearColor(exp.year),
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.9rem',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          border: `1px solid ${getYearColor(exp.year)}30`
        }}>
          {exp.period}
        </span>
      </div>

      <p style={{
        fontSize: '1rem',
        color: colors.textSecondary,
        lineHeight: '1.6',
        marginBottom: '2rem'
      }}>
        {exp.description}
      </p>

      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '2rem'
      }}>
        {exp.skills.map((skill, skillIndex) => (
          <TechTag key={skillIndex} size="medium">
            {skill}
          </TechTag>
        ))}
      </div>

      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem'
      }}>
        <div>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: colors.text,
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: getYearColor(exp.year),
              borderRadius: '50%'
            }}></div>
            Key Learning
          </h4>
          <p style={{
            fontSize: '0.9rem',
            color: colors.textSecondary,
            lineHeight: '1.6'
          }}>
            {exp.learnings}
          </p>
        </div>

        <div>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: colors.text,
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: getYearColor(exp.year),
              borderRadius: '50%'
            }}></div>
            Notable Projects
          </h4>
          <p style={{
            fontSize: '0.9rem',
            color: colors.textSecondary,
            lineHeight: '1.6'
          }}>
            {exp.projects}
          </p>
        </div>
      </div>
    </motion.div>
  );


  const MobileExperience = ({ exp, index }) => (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      style={{
        background: colors.surface,
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        border: `1px solid ${colors.border}`,
        boxShadow: `0 4px 12px ${colors.shadow}`,
        position: 'relative'
      }}
    >
      
      <div
        style={{
          position: 'absolute',
          left: '-1.5rem',
          top: '1rem',
          width: '1.8rem',
          height: '1.8rem',
          backgroundColor: getYearColor(exp.year),
          borderRadius: '50%',
          border: `3px solid ${colors.background}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.7rem',
          fontWeight: '700',
          color: '#ffffff',
          zIndex: 2
        }}
      >
        {exp.year.slice(-2)}
      </div>

      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '0.75rem'
      }}>
        <div style={{ flex: 1, paddingRight: '0.5rem' }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: colors.text,
            marginBottom: '0.25rem',
            lineHeight: '1.2'
          }}>
            {exp.title}
          </h3>
          <p style={{
            fontSize: '0.85rem',
            color: getYearColor(exp.year),
            fontWeight: '500'
          }}>
            {exp.company}
          </p>
        </div>
        
        <span style={{
          background: `${getYearColor(exp.year)}20`,
          color: getYearColor(exp.year),
          padding: '0.25rem 0.5rem',
          borderRadius: '12px',
          fontSize: '0.7rem',
          fontWeight: '600',
          whiteSpace: 'nowrap'
        }}>
          {exp.period}
        </span>
      </div>

      
      <p style={{
        fontSize: '0.85rem',
        color: colors.textSecondary,
        lineHeight: '1.4',
        marginBottom: '0.75rem'
      }}>
        {exp.keyPoint}
      </p>

      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.25rem'
      }}>
        {exp.skills.slice(0, 3).map((skill, skillIndex) => (
          <TechTag key={skillIndex} size="small">
            {skill}
          </TechTag>
        ))}
        {exp.skills.length > 3 && (
          <span style={{
            color: colors.textSecondary,
            fontSize: '0.7rem',
            alignSelf: 'center'
          }}>
            +{exp.skills.length - 3} más
          </span>
        )}
      </div>
    </motion.div>
  );

  return (
    <section
      id="experience"
      style={{
        padding: isMobile ? '2rem 1rem' : '5rem 0',
        background: colors.background,
        borderBottom: `1px solid ${colors.border}`
      }}
    >
      <div className="container">
        <SectionHeader
          title={t('experienceTitle')}
          subtitle={isMobile ? t('experienceMobileSubtitle') : t('experienceSubtitle')}
          align="center"
        />

        
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative'
        }}>
          
          {!isMobile && (
            <motion.div
              initial={{ height: '100%' }}
              style={{
                position: 'absolute',
                left: '0.5rem',
                top: '0',
                width: '2px',
                height: '100%',
                background: `linear-gradient(to bottom, ${colors.primary}90, ${colors.primary}30)`,
                zIndex: 1,
                borderRadius: '2px'
              }}
            ></motion.div>
          )}

          
          {isMobile ? 
            mobileExperiences.map((exp, index) => (
              <MobileExperience key={exp.id} exp={exp} index={index} />
            )) :
            experiences.map((exp, index) => (
              <DesktopExperience key={exp.id} exp={exp} index={index} />
            ))
          }
        </div>

        
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          style={{
            textAlign: 'center',
            marginTop: isMobile ? '2rem' : '4rem',
            padding: isMobile ? '2rem 1rem' : '3rem 2rem',
            background: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.background} 100%)`,
            borderRadius: '20px',
            border: `1px solid ${colors.border}`,
            boxShadow: `0 8px 32px ${colors.shadow}`
          }}
        >
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1.5rem',
            background: `${colors.primary}20`,
            borderRadius: '20px',
            marginBottom: '1rem',
            border: `1px solid ${colors.primary}30`
          }}>
            <span style={{
              fontSize: '0.9rem',
              color: colors.primary,
              fontWeight: '600'
            }}>
              {t('currentStatus')}
            </span>
          </div>
          
          <h3 style={{
            fontSize: isMobile ? '1.3rem' : '1.8rem',
            fontWeight: '600',
            color: colors.text,
            marginBottom: '1rem'
          }}>
            {t('currentStatusTitle')}
          </h3>
          
          <p style={{
            fontSize: isMobile ? '0.9rem' : '1.1rem',
            color: colors.textSecondary,
            lineHeight: '1.6',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {isMobile ? t('currentStatusMobileDescription') : t('currentStatusDescription')}
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? '1rem' : '2rem',
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              textAlign: 'center',
              padding: isMobile ? '0.75rem' : '1rem',
              background: `${colors.primary}10`,
              borderRadius: '12px',
              border: `1px solid ${colors.primary}20`
            }}>
              <div style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: '700',
                color: colors.primary,
                marginBottom: '0.5rem'
              }}>
                4.0
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: colors.textSecondary,
                fontWeight: '500'
              }}>
                GPA
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: isMobile ? '0.75rem' : '1rem',
              background: `${colors.primary}10`,
              borderRadius: '12px',
              border: `1px solid ${colors.primary}20`
            }}>
              <div style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: '700',
                color: colors.primary,
                marginBottom: '0.5rem'
              }}>
                2025
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: colors.textSecondary,
                fontWeight: '500'
              }}>
                SAP Winner
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: isMobile ? '0.75rem' : '1rem',
              background: `${colors.primary}10`,
              borderRadius: '12px',
              border: `1px solid ${colors.primary}20`
            }}>
              <div style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: '700',
                color: colors.primary,
                marginBottom: '0.5rem'
              }}>
                2025
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: colors.textSecondary,
                fontWeight: '500'
              }}>
                ESAB Engineer
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection; 
