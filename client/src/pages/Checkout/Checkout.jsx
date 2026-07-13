
// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // import { clearCart } from "../../redux/slices/cartSlice";
// // import { selectCustomer, selectIsAuthenticated } from "../../redux/slices/authSlice";
// // import { Phone, Mail, Lock, Save, User, Home, Edit2, Check, X } from "lucide-react";
// // import styles from "./Checkout.module.css";
// // import { getCodCharges, getShippingCharges } from "../../services/charges";
// // import api from "../../api/axios";
// // import { authApi } from "../../api/authApi";
// // import { LoginModal } from "../../LoginModal";

// // const Checkout = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useAppDispatch();
  
// //   // 🔴 Get auth state from Redux
// //   const isAuthenticated = useAppSelector(selectIsAuthenticated);
// //   const customer = useAppSelector(selectCustomer);
  
// //   const { items, totalAmount, totalDiscountAmount } = useAppSelector(
// //     (state) => state.cart,
// //   );

// //   const [mobileNumber, setMobileNumber] = useState("");
// //   const [isSavingAddress, setIsSavingAddress] = useState(false);
// //   const [isEditingAddress, setIsEditingAddress] = useState(false);
// //   const [showLoginModal, setShowLoginModal] = useState(false);
  
// //   // 🟢 Auto-fill user data if logged in
// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     address: "",
// //     city: "",
// //     state: "",
// //     pincode: "",
// //     addressId: null,
// //   });

// //   const [paymentType, setPaymentType] = useState("ONLINE");
// //   const [shippingCharge, setShippingCharge] = useState(0);
// //   const [codCharge, setCodCharge] = useState(0);

// //   const subtotal = totalAmount;
// //   const discount = totalDiscountAmount;
// //   const finalTotal =
// //     subtotal -
// //     discount +
// //     shippingCharge +
// //     (paymentType === "COD" ? codCharge : 0);

// //   // 🟢 Get default address from user's addresses array
// //   const getDefaultAddress = () => {
// //     if (!customer?.addresses || customer.addresses.length === 0) {
// //       return null;
// //     }
    
// //     // Find default address
// //     const defaultAddr = customer.addresses.find(addr => addr.isDefault === true);
// //     // If no default, use first address
// //     return defaultAddr || customer.addresses[0];
// //   };

// //   // 🟢 Check login status and auto-fill user data
// //   useEffect(() => {
// //     if (isAuthenticated && customer) {
// //       const defaultAddress = getDefaultAddress();
      
// //       setFormData({
// //         firstName: customer.firstName || "",
// //         lastName: customer.lastName || "",
// //         email: customer.email || "",
// //         address: defaultAddress?.street || "",
// //         city: defaultAddress?.city || "",
// //         state: defaultAddress?.state || "",
// //         pincode: defaultAddress?.pin_code?.toString() || "",
// //         addressId: defaultAddress?._id || null,
// //       });
      
// //       setMobileNumber(customer.mobile?.toString() || "");
// //     }
// //   }, [isAuthenticated, customer]);

// //   // 🟢 Save Address API Call
// //   const handleSaveAddress = async () => {
// //     if (!isAuthenticated) {
// //       alert("Please login first to save address");
// //       return;
// //     }

// //     // Validate address fields
// //     if (!formData.address.trim()) {
// //       alert("Please enter your address");
// //       return;
// //     }

// //     if (!formData.pincode || formData.pincode.length !== 6) {
// //       alert("Please enter a valid 6-digit pincode");
// //       return;
// //     }

// //     if (!formData.city.trim()) {
// //       alert("City is required");
// //       return;
// //     }

// //     if (!formData.state.trim()) {
// //       alert("State is required");
// //       return;
// //     }

// //     setIsSavingAddress(true);

// //     try {
// //       const addressData = {
// //         street: formData.address,
// //         city: formData.city,
// //         state: formData.state,
// //         pin_code: parseInt(formData.pincode),
// //         isDefault: true,
// //       };

// //       let response;
      
// //       // If address exists, update it, else add new
// //       if (formData.addressId) {
// //         response = await authApi.updateAddress(formData.addressId, addressData, formData.email || customer?.email || "");
// //       } else {
// //         response = await authApi.addAddress(addressData,formData.email || customer?.email || "");
// //       }

// //       if (response.success) {
// //         alert(formData.addressId ? "Address updated successfully!" : "Address saved successfully!");
// //         setIsEditingAddress(false);
        
// //         // Update local state
// //         setFormData((prev) => ({
// //           ...prev,
// //           address: formData.address,
// //           city: formData.city,
// //           state: formData.state,
// //           pincode: formData.pincode,
// //         }));
        
// //         // Refresh customer data
// //         await authApi.getProfile();
// //       }
// //     } catch (error) {
// //       console.error("Error saving address:", error);
// //       alert(error.response?.data?.message || "Failed to save address");
// //     } finally {
// //       setIsSavingAddress(false);
// //     }
// //   };

// //   // 🟢 Handle Edit Address
// //   const handleEditAddress = () => {
// //     setIsEditingAddress(true);
// //   };

// //   // 🟢 Handle Cancel Edit
// //   const handleCancelEdit = () => {
// //     // Reset to original address
// //     const defaultAddress = getDefaultAddress();
// //     setFormData((prev) => ({
// //       ...prev,
// //       address: defaultAddress?.street || "",
// //       city: defaultAddress?.city || "",
// //       state: defaultAddress?.state || "",
// //       pincode: defaultAddress?.pin_code?.toString() || "",
// //       addressId: defaultAddress?._id || null,
// //     }));
// //     setIsEditingAddress(false);
// //   };

// //   const handleInputChange = async (e) => {
// //     const { name, value } = e.target;

// //     if (name === "pincode") {
// //       const numericValue = value.replace(/\D/g, "").slice(0, 6);

// //       setFormData((prev) => ({
// //         ...prev,
// //         pincode: numericValue,
// //       }));

// //       if (numericValue.length === 6) {
// //         await getAddressByPincode(numericValue);

// //         const shippingData = await getShippingCharges(
// //           items,
// //           numericValue,
// //           paymentType,
// //         );

// //         const codData = await getCodCharges(items, numericValue, paymentType);

