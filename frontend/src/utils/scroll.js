import { SCROLL_CONFIG } from '../config/constants';

/**
 * Smoothly scrolls to a section by ID
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {number} offset - Optional custom offset (defaults to HEADER_OFFSET)
 */
export const scrollToSection = (sectionId, offset = SCROLL_CONFIG.HEADER_OFFSET) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: SCROLL_CONFIG.BEHAVIOR
    });
  }
};

/**
 * Scrolls to top of page
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: SCROLL_CONFIG.BEHAVIOR
  });
};

