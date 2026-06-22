import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import BottomNavigation from "./BottomNavigation/BottomNavigation";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <BottomNavigation />
    </>
  );
};

export default PublicLayout;
