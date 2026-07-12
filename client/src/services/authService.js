// // import { api } from '../api/axios';

// import api from "../api/axios";

// class AuthService { 
//   // Register: Step 1 - Send OTP
//   async sendRegisterOTP(mobile) {
//     try {
//       const response = await api.post('/auth/register/init', { mobile });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   }

//   // Register: Step 2 - Verify OTP
//   async verifyRegisterOTP(mobile, otp) {
//     try {
//       const response = await api.post('/auth/register/verify-otp', { mobile, otp });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   }

//   // Register: Step 3 - Complete Registration
//   async completeRegistration(userData) {
//     try {
//       const response = await api.post('/auth/register/complete', userData);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   }

//   // Login with Password or OTP Request
//   async login(credentials) {
//     alert("Login API called with credentials: " + JSON.stringify(credentials));
//     try {
//       const response = await api.post('/auth/login/method', credentials);
//       console.log("Login response:", response.data);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   }

//   // Verify Login OTP
//   async verifyLoginOTP(mobile, otp) {
//     try {
//       const response = await api.post('/auth/login/verify-otp', { mobile, otp });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   }

//   // Forgot Password - Send OTP
//   async forgotPassword(mobile) {
//     try {
//       const response = await api.post('/auth/forget-password', { mobile });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   }

//   // Reset Password
//   async resetPassword(data) {
//     try {
//       const response = await api.put('/auth/reset-password', data);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   }

//   // Get User Profile
//   async getProfile() {
//     try {
//       const response = await api.get('/auth/profile');
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   }

//   // Logout
//   async logout() {
//     try {
//       const response = await api.post('/auth/logout');
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   }
// }

// export default new AuthService();