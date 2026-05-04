import Navbar from "./Navbar";
import Footer from "./Footer";
import WarningBanner from "../common/WarningBanner";
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

    </div>
  );
}

export default Layout;
