import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "5ae35612-afe6-4553-a170-b9e11a749e13",
      name: data.username,
      email: data.email,
      message: data.message,
    };

    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Message sent successfully ✅");
      reset();
    } catch (error) {
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8">💫📞 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 𝐔𝐬 ✉️💫</h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Form */}
          <div className="w-full md:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}

              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}

              <textarea
                placeholder="Your Message"
                className="w-full px-4 py-2 border rounded"
                rows="4"
                {...register("message", { required: true })}
              />
              {errors.message && (
                <p className="text-red-500 text-sm">Message is required</p>
              )}

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-yellow-600 duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/2">
            <h3 className="text-lg font-semibold mb-4">﹌📞 𝘊𝘰𝘯𝘵𝘢𝘤𝘵 𝘐𝘯𝘧𝘰𝘳𝘮𝘢𝘵𝘪𝘰𝘯 ✉️﹌</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center gap-2">
                <FaPhone className="text-blue-500" />
                <span>+91 9733071138</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-red-500" />
                <span>help@blogsy.com</span>
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-500" />
                <span>Kolkata, West Bengal, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
