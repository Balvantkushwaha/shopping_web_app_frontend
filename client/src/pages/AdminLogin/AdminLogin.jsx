// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAppDispatch } from '../../redux/hooks';
// import { adminLogin } from '../../redux/slices/authSlice';
// import { Shield, Phone, Lock } from 'lucide-react';
// import styles from './AdminLogin.module.css';

// const AdminLogin = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [sentOtp, setSentOtp] = useState('');

//   const handleSendOtp = () => {
//     if (mobileNumber === '9999999999') {
//       const dummyOtp = '123456';
//       setSentOtp(dummyOtp);
//       alert(`Admin OTP sent: ${dummyOtp} (Demo)`);
//     } else {
//       alert('Invalid admin number. Use: 9999999999');
//     }
//   };

//   const handleVerifyOtp = () => {
//     if (otp === sentOtp) {
//       dispatch(adminLogin());
//       navigate('/admin/dashboard');
//     } else {
//       alert('Invalid OTP');
//     }
//   };

//   return (
//     <div className={styles.adminLoginPage}>
//       <div className={styles.container}>
//         <div className={styles.loginBox}>
//           <div className={styles.logo}>
//             <Shield size={48} />
//             <h1>Admin Login</h1>
//             <p>BLACK STUDIO Admin Panel</p>
//           </div>
          
//           <div className={styles.form}>
//             <div className={styles.formGroup}>
//               <label>
//                 <Phone size={18} />
//                 Mobile Number
//               </label>
//               <input
//                 type="tel"
//                 placeholder="Enter admin mobile number"
//                 value={mobileNumber}
//                 onChange={(e) => setMobileNumber(e.target.value)}
//                 maxLength="10"
//               />
//             </div>
            
//             <button 
//               className={styles.sendOtpBtn}
//               onClick={handleSendOtp}
//             >
//               Send OTP
//             </button>
            
//             {sentOtp && (
//               <>
//                 <div className={styles.formGroup}>
//                   <label>
//                     <Lock size={18} />
//                     Enter OTP
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                   />
//                 </div>
                
//                 <button 
//                   className={styles.verifyBtn}
//                   onClick={handleVerifyOtp}
//                 >
//                   Verify & Login
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { adminLogin } from '../../redux/slices/authSlice';
import { Shield, Phone, Lock, CheckCircle, Users, BarChart3, Settings } from 'lucide-react';
import styles from './AdminLogin.module.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');

  const handleSendOtp = () => {
    if (mobileNumber === '9999999999') {
      const dummyOtp = '123456';
      setSentOtp(dummyOtp);
      alert(`Admin OTP sent: ${dummyOtp} (Demo)`);
    } else {
      alert('Invalid admin number. Use: 9999999999');
    }
  };

  const handleVerifyOtp = () => {
    if (otp === sentOtp) {
      dispatch(adminLogin());
      navigate('/admindashboard');
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <div className={styles.adminLoginPage}>
      <div className={styles.container}>
        {/* Left Side - Image/Brand Section */}
        <div className={styles.imageSide}>
          <div className={styles.imageSideContent}>
            <div className={styles.brandIcon}>
              <Shield size={40} />
              <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>BLACK STUDIO</span>
            </div>
            
            <h2>Welcome to <span>Admin Panel</span></h2>
            <p>Manage your store efficiently with our comprehensive admin dashboard.</p>
            
            <div className={styles.features}>
              <div className={styles.featureItem}>
                <CheckCircle size={18} />
                <span>Manage Products & Inventory</span>
              </div>
              <div className={styles.featureItem}>
                <Users size={18} />
                <span>Handle Customer Orders</span>
              </div>
              <div className={styles.featureItem}>
                <BarChart3 size={18} />
                <span>View Analytics & Reports</span>
              </div>
              <div className={styles.featureItem}>
                <Settings size={18} />
                <span>Configure Store Settings</span>
              </div>
            </div>
            
            <div className={styles.adminBadge}>
              🔐 Secure Admin Access
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className={styles.loginBox}>
          <div className={styles.logo}>
            <Shield size={48} />
            <h1>Admin Login</h1>
            <p>BLACK STUDIO Admin Panel</p>
          </div>
          
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label>
                <Phone size={18} />
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="Enter admin mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                maxLength="10"
              />
            </div>
            
            <button 
              className={styles.sendOtpBtn}
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
            
            {sentOtp && (
              <>
                <div className={styles.divider}>
                  <span>Verification</span>
                </div>
                
                <div className={styles.formGroup}>
                  <label>
                    <Lock size={18} />
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                
                <button 
                  className={styles.verifyBtn}
                  onClick={handleVerifyOtp}
                >
                  Verify & Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;