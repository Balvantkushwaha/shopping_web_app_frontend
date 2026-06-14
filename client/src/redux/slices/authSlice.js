import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAdminAuthenticated: false,
    customer: null,
    otpVerified: false,
  },
  reducers: {
    adminLogin: (state) => {
      state.isAdminAuthenticated = true;
    },
    adminLogout: (state) => {
      state.isAdminAuthenticated = false;
    },
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    setOtpVerified: (state, action) => {
      state.otpVerified = action.payload;
    },
  },
});

export const { adminLogin, adminLogout, setCustomer, setOtpVerified } = authSlice.actions;
export default authSlice.reducer;