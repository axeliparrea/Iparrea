import { STATUS_COLORS } from '../../config/constants';
import { useTheme } from '../../hook/ThemeContext';

const StatusBadge = ({ 
  status, 
  size = 'medium',
  ...props 
}) => {
  const { colors } = useTheme();

  const getStatusColor = (statusText) => {
    const statusLower = statusText?.toLowerCase() || '';
    if (statusLower.includes('completed') || statusLower.includes('completado')) {
      return STATUS_COLORS.COMPLETED;
    }
    if (statusLower.includes('progress') || statusLower.includes('progreso')) {
      return STATUS_COLORS.IN_PROGRESS;
    }
    if (statusLower.includes('planning') || statusLower.includes('planeando')) {
      return STATUS_COLORS.PLANNING;
    }
    if (statusLower.includes('ongoing') || statusLower.includes('curso')) {
      return STATUS_COLORS.ONGOING;
    }
    return colors.textSecondary;
  };

  const statusColor = getStatusColor(status);

  const sizeStyles = {
    small: {
      padding: '0.2rem 0.4rem',
      fontSize: '8px',
      borderRadius: '6px'
    },
    medium: {
      padding: '0.5rem 1rem',
      fontSize: '12px',
      borderRadius: '20px'
    },
    large: {
      padding: '0.75rem 1.5rem',
      fontSize: '14px',
      borderRadius: '20px'
    }
  };

  const style = {
    background: statusColor,
    color: '#ffffff',
    fontWeight: '600',
    display: 'inline-block',
    boxShadow: `0 2px 8px ${statusColor}40`,
    ...sizeStyles[size]
  };

  return (
    <span style={style} {...props}>
      {status}
    </span>
  );
};

export default StatusBadge;

