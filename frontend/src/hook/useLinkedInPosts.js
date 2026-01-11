import { useState, useEffect } from 'react';
import { fetchLinkedInPosts } from '../services/api/linkedin';
import { LINKEDIN_CAROUSEL } from '../config/constants';

export const useLinkedInPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await fetchLinkedInPosts();
        // Sort by date (newest first) and limit to configured number
        const sortedPosts = fetchedPosts
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, LINKEDIN_CAROUSEL.POSTS_TO_SHOW);
        setPosts(sortedPosts);
        setError(null);
      } catch (err) {
        setError(err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();

    // Auto-refresh interval
    const interval = setInterval(loadPosts, LINKEDIN_CAROUSEL.REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { posts, loading, error };
};

