import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Blogs() {
  const { blogs } = useAuth();

  console.log(blogs);
  return (
    <div>
      <div className="container mx-auto my-12 p-4">
        <h1 className="text-2xl font-bold mb-6">🌈💻✨📚 𝓐𝓵𝓵 𝓑𝓵𝓸𝓰𝓼 𝓖𝓸 𝓗𝓮𝓻𝓮!!! 📚✨🌑🌈</h1>
        <p className="text-center mb-8">
          ღ(`◕‿◕)♫♪♫📸 Here you can see all blog images together, and by clicking any block you can read the full blog too.📸♫♪♫(`◕‿◕)ღ <br />
          📝 𝑰𝒇 𝒚𝒐𝒖 𝒆𝒏𝒋𝒐𝒚 𝒊𝒕, 𝒚𝒐𝒖 𝒄𝒂𝒏 𝒂𝒍𝒔𝒐 𝒑𝒐𝒔𝒕 𝒚𝒐𝒖𝒓 𝒐𝒘𝒏 𝒃𝒍𝒐𝒈𝒔 𝒘𝒊𝒕𝒉 𝒕𝒉𝒐𝒖𝒈𝒉𝒕𝒔 𝒂𝒏𝒅 𝒑𝒉𝒐𝒕𝒐𝒔 𝒇𝒐𝒓 𝒆𝒗𝒆𝒓𝒚𝒐𝒏𝒆 𝒕𝒐 𝒓𝒆𝒂𝒅 𝒂𝒏𝒅 𝒔𝒆𝒆! 🌍
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <Link
                to={`/blog/${blog._id}`}
                key={index}
                className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={blog?.blogImage?.url}
                  alt={blog?.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-lg font-semibold">{blog?.title}</h2>
                  <p className="text-sm">{blog?.category}</p>
                </div>
              </Link>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;