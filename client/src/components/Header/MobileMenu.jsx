import { Link, useLocation } from 'react-router-dom';
import { X, Home, Grid, Flame, Info, Mail, ShoppingBag, User, ChevronRight } from 'lucide-react';
import { useAppSelector } from "../../redux/hooks";
import { selectIsAuthenticated } from "../../redux/slices/authSlice";
import styles from './MobileMenu.module.css';

const MobileMenu = ({ isOpen, onClose }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/category', icon: Grid, label: 'Categories' },
    { path: '/search?isPopular=true', icon: Flame, label: 'Popular Products' },
    { path: '/about', icon: Info, label: 'About' },
    { path: '/contact', icon: Mail, label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
      <div className={`${styles.menu} ${isOpen ? styles.open : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.brand}>
            <h2>BLACK<span>STUDIO</span></h2>
            <p>STYLE THAT SPEAKS</p>
          </div>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close menu">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* User Section */}
        {isAuthenticated && (
          <div className={styles.userSection}>
            <div className={styles.userAvatar}>U</div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>Welcome back!</p>
              <p className={styles.userEmail}>Your Account</p>
            </div>
            <ChevronRight size={16} className={styles.chevron} strokeWidth={1.5} />
          </div>
        )}

        {/* Navigation Links */}
        <nav className={styles.nav}>
          {menuItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              onClick={onClose}
              className={`${styles.navLink} ${isActive(path) ? styles.active : ''}`}
            >
              <span className={styles.iconWrapper}>
                <Icon size={20} strokeWidth={1.5} />
              </span>
              <span className={styles.linkLabel}>{label}</span>
              <span className={styles.linkArrow}>
                <ChevronRight size={16} strokeWidth={1.5} />
              </span>
            </Link>
          ))}
        </nav>

        {/* Cart Link */}
        <Link to="/cart" className={styles.cartLink} onClick={onClose}>
          <span className={styles.cartIcon}>
            <ShoppingBag size={20} strokeWidth={1.5} />
          </span>
          <span className={styles.cartText}>View Cart</span>
          <span className={styles.cartBadge}>0</span>
        </Link>

        {/* Footer */}
        <div className={styles.footer}>
          <p>© 2024 BLACK STUDIO</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;