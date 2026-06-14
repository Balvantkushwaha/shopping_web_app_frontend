import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data/products';
import styles from './Search.module.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [...new Set(products.map(p => p.category))];

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchTerm(query);
    performSearch(query);
  }, [searchParams]);

  const performSearch = (term) => {
    let results = products;
    
    if (term) {
      results = results.filter(p => 
        p.name.toLowerCase().includes(term.toLowerCase()) ||
        p.category.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      results = results.filter(p => p.category === selectedCategory);
    }
    
    setSearchResults(results);
  };

  const handleSearch = () => {
    navigate(`/search?q=${searchTerm}`);
    performSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    navigate('/search');
    setSearchResults(products);
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.container}>
        <div className={styles.searchHeader}>
          <h1>Search Products</h1>
          <div className={styles.searchBox}>
            <SearchIcon size={20} />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {searchTerm && (
              <button onClick={clearSearch} className={styles.clearBtn}>
                <X size={18} />
              </button>
            )}
            <button onClick={handleSearch} className={styles.searchBtn}>
              Search
            </button>
          </div>
        </div>
        
        <div className={styles.filters}>
          <select 
            value={selectedCategory} 
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              performSearch(searchTerm);
            }}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className={styles.results}>
          <p className={styles.resultCount}>Found {searchResults.length} products</p>
          
          <div className={styles.productsGrid}>
            {searchResults.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {searchResults.length === 0 && (
            <div className={styles.noResults}>
              <p>No products found matching your search.</p>
              <button onClick={() => navigate('/products')}>Browse All Products</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;