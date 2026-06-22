// import { useState, } from 'react';
// import {useNavigate } from 'react-router-dom';
// import { Search as SearchIcon, X } from 'lucide-react';
// import ProductCard from '../../components/ProductCard/ProductCard';
// import { products } from '../../data/products';
// import styles from './Search.module.css';

// const Search = () => {
//   // const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');

//   const categories = [...new Set(products.map(p => p.category))];

//   // useEffect(() => {
//   //   const query = searchParams.get('q') || '';
//   //   // setSearchTerm(query);
//   //   // performSearch(query);
//   // }, [searchParams]);

//   const performSearch = (term) => {
//     let results = products;
    
//     if (term) {
//       results = results.filter(p => 
//         p.name.toLowerCase().includes(term.toLowerCase()) ||
//         p.category.toLowerCase().includes(term.toLowerCase())
//       );
//     }
    
//     if (selectedCategory) {
//       results = results.filter(p => p.category === selectedCategory);
//     }
    
//     setSearchResults(results);
//   };

//   const handleSearch = () => {
//     navigate(`/search?q=${searchTerm}`);
//     performSearch(searchTerm);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const clearSearch = () => {
//     setSearchTerm('');
//     navigate('/search');
//     setSearchResults(products);
//   };

//   return (
//     <div className={styles.searchPage}>
//       <div className={styles.container}>
//         <div className={styles.searchHeader}>
//           <h1>Search Products</h1>
//           <div className={styles.searchBox}>
//             <SearchIcon size={20} />
//             <input
//               type="text"
//               placeholder="Search for products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onKeyPress={handleKeyPress}
//             />
//             {searchTerm && (
//               <button onClick={clearSearch} className={styles.clearBtn}>
//                 <X size={18} />
//               </button>
//             )}
//             <button onClick={handleSearch} className={styles.searchBtn}>
//               Search
//             </button>
//           </div>
//         </div>
        
//         <div className={styles.filters}>
//           <select 
//             value={selectedCategory} 
//             onChange={(e) => {
//               setSelectedCategory(e.target.value);
//               performSearch(searchTerm);
//             }}
//           >
//             <option value="">All Categories</option>
//             {categories.map(cat => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>
        
//         <div className={styles.results}>
//           <p className={styles.resultCount}>Found {searchResults.length} products</p>
          
//           <div className={styles.productsGrid}>
//             {searchResults.map(product => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
          
//           {searchResults.length === 0 && (
//             <div className={styles.noResults}>
//               <p>No products found matching your search.</p>
//               <button onClick={() => navigate('/products')}>Browse All Products</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;







import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, X, Filter, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import useProducts from '../../hooks/useProducts';
import styles from './Search.module.css';

