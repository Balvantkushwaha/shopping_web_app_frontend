import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, ShoppingCart, Menu, User, Home, Grid, Heart } from "lucide-react";
import { useAppSelector } from "../../redux/hooks";
import {
  selectIsAuthenticated,
  selectCustomer,
} from "../../redux/slices/authSlice";
import styles from "./Header.module.css";
import MobileMenu from "./MobileMenu";
import ProfileDropdown from "../../pages/Profile/ProfileDropdown";

const Header = ({ onLoginClick, isLoading }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const customer = useAppSelector(selectCustomer);
  const cartItems = useAppSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const getUserInitials = () => {
    if (!customer) return "U";
    const first = customer.firstName?.charAt(0) || "";
    const last = customer.lastName?.charAt(0) || "";
    return (
      (first + last).toUpperCase() ||
      customer.mobile?.toString().slice(-2) ||
      "U"
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsUserMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  // Bottom nav items
  const bottomNavItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/search", icon: Search, label: "Search" },
    { path: "/category", icon: Grid, label: "Categories" },
    { path: "/cart", icon: ShoppingCart, label: "Cart", hasBadge: true },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  // Skeleton Loader
  if (isLoading) {
    return (
      <header className={`${styles.header} ${styles.skeletonHeader}`}>
        <div className={styles.container}>
          <div className={styles.skeletonMenu} />
          <div className={styles.skeletonLogo}>
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonLineSmall} />
          </div>
          <div className={styles.skeletonNav}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={styles.skeletonNavItem} />
            ))}
          </div>
          <div className={styles.skeletonIcons}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.skeletonIcon} />
            ))}
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.container}>
          {/* Mobile Menu Button */}
          <button
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          {/* Logo */}
          <div className={styles.logo}>
            <Link to="/">
              <h1>
                BLACK<span className={styles.studioText}>STUDIO</span>
              </h1>
              <p>STYLE THAT SPEAKS</p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            <Link to="/" className={location.pathname === "/" ? styles.activeLink : ""}>Home</Link>
            <Link to="/category" className={location.pathname === "/category" ? styles.activeLink : ""}>Categories</Link>
            <Link to="/search?isPopular=true">Popular</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          {/* Right Icons */}
          <div className={styles.icons}>
            <button
              onClick={() => navigate("/search")}
              className={styles.iconBtn}
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            <button
              onClick={() => navigate("/cart")}
              className={`${styles.iconBtn} ${styles.cartBtn}`}
              aria-label="Cart"
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </button>

            {/* Account */}
            <div className={styles.accountWrapper} ref={dropdownRef}>
              {isAuthenticated && customer ? (
                <>
                  <button
                    className={`${styles.iconBtn} ${styles.accountBtn}`}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    aria-label="Account menu"
                  >
                    <div className={styles.userAvatar}>
                      {getUserInitials()}
                    </div>
                  </button>

                  {isUserMenuOpen && (
                    <div className={styles.dropdownWrapper}>
                      <ProfileDropdown
                        onClose={() => setIsUserMenuOpen(false)}
                      />
                    </div>
                  )}
                </>
              ) : (
                <button
                  className={`${styles.iconBtn} ${styles.accountBtn}`}
                  onClick={onLoginClick}
                  aria-label="Login"
                >
                  <User size={20} strokeWidth={1.5} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navigation - Mobile Only */}
      <div className={styles.bottomNav}>
        {bottomNavItems.map((item) => (
          <button
            key={item.path}
            className={`${styles.bottomNavItem} ${isActive(item.path) ? styles.active : ""}`}
            onClick={() => navigate(item.path)}
            aria-label={item.label}
          >
            <div className={styles.bottomNavIcon}>
              <item.icon size={22} strokeWidth={1.5} />
              {item.hasBadge && cartCount > 0 && (
                <span className={styles.bottomBadge}>{cartCount}</span>
              )}
            </div>
            <span className={styles.bottomNavLabel}>{item.label}</span>
          </button>
        ))}
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;