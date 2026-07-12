import { useEffect, useState } from 'react';
import { authApi } from '../api/authApi';
import { useAppDispatch } from '../redux/hooks';
import {
  clearCustomer,
  setCustomer as setReduxCustomer,
} from '../redux/slices/authSlice';
import { AuthContext } from './authContext';

export const AuthProvider = ({ children }) => {
  const dispatch = useAppDispatch();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getErrorMessage = (error) => {
    return (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      'Something went wrong'
    );
  };

  const syncAuthState = (nextCustomer) => {
    setCustomer(nextCustomer);
    setIsAuthenticated(Boolean(nextCustomer));
  };

  const checkAuth = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await authApi.getProfile();
      const profile = response?.data ?? response;

      if (profile) {
        syncAuthState(profile);
        dispatch(setReduxCustomer(profile));
      } else {
        syncAuthState(null);
        dispatch(clearCustomer());
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      syncAuthState(null);
      dispatch(clearCustomer());
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await authApi.getProfile();
        const profile = response?.data ?? response;

        if (!isMounted) {
          return;
        }

        if (profile) {
          syncAuthState(profile);
          dispatch(setReduxCustomer(profile));
        } else {
          syncAuthState(null);
          dispatch(clearCustomer());
        }
      } catch (authError) {
        if (!isMounted) {
          return;
        }

        console.error('Auth check failed:', authError);
        syncAuthState(null);
        dispatch(clearCustomer());
        setError(getErrorMessage(authError));
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void initializeAuth();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const logout = async () => {
    try {
      setError(null);
      setLoading(true);

      await authApi.logout();
      syncAuthState(null);
      dispatch(clearCustomer());
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    } catch (error) {
      setError(getErrorMessage(error));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    customer,
    loading,
    error,
    isAuthenticated,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};