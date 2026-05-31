/**
 * Category zones define positions and sizes for product overlays
 * Each category maps to a zone defined as fractions of canvas dimensions
 * This works on any image size - factors are relative
 */

export const CATEGORY_ZONES = {
  sunglasses: {
    xFactor: 0.5,       // center horizontally
    yFactor: 0.13,      // slightly lower for better eye alignment
    widthFactor: 0.30,  // slightly larger for prominence
    aspectRatio: null,
  },
  hat: {
    xFactor: 0.5,
    yFactor: 0.055,     // positioned slightly lower than top
    widthFactor: 0.38,  // larger for better coverage
    aspectRatio: null,
  },
  tshirt: {
    xFactor: 0.5,
    yFactor: 0.30,      // moved down a bit for better torso fit
    widthFactor: 0.62,  // slightly larger for coverage
    aspectRatio: null,
  },
  jacket: {
    xFactor: 0.5,
    yFactor: 0.28,      // aligned with upper torso
    widthFactor: 0.72,  // larger for full coverage
    aspectRatio: null,
  },
  pants: {
    xFactor: 0.5,
    yFactor: 0.58,      // lower for better hip/leg positioning
    widthFactor: 0.58,  // slightly larger
    aspectRatio: null,
  },
  skirt: {
    xFactor: 0.5,
    yFactor: 0.57,      // similar to pants but slightly higher
    widthFactor: 0.54,
    aspectRatio: null,
  },
  shoes: {
    xFactor: 0.5,
    yFactor: 0.92,      // closer to bottom for foot placement
    widthFactor: 0.54,
    aspectRatio: null,
  },
  watch: {
    xFactor: 0.20,      // left wrist position
    yFactor: 0.56,      // arm level
    widthFactor: 0.13,  // slightly larger
    aspectRatio: 1,     // square
  },
  bag: {
    xFactor: 0.80,      // right side
    yFactor: 0.48,      // hip/waist level
    widthFactor: 0.20,  // slightly larger
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
