import HeroSlider from '../../components/HeroSlider/HeroSlider';
import CategorySection from '../../components/CategorySection/CategorySection';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { categories } from '../../data/categories';
import { products, getNewArrivals, getPopularProducts, getProductsByCategory } from '../../data/products';
import styles from './Home.module.css';

const Home = () => {
  const newArrivals = getNewArrivals();
  const popularProducts = getPopularProducts();
  const tShirts = getProductsByCategory('T-Shirts');
  const shirts = getProductsByCategory('Shirts');
  const jeans = getProductsByCategory('Jeans');
  const jackets = getProductsByCategory('Jackets');

  return (
    <div className={styles.home}>
      <HeroSlider />
      <CategorySection categories={categories} />
      
      <div className={styles.container}>
        <ProductSlider 
          title="Recommended For You" 
          products={products.slice(0, 8)} 
        />
        
        <ProductSlider 
          title="Popular Products" 
          products={popularProducts.slice(0, 10)} 
        />
        
        <ProductSlider 
          title="New Arrivals" 
          products={newArrivals.slice(0, 10)} 
        />
        
        <ProductSlider 
          title="T-Shirts" 
          products={tShirts.slice(0, 8)} 
          seeAllLink="/products?category=T-Shirts"
        />
        
        <ProductSlider 
          title="Shirts" 
          products={shirts.slice(0, 8)} 
          seeAllLink="/products?category=Shirts"
        />
        
        <ProductSlider 
          title="Jeans" 
          products={jeans.slice(0, 8)} 
          seeAllLink="/products?category=Jeans"
        />
        
        <ProductSlider 
          title="Jackets" 
          products={jackets.slice(0, 8)} 
          seeAllLink="/products?category=Jackets"
        />
      </div>
    </div>
  );
};

export default Home;