// //         setShippingCharge(shippingData.shipping_charge);
// //         setCodCharge(codData.cod_charge);
// //       } else {
// //         setFormData((prev) => ({
// //           ...prev,
// //           pincode: numericValue,
// //           city: "",
// //           state: "",
// //         }));
// //       }

// //       return;
// //     }

// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handlePlaceOrder = async () => {
// //     // 🟢 Check login before placing order
// //     if (!isAuthenticated) {
// //       setShowLoginModal(true);
// //       return;
// //     }

// //     // Validate address
// //     if (!formData.address.trim()) {
// //       alert("Address is required");
// //       return;
// //     }

// //     if (!formData.pincode || formData.pincode.length !== 6) {
// //       alert("Please enter a valid 6-digit pincode");
// //       return;
// //     }

// //     if (!formData.city.trim()) {
// //       alert("City is required");
// //       return;
// //     }

// //     if (!formData.state.trim()) {
// //       alert("State is required");
// //       return;
// //     }

// //     await handleOrder();
// //   };

// //   if (items.length === 0) {
// //     navigate("/cart");
// //     return null;
// //   }

// //   const getAddressByPincode = async (pincode) => {
// //     try {
// //       const response = await fetch(
// //         `https://api.postalpincode.in/pincode/${pincode}`,
// //       );

// //       const data = await response.json();

// //       if (data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0) {
// //         const office = data[0].PostOffice[0];

// //         setFormData((prev) => ({
// //           ...prev,
// //           city: office.District,
// //           state: office.State,
// //         }));
// //       } else {
// //         setFormData((prev) => ({
// //           ...prev,
// //           city: "",
// //           state: "",
// //         }));
// //       }
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   const handleOrder = async () => {
// //     const orderItems = items.map((item) => ({
// //       product_id: item.id,
// //       product_name: item.name,
// //       cover_image: item.image,
// //       mrp_price: item.price,
// //       discount_rate: item.discount_rate,
// //       selling_price: item.selling_price,
// //       quantity: item.quantity,
// //       size: item.size || "",
// //     }));

// //     const OrderDetails = {
// //       payment_type: paymentType,
// //       guest_mobile_no: mobileNumber || customer?.mobile,
// //       shippingAddress: {
// //         first_name: formData.firstName || customer?.firstName,
// //         last_name: formData.lastName || customer?.lastName,
// //         phone: mobileNumber || customer?.mobile,
// //         email: formData.email || customer?.email || "",
// //         address: formData.address,
// //         city: formData.city,
// //         state: formData.state,
// //         pincode: formData.pincode,
// //       },
// //       sub_total: subtotal,
// //       total_discount: discount,
// //       shipping_charge: shippingCharge,
// //       cod_charge: paymentType === "COD" ? codCharge : 0,
// //       final_payable_amount: finalTotal,
// //       items: orderItems,
// //       user_id: customer?._id || null,
// //     };

// //     try {
// //       // COD
// //       if (paymentType === "COD") {
// //         const res = await api.post("/order/create-order", {
// //           OrderDetails,
// //         });

// //         if (res.data.success) {
// //           alert("Order placed successfully");
// //           dispatch(clearCart());
// //           navigate("/");
// //         }
// //         return;
// //       }

// //       // ONLINE PAYMENT
// //       const paymentRes = await api.post("/order/create-payment", {
// //         amount: finalTotal,
// //         notes: {
// //           guest_mobile_no: mobileNumber || customer?.mobile,
// //         },
// //       });

// //       const razorpayOrder = paymentRes.data.data;

// //       const options = {
// //         key: "rzp_test_SibXIetto2w3Uz",
// //         amount: razorpayOrder.amount,
// //         currency: razorpayOrder.currency,
// //         order_id: razorpayOrder.id,
// //         name: "Black Studio",
// //         description: "Order Payment",
// //         prefill: {
// //           name: `${formData.firstName || customer?.firstName} ${formData.lastName || customer?.lastName}`,
// //           email: formData.email || customer?.email || "",
// //           contact: mobileNumber || customer?.mobile,
// //         },
// //         handler: async function (response) {
// //           try {
// //             const verifyRes = await api.post("/order/create-order", {
// //               razorpay_order_id: response.razorpay_order_id,
// //               razorpay_payment_id: response.razorpay_payment_id,
// //               razorpay_signature: response.razorpay_signature,
// //               OrderDetails,
// //             });

// //             if (verifyRes.data.success) {
// //               alert("Payment successful & Order placed");
// //               dispatch(clearCart());
// //               navigate("/");
// //             }
// //           } catch (error) {
// //             console.error(error);
// //             alert("Payment verification failed");
// //           }
// //         },
// //         theme: {
// //           color: "#3399cc",
// //         },
// //       };

// //       const razorpay = new window.Razorpay(options);
// //       razorpay.open();
// //     } catch (error) {
// //       console.error(error);
// //       alert("Something went wrong");
// //     }
// //   };

// //   // 🟢 Handle Login Success
// //   const handleLoginSuccess = () => {
// //     setShowLoginModal(false);
// //     // Refresh customer data
// //     // The useEffect will auto-fill data
// //   };

// //   return (
// //     <div className={styles.checkoutPage}>
// //       <div className={styles.container}>
// //         <h1 className={styles.title}>Checkout</h1>

// //         {/* 🟢 Login Warning Banner */}
// //         {!isAuthenticated && (
// //           <div className={styles.loginBanner}>
// //             <User size={20} />
// //             <span>Please login to proceed with checkout</span>
// //             <button 
// //               className={styles.loginBannerBtn}
// //               onClick={() => setShowLoginModal(true)}
// //             >
// //               Login Now
// //             </button>
// //           </div>
// //         )}

// //         <div className={styles.checkoutContainer}>
// //           <div className={styles.checkoutForm}>
// //             {/* Shipping Details */}
// //             {isAuthenticated && (
// //               <div className={styles.step}>
// //                 <div className={styles.stepHeader}>
// //                   <h2>Shipping Details</h2>
// //                   {!isEditingAddress && formData.addressId && (
// //                     <button 
// //                       className={styles.editBtn}
// //                       onClick={handleEditAddress}
// //                     >
// //                       <Edit2 size={16} />
// //                       Edit Address
// //                     </button>
// //                   )}
// //                 </div>
                
// //                 {/* 🟢 User Info - Auto-filled from profile */}
// //                 {/* <div className={styles.userInfoCard}>
// //                   <div className={styles.userInfoRow}>
// //                     <span className={styles.userLabel}>Name:</span>
// //                     <span className={styles.userValue}>
// //                       {formData.firstName} {formData.lastName}
// //                     </span>
// //                   </div>
// //                   <div className={styles.userInfoRow}>
// //                     <span className={styles.userLabel}>Mobile:</span>
// //                     <span className={styles.userValue}>
// //                       {mobileNumber || customer?.mobile}
// //                     </span>
// //                   </div>
// //                 </div> */}

// //                 {/* 🟢 Address Fields */}
// //                 <div className={styles.addressSection}>
// //                   <div className={styles.formGroup}>
// //                     <label>
// //                       <Home size={18} />
// //                       Address <span className={styles.required}>*</span>
// //                     </label>
// //                     <textarea
// //                       name="address"
// //                       placeholder="Enter your full address (House no, Street, Locality)"
// //                       rows="3"
// //                       value={formData.address}
// //                       onChange={handleInputChange}
// //                       disabled={!isEditingAddress}
// //                       className={!isEditingAddress ? styles.disabledInput : ""}
// //                     />
// //                   </div>

// //                   <div className={styles.formRow}>
// //                     <div className={styles.formGroup}>
// //                       <label>
// //                         Pincode <span className={styles.required}>*</span>
// //                       </label>
// //                       <input
// //                         type="text"
// //                         name="pincode"
// //                         placeholder="Enter 6-digit pincode"
// //                         value={formData.pincode}
// //                         onChange={handleInputChange}
// //                         maxLength="6"
// //                         disabled={!isEditingAddress}
// //                         className={!isEditingAddress ? styles.disabledInput : ""}
// //                       />
// //                     </div>

// //                     <div className={styles.formGroup}>
// //                       <label>City <span className={styles.required}>*</span></label>
// //                       <input
// //                         type="text"
// //                         name="city"
// //                         placeholder="City"
// //                         value={formData.city}
// //                         onChange={handleInputChange}
// //                         disabled={!isEditingAddress}
// //                         className={!isEditingAddress ? styles.disabledInput : ""}
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className={styles.formRow}>
// //                     <div className={styles.formGroup}>
// //                       <label>State <span className={styles.required}>*</span></label>
// //                       <input
// //                         type="text"
// //                         name="state"
// //                         placeholder="State"
// //                         value={formData.state}
// //                         onChange={handleInputChange}
// //                         disabled={!isEditingAddress}
// //                         className={!isEditingAddress ? styles.disabledInput : ""}
// //                       />
// //                     </div>

// //                     <div className={styles.formGroup}>
// //                       <label>
// //                         <Mail size={18} />
// //                         Email <span className={styles.optional}>(Optional)</span>
// //                       </label>
// //                       <input
// //                         type="email"
// //                         name="email"
// //                         placeholder="Enter your email"
// //                         value={formData.email}
// //                         onChange={handleInputChange}
// //                         disabled={!isEditingAddress}
// //                         className={!isEditingAddress ? styles.disabledInput : ""}
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* 🟢 Save Address Button */}
// //                 {isAuthenticated && (
// //                   <div className={styles.addressActions}>
// //                     {isEditingAddress ? (
// //                       <>
// //                         <button
// //                           className={styles.cancelBtn}
// //                           onClick={handleCancelEdit}
// //                           disabled={isSavingAddress}
// //                         >
// //                           <X size={18} />
// //                           Cancel
// //                         </button>
// //                         <button
// //                           className={styles.saveAddressBtn}
// //                           onClick={handleSaveAddress}
// //                           disabled={isSavingAddress}
// //                         >
// //                           <Save size={18} />
// //                           {isSavingAddress ? "Saving..." : "Save Address"}
// //                         </button>
// //                       </>
// //                     ) : (
// //                       <div className={styles.addressSaved}>
// //                         <Check size={18} />
// //                         <span>Address saved</span>
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>

