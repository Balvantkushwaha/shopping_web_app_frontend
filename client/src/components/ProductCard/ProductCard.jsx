// components/ProductCard/ProductCard.jsx
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { UPLOADS_URL } from "../../config";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const handleCardClick = () => {
    if (product.slug) {
      navigate(`/product/${product.slug}`);
    } else {
      navigate("/");
    }
  };

  const getProductImage = () => {
    if (product.coverImage) {
      return `${UPLOADS_URL}${product.coverImage}`;
    }
    if (product.images && product.images.length > 0) {
      return `${UPLOADS_URL}${product.images[0]}`;
    }
    return "https://via.placeholder.com/300x300?text=No+Image";
  };

  const getBadges = () => {
    const badges = [];
    if (product.discount > 0) {
      badges.push(
        <span key="discount" className={styles.discountBadge}>
          -{product.discount}%
        </span>,
      );
    }
    return badges;
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.imageContainer}>
        <img
          src={getProductImage()}
          alt={product.name}
          className={styles.image}
        />

        <div className={styles.badgeContainer}>{getBadges()}</div>

        {product.stockQuantity === 0 && (
          <div className={styles.outOfStockOverlay}>
            <span>Out of Stock</span>
          </div>
        )}

        {/* Bottom gradient shadow + content overlay */}
        <div className={styles.bottomShadow}></div>
        <div className={styles.info}>
          <h3 className={styles.name}>{product.name}</h3>
          <div className={styles.price}>
            <span className={styles.currentPrice}>
              ₹{discountedPrice.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className={styles.originalPrice}>
                ₹{product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;