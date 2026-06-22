import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu} from 'lucide-react';
import { useAppSelector } from '../../redux/hooks';
import styles from './Header.module.css';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useAppSelector(state => state.cart.items);
  // const wishlistItems = useAppSelector(state => state.wishlist);
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  // const wishlistCount = wishlistItems.length;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Left - Logo */}
          <div className={styles.logo}>
            <Link to="/">
              <h1>BLACK<span>STUDIO</span></h1>
              <p>STYLE THAT SPEAKS</p>
            </Link>
          </div>

          {/* Center - Navigation (Desktop) */}
          <nav className={styles.nav}>
            <Link to="/">Home</Link>
            <Link to="/products">Categories</Link>
            <Link to="/products?filter=new">New Arrivals</Link>
            <Link to="/products?filter=popular">Popular Products</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          {/* Right - Icons */}
          <div className={styles.icons}>
            <button onClick={() => navigate('/search')} className={styles.iconBtn}>
              <Search size={20} />
            </button>
            
            <button onClick={() => navigate('/cart')} className={styles.iconBtn}>
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </button>
            <button 
              className={`${styles.iconBtn} ${styles.menuBtn}`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};

export default Header;