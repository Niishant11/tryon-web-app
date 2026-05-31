export const mockProducts = [
  {
    id: 1,
    name: "Denim Jacket",
    category: "jacket",
    image: "/products/jacket.webp",
    price: 5999,

    overlay: {
      x: 170,
      y: 130,
      width: 680
    }
  },

  {
    id: 2,
    name: "Modern Jacket V2",
    category: "jacket",
    image: "/products/jacket 2.jpg",
    price: 6299,

    overlay: {
      x: 150,
      y: 110,
      width: 720
    }
  },

  {
    id: 3,
    name: "White Oversized T-Shirt",
    category: "tshirt",
    image: "/products/white tshart.webp",
    price: 799,

    overlay: {
      x: 220,
      y: 180,
      width: 590
    }
  },

  {
    id: 4,
    name: "Classic Black Pants",
    category: "pants",
    image: "/products/pants.webp",
    price: 2499,

    overlay: {
      x: 305,
      y: 520,
      width: 420
    }
  },

  {
    id: 5,
    name: "Bucket Hat",
    category: "hat",
    image: "/products/hat.webp",
    price: 699,

    overlay: {
      x: 280,
      y: 20,
      width: 460
    }
  },

  {
    id: 6,
    name: "Watch",
    category: "watch",
    image: "/products/watch.webp",
    price: 8999,

    overlay: {
      x: 195,
      y: 620,
      width: 95
    }
  },

  {
    id: 7,
    name: "Watch V2",
    category: "watch",
    image: "/products/watch 2.webp",
    price: 9999,

    overlay: {
      x: 195,
      y: 620,
      width: 95
    }
  },

  {
    id: 8,
    name: "Green Check Shirt",
    category: "shirt",
    image: "/products/Shirt.png",
    price: 999,

    overlay: {
      x: 190,
      y: 150,
      width: 640
    }
  },

  {
    id: 9,
    name: "Aviator Sunglasses",
    category: "sunglasses",
    image: "/products/Sunglasses.webp",
    price: 1299,

    overlay: {
      x: 350,
      y: 255,
      width: 320
    }
  },

  {
    id: 10,
    name: "Premium Sunglasses",
    category: "sunglasses",
    image: "/products/sunglasses 2.webp",
    price: 1599,

    overlay: {
      x: 345,
      y: 255,
      width: 335
    }
  }
];

/**
 * Get the sample/model image path
 * Used for initial try-on preview
 */
export const SAMPLE_MODEL_IMAGE = '/models/Model Image.png';

// Export mockProducts as PRODUCTS for compatibility
export const PRODUCTS = mockProducts;
