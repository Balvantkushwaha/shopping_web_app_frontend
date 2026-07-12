import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearCart } from "../../redux/slices/cartSlice";
import { setCustomer, setOtpVerified } from "../../redux/slices/authSlice";
import { Phone, Mail, MapPin, Lock, CheckCircle } from "lucide-react";
import styles from "./Checkout.module.css";
import { getCodCharges, getShippingCharges } from "../../services/charges";
import api from "../../api/axios";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, totalAmount, totalDiscountAmount } = useAppSelector(
    (state) => state.cart,
  );
  // const { otpVerified } = useAppSelector(state => state.auth);

  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentType, setPaymentType] = useState("ONLINE");
  const [shippingCharge, setShippingCharge] = useState(0);
  const [codCharge, setCodCharge] = useState(0);

  const subtotal = totalAmount;
  const discount = totalDiscountAmount;
  // const finalTotal = subtotal - discount;
  const finalTotal =
    subtotal -
    discount +
    shippingCharge +
    (paymentType === "COD" ? codCharge : 0);
  console.log("form data:", formData);
  const handleSendOtp = () => {
    if (mobileNumber.length === 10) {
      const dummyOtp = "123456";
      setSentOtp(dummyOtp);
      alert(`OTP sent: ₹${dummyOtp} (Demo)`);
    } else {
      alert("Please enter a valid 10-digit mobile number");
    }
  };

  const handleVerifyOtp = () => {
    if (otp === sentOtp) {
      dispatch(setOtpVerified(true));
      dispatch(setCustomer({ mobileNumber }));
      setStep(2);
    } else {
      alert("Invalid OTP");
    }
  };

  // const handleInputChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    if (name === "pincode") {
      const numericValue = value.replace(/\D/g, "").slice(0, 6);

      setFormData((prev) => ({
        ...prev,
        pincode: numericValue,
      }));

      if (numericValue.length === 6) {
        await getAddressByPincode(numericValue);

        const shippingData = await getShippingCharges(
          items,
          numericValue,
          paymentType,
        );

        const codData = await getCodCharges(items, numericValue, paymentType);

        setShippingCharge(shippingData.shipping_charge);
        setCodCharge(codData.cod_charge);
      } else {
        setFormData((prev) => ({
          ...prev,
          pincode: numericValue,
          city: "",
          state: "",
        }));
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async() => {
    if (!formData.FirstName.trim()) {
      alert("First Name is required");
      return;
    }

    if (!formData.LastName.trim()) {
      alert("Last Name is required");
      return;
    }

    if (!formData.email.trim()) {
      alert("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!formData.address.trim()) {
      alert("Address is required");
      return;
    }

    if (!formData.pincode.trim()) {
      alert("Pincode is required");
      return;
    }

    if (formData.pincode.length !== 6) {
      alert("Please enter a valid 6-digit pincode");
      return;
    }

    if (!formData.city.trim()) {
      alert("City is required");
      return;
    }

    if (!formData.state.trim()) {
      alert("State is required");
      return;
    }

    // Validate all fields
    if (Object.values(formData).every((field) => field.trim() !== "")) {
      await handleOrder()
    } else {
      alert("Please fill all fields");
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const getAddressByPincode = async (pincode) => {
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`,
      );

      const data = await response.json();

      if (data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0) {
        const office = data[0].PostOffice[0];

        setFormData((prev) => ({
          ...prev,
          city: office.District,
          state: office.State,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          city: "",
          state: "",
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const OrderDetails = {
    payment_type: paymentType,

    guest_mobile_no: mobileNumber,

    shippingAddress: {
      first_name: formData.FirstName,
      last_name: formData.LastName,
      phone: mobileNumber,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
    },

    sub_total: subtotal,
    total_discount: discount,

    shipping_charge: shippingCharge,

    cod_charge: paymentType === "COD" ? codCharge : 0,

    final_payable_amount: finalTotal,
  };

  console.log(OrderDetails);

  const handleOrder = async () => {
    const orderItems = items.map((item) => ({
      product_id: item.id,
      product_name: item.name,
      cover_image: item.image,
      mrp_price: item.price,
      discount_rate: item.discount_rate,
      selling_price: item.selling_price,
      quantity: item.quantity,
      size: item.size || "",
    }));
    console.log("orderItems:",orderItems)

    const OrderDetails = {
      payment_type: paymentType,

      guest_mobile_no: mobileNumber,

      shippingAddress: {
        first_name: formData.FirstName,
        last_name: formData.LastName,
        phone: mobileNumber,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },

      sub_total: subtotal,
      total_discount: discount,
      shipping_charge: shippingCharge,
      cod_charge: paymentType === "COD" ? codCharge : 0,
      final_payable_amount: finalTotal,
      items:orderItems
    };

    console.log("order detials:------",OrderDetails)

    try {
      // COD
      if (paymentType === "COD") {
        const res = await api.post("/order/create-order", {
          OrderDetails,        
        });

        if (res.data.success) {
          alert("Order placed successfully");

          dispatch(clearCart());
          navigate("/");
        }

        return;
      }

      // ONLINE PAYMENT
      const paymentRes = await api.post("/order/create-payment", {
        amount: finalTotal,
        notes:{
          guest_mobile_no:mobileNumber
        }
      });

      const razorpayOrder = paymentRes.data.data;
      console.log("razorpayOrder...",razorpayOrder)

      const options = {
        key: "rzp_test_SibXIetto2w3Uz",

        amount: razorpayOrder.amount,

        currency: razorpayOrder.currency,

        order_id: razorpayOrder.id,

        name: "Black Studio",

        description: "Order Payment",

        prefill: {
          name: `${formData.FirstName} ${formData.LastName}`,
          email: formData.email,
          contact: mobileNumber,
        },

        handler: async function (response) {
          try {
            const verifyRes = await api.post("/order/create-order", {
              razorpay_order_id: response.razorpay_order_id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_signature: response.razorpay_signature,

              OrderDetails,             
            });

            if (verifyRes.data.success) {
              alert("Payment successful & Order placed");

              dispatch(clearCart());
              navigate("/");
            }
          } catch (error) {
            console.error(error);
            alert("Payment verification failed");
          }
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

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
                  <button className={styles.sendOtpBtn} onClick={handleSendOtp}>
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
                      First Name
                    </label>
                    <input
                      type="text"
                      name="FirstName"
                      placeholder="Enter your first name"
                      value={formData.FirstName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>
                      <CheckCircle size={18} />
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="LastName"
                      placeholder="Enter your last name"
                      value={formData.LastName}
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

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled
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
                      disabled
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {/* {step === 2 && ( */}
            <div className={styles.orderSummary}>
              <h2>Order Summary</h2>
              <div className={styles.orderItems}>
                {items.map((item) => (
                  <div key={item.id} className={styles.orderItem}>
                    <div className={styles.orderItemInfo}>
                      <span className={styles.orderItemName}>{item.name}</span>
                      <span className={styles.orderItemQty}>
                        x{item.quantity}
                      </span>
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
                  <span>Discount Amount</span>

                  <span>-₹{discount.toFixed(2)}</span>
                </div>

                <div className={styles.summaryRow}>
                  <span>Shipping Charge</span>
                  <span>
                    {shippingCharge > 0
                      ? `₹${shippingCharge.toFixed(2)}`
                      : "Free"}
                  </span>
                </div>

                {paymentType === "COD" && (
                  <div className={styles.summaryRow}>
                    <span>COD Charge</span>
                    <span>₹{codCharge.toFixed(2)}</span>
                  </div>
                )}
                <div className={styles.summaryRow}>
                  <span>Total</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className={styles.paymentSection}>
                <h3>Payment Method</h3>

                <label>
                  <input
                    type="radio"
                    value="COD"
                    checked={paymentType === "COD"}
                    onChange={() => setPaymentType("COD")}
                  />
                  Cash On Delivery
                </label>

                <label>
                  <input
                    type="radio"
                    value="ONLINE"
                    checked={paymentType === "ONLINE"}
                    onChange={() => setPaymentType("ONLINE")}
                  />
                  Pay Online
                </label>
              </div>

              <button
                className={styles.placeOrderBtn}
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
