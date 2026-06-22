// /* eslint-disable react-hooks/set-state-in-effect */
// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import ProductCard from '../../components/ProductCard/ProductCard';
// import { products } from '../../data/products';
// import { Search, Filter } from 'lucide-react';
// import styles from './Products.module.css';
  
// const Products = () => {
//   const [searchParams] = useSearchParams();
//   const [filteredProducts, setFilteredProducts] = useState(products);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [sortBy, setSortBy] = useState('');
//   const [showFilters, setShowFilters] = useState(false);

//   const categories = [...new Set(products.map(p => p.category))];

//   useEffect(() => {
//     const categoryParam = searchParams.get('category');
//     if (categoryParam) {
//       setSelectedCategory(categoryParam);
//     }
//   }, [searchParams]);

//   useEffect(() => {
//     let result = [...products];

//     if (searchTerm) {
//       result = result.filter(p => 
//         p.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (selectedCategory) {
//       result = result.filter(p => p.category === selectedCategory);
//     }

//     if (sortBy === 'price-asc') {
//       result.sort((a, b) => a.price - b.price);
//     } else if (sortBy === 'price-desc') {
//       result.sort((a, b) => b.price - a.price);
//     } else if (sortBy === 'name-asc') {
//       result.sort((a, b) => a.name.localeCompare(b.name));
//     }

//     setFilteredProducts(result);
//   }, [searchTerm, selectedCategory, sortBy]);

//   return (
//     <div className={styles.productsPage}>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <h1>All Products</h1>
//           <button 
//             className={styles.filterToggle}
//             onClick={() => setShowFilters(!showFilters)}
//           >
//             <Filter size={20} />
//             Filters
//           </button>
//         </div>

//         <div className={`${styles.filters} ${showFilters ? styles.active : ''}`}>
//           <div className={styles.searchBar}>
//             <Search size={20} />
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <div className={styles.filterGroup}>
//             <label>Category</label>
//             <select 
//               value={selectedCategory} 
//               onChange={(e) => setSelectedCategory(e.target.value)}
//             >
//               <option value="">All Categories</option>
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>
//           </div>

//           <div className={styles.filterGroup}>
//             <label>Sort By</label>
//             <select 
//               value={sortBy} 
//               onChange={(e) => setSortBy(e.target.value)}
//             >
//               <option value="">Default</option>
//               <option value="price-asc">Price: Low to High</option>
//               <option value="price-desc">Price: High to Low</option>
//               <option value="name-asc">Name: A to Z</option>
//             </select>
//           </div>
//         </div>

//         <div className={styles.productsGrid}>
//           {filteredProducts.map(product => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>

//         {filteredProducts.length === 0 && (
//           <div className={styles.noResults}>
//             <p>No products found</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Products;



