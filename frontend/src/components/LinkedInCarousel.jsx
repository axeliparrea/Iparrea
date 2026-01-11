import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hook/ThemeContext';
import { useResponsive } from '../utils/responsive';
import { LINKEDIN_CAROUSEL } from '../config/constants';
import LinkedInPostCard from './LinkedInPostCard';

const LinkedInCarousel = ({ posts, onPostClick }) => {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  const visiblePosts = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(posts.length / visiblePosts);

  useEffect(() => {
    if (isAutoPlaying && posts.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, LINKEDIN_CAROUSEL.AUTO_PLAY_INTERVAL);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, posts.length, totalSlides]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const getVisiblePosts = () => {
    const start = currentIndex * visiblePosts;
    return posts.slice(start, start + visiblePosts);
  };

  if (posts.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        color: colors.textSecondary
      }}>
        No posts available
      </div>
    );
  }

  const visiblePostsList = getVisiblePosts();

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          overflow: 'hidden',
          position: 'relative'
        }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: LINKEDIN_CAROUSEL.SLIDE_DURATION / 1000 }}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${visiblePosts}, 1fr)`,
              gap: '1.5rem',
              width: '100%'
            }}
          >
            {visiblePostsList.map((post) => (
              <LinkedInPostCard
                key={post.id}
                post={post}
                onClick={() => onPostClick?.(post)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {!isMobile && posts.length > visiblePosts && (
        <>
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '-3rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: '50%',
              width: '3rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: colors.text,
              fontSize: '1.5rem',
              transition: 'all 0.3s ease',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.target.style.background = colors.primary;
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = colors.surface;
              e.target.style.color = colors.text;
            }}
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '-3rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: '50%',
              width: '3rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: colors.text,
              fontSize: '1.5rem',
              transition: 'all 0.3s ease',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.target.style.background = colors.primary;
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = colors.surface;
              e.target.style.color = colors.text;
            }}
          >
            ›
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {totalSlides > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginTop: '2rem'
        }}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              style={{
                width: currentIndex === index ? '2rem' : '0.5rem',
                height: '0.5rem',
                borderRadius: '0.25rem',
                background: currentIndex === index ? colors.primary : colors.border,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkedInCarousel;

