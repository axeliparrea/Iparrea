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

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
      style={{
        textAlign: align,
        marginBottom: isMobile ? '2rem' : '4rem',
        ...props.style
      }}
      {...props}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontSize: isMobile ? '1.9rem' : '2.5rem',
          fontWeight: '800',
          color: colors.text,
          marginBottom: '1rem',
          lineHeight: '1.15',
          letterSpacing: '-0.5px'
        }}
      >
        {title}
      </motion.h2>

      {showDivider && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          style={{
            width: '64px',
            height: '4px',
            background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary || colors.primary}80)`,
            margin: align === 'center' ? '0 auto' : '0',
            borderRadius: '2px',
            transformOrigin: align === 'center' ? 'center' : 'left'
          }}
        />
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontSize: isMobile ? '0.88rem' : '1.05rem',
            color: colors.textSecondary,
            marginTop: '1rem',
            maxWidth: '680px',
            margin: align === 'center' ? '1rem auto 0' : '1rem 0 0',
            lineHeight: '1.65'
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
