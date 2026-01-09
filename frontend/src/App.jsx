import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Creators from "./pages/Creators";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import Notfound from "./pages/Notfound";

import UpdateBlog from "./dashboard/UpdateBlog";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  // ✅ FIXED: hide navbar/footer for ALL dashboard pages
  const hideNavbarFooter =
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  // ⏳ wait for auth check (refresh issue fix)
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        ⏳✨ LOADING... ✨⏳
      </div>
    );
  }

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        {/* Home (protected) */}
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />

        {/* Public pages */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/creators" element={<Creators />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard (protected) */}
        <Route
          path="/dashboard/*"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Blog */}
        <Route path="/blog/:id" element={<Detail />} />
        <Route path="/blog/update/:id" element={<UpdateBlog />} />

        {/* 404 */}
        <Route path="*" element={<Notfound />} />
      </Routes>

      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
