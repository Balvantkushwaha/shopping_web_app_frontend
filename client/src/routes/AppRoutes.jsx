import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BottomNavigation from '../components/BottomNavigation/BottomNavigation';
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';
import Search from '../pages/Search/Search';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import AdminLogin from '../pages/AdminLogin/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';

const AppRoutes = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
        <Footer />
        <BottomNavigation />
      </Router>
    </Provider>
  );
};

export default AppRoutes;