import styles from "./OrderSection.module.css";

const OrderSection = () => {
  const orders = [
    { id: "ORD-001", customer: "John Doe", total: "$299.99", status: "Delivered", date: "2024-01-15" },
    { id: "ORD-002", customer: "Jane Smith", total: "$599.99", status: "Processing", date: "2024-01-14" },
    { id: "ORD-003", customer: "Mike Johnson", total: "$199.99", status: "Shipped", date: "2024-01-13" },
    { id: "ORD-004", customer: "Sarah Wilson", total: "$799.99", status: "Pending", date: "2024-01-12" },
  ];

  return (
    <div className={styles.orders}>
      <h2>Orders Management</h2>
      
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.total}</td>
                <td>
                  <span className={`${styles.status} ${styles[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.date}</td>
                <td>
                  <button className={styles.viewBtn}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderSection;