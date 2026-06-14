import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { adminLogin } from '../../redux/slices/authSlice';
import { Shield, Phone, Lock } from 'lucide-react';
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
      navigate('/admin');
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <div className={styles.adminLoginPage}>
      <div className={styles.container}>
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