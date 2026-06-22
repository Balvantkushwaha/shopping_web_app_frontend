import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, Heart, Share2, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useAppDispatch } from '../../redux/hooks';
import { addToCart } from '../../redux/slices/cartSlice';
import useProducts from '../../hooks/useProducts';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getProductBySlug, getRelatedProducts, getProductById } = useProducts();

  // Fetch product on mount or slug change
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let productData;
        
        // Try to fetch by slug first
        if (slug) {
          productData = await getProductBySlug(slug);
        }
        
        // If not found by slug, try by ID
        if (!productData && slug) {
          productData = await getProductById(slug);
        }
        
        if (productData) {
          setProduct(productData);
          
          // Fetch related products
          const related = await getRelatedProducts(productData._id, 4);
          setRelatedProducts(related || []);
          
          // Set default size if available
          if (productData.sizes && productData.sizes.length > 0) {
            setSelectedSize(productData.sizes[0].size || productData.sizes[0]);
          }
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug, getProductBySlug, getProductById, getRelatedProducts]);

  // Loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className={styles.notFound}>
        <h2>Product Not Found</h2>
        <p>{error || 'The product you are looking for does not exist.'}</p>
        <button 
          className={styles.backBtn}
          onClick={() => navigate('/products')}
        >
          Browse Products
        </button>
      </div>
    );
  }

  // Calculate discounted price
  const discountedPrice = product.discount > 0 
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  // Get product images
  const getImages = () => {
    const images = [];
    if (product.coverImage) {
      images.push(product.coverImage);
    }
    if (product.images && product.images.length > 0) {
      images.push(...product.images);
    }
    return images.length > 0 ? images : ['https://via.placeholder.com/600x600?text=No+Image'];
  };

  const productImages = getImages();

  // Get sizes array
  const getSizes = () => {
    if (product.sizes && product.sizes.length > 0) {
      return product.sizes.map(s => s.size || s);
    }
    return [];
  };

  // Get colors array
  const getColors = () => {
    if (product.colors && product.colors.length > 0) {
      return product.colors;
    }
    return [];
  };

  // Get stock quantity
  const getStock = () => {
    if (product.stockQuantity !== undefined) {
      return product.stockQuantity;
    }
    if (product.sizes && product.sizes.length > 0) {
      return product.sizes.reduce((sum, s) => sum + (s.stock || 0), 0);
    }
    return 0;
  };

  const stock = getStock();
  const isInStock = stock > 0;

  // Handle add to cart
  const handleAddToCart = () => {
    if (!isInStock) {
      alert('This product is out of stock!');
      return;
    }

    const cartItem = {
      id: product._id || product.id,
      product_id: product.product_id,
      name: product.name,
      price: discountedPrice,
      image: productImages[0],
      quantity: quantity,
      size: selectedSize || 'N/A',
      slug: product.slug,
      inStock: isInStock
    };

    dispatch(addToCart(cartItem));
    
    // Show success message
    const btn = document.querySelector(`.${styles.cartBtn}`);
    if (btn) {
      btn.textContent = '✓ Added!';
      btn.style.background = '#2ecc71';
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.style.background = '';
      }, 2000);
    }
  };

  // Handle buy now
  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      navigate('/cart');
    }, 300);
  };

  // Handle wishlist
  const handleWishlist = () => {
    alert('Added to wishlist! ❤️');
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className={styles.starFilled} size={18} fill="#f39c12" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className={styles.starHalf} size={18} />);
      } else {
        stars.push(<Star key={i} className={styles.starEmpty} size={18} />);
      }
    }
    return stars;
  };

  return (
    <div className={styles.detailsPage}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <span onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span onClick={() => navigate('/products')}>Products</span>
          <span>/</span>
          <span className={styles.current}>{product.name}</span>
        </div>

        <div className={styles.productContainer}>
          {/* Image Gallery */}
          <div className={styles.imageGallery}>
            <div className={styles.mainImage}>
              <img 
                src={productImages[mainImage]} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x600?text=No+Image';
                }}
              />
              {product.discount > 0 && (
                <span className={styles.discountBadge}>-{product.discount}%</span>
              )}
              {!isInStock && (
                <div className={styles.outOfStockOverlay}>
                  <span>Out of Stock</span>
                </div>
              )}
            </div>
            
            {productImages.length > 1 && (
              <div className={styles.thumbnails}>
                {productImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`${styles.thumbnail} ${idx === mainImage ? styles.active : ''}`}
                    onClick={() => setMainImage(idx)}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className={styles.productInfo}>
            {/* Category & Brand */}
            <div className={styles.meta}>
              <span className={styles.category}>{product.category}</span>
              {product.brand && (
                <span className={styles.brand}>• {product.brand}</span>
              )}
            </div>

            <h1 className={styles.name}>{product.name}</h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className={styles.ratingSection}>
                <div className={styles.stars}>
                  {renderStars(product.rating)}
                </div>
                <span className={styles.ratingText}>
                  {product.rating.toFixed(1)} ({product.totalReviews || 0} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className={styles.priceSection}>
              <span className={styles.currentPrice}>₹{discountedPrice.toFixed(2)}</span>
              {product.discount > 0 && (
                <>
                  <span className={styles.originalPrice}>₹{product.price.toFixed(2)}</span>
                  <span className={styles.discount}>Save {product.discount}%</span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className={styles.stockStatus}>
              {isInStock ? (
                <span className={styles.inStock}>✓ In Stock</span>
              ) : (
                <span className={styles.outOfStock}>✕ Out of Stock</span>
              )}
              {isInStock && stock < 10 && (
                <span className={styles.lowStock}>⚠️ Only {stock} left!</span>
              )}
            </div>

            {/* Description */}
            <p className={styles.description}>{product.description}</p>

            {/* Key Features */}
            <div className={styles.features}>
              {product.material && (
                <div className={styles.feature}>
                  <span className={styles.featureLabel}>Material:</span>
                  <span>{product.material}</span>
                </div>
              )}
              {product.fit && (
                <div className={styles.feature}>
                  <span className={styles.featureLabel}>Fit:</span>
                  <span>{product.fit}</span>
                </div>
              )}
              {product.gender && (
                <div className={styles.feature}>
                  <span className={styles.featureLabel}>Gender:</span>
                  <span>{product.gender}</span>
                </div>
              )}
            </div>

            {/* Size Selection */}
            {getSizes().length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h3>Select Size</h3>
                  <button className={styles.sizeGuide}>Size Guide</button>
                </div>
                <div className={styles.sizes}>
                  {getSizes().map((size, index) => (
                    <button
                      key={index}
                      className={`${styles.sizeBtn} ${selectedSize === size ? styles.active : ''}`}
                      onClick={() => setSelectedSize(size)}
                      disabled={!isInStock}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {getColors().length > 0 && (
              <div className={styles.section}>
                <h3>Select Color</h3>
                <div className={styles.colors}>
                  {getColors().map((color, index) => (
                    <button
                      key={index}
                      className={`${styles.colorBtn} ${selectedColor === color ? styles.active : ''}`}
                      style={{ 
                        backgroundColor: color.toLowerCase(),
                        border: selectedColor === color ? '3px solid #667eea' : '2px solid #dee2e6'
                      }}
                      onClick={() => setSelectedColor(color)}
                      disabled={!isInStock}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className={styles.section}>
              <h3>Quantity</h3>
              <div className={styles.quantity}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!isInStock}
                >
                  <Minus size={16} />
                </button>
                <span>{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                  disabled={!isInStock || quantity >= stock}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
              <button 
                className={styles.cartBtn} 
                onClick={handleAddToCart}
                disabled={!isInStock}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button 
                className={styles.buyBtn} 
                onClick={handleBuyNow}
                disabled={!isInStock}
              >
                Buy Now
              </button>
              <button 
                className={styles.wishlistBtn} 
                onClick={handleWishlist}
              >
                <Heart size={20} />
              </button>
              <button 
                className={styles.shareBtn} 
                onClick={handleShare}
              >
                <Share2 size={20} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className={styles.trustBadges}>
              <div className={styles.trustItem}>
                <Truck size={18} />
                <span>Free Shipping</span>
              </div>
              <div className={styles.trustItem}>
                <Shield size={18} />
                <span>Secure Payment</span>
              </div>
              <div className={styles.trustItem}>
                <RotateCcw size={18} />
                <span>7-Day Returns</span>
              </div>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className={styles.tags}>
                <span className={styles.tagsLabel}>Tags:</span>
                {product.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className={styles.relatedProducts}>
            <h2 className={styles.relatedTitle}>You May Also Like</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((related) => (
                <div 
                  key={related._id} 
                  className={styles.relatedCard}
                  onClick={() => navigate(`/product/${related.slug || related._id}`)}
                >
                  <div className={styles.relatedImage}>
                    <img 
                      src={related.coverImage || 'https://via.placeholder.com/300x300?text=No+Image'} 
                      alt={related.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                      }}
                    />
                    {related.discount > 0 && (
                      <span className={styles.relatedDiscount}>-{related.discount}%</span>
                    )}
                  </div>
                  <h3 className={styles.relatedName}>{related.name}</h3>
                  <p className={styles.relatedCategory}>{related.category}</p>
                  <div className={styles.relatedPrice}>
                    <span className={styles.relatedCurrent}>
                      ₹{(related.finalPrice || related.price).toFixed(2)}
                    </span>
                    {related.discount > 0 && (
                      <span className={styles.relatedOriginal}>
                        ₹{related.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;