// //           {/* Order Summary */}
// //           <div className={styles.orderSummary}>
// //             <h2>Order Summary</h2>
// //             <div className={styles.orderItems}>
// //               {items.map((item) => (
// //                 <div key={item.id} className={styles.orderItem}>
// //                   <div className={styles.orderItemInfo}>
// //                     <span className={styles.orderItemName}>{item.name}</span>
// //                     <span className={styles.orderItemQty}>
// //                       x{item.quantity}
// //                     </span>
// //                   </div>
// //                   <span>₹{(item.price * item.quantity).toFixed(2)}</span>
// //                 </div>
// //               ))}
// //             </div>

// //             <div className={styles.summaryDetails}>
// //               <div className={styles.summaryRow}>
// //                 <span>Subtotal</span>
// //                 <span>₹{subtotal.toFixed(2)}</span>
// //               </div>
// //               <div className={styles.summaryRow}>
// //                 <span>Discount</span>
// //                 <span>-₹{discount.toFixed(2)}</span>
// //               </div>
// //               <div className={styles.summaryRow}>
// //                 <span>Shipping</span>
// //                 <span>
// //                   {shippingCharge > 0
// //                     ? `₹${shippingCharge.toFixed(2)}`
// //                     : "Free"}
// //                 </span>
// //               </div>
// //               {paymentType === "COD" && (
// //                 <div className={styles.summaryRow}>
// //                   <span>COD Charge</span>
// //                   <span>₹{codCharge.toFixed(2)}</span>
// //                 </div>
// //               )}
// //               <div className={`${styles.summaryRow} ${styles.totalRow}`}>
// //                 <span>Total</span>
// //                 <span>₹{finalTotal.toFixed(2)}</span>
// //               </div>
// //             </div>

// //             <div className={styles.paymentSection}>
// //               <h3>Payment Method</h3>
// //               <label>
// //                 <input
// //                   type="radio"
// //                   value="COD"
// //                   checked={paymentType === "COD"}
// //                   onChange={() => setPaymentType("COD")}
// //                 />
// //                 Cash On Delivery
// //               </label>
// //               <label>
// //                 <input
// //                   type="radio"
// //                   value="ONLINE"
// //                   checked={paymentType === "ONLINE"}
// //                   onChange={() => setPaymentType("ONLINE")}
// //                 />
// //                 Pay Online
// //               </label>
// //             </div>

