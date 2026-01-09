import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function MyBlogs() {
  const navigate = useNavigate();
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/blogs/my-blog`,
          { withCredentials: true }
        );
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/blogs/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message || "Blog deleted successfully");
      setMyBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 lg:ml-64">
      <div className="max-w-7xl mx-auto px-4 pt-20 sm:pt-16 lg:pt-8 pb-8">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          🌠𝓜𝔂 𝓑𝓵𝓸𝓰𝓼🌠
        </h2>

        {myBlogs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {myBlogs.map((element) => (
              <div
                key={element._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col cursor-pointer"
                onClick={() => navigate(`/blog/${element._id}`)}
              >
                {element?.blogImage?.url && (
                  <img
                    src={element.blogImage.url}
                    alt="blog"
                    className="w-full h-44 object-cover"
                  />
                )}

                <div className="p-4 flex flex-col flex-grow">
                  <span className="text-xs uppercase tracking-wide text-blue-600 font-semibold">
                    {element.category}
                  </span>

                  <h4 className="text-lg font-semibold text-gray-800 mt-2 line-clamp-2">
                    {element.title}
                  </h4>

                  <div
                    className="flex justify-between items-center mt-auto pt-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() =>
                        navigate(`/blog/update/${element._id}`)
                      }
                      className="text-sm px-4 py-1.5 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(element._id)}
                      className="text-sm px-4 py-1.5 rounded-md border border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-16">
            📜✨ You Haven’t Posted Any Blog Yet ✨📜
          </p>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
