/**
 * Canvas utility functions for overlay drawing and image manipulation
 */

import { CATEGORY_ZONES, getAlphaForCategory, getBlendForCategory, LAYER_ORDER } from "./categoryPositions";

/**
 * Load an image asynchronously with CORS support
 * @param {string} src - Image source URL
 * @returns {Promise<HTMLImageElement>} Loaded image
 */
const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load: ${src}`));
    img.src = src;
  });

/**
 * Main try-on rendering function
 * Draws base photo and layers products with category-based positioning
 * @param {HTMLCanvasElement} canvas - Canvas element to draw on
 * @param {string} userPhotoSrc - Source of user's photo
 * @param {Array} selectedProducts - Array of {image, category} objects
 * @returns {Promise<void>}
 */
export async function drawTryOn(canvas, userPhotoSrc, selectedProducts) {
  const ctx = canvas.getContext("2d");

  // Load and set up user photo
  const userImg = await loadImage(userPhotoSrc);
  canvas.width = userImg.width;
  canvas.height = userImg.height;

  // Draw the base photo
  ctx.drawImage(userImg, 0, 0);

  // Sort products by layer order for correct z-index
  const sorted = [...selectedProducts].sort(
    (a, b) => LAYER_ORDER.indexOf(a.category) - LAYER_ORDER.indexOf(b.category)
  );

  // Layer each product
  for (const product of sorted) {
    const zone = CATEGORY_ZONES[product.category];
    if (!zone) continue;

    const productImg = await loadImage(product.image);

    // Calculate dimensions based on zone factors
    const pw = canvas.width * zone.widthFactor;
    const ph = zone.aspectRatio
      ? pw * zone.aspectRatio
      : (productImg.height / productImg.width) * pw;

    // Calculate position (xFactor/yFactor point to CENTER of product)
    const px = canvas.width * zone.xFactor - pw / 2;
    const py = canvas.height * zone.yFactor - ph / 2;

    // Apply category-specific rendering properties
    ctx.globalAlpha = getAlphaForCategory(product.category);
    ctx.globalCompositeOperation = getBlendForCategory(product.category);
    ctx.drawImage(productImg, px, py, pw, ph);

    // Reset for next layer
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = "source-over";
  }
}

/**
 * Draw an image overlay on canvas with transformations
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {HTMLImageElement} image - Image to draw
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {number} width - Width
 * @param {number} height - Height
 * @param {number} rotation - Rotation in degrees
 * @param {number} opacity - Opacity 0-1
 */
export function drawImageOverlay(ctx, image, x, y, width, height, rotation = 0, opacity = 1) {
  ctx.save();
  ctx.globalAlpha = opacity;
  
  // Translate to position and rotate
  ctx.translate(x + width / 2, y + height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-(x + width / 2), -(y + height / 2));
  
  // Draw image
  ctx.drawImage(image, x, y, width, height);
  
  ctx.restore();
}

/**
 * Resize image to fit within max dimensions while maintaining aspect ratio
 * @param {number} width - Original width
 * @param {number} height - Original height
 * @param {number} maxWidth - Maximum width
 * @param {number} maxHeight - Maximum height
 * @returns {Object} {width, height}
 */
export function calculateFitDimensions(width, height, maxWidth, maxHeight) {
  const aspectRatio = width / height;
  
  if (width > maxWidth || height > maxHeight) {
    if (aspectRatio > maxWidth / maxHeight) {
      return {
        width: maxWidth,
        height: Math.round(maxWidth / aspectRatio),
      };
    } else {
      return {
        width: Math.round(maxHeight * aspectRatio),
        height: maxHeight,
      };
    }
  }
  
  return { width, height };
}

/**
 * Convert canvas to blob
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {string} type - MIME type (default: image/png)
 * @param {number} quality - Quality 0-1 (default: 1)
 * @returns {Promise<Blob>}
 */
export function canvasToBlob(canvas, type = 'image/png', quality = 1) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
}