// //             <button
// //               className={styles.placeOrderBtn}
// //               onClick={handlePlaceOrder}
// //               disabled={!isAuthenticated}
// //             >
// //               {!isAuthenticated ? "Login to Place Order" : "Place Order"}
// //             </button>

// //             {!isAuthenticated && (
// //               <p className={styles.loginRequiredMsg}>
// //                 Please login to place your order
// //               </p>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* 🟢 Login Modal */}
// //       <LoginModal
// //         isOpen={showLoginModal}
// //         onClose={() => setShowLoginModal(false)}
// //         onLoginSuccess={handleLoginSuccess}
// //         defaultTab="login"
// //       />
// //     </div>
// //   );
// // };

// // export default Checkout;





// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { clearCart } from "../../redux/slices/cartSlice";
// import { selectCustomer, selectIsAuthenticated } from "../../redux/slices/authSlice";
// import { Mail, Save, User, Home, Edit2, Check, X, ShoppingBag, Truck, CreditCard } from "lucide-react";
// import styles from "./Checkout.module.css";
// import { getCodCharges, getShippingCharges } from "../../services/charges";
// import api from "../../api/axios";
// import { authApi } from "../../api/authApi";
// import { LoginModal } from "../../LoginModal";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   // Redux State
//   const isAuthenticated = useAppSelector(selectIsAuthenticated);
//   const customer = useAppSelector(selectCustomer);
//   const { items, totalAmount, totalDiscountAmount } = useAppSelector((state) => state.cart);

//   // Local State
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [isSavingAddress, setIsSavingAddress] = useState(false);
//   const [isEditingAddress, setIsEditingAddress] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [paymentType, setPaymentType] = useState("ONLINE");
//   const [shippingCharge, setShippingCharge] = useState(0);
//   const [codCharge, setCodCharge] = useState(0);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     addressId: null,
//   });

//   // Calculations
//   const subtotal = totalAmount;
//   const discount = totalDiscountAmount;
//   const finalTotal = subtotal - discount + shippingCharge + (paymentType === "COD" ? codCharge : 0);

//   // Helper Functions
//   const getDefaultAddress = () => {
//     if (!customer?.addresses || customer.addresses.length === 0) return null;
//     const defaultAddr = customer.addresses.find(addr => addr.isDefault === true);
//     return defaultAddr || customer.addresses[0];
//   };

//   // Auto-fill user data on login
//   useEffect(() => {
//     if (isAuthenticated && customer) {
//       const defaultAddress = getDefaultAddress();
//       setFormData({
//         firstName: customer.firstName || "",
//         lastName: customer.lastName || "",
//         email: customer.email || "",
//         address: defaultAddress?.street || "",
//         city: defaultAddress?.city || "",
//         state: defaultAddress?.state || "",
//         pincode: defaultAddress?.pin_code?.toString() || "",
//         addressId: defaultAddress?._id || null,
//       });
//       setMobileNumber(customer.mobile?.toString() || "");
//     }
//   }, [isAuthenticated, customer]);

//   // Get address from pincode
//   const getAddressByPincode = async (pincode) => {
//     try {
//       const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
//       const data = await response.json();
//       if (data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0) {
//         const office = data[0].PostOffice[0];
//         setFormData((prev) => ({
//           ...prev,
//           city: office.District,
//           state: office.State,
//         }));
//       } else {
//         setFormData((prev) => ({
//           ...prev,
//           city: "",
//           state: "",
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching pincode data:", error);
//     }
//   };

//   // Handle Input Change
//   const handleInputChange = async (e) => {
//     const { name, value } = e.target;

//     if (name === "pincode") {
//       const numericValue = value.replace(/\D/g, "").slice(0, 6);
//       setFormData((prev) => ({ ...prev, pincode: numericValue }));

//       if (numericValue.length === 6) {
//         await getAddressByPincode(numericValue);
//         const shippingData = await getShippingCharges(items, numericValue, paymentType);
//         const codData = await getCodCharges(items, numericValue, paymentType);
//         setShippingCharge(shippingData.shipping_charge);
//         setCodCharge(codData.cod_charge);
//       } else {
//         setFormData((prev) => ({ ...prev, city: "", state: "" }));
//       }
//       return;
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Save Address
//   const handleSaveAddress = async () => {
//     if (!isAuthenticated) {
//       alert("Please login first to save address");
//       return;
//     }

//     if (!formData.address.trim()) {
//       alert("Please enter your address");
//       return;
//     }

//     if (!formData.pincode || formData.pincode.length !== 6) {
//       alert("Please enter a valid 6-digit pincode");
//       return;
//     }

//     if (!formData.city.trim()) {
//       alert("City is required");
//       return;
//     }

//     if (!formData.state.trim()) {
//       alert("State is required");
//       return;
//     }

//     setIsSavingAddress(true);

//     try {
//       const addressData = {
//         street: formData.address,
//         city: formData.city,
//         state: formData.state,
//         pin_code: parseInt(formData.pincode),
//         isDefault: true,
//       };

//       let response;
//       if (formData.addressId) {
//         response = await authApi.updateAddress(formData.addressId, addressData, formData.email || customer?.email || "");
//       } else {
//         response = await authApi.addAddress(addressData, formData.email || customer?.email || "");
//       }

//       if (response.success) {
//         alert(formData.addressId ? "Address updated successfully!" : "Address saved successfully!");
//         setIsEditingAddress(false);
//         await authApi.getProfile();
//       }
//     } catch (error) {
//       console.error("Error saving address:", error);
//       alert(error.response?.data?.message || "Failed to save address");
//     } finally {
//       setIsSavingAddress(false);
//     }
//   };

//   // Edit/Cancel Address
//   const handleEditAddress = () => setIsEditingAddress(true);
//   const handleCancelEdit = () => {
//     const defaultAddress = getDefaultAddress();
//     setFormData((prev) => ({
//       ...prev,
//       address: defaultAddress?.street || "",
//       city: defaultAddress?.city || "",
//       state: defaultAddress?.state || "",
//       pincode: defaultAddress?.pin_code?.toString() || "",
//       addressId: defaultAddress?._id || null,
//     }));
//     setIsEditingAddress(false);
//   };