const Search = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const {
    products,
    loading,
    error,
    pagination,
    searchProducts,
    getProductsByCategory,
    getFilteredProducts,
    getAllProducts,
    reset
  } = useProducts();

  // Get categories from products
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [...new Set(products.map(p => p.category))];
      setCategories(uniqueCategories);
      
      const uniqueBrands = [...new Set(products.map(p => p.brand).filter(Boolean))];
      setBrands(uniqueBrands);
    }
  }, [products]);

  // Initialize from URL params
  useEffect(() => {
    const query = searchParams.get('q') || '';
    const categoryParam = searchParams.get('category') || '';
    const brandParam = searchParams.get('brand') || '';
    const genderParam = searchParams.get('gender') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const sortParam = searchParams.get('sort') || '';
    const inStock = searchParams.get('inStock') === 'true';
    const filterParam = searchParams.get('filter') || '';

    setSearchTerm(query);
    setSelectedCategory(categoryParam);
    setSelectedBrand(brandParam);
    setSelectedGender(genderParam);
    setPriceRange({ min: minPrice, max: maxPrice });
    setSortBy(sortParam);
    setInStockOnly(inStock);

    // Perform search if query exists
    if (query) {
      performSearch(query, 1, {
        category: categoryParam,
        brand: brandParam,
        gender: genderParam,
        minPrice,
        maxPrice,
        sortBy: sortParam,
        inStock: inStock,
        filter: filterParam
      });
    } else {
      // If no search query, show all products
      getAllProducts(1, 20);
    }
  }, [searchParams]);

  // Perform search function
  const performSearch = async (term, page = 1, filters = {}) => {
    if (!term.trim() || term.trim().length < 2) {
      // If search term is too short, show all products
      await getAllProducts(page, 20);
      return;
    }

    // Build filter object
    const filterParams = {
      category: filters.category || selectedCategory || undefined,
      brand: filters.brand || selectedBrand || undefined,
      gender: filters.gender || selectedGender || undefined,
      minPrice: filters.minPrice || priceRange.min || undefined,
      maxPrice: filters.maxPrice || priceRange.max || undefined,
      sortBy: filters.sortBy || sortBy || undefined,
      inStock: filters.inStock || inStockOnly || undefined,
    };

    // Remove empty values
    Object.keys(filterParams).forEach(key => {
      if (filterParams[key] === undefined || filterParams[key] === '') {
        delete filterParams[key];
      }
    });

    // Check if it's a filter param (new, popular, featured)
    if (filters.filter === 'new') {
      filterParams.isNew = true;
    } else if (filters.filter === 'popular') {
      filterParams.isPopular = true;
    } else if (filters.filter === 'featured') {
      filterParams.isFeatured = true;
    }

    // If filters exist, use filtered search
    if (Object.keys(filterParams).length > 0) {
      await getFilteredProducts(filterParams, page, 20);
    } else {
      // Simple search
      await searchProducts(term, page, 20);
    }

    // Update URL params
    const params = { q: term };
    if (selectedCategory) params.category = selectedCategory;
    if (selectedBrand) params.brand = selectedBrand;
    if (selectedGender) params.gender = selectedGender;
    if (priceRange.min) params.minPrice = priceRange.min;
    if (priceRange.max) params.maxPrice = priceRange.max;
    if (sortBy) params.sort = sortBy;
    if (inStockOnly) params.inStock = 'true';
    setSearchParams(params);
  };

  // Handle search submission
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      performSearch(searchTerm.trim());
    } else {
      navigate('/search');
      getAllProducts(1, 20);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedBrand('');
    setSelectedGender('');
    setPriceRange({ min: '', max: '' });
    setSortBy('');
    setInStockOnly(false);
    reset();
    navigate('/search');
    getAllProducts(1, 20);
    setSearchParams({});
  };

  // Apply filters
  const applyFilters = () => {
    setShowFilters(false);
    if (searchTerm.trim()) {
      performSearch(searchTerm.trim());
    } else {
      // If no search term, use filter API
      const filterParams = {
        category: selectedCategory || undefined,
        brand: selectedBrand || undefined,
        gender: selectedGender || undefined,
        minPrice: priceRange.min || undefined,
        maxPrice: priceRange.max || undefined,
        sortBy: sortBy || undefined,
        inStock: inStockOnly || undefined,
      };
      Object.keys(filterParams).forEach(key => {
        if (filterParams[key] === undefined || filterParams[key] === '') {
          delete filterParams[key];
        }
      });
      
      if (Object.keys(filterParams).length > 0) {
        getFilteredProducts(filterParams, 1, 20);
        // Update URL
        const params = {};
        if (selectedCategory) params.category = selectedCategory;
        if (selectedBrand) params.brand = selectedBrand;
        if (selectedGender) params.gender = selectedGender;
        if (priceRange.min) params.minPrice = priceRange.min;
        if (priceRange.max) params.maxPrice = priceRange.max;
        if (sortBy) params.sort = sortBy;
        if (inStockOnly) params.inStock = 'true';
        setSearchParams(params);
      } else {
        getAllProducts(1, 20);
        setSearchParams({});
      }
    }
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (searchTerm.trim()) {
      performSearch(searchTerm.trim());
    } else {
      if (category) {
        getProductsByCategory(category, 1, 20);
        setSearchParams({ category });
      } else {
        getAllProducts(1, 20);
        setSearchParams({});
      }
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      if (searchTerm.trim()) {
        performSearch(searchTerm.trim(), newPage);
      } else {
        getAllProducts(newPage, 20);
      }
    }
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedCategory) count++;
    if (selectedBrand) count++;
    if (selectedGender) count++;
    if (priceRange.min || priceRange.max) count++;
    if (sortBy) count++;
    if (inStockOnly) count++;
    return count;
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    return (
      selectedCategory ||
      selectedBrand ||
      selectedGender ||
      priceRange.min ||
      priceRange.max ||
      sortBy ||
      inStockOnly
    );
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.container}>
        {/* Search Header */}
        <div className={styles.searchHeader}>
          <h1>Search Products</h1>
          
          <div className={styles.searchBox}>
            <SearchIcon size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for products by name, brand, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.searchInput}
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

          <div className={styles.headerActions}>
            {hasActiveFilters() && (
              <button 
                className={styles.clearFiltersBtn}
                onClick={clearSearch}
              >
                <X size={18} />
                Clear All
              </button>
            )}
            <button 
              className={styles.filterToggle}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={20} />
              Filters
              {getActiveFilterCount() > 0 && (
                <span className={styles.filterCount}>{getActiveFilterCount()}</span>
              )}
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        <div className={`${styles.filtersPanel} ${showFilters ? styles.active : ''}`}>
          <div className={styles.filtersContent}>
            <div className={styles.filtersGrid}>
              {/* Category Filter */}
              <div className={styles.filterGroup}>
                <label>Category</label>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div className={styles.filterGroup}>
                <label>Brand</label>
                <select 
                  value={selectedBrand} 
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Gender Filter */}
              <div className={styles.filterGroup}>
                <label>Gender</label>
                <select 
                  value={selectedGender} 
                  onChange={(e) => setSelectedGender(e.target.value)}
                >
                  <option value="">All Genders</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Unisex">Unisex</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              {/* Price Range */}
              <div className={styles.filterGroup}>
                <label>Price Range</label>
                <div className={styles.priceRange}>
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    min="0"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    min="0"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div className={styles.filterGroup}>
                <label>Sort By</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Rating: Highest First</option>
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              {/* Stock Filter */}
              <div className={styles.filterGroup}>
                <label>Availability</label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  In Stock Only
                </label>
              </div>
            </div>

            <div className={styles.filterActions}>
              <button 
                className={styles.applyFiltersBtn}
                onClick={applyFilters}
              >
                Apply Filters
              </button>
              <button 
                className={styles.clearAllBtn}
                onClick={clearSearch}
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className={styles.errorMessage}>
            <span>⚠️ {error}</span>
            <button onClick={() => {}}>✕</button>
          </div>
        )}

        {/* Results */}
        <div className={styles.results}>
          <div className={styles.resultHeader}>
            <p className={styles.resultCount}>
              {loading ? 'Searching...' : `Found ${pagination.total} products`}
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory && ` in ${selectedCategory}`}
            </p>
            {!loading && products.length > 0 && (
              <p className={styles.pageInfo}>
                Page {pagination.page} of {pagination.pages}
              </p>
            )}
          </div>
          
          {/* Loading More */}
          {loading && products.length > 0 && (
            <div className={styles.loadingMore}>
              <div className={styles.loaderSmall}></div>
              <p>Loading more products...</p>
            </div>
          )}

          <div className={styles.productsGrid}>
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product._id || product.id} product={product} />
              ))
            ) : (
              <div className={styles.noResults}>
                {loading ? (
                  <div className={styles.loadingContainer}>
                    <div className={styles.loader}></div>
                    <p>Searching for products...</p>
                  </div>
                ) : (
                  <>
                    <p>No products found matching your search.</p>
                    <p className={styles.noResultsHint}>
                      Try adjusting your search terms or filters
                    </p>
                    <button 
                      className={styles.browseBtn}
                      onClick={() => navigate('/products')}
                    >
                      Browse All Products
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className={styles.pagination}>
              <button 
                className={styles.pageBtn}
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1 || loading}
              >
                ◀ Previous
              </button>
              
              <div className={styles.pageNumbers}>
                {[...Array(Math.min(pagination.pages, 5))].map((_, i) => {
                  let pageNum = i + 1;
                  if (pagination.page > 3) {
                    pageNum = pagination.page - 2 + i;
                  }
                  if (pageNum <= pagination.pages) {
                    return (
                      <button
                        key={pageNum}
                        className={`${styles.pageNum} ${pageNum === pagination.page ? styles.activePage : ''}`}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={loading}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  return null;
                })}
              </div>

              <button 
                className={styles.pageBtn}
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages || loading}
              >
                Next ▶
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;