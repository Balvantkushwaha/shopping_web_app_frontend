import { useNavigate, useLocation } from "react-router-dom";
import { Home, Grid, ShoppingCart, User } from "lucide-react";
import { useAppSelector } from "../../redux/hooks";
import styles from "./BottomNavigation.module.css";

const BottomNavigation = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Grid, label: "Categories", path: "/category" },
    { icon: ShoppingCart, label: "Cart", path: "/cart", badge: cartCount },
    { icon: User, label: "Account", path: "/account" },
  ];
 
  const handleNavigation = (item) => {
    if (item.label === "Account") {
      onLoginClick();
      return;
    }

    if (item.path === "/" && location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    navigate(item.path);
  };
  return (
    <div className={styles.bottomNav}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <button
            key={item.path}
            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            onClick={() => handleNavigation(item)}
          >
            <Icon size={22} />
            <span>{item.label}</span>

            {item.badge > 0 && (
              <span className={styles.badge}>{item.badge}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
