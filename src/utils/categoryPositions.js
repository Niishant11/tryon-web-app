/**
 * Category zones define positions and sizes for product overlays
 * Each category maps to a zone defined as fractions of canvas dimensions
 * This works on any image size - factors are relative
 */

export const CATEGORY_ZONES = {
  sunglasses: {
    xFactor: 0.5,       // center horizontally
    yFactor: 0.12,      // 12% from top (face/eye area)
    widthFactor: 0.28,  // 28% of image width
    aspectRatio: null,  // preserve product image ratio
  },
  hat: {
    xFactor: 0.5,
    yFactor: 0.02,      // very top of head
    widthFactor: 0.32,
    aspectRatio: null,
  },
  tshirt: {
    xFactor: 0.5,
    yFactor: 0.27,      // upper torso
    widthFactor: 0.60,
    aspectRatio: null,
  },
  jacket: {
    xFactor: 0.5,
    yFactor: 0.24,
    widthFactor: 0.68,
    aspectRatio: null,
  },
  pants: {
    xFactor: 0.5,
    yFactor: 0.55,      // lower half
    widthFactor: 0.55,
    aspectRatio: null,
  },
  skirt: {
    xFactor: 0.5,
    yFactor: 0.55,
    widthFactor: 0.50,
    aspectRatio: null,
  },
  shoes: {
    xFactor: 0.5,
    yFactor: 0.88,      // bottom of canvas
    widthFactor: 0.50,
    aspectRatio: null,
  },
  watch: {
    xFactor: 0.22,      // left wrist — NOT centered
    yFactor: 0.54,
    widthFactor: 0.12,
    aspectRatio: 1,     // square
  },
  bag: {
    xFactor: 0.78,      // right side
    yFactor: 0.45,
    widthFactor: 0.18,
    aspectRatio: null,
  },
};

/**
 * Get blend mode for category
 * Hard items (accessories) use source-over, clothes use multiply for natural blending
 * @param {string} category - Product category
 * @returns {string} Canvas composite operation
 */
export function getBlendForCategory(category) {
  const hardItems = ["sunglasses", "watch", "bag", "hat"];
  return hardItems.includes(category) ? "source-over" : "multiply";
}

/**
 * Get opacity/alpha value for category
 * Accessories overlay more softly; clothing more solidly
 * @param {string} category - Product category
 * @returns {number} Alpha value 0-1
 */
export function getAlphaForCategory(category) {
  const alphas = {
    sunglasses: 0.90,
    watch: 0.90,
    hat: 0.88,
    tshirt: 0.82,
    jacket: 0.82,
    pants: 0.80,
    skirt: 0.80,
    shoes: 0.85,
    bag: 0.88,
  };
  return alphas[category] ?? 0.80;
}

/**
 * Layering order for products (render in this order for correct z-index)
 * Clothes render before accessories to appear behind
 */
export const LAYER_ORDER = ["hat", "jacket", "tshirt", "pants", "skirt", "shoes", "sunglasses", "watch", "bag"];
