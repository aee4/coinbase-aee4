import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/common/ScrollToTop";
import PageLoader from "./components/common/PageLoader";

// Lazy loaded pages
const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const AssetDetail = lazy(() => import("./pages/AssetDetail"));
const Learn = lazy(() => import("./pages/Learn"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SignUpType = lazy(() => import("./pages/SignUpType"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;