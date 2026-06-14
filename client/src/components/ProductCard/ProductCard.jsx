import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, showViewDetails = true }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector(state => state.wishlist);
  const isInWishlist = wishlist.some(item => item.id === product.id);

  const discountedPrice = product.discount > 0 
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.images[0]} alt={product.name} className={styles.image} />
        <button 
          className={`${styles.wishlistBtn} ${isInWishlist ? styles.active : ''}`}
          onClick={() => dispatch(toggleWishlist(product))}
        >
          <Heart size={20} fill={isInWishlist ? '#ffffff' : 'none'} />
        </button>
        {product.discount > 0 && (
          <span className={styles.discountBadge}>-{product.discount}%</span>
        )}
        {product.isNew && (
          <span className={styles.newBadge}>New</span>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.price}>
          <span className={styles.currentPrice}>${discountedPrice.toFixed(2)}</span>
          {product.discount > 0 && (
            <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>
          )}
        </div>
        {showViewDetails && (
          <button 
            className={styles.detailsBtn}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;