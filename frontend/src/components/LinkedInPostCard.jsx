import { motion } from 'framer-motion';
import { useTheme } from '../hook/ThemeContext';
import { useResponsive } from '../utils/responsive';
import { formatDate, getRelativeTime } from '../utils/formatters';

const LinkedInPostCard = ({ post, onClick }) => {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();
  const currentLanguage = navigator.language || 'en-US';

  const cardStyle = {
    background: colors.surface,
    borderRadius: '16px',
    padding: isMobile ? '1rem' : '1.5rem',
    border: `1px solid ${colors.border}`,
    boxShadow: `0 4px 12px ${colors.shadow}`,
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease'
  };

  const contentStyle = {
    color: colors.text,
    fontSize: isMobile ? '0.9rem' : '1rem',
    lineHeight: '1.6',
    marginBottom: '1rem',
    flex: 1,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical'
  };

  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: '1rem',
    borderTop: `1px solid ${colors.border}`
  };

  const dateStyle = {
    fontSize: '0.75rem',
    color: colors.textSecondary
  };

  const engagementStyle = {
    display: 'flex',
    gap: '0.5rem',
    fontSize: '0.75rem',
    color: colors.textSecondary
  };

  return (
    <motion.div
      style={cardStyle}
      onClick={onClick}
      whileHover={{ 
        y: -8, 
        boxShadow: `0 8px 24px ${colors.shadow}`,
        borderColor: colors.primary
      }}
      transition={{ duration: 0.3 }}
    >
      <p style={contentStyle}>{post.content}</p>
      
      {post.image && (
        <div style={{
          width: '100%',
          height: '200px',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '1rem'
        }}>
          <img 
            src={post.image} 
            alt="LinkedIn post"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      )}

      <div style={footerStyle}>
        <span style={dateStyle}>
          {getRelativeTime(post.date, currentLanguage)}
        </span>
        {post.engagement && (
          <div style={engagementStyle}>
            {post.engagement.likes > 0 && (
              <span>👍 {post.engagement.likes}</span>
            )}
            {post.engagement.comments > 0 && (
              <span>💬 {post.engagement.comments}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LinkedInPostCard;

