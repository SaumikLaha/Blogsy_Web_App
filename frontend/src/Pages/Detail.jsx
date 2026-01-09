import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/single-blog/${id}`,
          { withCredentials: true }
        );
        setBlog(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return null;

  return (
    <section className="container mx-auto p-4 pb-28">
      {/* Category */}
      <div className="text-blue-500 uppercase text-xs font-bold mb-4">
        {blog.category}
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

      {/* Author */}
      <div className="flex items-center mb-6">
        <img
          src={blog.adminPhoto}
          alt="author"
          className="w-12 h-12 rounded-full mr-4"
        />
        <p className="text-lg font-semibold">{blog.adminName}</p>
      </div>

      {/* Image + Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {blog.blogImage?.url && (
          <img
            src={blog.blogImage.url}
            alt="blog"
            className="md:w-1/2 w-full h-[500px] object-cover rounded-lg shadow-lg"
          />
        )}

        <div className="md:w-1/2 w-full">
          <p className="text-lg leading-relaxed">{blog.about}</p>
        </div>
      </div>
    </section>
  );
}

export default Detail;
