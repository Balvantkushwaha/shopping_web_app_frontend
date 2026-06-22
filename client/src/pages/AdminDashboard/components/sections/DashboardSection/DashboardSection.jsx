import styles from "./DashboardSection.module.css";

const DashboardSection = () => {
  const stats = [
    { label: "Total Revenue", value: "₹45,231", change: "+12.5%" },
    { label: "Total Orders", value: "1,234", change: "+8.2%" },
    { label: "Total Products", value: "567", change: "+3.1%" },
    { label: "Total Customers", value: "3,456", change: "+15.3%" },
  ];

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.title}>Dashboard Overview</h2>
      
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statChange}>{stat.change}</div>
          </div>
        ))}
      </div>

      <div className={styles.chartSection}>
        <div className={styles.chartCard}>
          <h3>Recent Activity</h3>
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <span className={styles.activityTime}>2 min ago</span>
              <span>New order #1234 placed</span>
            </div>
            <div className={styles.activityItem}>
              <span className={styles.activityTime}>1 hour ago</span>
              <span>Product "iPhone 15" updated</span>
            </div>
            <div className={styles.activityItem}>
              <span className={styles.activityTime}>3 hours ago</span>
              <span>New user registered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;