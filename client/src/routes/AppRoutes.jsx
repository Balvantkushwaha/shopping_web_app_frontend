import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { lazy, Suspense } from "react";

import PublicLayout from "../components/PublicLayout";
import ScrollToTop from "../components/ScrollToTop";
import PageLoader from "../components/PageLoader";

// Lazy Loaded Pages
const Home = lazy(() => import("../pages/Home/Home"));
const Search = lazy(() => import("../pages/Search/Search"));
const ProductDetails = lazy(() =>
  import("../pages/ProductDetails/ProductDetails")
);
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
const About = lazy(() => import("../pages/About/About"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const ReturnPolicy = lazy(() =>
  import("../pages/ReturnPolicy/ReturnPolicy")
);
const PrivacyPolicy = lazy(() =>
  import("../pages/PrivacyPolicy/PrivacyPolicy")
);
const FAQ = lazy(() => import("../pages/FAQ/FAQ"));
const MyOrders = lazy(() => import("../pages/MyOrders/MyOrders"));
const AdminLogin = lazy(() => import("../pages/AdminLogin/AdminLogin"));
const AdminDashboard = lazy(() =>
  import("../pages/AdminDashboard/AdminDashboard")
);
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));



const AppRoutes = () => {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />

        <Suspense fallback={<PageLoader/>}>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout/>}>
              <Route path="/" element={<Home />} />
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
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/dashboard" element={<AdminDashboard />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default AppRoutes;



