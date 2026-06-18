import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Lock, Package, Truck, CheckCircle, Clock, AlertCircle, Eye, ChevronDown, ChevronUp, Search } from 'lucide-react';
import styles from './MyOrders.module.css';

const MyOrders = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Mobile, 2: OTP, 3: Orders
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Dummy orders data based on mobile number
  const dummyOrders = {
    '9876543210': [
      {
        id: 'ORD-2024-001',
        date: '2024-01-15',
        status: 'delivered',
        total: 139.97,
        items: [
          { name: 'Premium Black Cotton Tee', quantity: 2, price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' },
          { name: 'Slim Fit Denim Jeans', quantity: 1, price: 79.99, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=100' }
        ],
        shippingAddress: '123 Fashion Street, Mumbai - 400001',
        trackingHistory: [
          { status: 'Order Placed', date: '2024-01-15 10:30 AM', completed: true },
          { status: 'Order Confirmed', date: '2024-01-15 02:15 PM', completed: true },
          { status: 'Processing', date: '2024-01-16 09:00 AM', completed: true },
          { status: 'Shipped', date: '2024-01-17 06:30 PM', completed: true },
          { status: 'Delivered', date: '2024-01-19 02:00 PM', completed: true }
        ]
      },
      {
        id: 'ORD-2024-002',
        date: '2024-01-10',
        status: 'shipped',
        total: 89.99,
        items: [
          { name: 'Classic White Tee', quantity: 1, price: 24.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' },
          { name: 'Denim Trucker Jacket', quantity: 1, price: 64.99, image: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=100' }
        ],
        shippingAddress: '456 Park Avenue, Delhi - 110001',
        trackingHistory: [
          { status: 'Order Placed', date: '2024-01-10 11:20 AM', completed: true },
          { status: 'Order Confirmed', date: '2024-01-10 03:45 PM', completed: true },
          { status: 'Processing', date: '2024-01-11 10:00 AM', completed: true },
          { status: 'Shipped', date: '2024-01-12 09:30 AM', completed: true },
          { status: 'In Transit', date: '2024-01-13 08:00 AM', completed: false },
          { status: 'Out for Delivery', date: 'Estimated 2024-01-15', completed: false }
        ]
      },
      {
        id: 'ORD-2024-003',
        date: '2024-01-05',
        status: 'processing',
        total: 64.99,
        items: [
          { name: 'Oversized Hoodie', quantity: 1, price: 64.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100' }
        ],
        shippingAddress: '789 Lake View, Bangalore - 560001',
        trackingHistory: [
          { status: 'Order Placed', date: '2024-01-05 09:15 AM', completed: true },
          { status: 'Order Confirmed', date: '2024-01-05 01:30 PM', completed: true },
          { status: 'Processing', date: '2024-01-06 10:00 AM', completed: false },
          { status: 'Shipped', date: 'Pending', completed: false }
        ]
      }
    ],
    '9999999999': [
      {
        id: 'ORD-2024-004',
        date: '2024-01-18',
        status: 'delivered',
        total: 199.99,
        items: [
          { name: 'Premium Leather Jacket', quantity: 1, price: 199.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac1?w=100' }
        ],
        shippingAddress: '101 Beach Road, Chennai - 600001',
        trackingHistory: [
          { status: 'Order Placed', date: '2024-01-18 10:00 AM', completed: true },
          { status: 'Order Confirmed', date: '2024-01-18 12:30 PM', completed: true },
          { status: 'Processing', date: '2024-01-19 09:00 AM', completed: true },
          { status: 'Shipped', date: '2024-01-20 02:00 PM', completed: true },
          { status: 'Delivered', date: '2024-01-22 11:30 AM', completed: true }
        ]
      },
      {
        id: 'ORD-2024-005',
        date: '2024-01-12',
        status: 'cancelled',
        total: 59.99,
        items: [
          { name: 'Oxford Button Down Shirt', quantity: 1, price: 59.99, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100' }
        ],
        shippingAddress: '202 Garden Colony, Hyderabad - 500001',
        trackingHistory: [
          { status: 'Order Placed', date: '2024-01-12 08:30 AM', completed: true },
          { status: 'Order Confirmed', date: '2024-01-12 11:00 AM', completed: true },
          { status: 'Cancelled', date: '2024-01-12 02:00 PM', completed: true }
        ]
      }
    ]
  };

  const handleSendOtp = () => {
    if (mobileNumber.length === 10) {
      const dummyOtp = '123456';
      setSentOtp(dummyOtp);
      alert(`OTP sent to ${mobileNumber}: ${dummyOtp} (Demo)`);
    } else {
      alert('Please enter a valid 10-digit mobile number');
    }
  };

  const handleVerifyOtp = () => {
    if (otp === sentOtp) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const userOrders = dummyOrders[mobileNumber] || [];
        setOrders(userOrders);
        setStep(3);
        setLoading(false);
        if (userOrders.length === 0) {
          alert('No orders found for this mobile number.');
        }
      }, 1000);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered':
        return <CheckCircle className={styles.statusDelivered} size={20} />;
      case 'shipped':
        return <Truck className={styles.statusShipped} size={20} />;
      case 'processing':
        return <Clock className={styles.statusProcessing} size={20} />;
      case 'cancelled':
        return <AlertCircle className={styles.statusCancelled} size={20} />;
      default:
        return <Package className={styles.statusDefault} size={20} />;
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusClass = (status) => {
    return styles[status];
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getFilteredOrders = () => {
    if (filterStatus === 'all') return orders;
    return orders.filter(order => order.status === filterStatus);
  };

  const getStatusCount = (status) => {
    if (status === 'all') return orders.length;
    return orders.filter(order => order.status === status).length;
  };

  // Step 1: Mobile Number Input
  if (step === 1) {
    return (
      <div className={styles.myOrdersPage}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <Package size={48} />
            <h1>My Orders</h1>
            <p>Enter your mobile number to view all your orders</p>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.verifyCard}>
            <div className={styles.verifyIcon}>
              <Phone size={32} />
            </div>
            <h2>Verify Your Mobile Number</h2>
            <p>We'll send a one-time password to verify your identity</p>
            
            <div className={styles.verifyForm}>
              <div className={styles.formGroup}>
                <label>Mobile Number</label>
                <div className={styles.inputWrapper}>
                  <Phone size={18} className={styles.inputIcon} />
                  <input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    maxLength="10"
                    autoFocus
                  />
                </div>
              </div>
              <button 
                className={styles.sendOtpBtn}
                onClick={handleSendOtp}
                disabled={mobileNumber.length !== 10}
              >
                Send OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: OTP Verification
  if (step === 2) {
    return (
      <div className={styles.myOrdersPage}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <Lock size={48} />
            <h1>Verify OTP</h1>
            <p>Enter the OTP sent to {mobileNumber}</p>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.verifyCard}>
            <div className={styles.verifyIcon}>
              <Lock size={32} />
            </div>
            <h2>Enter OTP</h2>
            <p>We've sent a 6-digit code to your mobile number</p>
            
            <div className={styles.verifyForm}>
              <div className={styles.formGroup}>
                <label>OTP Code</label>
                <div className={styles.inputWrapper}>
                  <Lock size={18} className={styles.inputIcon} />
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    maxLength="6"
                    autoFocus
                  />
                </div>
              </div>
              <div className={styles.otpActions}>
                <button 
                  className={styles.resendBtn}
                  onClick={handleSendOtp}
                >
                  Resend OTP
                </button>
                <button 
                  className={styles.backBtn}
                  onClick={() => setStep(1)}
                >
                  Change Number
                </button>
              </div>
              <button 
                className={styles.verifyOtpBtn}
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6 || loading}
              >
                {loading ? 'Verifying...' : 'Verify & View Orders'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Orders List
  return (
    <div className={styles.myOrdersPage}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <Package size={48} />
          <h1>My Orders</h1>
          <p>{orders.length} orders found for {mobileNumber}</p>
        </div>
      </div>

      <div className={styles.container}>
        {/* Status Filter */}
        <div className={styles.filterSection}>
          <div className={styles.filterTabs}>
            <button 
              className={`${styles.filterTab} ${filterStatus === 'all' ? styles.active : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              All ({getStatusCount('all')})
            </button>
            <button 
              className={`${styles.filterTab} ${filterStatus === 'processing' ? styles.active : ''}`}
              onClick={() => setFilterStatus('processing')}
            >
              Processing ({getStatusCount('processing')})
            </button>
            <button 
              className={`${styles.filterTab} ${filterStatus === 'shipped' ? styles.active : ''}`}
              onClick={() => setFilterStatus('shipped')}
            >
              Shipped ({getStatusCount('shipped')})
            </button>
            <button 
              className={`${styles.filterTab} ${filterStatus === 'delivered' ? styles.active : ''}`}
              onClick={() => setFilterStatus('delivered')}
            >
              Delivered ({getStatusCount('delivered')})
            </button>
            <button 
              className={`${styles.filterTab} ${filterStatus === 'cancelled' ? styles.active : ''}`}
              onClick={() => setFilterStatus('cancelled')}
            >
              Cancelled ({getStatusCount('cancelled')})
            </button>
          </div>
        </div>

        {/* Orders List */}
        {getFilteredOrders().length === 0 ? (
          <div className={styles.noOrders}>
            <Package size={48} />
            <h3>No orders found</h3>
            <p>You haven't placed any orders with this status yet.</p>
            <button onClick={() => navigate('/products')} className={styles.shopBtn}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className={styles.ordersList}>
            {getFilteredOrders().map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader} onClick={() => toggleOrderExpand(order.id)}>
                  <div className={styles.orderInfo}>
                    <div className={styles.orderId}>
                      <span className={styles.idLabel}>Order #</span>
                      <span className={styles.idValue}>{order.id}</span>
                    </div>
                    <div className={styles.orderMeta}>
                      <span className={styles.orderDate}>{formatDate(order.date)}</span>
                      <span className={styles.orderItemsCount}>
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                  </div>
                  <div className={styles.orderRight}>
                    <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {getStatusLabel(order.status)}
                    </span>
                    <span className={styles.orderTotal}>${order.total.toFixed(2)}</span>
                    {expandedOrder === order.id ? (
                      <ChevronUp size={20} className={styles.expandIcon} />
                    ) : (
                      <ChevronDown size={20} className={styles.expandIcon} />
                    )}
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div className={styles.orderDetails}>
                    {/* Order Items */}
                    <div className={styles.orderItemsSection}>
                      <h4>Order Items</h4>
                      <div className={styles.itemsGrid}>
                        {order.items.map((item, idx) => (
                          <div key={idx} className={styles.orderItem}>
                            <img src={item.image} alt={item.name} />
                            <div className={styles.itemInfo}>
                              <p className={styles.itemName}>{item.name}</p>
                              <p className={styles.itemQty}>Qty: {item.quantity}</p>
                              <p className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tracking History */}
                    <div className={styles.trackingSection}>
                      <h4>Tracking History</h4>
                      <div className={styles.timeline}>
                        {order.trackingHistory.map((event, idx) => (
                          <div key={idx} className={styles.timelineItem}>
                            <div className={styles.timelineDot}>
                              {event.completed ? (
                                <CheckCircle size={14} className={styles.timelineCompleted} />
                              ) : (
                                <Clock size={14} className={styles.timelinePending} />
                              )}
                            </div>
                            <div className={styles.timelineContent}>
                              <div className={styles.timelineHeader}>
                                <span className={styles.timelineStatus}>{event.status}</span>
                                <span className={styles.timelineDate}>{event.date}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className={styles.addressSection}>
                      <h4>Shipping Address</h4>
                      <p>{order.shippingAddress}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className={styles.orderActions}>
                      {order.status === 'delivered' && (
                        <button className={styles.reorderBtn}>Reorder</button>
                      )}
                      {order.status !== 'cancelled' && order.status !== 'delivered' && (
                        <button className={styles.cancelOrderBtn}>Cancel Order</button>
                      )}
                      <button className={styles.supportBtn}>Need Help?</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;