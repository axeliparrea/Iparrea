/**
 * Formats a date string to a readable format
 * @param {string} dateString - ISO date string
 * @param {string} locale - Locale code (default: 'en-US')
 * @returns {string} Formatted date
 */
export const formatDate = (dateString, locale = 'en-US') => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  
  return date.toLocaleDateString(locale, options);
};

/**
 * Formats a date range
 * @param {string} startDate - Start date
 * @param {string} endDate - End date or 'Present'
 * @param {string} locale - Locale code
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDate, endDate, locale = 'en-US') => {
  const start = formatDate(startDate, locale);
  const end = endDate === 'Present' || endDate === 'Presente' 
    ? (locale === 'es-ES' ? 'Presente' : 'Present')
    : formatDate(endDate, locale);
  
  return `${start} – ${end}`;
};

/**
 * Truncates text to a maximum length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength, suffix = '...') => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
};

/**
 * Formats a number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Gets relative time (e.g., "2 days ago")
 * @param {string} dateString - ISO date string
 * @param {string} locale - Locale code
 * @returns {string} Relative time string
 */
export const getRelativeTime = (dateString, locale = 'en-US') => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  
  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      const unitKey = interval === 1 ? unit : `${unit}s`;
      if (locale === 'es-ES') {
        const translations = {
          year: 'año',
          years: 'años',
          month: 'mes',
          months: 'meses',
          week: 'semana',
          weeks: 'semanas',
          day: 'día',
          days: 'días',
          hour: 'hora',
          hours: 'horas',
          minute: 'minuto',
          minutes: 'minutos'
        };
        return `hace ${interval} ${translations[unitKey]}`;
      }
      return `${interval} ${unitKey} ago`;
    }
  }
  
  return locale === 'es-ES' ? 'hace un momento' : 'just now';
};

