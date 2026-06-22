import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Admin Panel</h1>
      </div>
      <div className={styles.headerRight}>
        {/* <div className={styles.notification}>🔔</div> */}
        <div className={styles.userInfo}>
          <span>Admin</span>
          <img 
            src="https://via.placeholder.com/40" 
            alt="Admin" 
            className={styles.avatar}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;