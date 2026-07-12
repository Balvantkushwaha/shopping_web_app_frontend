import { useSelector } from 'react-redux';
import { selectCustomer } from '../../redux/slices/authSlice';
import styles from './Profile.module.css';

const Profile = () => {
  const customer = useSelector(selectCustomer);

  return (
    <div className={styles.profile}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>My Profile</h1>
        </div>
        
        <div className={styles.profileCard}>
          <div className={styles.avatar}>
            {customer?.firstName?.charAt(0) || ''}
            {customer?.lastName?.charAt(0) || ''}
          </div>
          <h2>{customer?.firstName} {customer?.lastName}</h2>
          <p className={styles.role}>{customer?.role}</p>
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span className={styles.label}>Mobile</span>
              <span className={styles.value}>{customer?.mobile}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Email</span>
              <span className={styles.value}>{customer?.email || 'Not provided'}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>User ID</span>
              <span className={styles.value}>{customer?.userId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;