import React from "react";
import { useAuth } from "../context/AuthProvider";

function MyProfile() {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 lg:ml-64">
      <div className="flex justify-center items-start min-h-screen px-4 pt-8 pb-12">
        <div
          className="
            bg-white 
            rounded-2xl 
            shadow-lg 
            hover:shadow-2xl 
            transition-all 
            duration-300 
            overflow-hidden 
            w-full 
            max-w-md
          "
        >
          {/* Cover + Avatar */}
          <div className="relative">
            <div className="h-36 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

            <div className="absolute inset-x-0 -bottom-12 flex justify-center">
              <img
                src={profile?.photo?.url}
                alt="avatar"
                className="
                  w-28 h-28 
                  rounded-full 
                  border-4 border-white 
                  object-cover 
                  shadow-md
                  hover:scale-105 
                  transition-transform 
                  duration-300
                "
              />
            </div>
          </div>

          {/* Name & Role */}
          <div className="pt-20 pb-6 px-6 text-center">
            <h2 className="text-2xl font-bold capitalize text-gray-800">
              {profile?.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1 capitalize tracking-wide">
              {profile?.role}
            </p>
          </div>

          {/* Info Cards */}
          <div className="px-6 space-y-4 pb-6">
            {[
              { label: "Email", value: profile?.email, icon: "📧" },
              { label: "Phone", value: profile?.phone, icon: "📞" },
              { label: "Education", value: profile?.education, icon: "🎓" },
              { label: "Status", value: profile?.role, icon: "🧾" },
            ].map((item, index) => (
              <div
                key={index}
                className="
                  flex items-start gap-3 
                  bg-gray-50 
                  p-4 
                  rounded-xl 
                  border 
                  border-gray-100
                  hover:bg-white 
                  hover:shadow-md 
                  transition-all 
                  duration-300
                "
              >
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    {item.label}
                  </p>
                  <p className="font-semibold text-gray-800 break-words capitalize">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Stats */}
          <div className="border-t px-6 py-5 text-center text-sm text-gray-600 space-y-2 bg-gray-50">
            <p className="hover:text-blue-600 transition">
              ✍️ Posts – Share your ideas with the world
            </p>
            <p className="hover:text-pink-600 transition">
              ❤️ Likes – Engage with your audience
            </p>
            <p className="hover:text-purple-600 transition">
              👀 Views – Grow your reach organically
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
