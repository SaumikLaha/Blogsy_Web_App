import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import toast from "react-hot-toast";

function Sidebar({ setComponent }) {
  const { profile, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);

  const handleComponents = (value) => {
    setComponent && setComponent(value);
  };

  const gotoHome = () => {
    navigateTo("/");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/logout`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      {/* Mobile menu icon */}
      <div
        className="sm:hidden fixed top-4 left-4 z-50"
        onClick={() => setShow(!show)}
      >
        <CiMenuBurger className="text-2xl" />
      </div>

      {/* Sidebar */}
      <div
        className={`w-64 h-full shadow-lg fixed top-0 left-0 bg-gray-50 transition-transform duration-300
        ${show ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <div
          className="sm:hidden absolute top-4 right-4 cursor-pointer"
          onClick={() => setShow(false)}
        >
          <BiSolidLeftArrowAlt className="text-2xl" />
        </div>

        {/* Profile */}
        <div className="text-center mt-10">
          <img
            src={profile?.photo?.url}
            alt="profile"
            className="w-24 h-24 rounded-full mx-auto mb-2 object-cover border"
          />
          <p className="text-lg font-semibold capitalize">
            {profile?.name}
          </p>
          <p className="text-sm text-gray-500">{profile?.role}</p>
        </div>

        {/* Menu */}
        <ul className="space-y-4 mx-4 mt-8">
          <button
            onClick={() => handleComponents("My Blogs")}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            💫𝑀𝒴 𝐵𝐿𝒪𝒢𝒮💫
          </button>

          <button
            onClick={() => handleComponents("Create Blog")}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            💫𝒞𝑅𝐸𝒜𝒯𝐸 𝐵𝐿𝒪𝒢💫
          </button>

          <button
            onClick={() => handleComponents("My Profile")}
            className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg"
          >
            💫𝑀𝒴 𝒫𝑅𝒪𝐹𝐼𝐿𝐸💫
          </button>

          <button
            onClick={gotoHome}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            💫𝐻𝒪𝑀𝐸💫
          </button>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg"
          >
            ❌ 𝐋𝐎𝐆𝐎𝐔𝐓 ❌
          </button>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
