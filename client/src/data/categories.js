// data/categories.js

// Categories with high-quality 4K images - Men's & Boys Collection Only
export const categories = [
  { 
    id: 1, 
    name: "T-Shirts", 
    image: "https://i.pinimg.com/736x/99/a2/55/99a255f648b76898224f107a0d74f61d.jpg",
    description: "Premium cotton tees for men"
  },
  { 
    id: 2, 
    name: "Shirts", 
    image: "https://i.pinimg.com/736x/c6/0e/58/c60e5821c17dc6ea569ae02b7142c4ae.jpg",
    description: "Classic formal & casual shirts"
  },
  { 
    id: 3, 
    name: "Jeans", 
    image: "https://i.pinimg.com/736x/f0/e1/0d/f0e10d5084d998753fac821fc98e8edd.jpg",
    description: "Perfect denim for men"
  },
  {
    id: 4,
    name: "Jackets",
    image: "https://i.pinimg.com/1200x/51/97/4f/51974f55f087b3bcf6cf99b938d17a75.jpg",
    description: "Statement outerwear for men"
  },
  {
    id: 6,
    name: "Winter Wear",
    image: "https://i.pinimg.com/1200x/13/4c/a6/134ca6f03b41dd3b0935351548c43d2f.jpg",
    description: "Stay warm in style"
  },
  {
    id: 7,
    name: "Boys Collection",
    image: "https://i.pinimg.com/1200x/03/d7/12/03d712bd47192162d064f845eac00b49.jpg",
    description: "Stylish outfits for young boys"
  }
];

// ========== HERO SLIDER IMAGES - MEN'S & BOYS ONLY ==========
export const heroSlides = [
  {
    id: 1,
    title: "Premium T-Shirts",
    subtitle: "Everyday Comfort for Men",
    description: "Premium cotton tees crafted for comfort and style.",
    image: "https://i.pinimg.com/736x/34/f3/0e/34f30e5fbf2756c446d77f412ba0a77d.jpg",
    category: "T-Shirts",
    cta: "Explore Collection",
    tag: "Best Seller"
  },
  {
    id: 2,
    title: "Premium Shirts",
    subtitle: "Timeless Elegance for Men",
    description: "Sophisticated shirts crafted for the modern gentleman. Perfect fit, premium quality.",
    image: "https://i.pinimg.com/736x/37/9e/46/379e464f46520ae6670ec22be1add746.jpg",
    category: "Shirts",
    cta: "Explore Collection",
    tag: "New Arrival"
  },
  {
    id: 3,
    title: "Denim Collection",
    subtitle: "Perfect Fit for Every Man",
    description: "Premium denim that defines your style. Classic blues to modern washes.",
    image: "https://i.pinimg.com/1200x/2a/b7/3b/2ab73be4bdfdf469f98c49bc7e785c68.jpg",
    category: "Jeans",
    cta: "Shop Denim",
    tag: "Limited Edition"
  },
  {
    id: 4,
    title: "Statement Jackets",
    subtitle: "Make a Bold Impression",
    description: "Premium outerwear for the modern man. Style that speaks volumes.",
    image: "https://i.pinimg.com/736x/c8/5b/50/c85b50ef16702726e01a806f27357f6b.jpg",
    category: "Jackets",
    cta: "Explore Now",
    tag: "Winter Collection"
  },
  {
    id: 5,
    title: "Winter Essentials",
    subtitle: "Stay Warm, Stay Stylish",
    description: "Premium winter wear for men that doesn't compromise on style.",
    image: "https://i.pinimg.com/736x/39/b1/f5/39b1f5b747efe1596dcc796066c94fba.jpg",
    category: "Winter Wear",
    cta: "Explore Winter",
    tag: "Seasonal"
  },
  {
    id: 6,
    title: "Boys Collection",
    subtitle: "Style for the Young Gentlemen",
    description: "Premium outfits for young boys. Comfortable, stylish, perfect for every occasion.",
    image: "https://i.pinimg.com/736x/a2/b9/61/a2b961f12777c3c7f59889ee4f49ce11.jpg",
    category: "Boys",
    cta: "Shop Boys Collection",
    tag: "New Arrival"
  }
];

// Featured Products for Home Page
export const featuredProducts = [
  {
    id: 1,
    name: "Classic Cotton Tee",
    price: 24.99,
    image: "https://i.pinimg.com/736x/1c/97/a9/1c97a95062640bdff01111d34416fe66.jpg",
    category: "T-Shirts",
    rating: 4.8
  },
  {
    id: 2,
    name: "Classic Shirt",
    price: 49.99,
    image: "https://i.pinimg.com/1200x/5b/b2/b7/5bb2b71056a4a307c22f4e6b872162ea.jpg",
    category: "Shirts",
    rating: 4.9
  },
  {
    id: 3,
    name: "Slim Fit Denim Jeans",
    price: 59.99,
    image: "https://i.pinimg.com/736x/fe/94/a3/fe94a3355bafd7c6ee0670bcbf567f82.jpg",
    category: "Jeans",
    rating: 4.8
  },
  {
    id: 4,
    name: "Statement Jacket",
    price: 129.99,
    image: "https://i.pinimg.com/736x/13/4b/4b/134b4bd2e020097b6aacc615aca45f7f.jpg",
    category: "Jackets",
    rating: 4.7
  }
];

// Category Descriptions for SEO
export const categoryDescriptions = {
  "T-Shirts": "Premium t-shirts for men. Comfortable, stylish, and perfect for every occasion.",
  "Shirts": "Classic and modern shirts for men. From formal to casual - find your perfect fit.",
  "Jeans": "Premium denim jeans for men. Available in various fits and washes.",
  "Jackets": "Statement jackets for men. Perfect for every season and occasion.",
  "Winter Wear": "Stay warm and stylish with our premium winter collection for men.",
  "Boys": "Stylish outfits for young boys. Comfortable and trendy."
};

// Category Colors
export const categoryColors = {
  "T-Shirts": "#4A90D9",
  "Shirts": "#2C3E50",
  "Jeans": "#1C2833",
  "Jackets": "#2C3E50",
  "Winter Wear": "#3498DB",
  "Boys": "#F39C12"
};

// Export all
export default {
  categories,
  heroSlides,
  featuredProducts,
  categoryDescriptions,
  categoryColors
};