/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import useProducts from '../../hooks/useProducts';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import styles from './Products.module.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isNewOnly, setIsNewOnly] = useState(false);
  const [isPopularOnly, setIsPopularOnly] = useState(false);

  const {
    products,
    loading,
    error,
    pagination,
    getAllProducts,
    getProductsByCategory,
    searchProducts,
    getFilteredProducts,
    reset
  } = useProducts();

  // Available options from API
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [genders, setGenders] = useState(['Men', 'Women', 'Unisex', 'Kids']);
  const [sizes, setSizes] = useState(['XS', 'S', 'M', 'L', 'XL', 'XXL']);

  // Extract categories from products
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
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    const sortParam = searchParams.get('sort');
    const filterParam = searchParams.get('filter');

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (searchParam) {
      setSearchTerm(searchParam);
    }
    if (sortParam) {
      setSortBy(sortParam);
    }
    if (filterParam === 'new') {
      setIsNewOnly(true);
    } else if (filterParam === 'popular') {
      setIsPopularOnly(true);
    }
  }, [searchParams]);

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      // Build filter object
      const filters = {
        category: selectedCategory || undefined,
        brand: selectedBrand || undefined,
        gender: selectedGender || undefined,
        size: selectedSize || undefined,
        minPrice: priceRange.min ? parseFloat(priceRange.min) : undefined,
        maxPrice: priceRange.max ? parseFloat(priceRange.max) : undefined,
        inStock: inStockOnly || undefined,
        isNew: isNewOnly || undefined,
        isPopular: isPopularOnly || undefined,
        sortBy: sortBy || undefined,
      };

      // Remove empty values
      Object.keys(filters).forEach(key => {
        if (filters[key] === undefined || filters[key] === '') {
          delete filters[key];
        }
      });

      // If search term exists, use search API
      if (searchTerm.trim()) {
        await searchProducts(searchTerm, 1, 20);
      } 
      // If category exists, use category API
      else if (selectedCategory) {
        await getProductsByCategory(selectedCategory, 1, 20);
      }
      // If filters exist, use filter API
      else if (Object.keys(filters).length > 0) {
        await getFilteredProducts(filters, 1, 20);
      }
      // Otherwise get all products
      else {
        await getAllProducts(1, 20);
      }

      // Update URL params
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (searchTerm.trim()) params.search = searchTerm;
      if (sortBy) params.sort = sortBy;
      if (isNewOnly) params.filter = 'new';
      else if (isPopularOnly) params.filter = 'popular';
      setSearchParams(params);
    };

    fetchProducts();
  }, [
    searchTerm,
    selectedCategory,
    sortBy,
    selectedBrand,
    selectedGender,
    selectedSize,
    priceRange.min,
    priceRange.max,
    inStockOnly,
    isNewOnly,
    isPopularOnly,
    getProductsByCategory,
    searchProducts,
    getFilteredProducts,
    getAllProducts,
    setSearchParams
  ]);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is triggered by useEffect
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('');
    setSelectedBrand('');
    setSelectedGender('');
    setSelectedSize('');
    setPriceRange({ min: '', max: '' });
    setInStockOnly(false);
    setIsNewOnly(false);
    setIsPopularOnly(false);
    setShowFilters(false);
    reset();
    getAllProducts(1, 20);
    setSearchParams({});
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      // Re-fetch with current filters on new page
      const fetchPage = async () => {
        const filters = {
          category: selectedCategory || undefined,
          brand: selectedBrand || undefined,
          gender: selectedGender || undefined,
          size: selectedSize || undefined,
          minPrice: priceRange.min ? parseFloat(priceRange.min) : undefined,
          maxPrice: priceRange.max ? parseFloat(priceRange.max) : undefined,
          inStock: inStockOnly || undefined,
          isNew: isNewOnly || undefined,
          isPopular: isPopularOnly || undefined,
          sortBy: sortBy || undefined,
        };
        Object.keys(filters).forEach(key => {
          if (filters[key] === undefined || filters[key] === '') {
            delete filters[key];
          }
        });

        if (searchTerm.trim()) {
          await searchProducts(searchTerm, newPage, 20);
        } else if (selectedCategory) {
          await getProductsByCategory(selectedCategory, newPage, 20);
        } else if (Object.keys(filters).length > 0) {
          await getFilteredProducts(filters, newPage, 20);
        } else {
          await getAllProducts(newPage, 20);
        }
      };
      fetchPage();
    }
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    return (
      searchTerm ||
      selectedCategory ||
      sortBy ||
      selectedBrand ||
      selectedGender ||
      selectedSize ||
      priceRange.min ||
      priceRange.max ||
      inStockOnly ||
      isNewOnly ||
      isPopularOnly
    );
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedCategory) count++;
    if (selectedBrand) count++;
    if (selectedGender) count++;
    if (selectedSize) count++;
    if (priceRange.min || priceRange.max) count++;
    if (inStockOnly) count++;
    if (isNewOnly) count++;
    if (isPopularOnly) count++;
    if (sortBy) count++;
    return count;
  };

  if (loading && products.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className={styles.productsPage}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1>All Products</h1>
            {!loading && (
              <p className={styles.subtitle}>
                {pagination.total} products found
                {selectedCategory && ` in ${selectedCategory}`}
              </p>
            )}
          </div>
          <div className={styles.headerActions}>
            {hasActiveFilters() && (
              <button 
                className={styles.clearFiltersBtn}
                onClick={clearAllFilters}
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
            {/* Search */}
            <div className={styles.filterSection}>
              <div className={styles.searchBar}>
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search products by name, brand, category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className={styles.clearSearch}
                    onClick={() => setSearchTerm('')}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

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
                  {genders.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>

              {/* Size Filter */}
              <div className={styles.filterGroup}>
                <label>Size</label>
                <select 
                  value={selectedSize} 
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">All Sizes</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
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

              {/* Checkbox Filters */}
              <div className={styles.filterGroup}>
                <label>Product Flags</label>
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                    />
                    In Stock Only
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={isNewOnly}
                      onChange={(e) => setIsNewOnly(e.target.checked)}
                    />
                    New Arrivals
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={isPopularOnly}
                      onChange={(e) => setIsPopularOnly(e.target.checked)}
                    />
                    Popular Products
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.filterActions}>
              <button 
                className={styles.applyFiltersBtn}
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </button>
              <button 
                className={styles.clearAllBtn}
                onClick={clearAllFilters}
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

        {/* Products Grid */}
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
              <p>No products found</p>
              {hasActiveFilters() && (
                <p className={styles.noResultsHint}>
                  Try adjusting your filters or search terms
                </p>
              )}
              <button 
                className={styles.clearAllBtn}
                onClick={clearAllFilters}
              >
                Clear All Filters
              </button>
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
                // Show middle pages if near end
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
  );
};

export default Products;


