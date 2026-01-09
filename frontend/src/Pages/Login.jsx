import toast from "react-hot-toast";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const { setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ validation
    if (!email || !password || !role) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        { email, password, role },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(data.message || "User logged in successfully");
      setProfile(data.user);
      setIsAuthenticated(true);

      setEmail("");
      setPassword("");
      setRole("");

      navigateTo("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed",
        { duration: 3000 }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form onSubmit={handleLogin}>
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="font-semibold text-xl">
              <span className="text-black font-bold text-2xl">Blo</span>
              <span className="text-blue-600 font-bold text-2xl">gsy</span>
            </div>
          </div>

          <h1 className="text-xl font-semibold mb-6 text-center">
            ♥︎‧₊˚ Login ˚₊‧♥︎
          </h1>

          {/* Role */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* Email */}
          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          <p className="text-center mb-4">
            New User?{" "}
            <Link to="/register" className="text-blue-600">
              Register Now
            </Link>
          </p>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
          >
            Login
          </button>
        </form>

        {/* ✅ Demo Account Section (PERFECT PLACE) */}
        <div className="mt-6 text-center bg-gray-50 p-4 rounded-md border">
          <h2 className="font-semibold mb-2 text-gray-700">🗝️──𝘋𝘦𝘮𝘰 𝘈𝘤𝘤𝘰𝘶𝘯𝘵──🗝️</h2>
          <p className="text-sm text-gray-600">
            Email: <span className="font-mono">demo@gmail.com</span>
          </p>
          <p className="text-sm text-gray-600">
            Role: <span className="font-mono">user</span>
          </p>
          <p className="text-sm text-gray-600">
            Password: <span className="font-mono">12345</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            ⋘🗝️⋙𝐔𝐬𝐞 𝐭𝐡𝐞𝐬𝐞 𝐜𝐫𝐞𝐝𝐞𝐧𝐭𝐢𝐚𝐥𝐬 𝐢𝐟 𝐲𝐨𝐮 𝐝𝐨𝐧’𝐭 𝐰𝐚𝐧𝐭 𝐭𝐨 𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
