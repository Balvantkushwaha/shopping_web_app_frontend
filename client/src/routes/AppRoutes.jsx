// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { lazy, Suspense } from "react";

// import PublicLayout from "../components/PublicLayout";
// import ScrollToTop from "../components/ScrollToTop";
// import ProtectedRoute from "../components/ProtectedRoute";
// import PublicRoute from "../components/PublicRoute";
// import CategoryPage from "../pages/CategoryPage/CategoryPage";

// // Lazy Loaded Pages
// const Home = lazy(() => import("../pages/Home/Home"));
// const Search = lazy(() => import("../pages/Search/Search"));
// const ProductDetails = lazy(
//   () => import("../pages/ProductDetails/ProductDetails"),
// );
// const Cart = lazy(() => import("../pages/Cart/Cart"));
// const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
// const About = lazy(() => import("../pages/About/About"));
// const Contact = lazy(() => import("../pages/Contact/Contact"));
// const ReturnPolicy = lazy(() => import("../pages/ReturnPolicy/ReturnPolicy"));
// const PrivacyPolicy = lazy(
//   () => import("../pages/PrivacyPolicy/PrivacyPolicy"),
// );
// const FAQ = lazy(() => import("../pages/FAQ/FAQ"));
// const MyOrders = lazy(() => import("../pages/MyOrders/MyOrders"));
// const AdminLogin = lazy(() => import("../pages/AdminLogin/AdminLogin"));
// const AdminDashboard = lazy(
//   () => import("../pages/AdminDashboard/AdminDashboard"),
// );
// const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
// const Unauthorized = lazy(() => import("../pages/Unauthorized/Unauthorized"));

// const AppRoutes = () => {
//   return (
//     <Router>
//       <ScrollToTop />

//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//             {/* ===== PUBLIC ROUTES (No authentication needed) ===== */}
//             <Route element={<PublicLayout />}>
//               <Route path="/" element={<Home />} />
//               <Route path="/category" element={<CategoryPage />} />
//               <Route path="/search" element={<Search />} />
//               <Route path="/product/:slug" element={<ProductDetails />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/contact" element={<Contact />} />
//               <Route path="/faq" element={<FAQ />} />
//               <Route path="/returns" element={<ReturnPolicy />} />
//               <Route path="/privacy" element={<PrivacyPolicy />} />

//               {/* ===== UNAUTHORIZED PAGE ===== */}
//               <Route path="/unauthorized" element={<Unauthorized />} />

//               {/* ===== 404 PAGE ===== */}
//               <Route path="*" element={<NotFound />} />
//             </Route>

//             {/* ===== PROTECTED ROUTES (Need authentication) ===== */}
//             <Route element={<PublicLayout />}>
//               {/* Cart - Protected */}
//               <Route
//                 path="/cart"
//                 element={
//                   <ProtectedRoute>
//                     <Cart />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* Checkout - Protected */}
//               <Route
//                 path="/checkout"
//                 element={
//                   <ProtectedRoute>
//                     <Checkout />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* My Orders - Protected */}
//               <Route
//                 path="/track-order"
//                 element={
//                   <ProtectedRoute>
//                     <MyOrders />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>

//             {/* ===== ADMIN ROUTES ===== */}
//             <Route
//               path="/adminlogin"
//               element={
//                 <PublicRoute>
//                   <AdminLogin />
//                 </PublicRoute>
//               }
//             />

//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute requireRole="admin">
//                   <AdminDashboard />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//       </Suspense>
//     </Router>
//   );
// };

// export default AppRoutes;













import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useAppSelector } from "../redux/hooks";
import { selectIsAuthenticated } from "../redux/slices/authSlice";

// Components
import PublicLayout from "../components/PublicLayout";
import ScrollToTop from "../components/ScrollToTop";
import ProtectedRoute from "../components/ProtectedRoute";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import PageLoader from "../components/PageLoader";

// Lazy Loaded Pages
const Home = lazy(() => import("../pages/Home/Home"));
const Search = lazy(() => import("../pages/Search/Search"));
const ProductDetails = lazy(() => import("../pages/ProductDetails/ProductDetails"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
const About = lazy(() => import("../pages/About/About"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const ReturnPolicy = lazy(() => import("../pages/ReturnPolicy/ReturnPolicy"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy/PrivacyPolicy"));
const FAQ = lazy(() => import("../pages/FAQ/FAQ"));
const MyOrders = lazy(() => import("../pages/MyOrders/MyOrders"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const AdminLogin = lazy(() => import("../pages/AdminLogin/AdminLogin"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard/AdminDashboard"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const Unauthorized = lazy(() => import("../pages/Unauthorized/Unauthorized"));

// Login Modal - For auth
import { useState } from "react";
import { LoginModal } from "../LoginModal";

const AppRoutes = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { initialized } = useAuth();

  // Show loader while auth is initializing
  if (!initialized) {
    return <PageLoader />;
  }

  return (
    <>
      <Router>
        <ScrollToTop />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* ===== PUBLIC ROUTES (No authentication needed) ===== */}
            <Route 
              element={
                <PublicLayout onLoginClick={() => setIsLoginModalOpen(true)} />
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/search" element={<Search />} />
              <Route path="/product/:slug" element={<ProductDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/returns" element={<ReturnPolicy />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
            </Route>

            {/* ===== PROTECTED ROUTES (Need authentication) ===== */}
            <Route 
              element={
                <PublicLayout onLoginClick={() => setIsLoginModalOpen(true)} />
              }
            >
              {/* Cart - Protected */}
              <Route
                path="/cart"
                element={
                  // <ProtectedRoute>
                    <Cart />
                  // </ProtectedRoute>
                }
              />

              {/* Checkout - Protected */}
              <Route
                path="/checkout"
                element={
                  // <ProtectedRoute>
                    <Checkout />
                  // </ProtectedRoute>
                }
              />

              {/* My Orders - Protected */}
              <Route
                path="/my-order"
                element={
                  <ProtectedRoute>
                    <MyOrders />
                  </ProtectedRoute>
                }
              />

              {/* Profile - Protected */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* ===== ADMIN ROUTES ===== */}
            <Route
              path="/adminlogin"
              element={
                  <AdminLogin />
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requireRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* ===== UNAUTHORIZED PAGE ===== */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* ===== 404 PAGE ===== */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>

      {/* ===== LOGIN MODAL ===== */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        defaultTab="login"
      />
    </>
  );
};

export default AppRoutes;