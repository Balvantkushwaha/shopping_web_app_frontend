import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearCart } from '../../redux/slices/cartSlice';
import { setCustomer, setOtpVerified } from '../../redux/slices/authSlice';
import { Phone, Mail, MapPin, Building, Lock, CheckCircle } from 'lucide-react';
import styles from './Checkout.module.css';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, totalAmount } = useAppSelector(state => state.cart);
  const { otpVerified } = useAppSelector(state => state.auth);
  
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const subtotal = totalAmount;
  const discount = subtotal * 0.1;
  const finalTotal = subtotal - discount;

  const handleSendOtp = () => {
    if (mobileNumber.length === 10) {
      const dummyOtp = '123456';
      setSentOtp(dummyOtp);
      alert(`OTP sent: ₹{dummyOtp} (Demo)`);
    } else {
      alert('Please enter a valid 10-digit mobile number');
    }
  };

  const handleVerifyOtp = () => {
    if (otp === sentOtp) {
      dispatch(setOtpVerified(true));
      dispatch(setCustomer({ mobileNumber }));
      setStep(2);
    } else {
      alert('Invalid OTP');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = () => {
    // Validate all fields
    if (Object.values(formData).every(field => field.trim() !== '')) {
      alert('Order placed successfully!');
      dispatch(clearCart());
      navigate('/');
    } else {
      alert('Please fill all fields');
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Checkout</h1>
        
        <div className={styles.checkoutContainer}>
          <div className={styles.checkoutForm}>
            {/* Step 1: Mobile Verification */}
            {step === 1 && (
              <div className={styles.step}>
                <h2>Step 1: Mobile Verification</h2>
                <div className={styles.formGroup}>
                  <label>
                    <Phone size={18} />
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    maxLength="10"
                  />
                  <button 
                    className={styles.sendOtpBtn}
                    onClick={handleSendOtp}
                  >
                    Send OTP
                  </button>
                </div>
                
                {sentOtp && (
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
                    <button 
                      className={styles.verifyBtn}
                      onClick={handleVerifyOtp}
                    >
                      Verify OTP
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Step 2: Shipping Details */}
            {step === 2 && (
              <div className={styles.step}>
                <h2>Step 2: Shipping Details</h2>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>
                      <CheckCircle size={18} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>
                      <Mail size={18} />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label>
                    <MapPin size={18} />
                    Address
                  </label>
                  <textarea
                    name="address"
                    placeholder="Enter your full address"
                    rows="3"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <button 
                  className={styles.placeOrderBtn}
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className={styles.orderSummary}>
            <h2>Order Summary</h2>
            <div className={styles.orderItems}>
              {items.map(item => (
                <div key={item.id} className={styles.orderItem}>
                  <div className={styles.orderItemInfo}>
                    <span className={styles.orderItemName}>{item.name}</span>
                    <span className={styles.orderItemQty}>x{item.quantity}</span>
                  </div>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className={styles.summaryDetails}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Discount (10%)</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
              <div className={`₹{styles.summaryRow} ₹{styles.total}`}>
                <span>Total</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;