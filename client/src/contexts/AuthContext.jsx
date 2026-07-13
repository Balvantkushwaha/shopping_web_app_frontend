// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../api/authApi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  clearCustomer,
  setCustomer as setReduxCustomer,
  setLoading as setReduxLoading,
  setError as setReduxError,
  clearError as clearReduxError,
  selectCustomer,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from '../redux/slices/authSlice';

// 🟢 CREATE CONTEXT
const AuthContext = createContext(null);

// 🟢 HOOK TO USE CONTEXT
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// 🟢 PROVIDER COMPONENT
export const AuthProvider = ({ children }) => {
  const dispatch = useAppDispatch();
  
  // 🔴 Read from Redux (Single source of truth)
  const customer = useAppSelector(selectCustomer);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  
  // Local state for initialization
  const [initialized, setInitialized] = useState(false);

  // Helper function
  const getErrorMessage = (error) => {
    return (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      'Something went wrong'
    );
  };

  // 🟢 CHECK AUTH - Public method
  const checkAuth = async () => {
    try {
      dispatch(setReduxLoading(true));
      dispatch(clearReduxError());

      const response = await authApi.getProfile();
      const profile = response?.data ?? response;

      if (profile) {
        dispatch(setReduxCustomer(profile));
      } else {
        dispatch(clearCustomer());
      }
      
      return profile;
    } catch (error) {
      console.error('Auth check failed:', error);
      dispatch(clearCustomer());
      dispatch(setReduxError(getErrorMessage(error)));
      throw error;
    } finally {
      dispatch(setReduxLoading(false));
    }
  };

  // 🟢 INITIALIZE AUTH ON APP START
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        dispatch(setReduxLoading(true));
        dispatch(clearReduxError());

        // Check if user exists in localStorage (for quick UI)
        const localUser = localStorage.getItem('user');
        if (localUser) {
          try {
            const userData = JSON.parse(localUser);
            dispatch(setReduxCustomer(userData));
          } catch (e) {
            // Invalid JSON, ignore
          }
        }

        // Verify with backend
        const response = await authApi.getProfile();
        const profile = response?.data ?? response;

        if (!isMounted) return;

        if (profile) {
          dispatch(setReduxCustomer(profile));
        } else {
          // No profile found, clear everything
          dispatch(clearCustomer());
        }
      } catch (authError) {
        if (!isMounted) return;

        console.error('Auth initialization failed:', authError);
        dispatch(clearCustomer());
        dispatch(setReduxError(getErrorMessage(authError)));
      } finally {
        if (isMounted) {
          dispatch(setReduxLoading(false));
          setInitialized(true);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  // 🟢 LOGIN WITH PASSWORD
  const loginWithPassword = async (mobile, password) => {
    try {
      dispatch(setReduxLoading(true));
      dispatch(clearReduxError());

      const response = await authApi.loginWithPassword(mobile, password);

      if (response?.data) {
        dispatch(setReduxCustomer(response.data));
        return response;
      }

      return response;
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      dispatch(setReduxError(errorMsg));
      throw error;
    } finally {
      dispatch(setReduxLoading(false));
    }
  };

  // 🟢 REQUEST LOGIN OTP
  const requestLoginOTP = async (mobile) => {
    try {
      dispatch(setReduxLoading(true));
      dispatch(clearReduxError());

      const response = await authApi.requestLoginOtp(mobile);
      return response;
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      dispatch(setReduxError(errorMsg));
      throw error;
    } finally {
      dispatch(setReduxLoading(false));
    }
  };

  // 🟢 VERIFY LOGIN OTP
  const verifyLoginOTP = async (mobile, otp) => {
    try {
      dispatch(setReduxLoading(true));
      dispatch(clearReduxError());

      const response = await authApi.verifyLoginOtp(mobile, otp);

      if (response?.data) {
        dispatch(setReduxCustomer(response.data));
      }

      return response;
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      dispatch(setReduxError(errorMsg));
      throw error;
    } finally {
      dispatch(setReduxLoading(false));
    }
  };

  // 🟢 REGISTER - INIT
  const registerInit = async (mobile) => {
    try {
      dispatch(setReduxLoading(true));
      dispatch(clearReduxError());

      const response = await authApi.initRegister(mobile);
      return response;
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      dispatch(setReduxError(errorMsg));
      throw error;
    } finally {
      dispatch(setReduxLoading(false));
    }
  };

  // 🟢 REGISTER - VERIFY OTP
  const registerVerifyOTP = async (mobile, otp) => {
    try {
      dispatch(setReduxLoading(true));
      dispatch(clearReduxError());

      const response = await authApi.verifyRegisterOtp(mobile, otp);
      return response;
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      dispatch(setReduxError(errorMsg));
      throw error;
    } finally {
      dispatch(setReduxLoading(false));
    }
  };

  // 🟢 REGISTER - COMPLETE
  const registerComplete = async (userData) => {
    try {
      dispatch(setReduxLoading(true));
      dispatch(clearReduxError());

      const response = await authApi.completeRegister(userData);

      if (response?.data) {
        dispatch(setReduxCustomer(response.data));
      }

      return response;
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      dispatch(setReduxError(errorMsg));
      throw error;
    } finally {
      dispatch(setReduxLoading(false));
    }
  };

  // 🟢 FORGOT PASSWORD
  const forgotPassword = async (mobile) => {
    try {
      dispatch(setReduxLoading(true));
      dispatch(clearReduxError());

      const response = await authApi.forgetPassword(mobile);
      return response;
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      dispatch(setReduxError(errorMsg));
      throw error;
    } finally {
      dispatch(setReduxLoading(false));
    }
  };

  // 🟢 RESET PASSWORD
  const resetPassword = async (data) => {
    try {
      dispatch(setReduxLoading(true));
      dispatch(clearReduxError());

      const response = await authApi.resetPassword(data);
      return response;
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      dispatch(setReduxError(errorMsg));
      throw error;
    } finally {
      dispatch(setReduxLoading(false));
    }
  };

  // 🟢 RESEND OTP
  const resendOTP = async (mobile) => {
    try {
      dispatch(setReduxLoading(true));
      dispatch(clearReduxError());

      const response = await authApi.resendOTP(mobile);
      return response;
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      dispatch(setReduxError(errorMsg));
      throw error;
    } finally {
      dispatch(setReduxLoading(false));
    }
  };

  // 🟢 LOGOUT
  const logout = async () => {
    try {
      dispatch(setReduxLoading(true));
      dispatch(clearReduxError());

      await authApi.logout();
      dispatch(clearCustomer());
      
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      dispatch(setReduxError(errorMsg));
      throw error;
    } finally {
      dispatch(setReduxLoading(false));
    }
  };

  // 🟢 UPDATE PROFILE
  const updateProfile = async (userData) => {
    try {
      dispatch(setReduxLoading(true));
      dispatch(clearReduxError());

      const response = await authApi.updateProfile(userData);

      if (response?.data) {
        dispatch(setReduxCustomer(response.data));
      }

      return response;
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      dispatch(setReduxError(errorMsg));
      throw error;
    } finally {
      dispatch(setReduxLoading(false));
    }
  };

  // 🟢 CHANGE PASSWORD
  const changePassword = async (data) => {
    try {
      dispatch(setReduxLoading(true));
      dispatch(clearReduxError());

      const response = await authApi.changePassword(data);
      return response;
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      dispatch(setReduxError(errorMsg));
      throw error;
    } finally {
      dispatch(setReduxLoading(false));
    }
  };

  // 🟢 CONTEXT VALUE
  const value = {
    // State (from Redux)
    customer,
    isAuthenticated,
    loading,
    error,
    initialized,
    
    // Auth Operations
    loginWithPassword,
    requestLoginOTP,
    verifyLoginOTP,
    registerInit,
    registerVerifyOTP,
    registerComplete,
    forgotPassword,
    resetPassword,
    resendOTP,
    logout,
    updateProfile,
    changePassword,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};