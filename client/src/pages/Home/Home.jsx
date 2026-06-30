// pages/Home/Home.jsx
import { useState, useEffect } from 'react';
import HeroSlider from '../../components/HeroSlider/HeroSlider';
import CategorySection from '../../components/CategorySection/CategorySection';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { categories } from '../../data/categories';
import useProducts from '../../hooks/useProducts';
import styles from './Home.module.css';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [tShirts, setTShirts] = useState([]);
  const [shirts, setShirts] = useState([]);
  const [jeans, setJeans] = useState([]);
  // const [jackets, setJackets] = useState([]);
  // const [recommended, setRecommended] = useState([]);
  
  const { 
    getNewArrivals, 
    getPopularProducts, 
    getProductsByCategory,
    getAllProducts,
    // eslint-disable-next-line no-unused-vars
    loading: hookLoading 
  } = useProducts();

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      
      try {
        // Fetch all data in parallel
        const [
          newArrivalsData,
          popularData,
          tShirtsData,
          shirtsData,
          jeansData,
          // jacketsData,
          // allProductsData
        ] = await Promise.all([
          getNewArrivals(1, 10),
          getPopularProducts(1, 10),
          getProductsByCategory('T-Shirts', 1, 8),
          getProductsByCategory('Shirts', 1, 8),
          getProductsByCategory('Jeans', 1, 8),
          // getProductsByCategory('Jackets', 1, 8),
          // getAllProducts(1, 8)
        ]);

        setNewArrivals(newArrivalsData || []);
        setPopularProducts(popularData || []);
        setTShirts(tShirtsData || []);
        setShirts(shirtsData || []);
        setJeans(jeansData || []);
        // setJackets(jacketsData || []);
        // setRecommended(allProductsData || []);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [getNewArrivals, getPopularProducts, getProductsByCategory, getAllProducts]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className={styles.home}>
      <HeroSlider />
      <CategorySection categories={categories} />
      
      <div className={styles.container}>        
        
        {popularProducts.length > 0 && (
          <ProductSlider 
            title="Popular Products" 
            products={popularProducts} 
            seeAllLink="/products?sort=popular"
          />
        )}
        
        {newArrivals.length > 0 && (
          <ProductSlider 
            title="New Arrivals" 
            products={newArrivals} 
            seeAllLink="/products?filter=new"
          />
        )}
      <HeroSlider />
        
        {tShirts.length > 0 && (
          <ProductSlider 
            title="T-Shirts" 
            products={tShirts} 
            seeAllLink="/products?category=T-Shirts"
          />
        )}
        
        {shirts.length > 0 && (
          <ProductSlider 
            title="Shirts" 
            products={shirts} 
            seeAllLink="/products?category=Shirts"
          />
        )}
        
        {jeans.length > 0 && (
          <ProductSlider 
            title="Jeans" 
            products={jeans} 
            seeAllLink="/products?category=Jeans"
          />
        )}

        {jeans.length > 0 && (
          <ProductSlider 
            title="Lower" 
            products={jeans} 
            seeAllLink="/products?category=Lower"
          />
        )}        

      </div>
    </div>
  );
};

export default Home;