import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { lazy, Suspense } from "react";

import PublicLayout from "../components/PublicLayout";
import ScrollToTop from "../components/ScrollToTop";
import PageLoader from "../components/Pageloader";

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
            <Route element={<PublicLayout />}>
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







// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "../redux/store";

// import Home from "../pages/Home/Home";
// import Products from "../pages/Products/Products";
// import Search from "../pages/Search/Search";
// import ProductDetails from "../pages/ProductDetails/ProductDetails";
// import Cart from "../pages/Cart/Cart";
// import Checkout from "../pages/Checkout/Checkout";
// import About from "../pages/About/About";
// import Contact from "../pages/Contact/Contact";
// import NotFound from "../pages/NotFound/NotFound";

// import AdminLogin from "../pages/AdminLogin/AdminLogin";
// import PublicLayout from "../components/PublicLayout";
// import ScrollToTop from "../components/ScrollToTop";

// import ReturnPolicy from "../pages/ReturnPolicy/ReturnPolicy";
// import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
// import FAQ from "../pages/FAQ/FAQ";
// import MyOrders from "../pages/MyOrders/MyOrders";
// import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";

// const AppRoutes = () => {
//   return (
//     <Provider store={store}>
//       <Router>
//         <ScrollToTop/>

//         <Routes>

//           {/* Public Routes With Layout */}
//           <Route element={<PublicLayout />}>
//             <Route path="/" element={<Home />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/search" element={<Search />} />
//             <Route path="/product/:slug" element={<ProductDetails />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/faq" element={<FAQ />} />
//             <Route path="/track-order" element={<MyOrders />} />
//             <Route path="/returns" element={<ReturnPolicy />} />
//             <Route path="/privacy" element={<PrivacyPolicy />} />
//           </Route>

//           {/* Admin Routes */}
//           <Route >
//             <Route path="/adminlogin" element={<AdminLogin />} />
//             <Route path="/dashboard" element={<AdminDashboard/>} />           

//           </Route>

//           <Route path="*" element={<NotFound />} />

//         </Routes>
//       </Router>
//     </Provider>
//   );
// };

// export default AppRoutes;