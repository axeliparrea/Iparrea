import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hook/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useResponsive } from '../utils/responsive';
import { experiences as experiencesData } from '../data/experiences';
import { YEAR_COLORS } from '../config/constants';
import SectionHeader from './ui/SectionHeader';
import TechTag from './ui/TechTag';

const ExperienceSection = () => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const { isMobile } = useResponsive();
  const currentLanguage = i18n.language;
  const [activeId, setActiveId] = useState(1);

  const experiences = experiencesData.map(exp => ({
    ...exp,
    title: exp.title[currentLanguage] || exp.title.en,
    description: exp.description[currentLanguage] || exp.description.en,
    learnings: exp.learnings[currentLanguage] || exp.learnings.en,
    projects: exp.projects[currentLanguage] || exp.projects.en,
    achievements: exp.achievements
      ? (exp.achievements[currentLanguage] || exp.achievements.en)
      : null
  }));

  const getYearColor = (year) => YEAR_COLORS[year] || colors.primary;
  const activeExp = experiences.find(e => e.id === activeId);

  // ─── Desktop: horizontal timeline chart (evenly distributed) ─────────────
  const DesktopTimeline = () => {
    // Sort oldest → newest for left-to-right display
    const sorted = [...experiences].sort((a, b) => {
      const yearDiff = parseInt(a.year) - parseInt(b.year);
      if (yearDiff !== 0) return yearDiff;
      return b.id - a.id; // within same year: higher id = more recent
    });

    // Even distribution — no date clustering
    const getPos = (idx) =>
      sorted.length === 1 ? 50 : (idx / (sorted.length - 1)) * 82 + 9;

    return (
      <div style={{ position: 'relative' }}>
        {/* Chart container */}
        <div style={{
          background: colors.surface,
          borderRadius: '20px',
          border: `1px solid ${colors.border}`,
          padding: '2rem 2.5rem 1.5rem',
          marginBottom: '1.5rem',
          position: 'relative',
          overflow: 'visible'
        }}>

          {/* Subtle background grid */}
          <div style={{ position: 'absolute', inset: 0, borderRadius: '20px', overflow: 'hidden', pointerEvents: 'none' }}>
            {sorted.map((_, idx) => (
              <div key={idx} style={{
                position: 'absolute',
                left: `${getPos(idx)}%`,
                top: 0, bottom: 0,
                width: '1px',
                background: `${colors.border}35`
              }} />
            ))}
          </div>

          {/* Rail area — tall enough for labels above AND below */}
          <div style={{ position: 'relative', height: '180px' }}>

            {/* Base rail */}
            <div style={{
              position: 'absolute',
              left: '9%', right: '9%',
              top: '50%', height: '3px',
              background: `linear-gradient(to right, ${getYearColor('2022')}60, ${getYearColor('2025')})`,
              borderRadius: '2px',
              transform: 'translateY(-50%)'
            }} />

            {/* Animated fill */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.23, 1, 0.32, 1] }}
              style={{
                position: 'absolute',
                left: '9%', right: '9%',
                top: '50%', height: '3px',
                background: `linear-gradient(to right, ${getYearColor('2022')}, ${getYearColor('2025')})`,
                borderRadius: '2px',
                transform: 'translateY(-50%)',
                transformOrigin: 'left center',
                zIndex: 1
              }}
            />

            {/* Nodes */}
            {sorted.map((exp, idx) => {
              const pos = getPos(idx);
              const isActive = exp.id === activeId;
              const yearColor = getYearColor(exp.year);
              const isAbove = idx % 2 === 0;
              const CONNECTOR = 36;
              const LABEL_GAP = 8;

              return (
                <motion.button
                  key={exp.id}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: 'spring', stiffness: 280, damping: 20 }}
                  whileHover={{ scale: 1.18 }}
                  onClick={() => setActiveId(exp.id)}
                  style={{
                    position: 'absolute',
                    left: `${pos}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3,
                    background: 'none', border: 'none',
                    cursor: 'pointer', padding: 0
                  }}
                >
                  {/* Connector line */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '2px',
                    height: `${CONNECTOR}px`,
                    background: `linear-gradient(${isAbove ? 'to top' : 'to bottom'}, ${yearColor}80, ${yearColor}20)`,
                    ...(isAbove ? { bottom: '100%', marginBottom: '3px' } : { top: '100%', marginTop: '3px' })
                  }} />

                  {/* Label card */}
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0.7 }}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      ...(isAbove
                        ? { bottom: `calc(100% + ${CONNECTOR + LABEL_GAP}px)` }
                        : { top: `calc(100% + ${CONNECTOR + LABEL_GAP}px)` }),
                      background: isActive ? `${yearColor}15` : `${colors.background}cc`,
                      border: `1px solid ${isActive ? yearColor + '40' : colors.border}`,
                      borderRadius: '8px',
                      padding: '0.4rem 0.65rem',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.25s ease',
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    <div style={{
                      fontSize: '11px', fontWeight: '800',
                      color: isActive ? yearColor : colors.text,
                      lineHeight: '1.2', textAlign: 'center',
                      transition: 'color 0.25s'
                    }}>
                      {exp.company}
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: isActive ? yearColor : colors.textSecondary,
                      textAlign: 'center', marginTop: '2px',
                      transition: 'color 0.25s', fontWeight: '600'
                    }}>
                      {exp.year}
                    </div>
                  </motion.div>

                  {/* Node */}
                  <motion.div
                    animate={{
                      width: isActive ? 24 : 16,
                      height: isActive ? 24 : 16,
                      boxShadow: isActive
                        ? `0 0 0 5px ${yearColor}25, 0 0 22px ${yearColor}50`
                        : `0 0 0 0px ${yearColor}00`
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      borderRadius: '50%',
                      background: isActive ? yearColor : colors.surface,
                      border: `3px solid ${yearColor}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    {isActive && (
                      <div style={{
                        width: '7px', height: '7px',
                        borderRadius: '50%', background: '#fff'
                      }} />
                    )}
                  </motion.div>
                </motion.button>
              );
            })}
          </div>

          {/* Hint */}
          <div style={{
            textAlign: 'center', marginTop: '0.25rem',
            fontSize: '11px', color: `${colors.textSecondary}60`, fontStyle: 'italic'
          }}>
            ← older · click a node · newer →
          </div>
        </div>

        {/* Detail card */}
        <AnimatePresence mode="wait">
          {activeExp && (
            <motion.div
              key={activeExp.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
              style={{
                background: colors.surface,
                borderRadius: '18px',
                padding: '2.5rem',
                border: `1px solid ${colors.border}`,
                borderLeft: `5px solid ${getYearColor(activeExp.year)}`,
                boxShadow: `0 8px 40px ${getYearColor(activeExp.year)}15`
              }}
            >
              <DetailCard exp={activeExp} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // ─── Mobile: accordion list ────────────────────────────────────────────────
  const MobileTimeline = () => (
    <div>
      {experiences.map((exp, idx) => {
        const isActive = exp.id === activeId;
        const yearColor = getYearColor(exp.year);
        return (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.45 }}
            style={{ marginBottom: '0.75rem' }}
          >
            {/* Header row */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveId(isActive ? null : exp.id)}
              style={{
                width: '100%', background: colors.surface,
                borderRadius: isActive ? '14px 14px 0 0' : '14px',
                padding: '1rem 1.2rem',
                border: `1px solid ${isActive ? yearColor + '50' : colors.border}`,
                borderLeft: `3px solid ${yearColor}`,
                cursor: 'pointer', textAlign: 'left',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', gap: '0.75rem',
                transition: 'border-radius 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: `${yearColor}18`, border: `2px solid ${yearColor}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: '11px', fontWeight: '800', color: yearColor
                }}>
                  {exp.year.slice(-2)}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontSize: '0.9rem', fontWeight: '700', color: colors.text,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                  }}>
                    {exp.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: yearColor, fontWeight: '600' }}>
                    {exp.company} · {exp.period}
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isActive ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ color: yearColor, flexShrink: 0, fontSize: '1.1rem' }}
              >
                ▼
              </motion.div>
            </motion.button>

            {/* Expanded content */}
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{
                    background: colors.surface,
                    borderRadius: '0 0 14px 14px',
                    padding: '1.2rem',
                    border: `1px solid ${yearColor}30`,
                    borderTop: 'none'
                  }}>
                    <DetailCard exp={activeExp} compact />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );

  // ─── Shared detail card ────────────────────────────────────────────────────
  const DetailCard = ({ exp, compact = false }) => {
    const yearColor = getYearColor(exp.year);
    return (
      <div>
        {!compact && (
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', marginBottom: '1.25rem',
            flexWrap: 'wrap', gap: '0.75rem'
          }}>
            <div>
              <h3 style={{
                fontSize: '1.4rem', fontWeight: '800', color: colors.text,
                marginBottom: '0.3rem'
              }}>
                {exp.title}
              </h3>
              <p style={{
                fontSize: '1rem', color: yearColor, fontWeight: '700',
                display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}>
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: yearColor, boxShadow: `0 0 8px ${yearColor}`,
                  display: 'inline-block'
                }} />
                {exp.company}
              </p>
            </div>
            <span style={{
              background: `${yearColor}15`, color: yearColor,
              padding: '0.4rem 1rem', borderRadius: '20px',
              fontSize: '0.85rem', fontWeight: '700',
              border: `1px solid ${yearColor}25`, whiteSpace: 'nowrap'
            }}>
              {exp.period}
            </span>
          </div>
        )}

        {exp.achievements && (
          <div style={{
            background: `${yearColor}10`, border: `1px solid ${yearColor}25`,
            borderRadius: '10px', padding: '0.75rem 1rem',
            marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem'
          }}>
            <span>🏆</span>
            <p style={{ fontSize: '0.86rem', color: yearColor, fontWeight: '600', margin: 0 }}>
              {exp.achievements}
            </p>
          </div>
        )}

        <p style={{
          fontSize: compact ? '0.82rem' : '0.92rem',
          color: colors.textSecondary, lineHeight: '1.65',
          marginBottom: '1.25rem',
          display: '-webkit-box', WebkitLineClamp: compact ? 4 : 3,
          WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>
          {exp.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
          {(compact ? exp.skills.slice(0, 4) : exp.skills).map((skill, i) => (
            <TechTag key={i} size={compact ? 'small' : 'medium'}>{skill}</TechTag>
          ))}
          {compact && exp.skills.length > 4 && (
            <span style={{ color: colors.textSecondary, fontSize: '0.7rem', alignSelf: 'center' }}>
              +{exp.skills.length - 4}
            </span>
          )}
        </div>

        {!compact && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
            gap: '1rem'
          }}>
            {[
              { label: 'Key Learning', text: exp.learnings },
              { label: 'Notable Work', text: exp.projects }
            ].map(({ label, text }) => (
              <div key={label} style={{
                background: colors.background, borderRadius: '10px',
                padding: '1rem', border: `1px solid ${colors.border}`
              }}>
                <h4 style={{
                  fontSize: '0.78rem', fontWeight: '800', color: colors.text,
                  marginBottom: '0.4rem', textTransform: 'uppercase',
                  letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.4rem'
                }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: yearColor, display: 'inline-block'
                  }} />
                  {label}
                </h4>
                <p style={{
                  fontSize: '0.84rem', color: colors.textSecondary,
                  lineHeight: '1.55', margin: 0,
                  display: '-webkit-box', WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      id="experience"
      style={{
        padding: isMobile ? '2.5rem 1rem' : '5.5rem 0',
        background: colors.background,
        borderBottom: `1px solid ${colors.border}`
      }}
    >
      <div className="container">
        <SectionHeader
          title={t('experienceTitle')}
          subtitle={
            isMobile
              ? t('experienceMobileSubtitle')
              : t('experienceSubtitle')
          }
          align="center"
        />

        {isMobile ? <MobileTimeline /> : <DesktopTimeline />}

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            marginTop: isMobile ? '2rem' : '3.5rem',
            padding: isMobile ? '1.75rem 1rem' : '2.5rem 2rem',
            background: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.background} 100%)`,
            borderRadius: '20px',
            border: `1px solid ${colors.border}`,
            boxShadow: `0 8px 32px ${colors.shadow}`
          }}
        >
          <div style={{
            display: 'inline-block',
            padding: '0.4rem 1.25rem',
            background: `${colors.primary}18`,
            borderRadius: '20px',
            marginBottom: '1rem',
            border: `1px solid ${colors.primary}28`
          }}>
            <span style={{ fontSize: '0.85rem', color: colors.primary, fontWeight: '700' }}>
              {t('currentStatus')}
            </span>
          </div>

          <h3 style={{
            fontSize: isMobile ? '1.2rem' : '1.6rem',
            fontWeight: '800', color: colors.text, marginBottom: '0.75rem'
          }}>
            {t('currentStatusTitle')}
          </h3>

          <div style={{
            display: 'flex', justifyContent: 'center',
            gap: isMobile ? '0.6rem' : '1.25rem',
            marginTop: '1.5rem', flexWrap: 'wrap'
          }}>
            {[
              { value: '4.0',    label: 'GPA',            color: colors.primary },
              { value: '2025',   label: 'SAP Winner',     color: YEAR_COLORS['2025'] },
              { value: '75%',    label: 'Less Human Ops', color: '#f59e0b' },
              { value: 'Cispar', label: 'Founder',        color: '#6366f1' }
            ].map(({ value, label, color }) => (
              <motion.div
                key={label}
                whileHover={{ y: -4, scale: 1.06 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  textAlign: 'center',
                  padding: isMobile ? '0.65rem 0.85rem' : '0.9rem 1.2rem',
                  background: `${color}10`,
                  borderRadius: '12px',
                  border: `1px solid ${color}22`,
                  minWidth: isMobile ? '70px' : '88px'
                }}
              >
                <div style={{
                  fontSize: isMobile ? '1.2rem' : '1.6rem',
                  fontWeight: '800', color, marginBottom: '0.25rem'
                }}>
                  {value}
                </div>
                <div style={{
                  fontSize: isMobile ? '0.62rem' : '0.75rem',
                  color: colors.textSecondary, fontWeight: '600',
                  textTransform: 'uppercase', letterSpacing: '0.3px'
                }}>
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
