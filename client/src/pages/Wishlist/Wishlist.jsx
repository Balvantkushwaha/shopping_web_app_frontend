import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import { Heart, ShoppingCart, Trash2, ShoppingBag } from 'lucide-react';
import styles from './Wishlist.module.css';

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(state => state.wishlist);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.discount > 0 
        ? product.price - (product.price * product.discount / 100)
        : product.price,
      image: product.images[0],
      quantity: 1
    }));
    alert('Added to cart!');
  };

  const handleRemoveFromWishlist = (product) => {
    dispatch(toggleWishlist(product));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className={styles.emptyWishlist}>
        <Heart size={80} strokeWidth={1} />
        <h2>Your wishlist is empty</h2>
        <p>Save your favorite items here and never lose them.</p>
        <button onClick={() => navigate('/products')} className={styles.shopBtn}>
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wishlistPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>My Wishlist</h1>
          <p>{wishlistItems.length} items saved</p>
        </div>

        <div className={styles.wishlistGrid}>
          {wishlistItems.map((item) => {
            const discountedPrice = item.discount > 0 
              ? item.price - (item.price * item.discount / 100)
              : item.price;
              
            return (
              <div key={item.id} className={styles.wishlistCard}>
                <div className={styles.imageContainer}>
                  <img 
                    src={item.images[0]} 
                    alt={item.name} 
                    onClick={() => navigate(`/product/${item.id}`)}
                  />
                  <button 
                    className={styles.removeBtn}
                    onClick={() => handleRemoveFromWishlist(item)}
                  >
                    <Trash2 size={18} />
                  </button>
                  {item.discount > 0 && (
                    <span className={styles.discountBadge}>-{item.discount}%</span>
                  )}
                </div>
                
                <div className={styles.productInfo}>
                  <h3 onClick={() => navigate(`/product/${item.id}`)}>
                    {item.name}
                  </h3>
                  <p className={styles.category}>{item.category}</p>
                  <div className={styles.price}>
                    <span className={styles.currentPrice}>${discountedPrice.toFixed(2)}</span>
                    {item.discount > 0 && (
                      <span className={styles.originalPrice}>${item.price.toFixed(2)}</span>
                    )}
                  </div>
                  <div className={styles.actions}>
                    <button 
                      className={styles.cartBtn}
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                    <button 
                      className={styles.viewBtn}
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.recommendations}>
          <h2>You May Also Like</h2>
          <div className={styles.recommendationsGrid}>
            {wishlistItems.slice(0, 4).map((item) => (
              <div key={`rec-${item.id}`} className={styles.recCard}>
                <img 
                  src={item.images[0]} 
                  alt={item.name}
                  onClick={() => navigate(`/product/${item.id}`)}
                />
                <h4>{item.name}</h4>
                <p>${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;