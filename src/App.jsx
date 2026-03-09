import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import AssetDetail from "./pages/AssetDetail";
import Learn from "./pages/Learn";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignUpType from "./pages/SignUpType";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        {/* Pages with Navbar + Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/assets/:id" element={<AssetDetail />} />
          <Route path="/learn" element={<Learn />} />
        </Route>

        {/* Auth pages WITHOUT layout */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpType />} />
        <Route path="/signup/details" element={<SignUp />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;