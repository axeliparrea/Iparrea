import { useState } from 'react';
import { useTheme } from '../hook/ThemeContext';

const YouTubeVideo = ({ 
  videoId, 
  title, 
  autoplay = false, 
  showControls = true, 
  width = '100%', 
  height = 'auto',
  aspectRatio = '16:9' 
}) => {
  const { colors } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const extractVideoId = (url) => {
    if (!url) return null;
    
    if (url.length === 11 && !url.includes('/') && !url.includes('=')) {
      return url;
    }
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const validVideoId = extractVideoId(videoId);

  if (!validVideoId) {
    return (
      <div style={{
        width: width,
        aspectRatio: aspectRatio,
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.textSecondary
      }}>
        <p>Invalid YouTube video ID</p>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${validVideoId}?${new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    controls: showControls ? '1' : '0',
    modestbranding: '1',
    rel: '0',
    showinfo: '0',
    iv_load_policy: '3',
    theme: 'dark'
  })}`;

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div style={{
        width: width,
        aspectRatio: aspectRatio,
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.textSecondary
      }}>
        <p>Error loading video</p>
      </div>
    );
  }

  return (
    <div style={{
      width: width,
      position: 'relative',
      aspectRatio: aspectRatio,
      background: colors.surface,
      borderRadius: '8px',
      overflow: 'hidden',
      border: `1px solid ${colors.border}`,
      boxShadow: `0 4px 12px ${colors.primary}15`
    }}>
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: colors.surface,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: `3px solid ${colors.primary}30`,
            borderTop: `3px solid ${colors.primary}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      )}
      
      <iframe
        width="100%"
        height="100%"
        src={embedUrl}
        title={title || `YouTube video ${validVideoId}`}
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen={true}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          borderRadius: '8px',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
    </div>
  );
};

export default YouTubeVideo; 