//   // Place Order
//   const handlePlaceOrder = async () => {
//     if (!isAuthenticated) {
//       setShowLoginModal(true);
//       return;
//     }

//     if (!formData.address.trim()) {
//       alert("Address is required");
//       return;
//     }

//     if (!formData.pincode || formData.pincode.length !== 6) {
//       alert("Please enter a valid 6-digit pincode");
//       return;
//     }

//     if (!formData.city.trim()) {
//       alert("City is required");
//       return;
//     }

//     if (!formData.state.trim()) {
//       alert("State is required");
//       return;
//     }

//     await handleOrder();
//   };

//   // Handle Order
//   const handleOrder = async () => {
//     const orderItems = items.map((item) => ({
//       product_id: item.id,
//       product_name: item.name,
//       cover_image: item.image,
//       mrp_price: item.price,
//       discount_rate: item.discount_rate,
//       selling_price: item.selling_price,
//       quantity: item.quantity,
//       size: item.size || "",
//     }));

//     const OrderDetails = {
//       payment_type: paymentType,
//       guest_mobile_no: mobileNumber || customer?.mobile,
//       shippingAddress: {
//         first_name: formData.firstName || customer?.firstName,
//         last_name: formData.lastName || customer?.lastName,
//         phone: mobileNumber || customer?.mobile,
//         email: formData.email || customer?.email || "",
//         address: formData.address,
//         city: formData.city,
//         state: formData.state,
//         pincode: formData.pincode,
//       },
//       sub_total: subtotal,
//       total_discount: discount,
//       shipping_charge: shippingCharge,
//       cod_charge: paymentType === "COD" ? codCharge : 0,
//       final_payable_amount: finalTotal,
//       items: orderItems,
//       user_id: customer?._id || null,
//     };

//     try {
//       // COD Payment
//       if (paymentType === "COD") {
//         const res = await api.post("/order/create-order", { OrderDetails });
//         if (res.data.success) {
//           alert("Order placed successfully!");
//           dispatch(clearCart());
//           navigate("/");
//         }
//         return;
//       }

//       // Online Payment
//       const paymentRes = await api.post("/order/create-payment", {
//         amount: finalTotal,
//         notes: { guest_mobile_no: mobileNumber || customer?.mobile },
//       });

//       const razorpayOrder = paymentRes.data.data;
//       const options = {
//         key: "rzp_test_SibXIetto2w3Uz",
//         amount: razorpayOrder.amount,
//         currency: razorpayOrder.currency,
//         order_id: razorpayOrder.id,
//         name: "Black Studio",
//         description: "Order Payment",
//         prefill: {
//           name: `${formData.firstName || customer?.firstName} ${formData.lastName || customer?.lastName}`,
//           email: formData.email || customer?.email || "",
//           contact: mobileNumber || customer?.mobile,
//         },
//         handler: async function (response) {
//           try {
//             const verifyRes = await api.post("/order/create-order", {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               OrderDetails,
//             });
//             if (verifyRes.data.success) {
//               alert("Payment successful & Order placed!");
//               dispatch(clearCart());
//               navigate("/");
//             }
//           } catch (error) {
//             console.error(error);
//             alert("Payment verification failed");
//           }
//         },
//         theme: { color: "#2563eb" },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   // Handle Login Success
//   const handleLoginSuccess = () => {
//     setShowLoginModal(false);
//   };

//   // Redirect if cart is empty
//   if (items.length === 0) {
//     navigate("/cart");
//     return null;
//   }

//   return (
//     <div className={styles.checkoutPage}>
//       <div className={styles.container}>
//         <h1 className={styles.pageTitle}>Checkout</h1>

//         {/* Login Banner */}
//         {!isAuthenticated && (
//           <div className={styles.loginBanner}>
//             <User size={20} />
//             <span>Please login to proceed with checkout</span>
//             <button className={styles.loginBannerBtn} onClick={() => setShowLoginModal(true)}>
//               Login Now
//             </button>
//           </div>
//         )}

//         <div className={styles.checkoutGrid}>
//           {/* Left Column - Shipping Details */}
//           <div className={styles.shippingSection}>
//             {isAuthenticated && (
//               <div className={styles.card}>
//                 <div className={styles.cardHeader}>
//                   <div className={styles.cardTitle}>
//                     <Home size={20} />
//                     <h2>Shipping Details</h2>
//                   </div>
//                   {!isEditingAddress && formData.addressId && (
//                     <button className={styles.editBtn} onClick={handleEditAddress}>
//                       <Edit2 size={16} />
//                       Edit Address
//                     </button>
//                   )}
//                 </div>

//                 {/* User Info */}
//                 {/* <div className={styles.userInfoCard}>
//                   <div className={styles.userInfoRow}>
//                     <span className={styles.userLabel}>Name:</span>
//                     <span className={styles.userValue}>
//                       {formData.firstName} {formData.lastName}
//                     </span>
//                   </div>
//                   <div className={styles.userInfoRow}>
//                     <span className={styles.userLabel}>Mobile:</span>
//                     <span className={styles.userValue}>
//                       {mobileNumber || customer?.mobile}
//                     </span>
//                   </div>
//                 </div> */}

//                 {/* Address Fields */}
//                 <div className={styles.addressFields}>
//                   <div className={styles.formGroup}>
//                     <label>
//                       <Home size={16} />
//                       Address <span className={styles.required}>*</span>
//                     </label>
//                     <textarea
//                       name="address"
//                       placeholder="Enter your full address (House no, Street, Locality)"
//                       rows="3"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       disabled={!isEditingAddress}
//                       className={!isEditingAddress ? styles.disabledInput : ""}
//                     />
//                   </div>

//                   <div className={styles.formRow}>
//                     <div className={styles.formGroup}>
//                       <label>
//                         Pincode <span className={styles.required}>*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="pincode"
//                         placeholder="Enter 6-digit pincode"
//                         value={formData.pincode}
//                         onChange={handleInputChange}
//                         maxLength="6"
//                         disabled={!isEditingAddress}
//                         className={!isEditingAddress ? styles.disabledInput : ""}
//                       />
//                     </div>
//                     <div className={styles.formGroup}>
//                       <label>City <span className={styles.required}>*</span></label>
//                       <input
//                         type="text"
//                         name="city"
//                         placeholder="City"
//                         value={formData.city}
//                         onChange={handleInputChange}
//                         disabled={!isEditingAddress}
//                         className={!isEditingAddress ? styles.disabledInput : ""}
//                       />
//                     </div>
//                   </div>

