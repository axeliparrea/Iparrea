import { motion } from 'framer-motion';
import { useTheme } from '../../hook/ThemeContext';

const TechTag = ({ 
  children, 
  variant = 'default',
  size = 'medium',
  onClick,
  ...props 
}) => {
  const { colors } = useTheme();

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    fontWeight: '500',
    border: `1px solid ${colors.primary}30`,
    transition: 'all 0.2s ease',
    cursor: onClick ? 'pointer' : 'default'
  };

  const sizeStyles = {
    small: {
      padding: '0.15rem 0.5rem',
      fontSize: '0.7rem'
    },
    medium: {
      padding: '0.25rem 0.75rem',
      fontSize: '0.8rem'
    },
    large: {
      padding: '0.5rem 1rem',
      fontSize: '0.9rem'
    }
  };

  const variantStyles = {
    default: {
      background: `${colors.primary}15`,
      color: colors.primary
    },
    filled: {
      background: colors.primary,
      color: '#ffffff',
      borderColor: colors.primary
    },
    outline: {
      background: 'transparent',
      color: colors.text,
      borderColor: colors.border
    }
  };

  const style = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant]
  };

  const Component = onClick ? motion.span : 'span';

  return (
    <Component
      style={style}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.1, background: `${colors.primary}20` } : {}}
      {...props}
    >
      {children}
    </Component>
  );
};

export default TechTag;

