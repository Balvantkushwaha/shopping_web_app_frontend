// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Search, ShoppingCart, Menu, User} from 'lucide-react';
// import { useAppSelector } from '../../redux/hooks';
// import styles from './Header.module.css';
// import MobileMenu from './MobileMenu';

// const Header = ({ onLoginClick }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const cartItems = useAppSelector(state => state.cart.items);
//   // const wishlistItems = useAppSelector(state => state.wishlist);
//   const navigate = useNavigate();


//   const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
//   // const wishlistCount = wishlistItems.length;

//   return (
//     <>
//       <header className={styles.header}>
//         <div className={styles.container}>
//           {/* Left - Logo */}
//           <div className={styles.logo}>
//             <Link to="/">
//               <h1>BLACK<span>STUDIO</span></h1>
//               <p>STYLE THAT SPEAKS</p>
//             </Link>
//           </div>

//           {/* Center - Navigation (Desktop) */}
//           <nav className={styles.nav}>
//             <Link to="/">Home</Link>
//             <Link to="/category">Categories</Link>
//             <Link to="/search?isNewArrival=true">New Arrivals</Link>
//             <Link to="/search?isPopular=true">Popular Products</Link>
//             <Link to="/about">About</Link>
//             <Link to="/contact">Contact</Link>
//           </nav>

//           {/* Right - Icons */}
//           <div className={styles.icons}>
//             <button onClick={() => navigate('/search')} className={styles.iconBtn}>
//               <Search size={20} />
//             </button>
            
//             <button onClick={() => navigate('/cart')} className={styles.iconBtn} className={styles.cartBtn}>
//               <ShoppingCart size={20} />
//               {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
//             </button>
//             <button 
//               className={`${styles.iconBtn} ${styles.menuBtn}`}
//               onClick={() => setIsMobileMenuOpen(true)}
//             >
//               <Menu size={20} />
//             </button>
//             <button 
//               className={`${styles.iconBtn} ${styles.accountBtn}`}
//               onClick={onLoginClick}
//             >
//               <User size={20} />
//             </button>
//           </div>
//         </div>
         
//       </header>

//       <MobileMenu 
//         isOpen={isMobileMenuOpen} 
//         onClose={() => setIsMobileMenuOpen(false)} 
//       />
    
//     </>
//   );
// };

// export default Header;












import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, User, LogOut, UserCircle } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectIsAuthenticated, selectCustomer, clearCustomer } from '../../redux/slices/authSlice';
import styles from './Header.module.css';
import MobileMenu from './MobileMenu';
import { useAuth } from '../../contexts/useAuth';

const Header = ({ onLoginClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  // Get auth state from Redux
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const customer = useAppSelector(selectCustomer);
  const cartItems = useAppSelector(state => state.cart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  console.log("isAuthenticated:", isAuthenticated, "customer:", customer);
  console.log("cartCount:", cartCount);
  console.log("cartItems:", cartItems);



  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearCustomer());
      setIsUserMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Get user display name
  const getUserName = () => {
    if (!customer) return 'Account';
    const fullName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim();
    return fullName || customer.mobile || 'Account';
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!customer) return 'U';
    const first = customer.firstName?.charAt(0) || '';
    const last = customer.lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || customer.mobile?.toString().slice(-2) || 'U';
  };

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
            <Link to="/category">Categories</Link>
            <Link to="/search?isNewArrival=true">New Arrivals</Link>
            <Link to="/search?isPopular=true">Popular Products</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          {/* Right - Icons */}
          <div className={styles.icons}>
            <button onClick={() => navigate('/search')} className={styles.iconBtn}>
              <Search size={20} />
            </button>
            
            <button onClick={() => navigate('/cart')} className={styles.cartBtn}>
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </button>

            <button 
              className={`${styles.iconBtn} ${styles.menuBtn}`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>

            {/* Account Button - Shows different based on login state */}
            <div className={styles.accountWrapper}>
              {isAuthenticated && customer ? (
                // Logged in state
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

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className={styles.userDropdown}>
                      <div className={styles.userDropdownHeader}>
                        <div className={styles.userAvatarLarge}>
                          {getUserInitials()}
                        </div>
                        <div className={styles.userInfo}>
                          <p className={styles.userName}>{getUserName()}</p>
                          <p className={styles.userRole}>{customer.role || 'Customer'}</p>
                        </div>
                      </div>
                      <div className={styles.dropdownDivider} />
                      <button 
                        className={styles.dropdownItem}
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          navigate('/profile');
                        }}
                      >
                        <UserCircle size={18} />
                        My Profile
                      </button>
                      <button 
                        className={styles.dropdownItem}
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          navigate('/track-order');
                        }}
                      >
                        <ShoppingCart size={18} />
                        My Orders
                      </button>
                      <button 
                        className={`${styles.dropdownItem} ${styles.dropdownLogout}`}
                        onClick={handleLogout}
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                // Logged out state
                <button 
                  className={`${styles.iconBtn} ${styles.accountBtn}`}
                  onClick={onLoginClick}
                  aria-label="Login"
                >
                  <User size={20} />
                </button>
              )}
            </div>
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