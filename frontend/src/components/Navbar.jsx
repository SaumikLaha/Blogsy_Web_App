import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { blogs, profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const [show, setShow] = useState(false);
  const navigateTo = useNavigate();

  console.log(blogs);
  console.log(profile);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/logout`,
        { withCredentials: true }
      );
      localStorage.removeItem("jwt");
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <nav className="shadow-lg px-1.5 py-0.5">
        <div className="container mx-auto flex justify-between items-center py-4 px-4">
          {/* Logo */}
          <div className="font-semibold text-xl ml-3">
            <span className="text-black font-bold text-2xl">Blo</span>
            <span className="text-blue-600 font-bold text-2xl">gsy</span>
          </div>

          {/* Desktop Menu */}
          <div className="flex items-center gap-4">
            <ul className="hidden md:flex space-x-6">
              <Link to="/" className="hover:text-blue-500">HOME</Link>
              <Link to="/blogs" className="hover:text-blue-500">BLOGS</Link>
              <Link to="/creators" className="hover:text-blue-500">CREATORS</Link>
              <Link to="/about" className="hover:text-blue-500">ABOUT</Link>
              <Link to="/contact" className="hover:text-blue-500">CONTACT</Link>
            </ul>

            <div className="md:hidden" onClick={() => setShow(!show)}>
              {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-2">
            {isAuthenticated && profile?.role === "admin" && (
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded"
              >
                DASHBOARD
              </Link>
            )}

            {!isAuthenticated ? (
              <Link
                to="/login"
                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
              >
                LOGIN
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
              >
                LOGOUT
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {show && (
          <div className="bg-white md:hidden">
            <ul className="flex flex-col h-screen items-center justify-center space-y-4 text-xl">
              <Link to="/" onClick={() => setShow(false)} className="hover:text-blue-500">HOME</Link>
              <Link to="/blogs" onClick={() => setShow(false)} className="hover:text-blue-500">BLOGS</Link>
              <Link to="/creators" onClick={() => setShow(false)} className="hover:text-blue-500">CREATORS</Link>
              <Link to="/about" onClick={() => setShow(false)} className="hover:text-blue-500">ABOUT</Link>
              <Link to="/contact" onClick={() => setShow(false)} className="hover:text-blue-500">CONTACT</Link>

              {isAuthenticated && profile?.role === "admin" && (
                <Link
                  to="/dashboard"
                  onClick={() => setShow(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  DASHBOARD
                </Link>
              )}

              {!isAuthenticated ? (
                <Link
                  to="/login"
                  onClick={() => setShow(false)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  LOGIN
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  LOGOUT
                </button>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