//                   <div className={styles.formRow}>
//                     <div className={styles.formGroup}>
//                       <label>State <span className={styles.required}>*</span></label>
//                       <input
//                         type="text"
//                         name="state"
//                         placeholder="State"
//                         value={formData.state}
//                         onChange={handleInputChange}
//                         disabled={!isEditingAddress}
//                         className={!isEditingAddress ? styles.disabledInput : ""}
//                       />
//                     </div>
//                     <div className={styles.formGroup}>
//                       <label>
//                         <Mail size={16} />
//                         Email <span className={styles.optional}>(Optional)</span>
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         placeholder="Enter your email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         disabled={!isEditingAddress}
//                         className={!isEditingAddress ? styles.disabledInput : ""}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Address Actions */}
//                 <div className={styles.addressActions}>
//                   {isEditingAddress ? (
//                     <>
//                       <button className={styles.cancelBtn} onClick={handleCancelEdit} disabled={isSavingAddress}>
//                         <X size={18} />
//                         Cancel
//                       </button>
//                       <button className={styles.saveAddressBtn} onClick={handleSaveAddress} disabled={isSavingAddress}>
//                         <Save size={18} />
//                         {isSavingAddress ? "Saving..." : "Save Address"}
//                       </button>
//                     </>
//                   ) : (
//                     <div className={styles.addressSaved}>
//                       <Check size={18} />
//                       <span>Address saved</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Order Summary */}
//           <div className={styles.summarySection}>
//             <div className={styles.card}>
//               <div className={styles.cardHeader}>
//                 <div className={styles.cardTitle}>
//                   <ShoppingBag size={20} />
//                   <h2>Order Summary</h2>
//                 </div>
//                 <span className={styles.itemCount}>{items.length} items</span>
//               </div>

//               <div className={styles.orderItems}>
//                 {items.map((item) => (
//                   <div key={item.id} className={styles.orderItem}>
//                     <div className={styles.orderItemInfo}>
//                       <img src={item.image} alt={item.name} className={styles.orderItemImage} />
//                       <div>
//                         <p className={styles.orderItemName}>{item.name}</p>
//                         <span className={styles.orderItemQty}>Qty: {item.quantity}</span>
//                       </div>
//                     </div>
//                     <span className={styles.orderItemPrice}>₹{(item.price * item.quantity).toFixed(2)}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className={styles.summaryDetails}>
//                 <div className={styles.summaryRow}>
//                   <span>Subtotal</span>
//                   <span>₹{subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className={styles.summaryRow}>
//                   <span>Discount</span>
//                   <span className={styles.discountText}>-₹{discount.toFixed(2)}</span>
//                 </div>
//                 <div className={styles.summaryRow}>
//                   <span>
//                     <Truck size={16} />
//                     Shipping
//                   </span>
//                   <span>{shippingCharge > 0 ? `₹${shippingCharge.toFixed(2)}` : "Free"}</span>
//                 </div>
//                 {paymentType === "COD" && (
//                   <div className={styles.summaryRow}>
//                     <span>COD Charge</span>
//                     <span>₹{codCharge.toFixed(2)}</span>
//                   </div>
//                 )}
//                 <div className={`${styles.summaryRow} ${styles.totalRow}`}>
//                   <span>Total</span>
//                   <span>₹{finalTotal.toFixed(2)}</span>
//                 </div>
//               </div>

//               <div className={styles.paymentSection}>
//                 <h3 className={styles.paymentTitle}>
//                   <CreditCard size={18} />
//                   Payment Method
//                 </h3>
//                 <div className={styles.paymentOptions}>
//                   <label className={styles.paymentOption}>
//                     <input
//                       type="radio"
//                       value="COD"
//                       checked={paymentType === "COD"}
//                       onChange={() => setPaymentType("COD")}
//                     />
//                     <span>Cash On Delivery</span>
//                   </label>
//                   <label className={styles.paymentOption}>
//                     <input
//                       type="radio"
//                       value="ONLINE"
//                       checked={paymentType === "ONLINE"}
//                       onChange={() => setPaymentType("ONLINE")}
//                     />
//                     <span>Pay Online</span>
//                   </label>
//                 </div>
//               </div>

//               <button className={styles.placeOrderBtn} onClick={handlePlaceOrder} disabled={!isAuthenticated}>
//                 {!isAuthenticated ? "Login to Place Order" : "Place Order"}
//               </button>

//               {!isAuthenticated && (
//                 <p className={styles.loginRequiredMsg}>Please login to place your order</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Login Modal */}
//       <LoginModal
//         isOpen={showLoginModal}
//         onClose={() => setShowLoginModal(false)}
//         onLoginSuccess={handleLoginSuccess}
//         defaultTab="login"
//       />
//     </div>
//   );
// };

// export default Checkout;


















