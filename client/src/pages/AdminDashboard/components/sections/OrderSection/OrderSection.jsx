import { useEffect, useState } from 'react';
import styles from "./OrderSection.module.css";
import api from '../../../../../api/axios';

const OrderSection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  
  // Filter states
  const [filters, setFilters] = useState({
    payment_method: '',
    payment_status: '',
    order_status: ''
  });

  // Fetch orders with filters using axios
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Build query string
      let queryString = `?page=${pagination.page}&&limit=${pagination.limit}`;
      
      // Add filters if they exist
      if (filters.payment_method) {
        queryString += `&&payment_method=${filters.payment_method}`;
      }
      if (filters.payment_status) {
        queryString += `&&payment_status=${filters.payment_status}`;
      }
      if (filters.order_status) {
        queryString += `&&order_status=${filters.order_status}`;
      }

      const response = await api.get(`/order/${queryString}`);
      
      // Check if the response has the expected structure
      if (response.data.success && response.data.data) {
        setOrders(response.data.data.orders || []);
        setPagination({
          ...pagination,
          total: response.data.data.total || 0,
          totalPages: response.data.data.totalPages || 0
        });
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders when filters or page changes
  useEffect(() => {
    fetchOrders();
  }, [filters, pagination.page]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    // Reset to page 1 when filter changes
    setPagination(prev => ({
      ...prev,
      page: 1
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      payment_method: '',
      payment_status: '',
      order_status: ''
    });
    setPagination(prev => ({
      ...prev,
      page: 1
    }));
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({
        ...prev,
        page: newPage
      }));
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusBadge = (status, type) => {
    const statusColors = {
      payment: {
        'Pending': '#ff9800',
        'Paid': '#4caf50',
        'Failed': '#f44336',
        'Refunded': '#9e9e9e'
      },
      order: {
        'Placed': '#2196f3',
        'Processing': '#ff9800',
        'Shipped': '#9c27b0',
        'Delivered': '#4caf50',
        'Cancelled': '#f44336'
      }
    };

    const colors = type === 'payment' ? statusColors.payment : statusColors.order;
    return colors[status] || '#757575';
  };

  // Get customer name
  const getCustomerName = (order) => {
    if (order.shippingAddress) {
      const { first_name, last_name } = order.shippingAddress;
      return `${first_name || ''} ${last_name || ''}`.trim() || 'Guest';
    }
    return 'Guest';
  };

  // Get customer email
  const getCustomerEmail = (order) => {
    if (order.shippingAddress && order.shippingAddress.email) {
      return order.shippingAddress.email;
    }
    return order.guest_mobile_no || 'No email';
  };

  return (
    <div className={styles.orderSection}>
      <div className={styles.header}>
        <h2>Order Management</h2>
        <div className={styles.stats}>
          <span>Total Orders: {pagination.total}</span>
        </div>
      </div>

      {/* Filter Section */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Payment Method</label>
          <select
            value={filters.payment_method}
            onChange={(e) => handleFilterChange('payment_method', e.target.value)}
          >
            <option value="">All Methods</option>
            <option value="ONLINE">Online</option>
            <option value="COD">Cash on Delivery</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Payment Status</label>
          <select
            value={filters.payment_status}
            onChange={(e) => handleFilterChange('payment_status', e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Order Status</label>
          <select
            value={filters.order_status}
            onChange={(e) => handleFilterChange('order_status', e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Placed">Placed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button className={styles.clearBtn} onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className={styles.error}>
          Error: {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading orders...</p>
        </div>
      )}

      {/* Orders Table */}
      {!loading && !error && (
        <>
          <div className={styles.tableContainer}>
            <table className={styles.orderTable}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total Amount</th>
                  <th>Payment Method</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="9" className={styles.noOrders}>
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <span className={styles.orderId}>{order.order_id || order._id?.slice(-6)}</span>
                      </td>
                      <td>
                        <div className={styles.customerInfo}>
                          <strong>{getCustomerName(order)}</strong>
                          <br />
                          <small>{getCustomerEmail(order)}</small>
                          {order.guest_mobile_no && (
                            // <br />
                            <small>Phone: {order.guest_mobile_no}</small>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className={styles.itemsInfo}>
                          {order.items && order.items.length > 0 ? (
                            <>
                              <span>{order.items.length} item(s)</span>
                              <br />
                              <small>{order.items[0]?.product_name}</small>
                              {order.items.length > 1 && (
                                <small> +{order.items.length - 1} more</small>
                              )}
                            </>
                          ) : (
                            'N/A'
                          )}
                        </div>
                      </td>
                      <td>
                        <div className={styles.amountInfo}>
                          <strong>₹{order.final_payable_amount?.toFixed(2) || '0.00'}</strong>
                          {order.total_discount > 0 && (
                            // <br />
                            <small className={styles.discount}>
                              Discount: ₹{order.total_discount.toFixed(2)}
                            </small>
                          )}
                          {order.shipping_charge > 0 && (
                            // <br />
                            <small>Shipping: ₹{order.shipping_charge.toFixed(2)}</small>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`${styles.paymentMethod} ${order.payment_method === 'ONLINE' ? styles.online : styles.cod}`}>
                          {order.payment_method || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span 
                          className={styles.statusBadge}
                          style={{ 
                            backgroundColor: getStatusBadge(order.payment_status, 'payment'),
                            color: '#fff'
                          }}
                        >
                          {order.payment_status || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span 
                          className={styles.statusBadge}
                          style={{ 
                            backgroundColor: getStatusBadge(order.order_status, 'order'),
                            color: '#fff'
                          }}
                        >
                          {order.order_status || 'N/A'}
                        </span>
                      </td>
                      <td>{formatDate(order.createdAt)}</td>
                      <td>
                        <button className={styles.viewBtn}>
                          View
                        </button>
                        <button className={styles.updateBtn}>
                          Update
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className={styles.pageBtn}
              >
                Previous
              </button>
              
              <span className={styles.pageInfo}>
                Page {pagination.page} of {pagination.totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className={styles.pageBtn}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderSection;