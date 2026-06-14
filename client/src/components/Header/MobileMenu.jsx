import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import styles from './MobileMenu.module.css';

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.menu}>
        <div className={styles.header}>
          <h2>Menu</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={24} />
          </button>
        </div>
        <nav className={styles.nav}>
          <Link to="/" onClick={onClose}>Home</Link>
          <Link to="/products" onClick={onClose}>Categories</Link>
          <Link to="/products?filter=new" onClick={onClose}>New Arrivals</Link>
          <Link to="/products?filter=popular" onClick={onClose}>Popular Products</Link>
          <Link to="/about" onClick={onClose}>About</Link>
          <Link to="/contact" onClick={onClose}>Contact</Link>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;