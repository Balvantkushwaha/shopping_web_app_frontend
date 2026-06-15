import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); 
  const discountedPrice = product.discount > 0 
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  return (
    <div className={styles.card} onClick={() => navigate(`/product/${product.id}`)}
          >
      <div className={styles.imageContainer}>
        <img src={product.images[0]} alt={product.name} className={styles.image} />
        
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
          <span className={styles.currentPrice}>₹{discountedPrice.toFixed(2)}</span>
          {product.discount > 0 && (
            <span className={styles.originalPrice}>₹{product.price.toFixed(2)}</span>
          )}
        </div>      
      </div>
    </div>
  );
};

export default ProductCard;