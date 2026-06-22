import styles from "./Sidebar.module.css";
import { 
  FiLayout, 
  FiBox, 
  FiShoppingCart, 
  FiSettings,
  FiUsers,
  FiTrendingUp,
  FiHome,
  FiGrid,
  FiFileText,
  FiBell,
  FiUser
} from "react-icons/fi";

// You can also use other icon sets like:
// import { MdDashboard, MdInventory, MdShoppingCart, MdSettings } from "react-icons/md";
// import { AiFillDashboard, AiOutlineStock, AiOutlineShoppingCart, AiOutlineSetting } from "react-icons/ai";
// import { BsGrid, BsBox, BsCart, BsGear } from "react-icons/bs";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <FiLayout size={22} /> },
    { id: "products", label: "Products", icon: <FiBox size={22} /> },
    { id: "orders", label: "Orders", icon: <FiShoppingCart size={22} /> },
    { id: "settings", label: "Settings", icon: <FiSettings size={22} /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <FiGrid size={32} className={styles.logoIcon} />
          <span className={styles.logoText}>Admin</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.navItem} ${
              activeSection === item.id ? styles.active : ""
            }`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
            {activeSection === item.id && <span className={styles.activeIndicator}></span>}
          </div>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <FiUser size={24} />
          </div>
          <div className={styles.userDetails}>
            <p className={styles.userName}>Admin</p>
            <p className={styles.userRole}>Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );

};

export default Sidebar;

