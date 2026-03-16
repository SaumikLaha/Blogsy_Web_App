import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const HealthLifestyle = () => {
  const { blogs } = useAuth();

  const healthBlogs = Array.isArray(blogs)
  ? blogs.filter((blog) => blog.category === "Health & Lifestyle")
  : [];

  // ✅ FULL PAGE LOADING
  if (blogs.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        ⏳✨ ᒪOᗩᗪIᑎG... ✨⏳
      </div>
    );
  }

  return (
    <div className="container mx-auto my-12 p-4">
      <h1 className="text-2xl font-bold mb-6">
        ❚█══█❚🏋 Health & Lifestyle ╯
      </h1>

      <p className="text-center mb-8">
        🌍 In today’s fast-paced world, health and lifestyle thrive on balance—
        ⚖️ work and rest, 💻 tech and 🌿 nature, 🧠 mind and 💪 body.
      </p>

      {healthBlogs.length === 0 ? (
        <div className="flex justify-center text-gray-500">
          No Health & Lifestyle blogs found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {healthBlogs.map((blog) => (
            <Link
              to={`/blog/${blog._id}`}
              key={blog._id}
              className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={blog.blogImage?.url}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />

              <div className="absolute inset-0 bg-black opacity-30"></div>

              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-lg font-semibold">{blog.title}</h2>
                <p className="text-sm">{blog.category}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthLifestyle;
