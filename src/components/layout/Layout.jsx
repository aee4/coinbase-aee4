import Navbar from "./Navbar";
import Footer from "./Footer";
import WarningBanner from "../common/WarningBanner";
import CookieConsent from "../common/CookieConsent";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">

      <WarningBanner />

      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />

      <CookieConsent />

    </div>
  );
}

export default Layout;
