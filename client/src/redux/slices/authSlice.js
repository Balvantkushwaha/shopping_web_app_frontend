// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     isAdminAuthenticated: false,
//     customer: null,
//     otpVerified: false,
//   },
//   reducers: {
//     adminLogin: (state) => {
//       state.isAdminAuthenticated = true;
//     },
//     adminLogout: (state) => {
//       state.isAdminAuthenticated = false;
//     },
//     setCustomer: (state, action) => {
//       state.customer = action.payload;
//     },
//     setOtpVerified: (state, action) => {
//       state.otpVerified = action.payload;
//     },
//   },
// });

// export const { adminLogin, adminLogout, setCustomer, setOtpVerified } = authSlice.actions;
// export default authSlice.reducer;








import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    customer: null,
    isAuthenticated: false,
    otpVerified: false,
    loading: false,
    error: null,
  },
  reducers: {
    // Set customer data
    setCustomer: (state, action) => {
      state.customer = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('isLoggedIn', 'true');
      }
    },

    // Clear customer (logout)
    clearCustomer: (state) => {
      state.customer = null;
      state.isAuthenticated = false;
      state.otpVerified = false;
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    },

    // Set OTP verification state
    setOtpVerified: (state, action) => {
      state.otpVerified = action.payload;
    },

    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set error
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Update customer profile
    updateCustomer: (state, action) => {
      state.customer = { ...state.customer, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.customer));
    },
  },
});

// Export actions
export const {
  setCustomer,
  clearCustomer,
  setOtpVerified,
  setLoading,
  setError,
  clearError,
  updateCustomer,
} = authSlice.actions;

// Selectors
export const selectCustomer = (state) => state.auth.customer;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectOtpVerified = (state) => state.auth.otpVerified;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;