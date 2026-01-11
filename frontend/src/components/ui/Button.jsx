import { motion } from 'framer-motion';
import { useTheme } from '../../hook/ThemeContext';

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false,
  size = 'medium',
  fullWidth = false,
  type = 'button',
  ...props 
}) => {
  const { colors } = useTheme();

  const baseStyle = {
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'Inter, sans-serif',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1
  };

  const sizeStyles = {
    small: {
      padding: '0.5rem 1rem',
      fontSize: '0.85rem'
    },
    medium: {
      padding: '0.75rem 1.5rem',
      fontSize: '0.95rem'
    },
    large: {
      padding: '1rem 2rem',
      fontSize: '1.1rem'
    }
  };

  const variantStyles = {
    primary: {
      background: colors.primary,
      color: '#ffffff',
      boxShadow: `0 2px 8px ${colors.primary}30`,
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: `0 4px 12px ${colors.primary}40`
      }
    },
    secondary: {
      background: 'transparent',
      color: colors.text,
      border: `1px solid ${colors.border}`,
      '&:hover': {
        background: colors.primary,
        color: '#ffffff',
        borderColor: colors.primary,
        transform: 'translateY(-2px)'
      }
    },
    outline: {
      background: 'transparent',
      color: colors.primary,
      border: `2px solid ${colors.primary}`,
      '&:hover': {
        background: colors.primary,
        color: '#ffffff'
      }
    }
  };

  const style = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant]
  };

  if (disabled) {
    return (
      <button
        type={type}
        style={style}
        disabled
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      style={style}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;

