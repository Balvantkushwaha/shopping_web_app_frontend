// export const products = [
//   // T-Shirts
//   {
//     id: 1,
//     name: "Premium Black Cotton Tee",
//     price: 29.99,
//     discount: 10,
//     category: "T-Shirts",
//     subCategory: "Men",
//     images: [
//       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
//       "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500"
//     ],
//     sizes: ["S", "M", "L", "XL"],
//     colors: ["Black", "White", "Gray"],
//     description: "Premium quality cotton t-shirt with modern fit. Breathable fabric perfect for everyday wear.",
//     rating: 4.5,
//     inStock: true,
//     isNew: true,
//     isPopular: true
//   },
//   {
//     id: 2,
//     name: "Classic White Tee",
//     price: 24.99,
//     discount: 0,
//     category: "T-Shirts",
//     subCategory: "Men",
//     images: [
//       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
//     ],
//     sizes: ["S", "M", "L", "XL"],
//     colors: ["White"],
//     description: "Classic white t-shirt made from 100% combed cotton.",
//     rating: 4.3,
//     inStock: true,
//     isNew: false,
//     isPopular: true
//   },
//   // Shirts
//   {
//     id: 3,
//     name: "Oxford Button Down Shirt",
//     price: 59.99,
//     discount: 15,
//     category: "Shirts",
//     subCategory: "Men",
//     images: [
//       "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
//       "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500"
//     ],
//     sizes: ["S", "M", "L", "XL", "XXL"],
//     colors: ["White", "Blue", "Black"],
//     description: "Classic Oxford shirt with premium cotton fabric. Perfect for formal and casual occasions.",
//     rating: 4.7,
//     inStock: true,
//     isNew: true,
//     isPopular: true
//   },
//   {
//     id: 4,
//     name: "Casual Linen Shirt",
//     price: 49.99,
//     discount: 0,
//     category: "Shirts",
//     subCategory: "Men",
//     images: [
//       "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500"
//     ],
//     sizes: ["S", "M", "L", "XL"],
//     colors: ["Beige", "Gray", "Blue"],
//     description: "Breathable linen shirt for summer days.",
//     rating: 4.4,
//     inStock: true,
//     isNew: false,
//     isPopular: false
//   },
//   // Jeans
//   {
//     id: 5,
//     name: "Slim Fit Denim Jeans",
//     price: 79.99,
//     discount: 20,
//     category: "Jeans",
//     subCategory: "Men",
//     images: [
//       "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
//       "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500"
//     ],
//     sizes: ["28", "30", "32", "34", "36"],
//     colors: ["Blue", "Black", "Gray"],
//     description: "Comfortable slim fit jeans with stretchable denim fabric.",
//     rating: 4.6,
//     inStock: true,
//     isNew: false,
//     isPopular: true
//   },
//   {
//     id: 6,
//     name: "Classic Straight Jeans",
//     price: 69.99,
//     discount: 0,
//     category: "Jeans",
//     subCategory: "Men",
//     images: [
//       "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500"
//     ],
//     sizes: ["28", "30", "32", "34", "36"],
//     colors: ["Blue", "Black"],
//     description: "Timeless straight fit jeans for everyday wear.",
//     rating: 4.5,
//     inStock: true,
//     isNew: true,
//     isPopular: false
//   },
 
//   // Pants
//   {
//     id: 11,
//     name: "Cargo Utility Pants",
//     price: 74.99,
//     discount: 15,
//     category: "Cargo Pants",
//     subCategory: "Men",
//     images: [
//       "https://images.unsplash.com/photo-1517438476316-10fd5b8b3b7b?w=500",
//       "https://images.unsplash.com/photo-1584865288642-420aafe463d2?w=500"
//     ],
//     sizes: ["30", "32", "34", "36"],
//     colors: ["Black", "Olive", "Gray"],
//     description: "Multi-pocket cargo pants with relaxed fit.",
//     rating: 4.6,
//     inStock: true,
//     isNew: true,
//     isPopular: true
//   },
//   {
//     id: 12,
//     name: "Slim Cargo Pants",
//     price: 79.99,
//     discount: 0,
//     category: "Cargo Pants",
//     subCategory: "Men",
//     images: [
//       "https://images.unsplash.com/photo-1584865288642-420aafe463d2?w=500"
//     ],
//     sizes: ["30", "32", "34"],
//     colors: ["Black", "Khaki"],
//     description: "Modern slim-fit cargo pants with tapered legs.",
//     rating: 4.4,
//     inStock: true,
//     isNew: false,
//     isPopular: false
//   }, 
  
// ];



// export const getProductsByCategory = (category) => {
//   return products.filter(product => product.category === category);
// };

// export const getNewArrivals = () => {
//   return products.filter(product => product.isNew);
// };

// export const getPopularProducts = () => {
//   return products.filter(product => product.isPopular);
// };

// export const getProductById = (id) => {
//   return products.find(product => product.id === parseInt(id));
// };