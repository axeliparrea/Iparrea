import { useTranslation } from 'react-i18next';
import { useTheme } from '../hook/ThemeContext';
import { useLinkedInPosts } from '../hook/useLinkedInPosts';
import { useResponsive } from '../utils/responsive';
import { SOCIAL_LINKS } from '../config/constants';
import SectionHeader from './ui/SectionHeader';
import LinkedInCarousel from './LinkedInCarousel';
import Button from './ui/Button';

const LinkedInPostsSection = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { isMobile } = useResponsive();
  const { posts, loading, error } = useLinkedInPosts();

  const handlePostClick = (post) => {
    if (post.url) {
      window.open(post.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      id="linkedin-posts"
      style={{
        padding: isMobile ? '3rem 1rem' : '5rem 0',
        background: colors.background,
        borderBottom: `1px solid ${colors.border}`
      }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <SectionHeader
          title={t('linkedinPostsTitle')}
          subtitle={t('linkedinPostsSubtitle')}
          align="center"
        />

        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: colors.textSecondary }}>
            {t('loading')}
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '3rem', color: colors.textSecondary }}>
            Error loading posts. Please try again later.
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <>
            <LinkedInCarousel posts={posts} onPostClick={handlePostClick} />
            
            <div style={{
              textAlign: 'center',
              marginTop: '3rem'
            }}>
              <a
                href={SOCIAL_LINKS.LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Button variant="outline" size={isMobile ? 'small' : 'medium'}>
                  {t('linkedinViewPost')}
                </Button>
              </a>
            </div>
          </>
        )}

        {!loading && !error && posts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: colors.textSecondary
          }}>
            <p style={{ marginBottom: '1rem' }}>No posts available at the moment.</p>
            <a
              href={SOCIAL_LINKS.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button variant="primary" size={isMobile ? 'small' : 'medium'}>
                {t('linkedinViewPost')}
              </Button>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default LinkedInPostsSection;

