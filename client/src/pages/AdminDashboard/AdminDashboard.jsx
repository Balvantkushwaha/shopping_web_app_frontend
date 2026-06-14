import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { adminLogout } from '../../redux/slices/authSlice';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  ShoppingBag, 
  Users, 
  LogOut,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  UserCheck
} from 'lucide-react';
import { products } from '../../data/products';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const { isAdminAuthenticated } = useAppSelector(state => state.auth);

  if (!isAdminAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const stats = {
    totalProducts: products.length,
    totalOrders: 156,
    totalCustomers: 1234,
    totalRevenue: 45678,
    categories: [...new Set(products.map(p => p.category))].length
  };

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate('/admin/login');
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className={styles.dashboard}>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><Package size={24} /></div>
                <div className={styles.statInfo}>
                  <h3>Total Products</h3>
                  <p>{stats.totalProducts}</p>
                </div>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statIcon}><ShoppingBag size={24} /></div>
                <div className={styles.statInfo}>
                  <h3>Total Orders</h3>
                  <p>{stats.totalOrders}</p>
                </div>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statIcon}><Users size={24} /></div>
                <div className={styles.statInfo}>
                  <h3>Total Customers</h3>
                  <p>{stats.totalCustomers}</p>
                </div>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statIcon}><DollarSign size={24} /></div>
                <div className={styles.statInfo}>
                  <h3>Total Revenue</h3>
                  <p>${stats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statIcon}><Tags size={24} /></div>
                <div className={styles.statInfo}>
                  <h3>Categories</h3>
                  <p>{stats.categories}</p>
                </div>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statIcon}><TrendingUp size={24} /></div>
                <div className={styles.statInfo}>
                  <h3>Growth</h3>
                  <p>+23.5%</p>
                </div>
              </div>
            </div>
            
            <div className={styles.recentOrders}>
              <h2>Recent Orders</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#ORD001</td>
                    <td>John Doe</td>
                    <td>$299.99</td>
                    <td><span className={styles.statusDelivered}>Delivered</span></td>
                    <td>2024-01-15</td>
                  </tr>
                  <tr>
                    <td>#ORD002</td>
                    <td>Jane Smith</td>
                    <td>$159.99</td>
                    <td><span className={styles.statusProcessing}>Processing</span></td>
                    <td>2024-01-14</td>
                  </tr>
                  <tr>
                    <td>#ORD003</td>
                    <td>Mike Johnson</td>
                    <td>$459.99</td>
                    <td><span className={styles.statusShipped}>Shipped</span></td>
                    <td>2024-01-13</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'products':
        return (
          <div className={styles.productsSection}>
            <div className={styles.sectionHeader}>
              <h2>Products Management</h2>
              <button className={styles.addBtn}>+ Add New Product</button>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 10).map(product => (
                  <tr key={product.id}>
                    <td>#{product.id}</td>
                    <td><img src={product.images[0]} alt={product.name} className={styles.productThumb} /></td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    <td>{product.inStock ? 'In Stock' : 'Out of Stock'}</td>
                    <td>
                      <button className={styles.editBtn}>Edit</button>
                      <button className={styles.deleteBtn}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={styles.adminDashboard}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>BLACK STUDIO</h2>
          <p>Admin Panel</p>
        </div>
        
        <nav className={styles.sidebarNav}>
          <button 
            className={`${styles.navBtn} ${activeTab === 'dashboard' ? styles.active : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button 
            className={`${styles.navBtn} ${activeTab === 'products' ? styles.active : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={20} />
            Products
          </button>
          <button 
            className={`${styles.navBtn} ${activeTab === 'categories' ? styles.active : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <Tags size={20} />
            Categories
          </button>
          <button 
            className={`${styles.navBtn} ${activeTab === 'orders' ? styles.active : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingBag size={20} />
            Orders
          </button>
          <button 
            className={`${styles.navBtn} ${activeTab === 'customers' ? styles.active : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            <Users size={20} />
            Customers
          </button>
        </nav>
        
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={20} />
          Logout
        </button>
      </div>
      
      <div className={styles.mainContent}>
        <div className={styles.contentHeader}>
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
        </div>
        <div className={styles.content}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;