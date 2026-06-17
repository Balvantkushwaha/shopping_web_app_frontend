import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { useAppDispatch} from '../../redux/hooks';
import { addToCart } from '../../redux/slices/cartSlice';
import { getProductById } from '../../data/products';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const product = getProductById(id);

  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);

  if (!product) {
    return <div className={styles.notFound}>Product not found</div>;
  }

  const discountedPrice = product.discount > 0 
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.images[0],
      quantity: quantity
    }));
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className={styles.detailsPage}>
      <div className={styles.container}>
        <div className={styles.productContainer}>
          {/* Image Gallery */}
          <div className={styles.imageGallery}>
            <div className={styles.mainImage}>
              <img src={product.images[mainImage]} alt={product.name} />
            </div>
            <div className={styles.thumbnails}>
              {product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.thumbnail} ${idx === mainImage ? styles.active : ''}`}
                  onClick={() => setMainImage(idx)}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.productInfo}>
            <h1 className={styles.name}>{product.name}</h1>
            
            <div className={styles.priceSection}>
              <span className={styles.currentPrice}>₹{discountedPrice.toFixed(2)}</span>
              {product.discount > 0 && (
                <>
                  <span className={styles.originalPrice}>₹{product.price.toFixed(2)}</span>
                  <span className={styles.discount}>-{product.discount}%</span>
                </>
              )}
            </div>

            <p className={styles.description}>{product.description}</p>

            {/* Size Selection */}
            {product.sizes && (
              <div className={styles.section}>
                <h3>Select Size</h3>
                <div className={styles.sizes}>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`${styles.sizeBtn} ${selectedSize === size ? styles.active : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && (
              <div className={styles.section}>
                <h3>Select Color</h3>
                <div className={styles.colors}>
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`${styles.colorBtn} ${selectedColor === color ? styles.active : ''}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
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
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus size={16} />
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
             
              <button className={styles.cartBtn} onClick={handleAddToCart}>
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className={styles.buyBtn} onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;