import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearCart } from "../../redux/slices/cartSlice";
import { selectCustomer, selectIsAuthenticated } from "../../redux/slices/authSlice";
import { Mail, Save, User, Home, Edit2, Check, X, ShoppingBag, Truck, CreditCard, MapPin, Phone, User as UserIcon } from "lucide-react";
import styles from "./Checkout.module.css";
import { getCodCharges, getShippingCharges } from "../../services/charges";
import api from "../../api/axios";
import { authApi } from "../../api/authApi";
import { LoginModal } from "../../LoginModal";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Redux State
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const customer = useAppSelector(selectCustomer);
  const { items, totalAmount, totalDiscountAmount } = useAppSelector((state) => state.cart);

  // Local State
  const [mobileNumber, setMobileNumber] = useState("");
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [paymentType, setPaymentType] = useState("ONLINE");
  const [shippingCharge, setShippingCharge] = useState(0);
  const [codCharge, setCodCharge] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    addressId: null,
  });

  // Calculations
  const subtotal = totalAmount;
  const discount = totalDiscountAmount;
  const finalTotal = subtotal - discount + shippingCharge + (paymentType === "COD" ? codCharge : 0);

  // Helper Functions
  const getDefaultAddress = () => {
    if (!customer?.addresses || customer.addresses.length === 0) return null;
    const defaultAddr = customer.addresses.find(addr => addr.isDefault === true);
    return defaultAddr || customer.addresses[0];
  };

  // Check if address exists
  const hasAddress = () => {
    return formData.address && formData.city && formData.state && formData.pincode;
  };

  // Auto-fill user data on login
  useEffect(() => {
    if (isAuthenticated && customer) {
      const defaultAddress = getDefaultAddress();
      setFormData({
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        email: customer.email || "",
        address: defaultAddress?.street || "",
        city: defaultAddress?.city || "",
        state: defaultAddress?.state || "",
        pincode: defaultAddress?.pin_code?.toString() || "",
        addressId: defaultAddress?._id || null,
      });
      setMobileNumber(customer.mobile?.toString() || "");
      
      // If address exists, don't show edit mode
      if (defaultAddress) {
        setIsEditingAddress(false);
      } else {
        setIsEditingAddress(true); // Show form if no address
      }
    }
  }, [isAuthenticated, customer]);

  // Get address from pincode
  const getAddressByPincode = async (pincode) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
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
      console.error("Error fetching pincode data:", error);
    }
  };

  // Handle Input Change
  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    if (name === "pincode") {
      const numericValue = value.replace(/\D/g, "").slice(0, 6);
      setFormData((prev) => ({ ...prev, pincode: numericValue }));

      if (numericValue.length === 6) {
        await getAddressByPincode(numericValue);
        const shippingData = await getShippingCharges(items, numericValue, paymentType);
        const codData = await getCodCharges(items, numericValue, paymentType);
        setShippingCharge(shippingData.shipping_charge);
        setCodCharge(codData.cod_charge);
      } else {
        setFormData((prev) => ({ ...prev, city: "", state: "" }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save Address
  const handleSaveAddress = async () => {
    if (!isAuthenticated) {
      alert("Please login first to save address");
      return;
    }

    if (!formData.address.trim()) {
      alert("Please enter your address");
      return;
    }

    if (!formData.pincode || formData.pincode.length !== 6) {
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

    setIsSavingAddress(true);

    try {
      const addressData = {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        pin_code: parseInt(formData.pincode),
        isDefault: true,
      };

      let response;
      if (formData.addressId) {
        response = await authApi.updateAddress(formData.addressId, addressData, formData.email || customer?.email || "");
      } else {
        response = await authApi.addAddress(addressData, formData.email || customer?.email || "");
      }

      if (response.success) {
        alert(formData.addressId ? "Address updated successfully!" : "Address saved successfully!");
        setIsEditingAddress(false);
        await authApi.getProfile();
      }
    } catch (error) {
      console.error("Error saving address:", error);
      alert(error.response?.data?.message || "Failed to save address");
    } finally {
      setIsSavingAddress(false);
    }
  };

  // Edit/Cancel Address
  const handleEditAddress = () => setIsEditingAddress(true);
  const handleCancelEdit = () => {
    const defaultAddress = getDefaultAddress();
    setFormData((prev) => ({
      ...prev,
      address: defaultAddress?.street || "",
      city: defaultAddress?.city || "",
      state: defaultAddress?.state || "",
      pincode: defaultAddress?.pin_code?.toString() || "",
      addressId: defaultAddress?._id || null,
    }));
    setIsEditingAddress(false);
  };

  // Place Order
  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (!formData.address.trim()) {
      alert("Please add your address first");
      setIsEditingAddress(true);
      return;
    }

    if (!formData.pincode || formData.pincode.length !== 6) {
      alert("Please enter a valid 6-digit pincode");
      setIsEditingAddress(true);
      return;
    }

    if (!formData.city.trim()) {
      alert("City is required");
      setIsEditingAddress(true);
      return;
    }

    if (!formData.state.trim()) {
      alert("State is required");
      setIsEditingAddress(true);
      return;
    }

    await handleOrder();
  };

  // Handle Order
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

    const OrderDetails = {
      payment_type: paymentType,
      guest_mobile_no: mobileNumber || customer?.mobile,
      shippingAddress: {
        first_name: formData.firstName || customer?.firstName,
        last_name: formData.lastName || customer?.lastName,
        phone: mobileNumber || customer?.mobile,
        email: formData.email || customer?.email || "",
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
      items: orderItems,
      user_id: customer?._id || null,
    };

    try {
      // COD Payment
      if (paymentType === "COD") {
        const res = await api.post("/order/create-order", { OrderDetails });
        if (res.data.success) {
          alert("Order placed successfully!");
          dispatch(clearCart());
          navigate("/");
        }
        return;
      }

      // Online Payment
      const paymentRes = await api.post("/order/create-payment", {
        amount: finalTotal,
        notes: { guest_mobile_no: mobileNumber || customer?.mobile },
      });

      const razorpayOrder = paymentRes.data.data;
      const options = {
        key: "rzp_test_SibXIetto2w3Uz",
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
        name: "Black Studio",
        description: "Order Payment",
        prefill: {
          name: `${formData.firstName || customer?.firstName} ${formData.lastName || customer?.lastName}`,
          email: formData.email || customer?.email || "",
          contact: mobileNumber || customer?.mobile,
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
              alert("Payment successful & Order placed!");
              dispatch(clearCart());
              navigate("/");
            }
          } catch (error) {
            console.error(error);
            alert("Payment verification failed");
          }
        },
        theme: { color: "#2563eb" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Handle Login Success
  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Checkout</h1>

        {/* Login Banner */}
        {!isAuthenticated && (
          <div className={styles.loginBanner}>
            <User size={20} />
            <span>Please login to proceed with checkout</span>
            <button className={styles.loginBannerBtn} onClick={() => setShowLoginModal(true)}>
              Login Now
            </button>
          </div>
        )}

        <div className={styles.checkoutGrid}>
          {/* Left Column - Shipping Details */}
          <div className={styles.shippingSection}>
            {isAuthenticated && (
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitle}>
                    <MapPin size={20} />
                    <h2>Shipping Address</h2>
                  </div>
                  {!isEditingAddress && hasAddress() && (
                    <button className={styles.editBtn} onClick={handleEditAddress}>
                      <Edit2 size={16} />
                      Edit Address
                    </button>
                  )}
                </div>

                {/* 🟢 Show Address Card if exists and not editing */}
                {!isEditingAddress && hasAddress() ? (
                  <div className={styles.addressCard}>
                    <div className={styles.addressCardHeader}>
                      <div className={styles.addressCardBadge}>
                        <Check size={14} />
                        <span>Default Address</span>
                      </div>
                    </div>
                    
                    <div className={styles.addressCardBody}>
                      <div className={styles.addressCardRow}>
                        <UserIcon size={16} className={styles.addressCardIcon} />
                        <span className={styles.addressCardLabel}>Name:</span>
                        <span className={styles.addressCardValue}>
                          {formData.firstName} {formData.lastName}
                        </span>
                      </div>
                      
                      <div className={styles.addressCardRow}>
                        <Phone size={16} className={styles.addressCardIcon} />
                        <span className={styles.addressCardLabel}>Mobile:</span>
                        <span className={styles.addressCardValue}>
                          {mobileNumber || customer?.mobile}
                        </span>
                      </div>
                      
                      <div className={styles.addressCardRow}>
                        <Mail size={16} className={styles.addressCardIcon} />
                        <span className={styles.addressCardLabel}>Email:</span>
                        <span className={styles.addressCardValue}>
                          {formData.email || customer?.email || "Not provided"}
                        </span>
                      </div>
                      
                      <div className={styles.addressCardDivider} />
                      
                      <div className={styles.addressCardRow}>
                        <Home size={16} className={styles.addressCardIcon} />
                        <span className={styles.addressCardLabel}>Address:</span>
                        <span className={styles.addressCardValue}>
                          {formData.address}
                        </span>
                      </div>
                      
                      <div className={styles.addressCardRow}>
                        <span className={styles.addressCardLabel}>City:</span>
                        <span className={styles.addressCardValue}>{formData.city}</span>
                        <span className={styles.addressCardDividerText}>|</span>
                        <span className={styles.addressCardLabel}>State:</span>
                        <span className={styles.addressCardValue}>{formData.state}</span>
                      </div>
                      
                      <div className={styles.addressCardRow}>
                        <span className={styles.addressCardLabel}>Pincode:</span>
                        <span className={styles.addressCardValue}>{formData.pincode}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* 🟢 Show Form when no address or editing */
                  <div className={styles.addressFields}>
                    {/* User Info - Hidden in form, shown in address card only */}
                    
                    <div className={styles.formGroup}>
                      <label>
                        <Home size={16} />
                        Address <span className={styles.required}>*</span>
                      </label>
                      <textarea
                        name="address"
                        placeholder="Enter your full address (House no, Street, Locality)"
                        rows="3"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>
                          Pincode <span className={styles.required}>*</span>
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          placeholder="Enter 6-digit pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          maxLength="6"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>City <span className={styles.required}>*</span></label>
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>State <span className={styles.required}>*</span></label>
                        <input
                          type="text"
                          name="state"
                          placeholder="State"
                          value={formData.state}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>
                          <Mail size={16} />
                          Email <span className={styles.optional}>(Optional)</span>
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

                    {/* Address Actions */}
                    <div className={styles.addressActions}>
                      {isEditingAddress && hasAddress() && (
                        <button className={styles.cancelBtn} onClick={handleCancelEdit} disabled={isSavingAddress}>
                          <X size={18} />
                          Cancel
                        </button>
                      )}
                      <button 
                        className={`${styles.saveAddressBtn} ${!isEditingAddress && !hasAddress() ? styles.fullWidth : ""}`} 
                        onClick={handleSaveAddress} 
                        disabled={isSavingAddress}
                      >
                        <Save size={18} />
                        {isSavingAddress ? "Saving..." : hasAddress() ? "Update Address" : "Save Address"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className={styles.summarySection}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <ShoppingBag size={20} />
                  <h2>Order Summary</h2>
                </div>
                <span className={styles.itemCount}>{items.length} items</span>
              </div>

              <div className={styles.orderItems}>
                {items.map((item) => (
                  <div key={item.id} className={styles.orderItem}>
                    <div className={styles.orderItemInfo}>
                      <img src={item.image} alt={item.name} className={styles.orderItemImage} />
                      <div>
                        <p className={styles.orderItemName}>{item.name}</p>
                        <span className={styles.orderItemQty}>Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className={styles.orderItemPrice}>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className={styles.summaryDetails}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Discount</span>
                  <span className={styles.discountText}>-₹{discount.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>
                    <Truck size={16} />
                    Shipping
                  </span>
                  <span>{shippingCharge > 0 ? `₹${shippingCharge.toFixed(2)}` : "Free"}</span>
                </div>
                {paymentType === "COD" && (
                  <div className={styles.summaryRow}>
                    <span>COD Charge</span>
                    <span>₹{codCharge.toFixed(2)}</span>
                  </div>
                )}
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className={styles.paymentSection}>
                <h3 className={styles.paymentTitle}>
                  <CreditCard size={18} />
                  Payment Method
                </h3>
                <div className={styles.paymentOptions}>
                  <label className={styles.paymentOption}>
                    <input
                      type="radio"
                      value="COD"
                      checked={paymentType === "COD"}
                      onChange={() => setPaymentType("COD")}
                    />
                    <span>Cash On Delivery</span>
                  </label>
                  <label className={styles.paymentOption}>
                    <input
                      type="radio"
                      value="ONLINE"
                      checked={paymentType === "ONLINE"}
                      onChange={() => setPaymentType("ONLINE")}
                    />
                    <span>Pay Online</span>
                  </label>
                </div>
              </div>

              <button 
                className={styles.placeOrderBtn} 
                onClick={handlePlaceOrder} 
                disabled={!isAuthenticated || !hasAddress()}
              >
                {!isAuthenticated ? "Login to Place Order" : !hasAddress() ? "Add Address First" : "Place Order"}
              </button>

              {!isAuthenticated && (
                <p className={styles.loginRequiredMsg}>Please login to place your order</p>
              )}
              {isAuthenticated && !hasAddress() && (
                <p className={styles.addressRequiredMsg}>Please add your shipping address</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
        defaultTab="login"
      />
    </div>
  );
};

export default Checkout;