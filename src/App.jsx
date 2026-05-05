import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const AssetDetail = lazy(() => import("./pages/AssetDetail"));
const Learn = lazy(() => import("./pages/Learn"));
const Profile = lazy(() => import("./pages/Profile"));
const AddCrypto = lazy(() => import("./pages/AddCrypto"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Assets = lazy(() => import("./pages/Assets"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SignUpType = lazy(() => import("./pages/SignUpType"));

import ScrollToTop from "./components/common/ScrollToTop";

const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-white">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0052ff] border-t-transparent"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/asset/:id" element={<AssetDetail />} />
            <Route path="/assets/:id" element={<AssetDetail />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/add-crypto" element={<AddCrypto />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/assets"
            element={
              <ProtectedRoute>
                <Assets />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SignUpType />} />
          <Route path="/signup/details" element={<SignUp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
