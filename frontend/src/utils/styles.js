/**
 * Generates a gradient background style
 * @param {string} color1 - First color
 * @param {string} color2 - Second color
 * @param {string} direction - Gradient direction (default: '135deg')
 * @returns {string} CSS gradient string
 */
export const createGradient = (color1, color2, direction = '135deg') => {
  return `linear-gradient(${direction}, ${color1} 0%, ${color2} 100%)`;
};

/**
 * Adds opacity to a hex color
 * @param {string} hex - Hex color (e.g., '#00cc6a')
 * @param {number} opacity - Opacity value 0-1
 * @returns {string} RGBA color string
 */
export const addOpacity = (hex, opacity) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Creates a box shadow with color
 * @param {string} color - Shadow color
 * @param {number} opacity - Opacity (0-1)
 * @param {number} blur - Blur radius
 * @param {number} spread - Spread radius
 * @param {number} x - X offset
 * @param {number} y - Y offset
 * @returns {string} CSS box-shadow string
 */
export const createShadow = (color, opacity = 0.3, blur = 8, spread = 0, x = 0, y = 4) => {
  const rgba = addOpacity(color, opacity);
  return `${x}px ${y}px ${blur}px ${spread}px ${rgba}`;
};

/**
 * Gets responsive font size using clamp
 * @param {number} min - Minimum size in rem
 * @param {number} preferred - Preferred size in vw
 * @param {number} max - Maximum size in rem
 * @returns {string} CSS clamp string
 */
export const responsiveFontSize = (min, preferred, max) => {
  return `clamp(${min}rem, ${preferred}vw, ${max}rem)`;
};

/**
 * Creates a backdrop blur style
 * @param {number} blur - Blur amount in px
 * @param {string} background - Background color with opacity
 * @returns {object} Style object
 */
export const createBackdrop = (blur = 20, background = 'rgba(17, 17, 17, 0.8)') => {
  return {
    background,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`
  };
};

