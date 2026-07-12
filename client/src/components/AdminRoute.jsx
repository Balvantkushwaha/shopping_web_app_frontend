import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated, selectCustomer } from '../redux/slices/authSlice';

const AdminRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const customer = useSelector(selectCustomer);

  // Check if authenticated
  if (!isAuthenticated || !customer) {
    return <Navigate to="/adminlogin" replace />;
  }

  // Check if user is admin (for future use)
  if (customer.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;