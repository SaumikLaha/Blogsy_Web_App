import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");

  const [blogImage, setBlogImage] = useState(null); // ✅ File
  const [oldImage, setOldImage] = useState("");    // ✅ URL
  const [blogImagePreview, setBlogImagePreview] = useState("");

  // 🔹 Image change
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file); // ✅ File object
    };
  };

  // 🔹 Fetch blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/single-blog/${id}`,
          { withCredentials: true }
        );

        setTitle(data.title);
        setCategory(data.category);
        setAbout(data.about);
        setOldImage(data.blogImage.url); // ✅ keep old image
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch blog");
      }
    };
    fetchBlog();
  }, [id]);

  // 🔹 Update blog
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);

    // ✅ Only send image if user selected new one
    if (blogImage) {
      formData.append("blogImage", blogImage);
    }

    try {
      const { data } = await axios.put(
        `http://localhost:4001/api/blogs/update/${id}`,
        formData,
        { withCredentials: true }
      );

      toast.success(data.message || "Blog updated successfully");
      navigateTo("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="container mx-auto my-12 p-4">
      <section className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">✨Ʉ₱Đ₳₮Ɇ ฿ⱠØ₲✨</h3>

        <form onSubmit={handleUpdate}>
          {/* Category */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">✩･ﾟCategory･ﾟ✩</label>
            <select
              className="w-full p-2 border rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
              <option value="Health & Lifestyle">Health & Lifestyle</option>
              <option value="Movie Review">Movie Review</option>
              <option value="Indian Geopolitics">Indian Geopolitics</option>
              <option value="Travel">Travel</option>
              <option value="Photography">Photography</option>
              <option value="Personal Experience">Personal Experience</option>
              <option value="Technology News">Technology News</option>
              <option value="Education">Education</option>
            </select>
          </div>

          {/* Title */}
          <input
            type="text"
            placeholder="BLOG MAIN TITLE"
            className="w-full p-2 mb-4 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Image */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">🌈ᗷᒪOG IᗰᗩGE🌈</label>
            <img
              src={blogImagePreview || oldImage || "/imgPL.webp"}
              alt="Blog"
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <input
              type="file"
              className="w-full p-2 border rounded-md"
              onChange={changePhotoHandler}
            />
          </div>

          {/* About */}
          <textarea
            rows="6"
            className="w-full p-2 mb-4 border rounded-md"
            placeholder="Something about your blog..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            UPDATE
          </button>
        </form>
      </section>
    </div>
  );
}

export default UpdateBlog;
