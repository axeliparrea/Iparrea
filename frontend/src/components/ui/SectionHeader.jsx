import { motion } from 'framer-motion';
import { useTheme } from '../../hook/ThemeContext';
import { useResponsive } from '../../utils/responsive';

const SectionHeader = ({ 
  title, 
  subtitle, 
  align = 'center',
  showDivider = true,
  ...props 
}) => {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();

  const containerStyle = {
    textAlign: align,
    marginBottom: isMobile ? '2rem' : '4rem',
    ...props.style
  };

  const titleStyle = {
    fontSize: isMobile ? '2rem' : '2.5rem',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '1rem',
    lineHeight: '1.2'
  };

  const subtitleStyle = {
    fontSize: isMobile ? '0.9rem' : '1.1rem',
    color: colors.textSecondary,
    marginTop: '1rem',
    maxWidth: '700px',
    margin: '1rem auto 0',
    lineHeight: '1.6'
  };

  const dividerStyle = {
    width: '60px',
    height: '4px',
    background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary || colors.primary})`,
    margin: '0 auto',
    borderRadius: '2px'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={containerStyle}
      {...props}
    >
      <h2 style={titleStyle}>{title}</h2>
      {showDivider && <div style={dividerStyle}></div>}
      {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
    </motion.div>
  );
};

export default SectionHeader;

