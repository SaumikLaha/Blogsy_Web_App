import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // 🔥 IMPORTANT

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/my-profile`,
          { withCredentials: true }
        );
        setProfile(data);
        setIsAuthenticated(true);
      } catch (error) {
        setProfile(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // 🔥 VERY IMPORTANT
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/blogs/all-blogs"
        );
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
    fetchBlogs();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
