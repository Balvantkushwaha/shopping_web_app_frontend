import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut, 
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  UserCircle
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectCustomer, clearCustomer } from '../../redux/slices/authSlice';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Profile.module.css';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { logout } = useAuth();
  const customer = useAppSelector(selectCustomer);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const getUserInitials = () => {
    if (!customer) return 'U';
    const first = customer.firstName?.charAt(0) || '';
    const last = customer.lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || customer.mobile?.toString().slice(-2) || 'U';
  };

  const getUserName = () => {
    if (!customer) return 'Account';
    const fullName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim();
    return fullName || customer.mobile || 'Account';
  };

  const handleLogout = async () => {
    // ✅ Browser's built-in confirm dialog
    const isConfirmed = window.confirm("Are you sure you want to logout?");

    // ❌ If user clicks Cancel, stop logout
    if (!isConfirmed) {
      return;
    }

    setIsLoggingOut(true);
    try {
      await logout();
      dispatch(clearCustomer());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    {
      icon: ShoppingBag,
      label: 'My Orders',
      onClick: () => navigate('/my-order'),
      badge: 'View all'
    },
    // {
    //   icon: Heart,
    //   label: 'Wishlist',
    //   onClick: () => navigate('/wishlist'),
    //   badge: '0 items'
    // },
    // {
    //   icon: MapPin,
    //   label: 'Addresses',
    //   onClick: () => navigate('/addresses'),
    //   badge: 'Manage'
    // },
    // {
    //   icon: Settings,
    //   label: 'Settings',
    //   onClick: () => navigate('/settings'),
    //   badge: 'Preferences'
    // },
  ];

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.profileHeaderContent}>
            <div className={styles.profileAvatarWrapper}>
              <div className={styles.profileAvatar}>
                {getUserInitials()}
              </div>
            </div>
            <div className={styles.profileInfo}>
              <h1 className={styles.profileName}>{getUserName()}</h1>
              <p className={styles.profileRole}>{customer?.role || 'Customer'}</p>
              <div className={styles.profileDetails}>
                {customer?.mobile && (
                  <span className={styles.profileDetail}>
                    <Phone size={14} />
                    {customer.mobile}
                  </span>
                )}
                {customer?.email && (
                  <span className={styles.profileDetail}>
                    <Mail size={14} />
                    {customer.email}
                  </span>
                )}
                {customer?.createdAt && (
                  <span className={styles.profileDetail}>
                    <Calendar size={14} />
                    Joined {new Date(customer.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {/* <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <ShoppingBag size={20} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>0</span>
              <span className={styles.statLabel}>Total Orders</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Heart size={20} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>0</span>
              <span className={styles.statLabel}>Wishlist Items</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <UserCircle size={20} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>{customer?.role || 'User'}</span>
              <span className={styles.statLabel}>Account Type</span>
            </div>
          </div>
        </div> */}

        {/* Menu Items */}
        <div className={styles.menuSection}>
          <h2 className={styles.menuTitle}>Account Settings</h2>
          <div className={styles.menuList}>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className={styles.menuItem}
                  onClick={item.onClick}
                >
                  <div className={styles.menuItemLeft}>
                    <Icon size={20} className={styles.menuIcon} />
                    <span className={styles.menuLabel}>{item.label}</span>
                  </div>
                  <div className={styles.menuItemRight}>
                    <span className={styles.menuBadge}>{item.badge}</span>
                    <ChevronRight size={16} className={styles.menuArrow} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Logout Button */}
        <button 
          className={styles.logoutButton}
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut size={20} />
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>

        {/* Version Info */}
        <div className={styles.versionInfo}>
          <p>Black Studio v1.0.0</p>
          <p>© 2026 All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;