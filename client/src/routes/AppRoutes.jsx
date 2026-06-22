import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";

import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import Search from "../pages/Search/Search";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import NotFound from "../pages/NotFound/NotFound";

import AdminLogin from "../pages/AdminLogin/AdminLogin";
import PublicLayout from "../components/PublicLayout";
import ScrollToTop from "../components/ScrollToTop";

import ReturnPolicy from "../pages/ReturnPolicy/ReturnPolicy";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import FAQ from "../pages/FAQ/FAQ";
import MyOrders from "../pages/MyOrders/MyOrders";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";

const AppRoutes = () => {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop/>

        <Routes>

          {/* Public Routes With Layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/search" element={<Search />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/track-order" element={<MyOrders />} />
            <Route path="/returns" element={<ReturnPolicy />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Route>

          {/* Admin Routes */}
          <Route >
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/dashboard" element={<AdminDashboard/>} />           

          </Route>

          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </Provider>
  );
};

export default AppRoutes;