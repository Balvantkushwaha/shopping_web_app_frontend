import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaPinterest } from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Section */}
          <div className={styles.section}>
            <div className={styles.brand}>
              <h2>BLACK<span>STUDIO</span></h2>
              <p>STYLE THAT SPEAKS</p>
            </div>
            <p className={styles.brandDesc}>
              Premium fashion destination for men and boys. Discover stylish 
              clothing designed for comfort, confidence, and everyday wear.
            </p>
            <div className={styles.social}>
              <a href="#" aria-label="Facebook" className={styles.socialIcon}>
                <FaFacebook size={18} />
              </a>
              <a href="#" aria-label="Instagram" className={styles.socialIcon}>
                <FaInstagram size={18} />
              </a>
              <a href="#" aria-label="YouTube" className={styles.socialIcon}>
                <FaYoutube size={18} />
              </a>
              <a href="#" aria-label="Twitter" className={styles.socialIcon}>
                <FaTwitter size={18} />
              </a>
              <a href="#" aria-label="Pinterest" className={styles.socialIcon}>
                <FaPinterest size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/returns">Returns Policy</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className={styles.section}>
            <h3>Categories</h3>
            <ul>
              <li><Link to="/category/t-shirts">T-Shirts</Link></li>
              <li><Link to="/category/shirts">Shirts</Link></li>
              <li><Link to="/category/jeans">Jeans</Link></li>
              <li><Link to="/category/jackets">Jackets</Link></li>
              <li><Link to="/category/sneakers">Sneakers</Link></li>
              <li><Link to="/category/accessories">Accessories</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.section}>
            <h3>Get in Touch</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <FiMapPin size={18} />
                <span>123 Fashion Street, New York, NY 10001</span>
              </div>
              <div className={styles.contactItem}>
                <FiPhone size={18} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className={styles.contactItem}>
                <FiMail size={18} />
                <span>info@blackstudio.com</span>
              </div>
              <div className={styles.contactItem}>
                <FiClock size={18} />
                <span>Mon - Sat: 9:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            <p>
              © {new Date().getFullYear()} <span>BLACK STUDIO</span>. All Rights Reserved.
            </p>
          </div>
          <div className={styles.payment}>
            <span className={styles.paymentLabel}>Secure Payment</span>
            <div className={styles.paymentIcons}>
              <span className={styles.paymentIcon}>💳</span>
              <span className={styles.paymentIcon}>🔒</span>
              <span className={styles.paymentIcon}>✓</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;