import toast from "react-hot-toast";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Register = () => {
  const { setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // ✅ FRONTEND VALIDATION
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !role ||
      !education ||
      !photo
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(data.message || "User registered successfully");

      setProfile(data.newUser);
      setIsAuthenticated(true);

      navigateTo("/");

      // reset form
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto("");
      setPhotoPreview("");
    } catch (error) {
      console.error(error);

      // ✅ CORRECT ERROR MESSAGE
      toast.error(
        error.response?.data?.message || "Please fill all required fields"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form onSubmit={handleRegister}>
          <div className="text-center mb-4">
            <span className="text-2xl font-bold">Blo</span>
            <span className="text-2xl font-bold text-blue-600">gsy</span>
          </div>

          <h1 className="text-xl font-semibold mb-6 text-center">
            ♥︎‧₊˚ Register ˚₊‧♥︎
          </h1>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">Select Your Education</option> 
            <option value="BCA">BCA</option> 
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option> 
            <option value="BBA">BBA</option> 
            <option value="BTech">B.Tech</option>
            <option value="MTech">M.Tech</option>
            <option value="BSc">B.Sc</option> 
            <option value="MSc">M.Sc</option>
            <option value="BA">B.A</option>
            <option value="MA">M.A</option> 
            <option value="BCom">B.Com</option>
            <option value="MCom">M.Com</option>
            <option value="Diploma">Diploma</option>
            <option value="PhD">PhD</option>
            <option value="Other">Other</option>
          </select>

          <div className="flex items-center mb-4">
            <img
              src={photoPreview || "/avatar.png"}
              alt="preview"
              className="w-16 h-16 rounded-full mr-3"
            />
            <input type="file" onChange={changePhotoHandler} />
          </div>

          <p className="text-center mb-4">
            Already registered?{" "}
            <Link to="/login" className="text-blue-600">
              Login Now
            </Link>
          </p>

          <button className="w-full p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
