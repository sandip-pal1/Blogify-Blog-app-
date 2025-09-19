import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider"; 
import { BACKEND_URL } from "../utils"

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    status: "",
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setIsAuthenticated, setProfile } = useAuth(); // ✅ get from context

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle photo upload
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setPhotoPreview(reader.result);
    }
  };

  // Submit Register form
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("Please fill all required fields");
    }

    const userData = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      userData.append(key, value)
    );
    if (photo) userData.append("photo", photo);

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BACKEND_URL}/api/users/register`,
        userData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      toast.success(data.message || "User registered successfully ✅");

      // ✅ Auto login after register
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        setIsAuthenticated(true);
        setProfile(data); // profile info comes from backend
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        status: "",
      });
      setPhoto(null);
      setPhotoPreview("");
      setLoading(false);

      navigate("/"); // ✅ now go straight to homepage
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(
        error.response?.data?.message || "Something went wrong, try again ❌"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <form onSubmit={handleRegister}>
          <h1 className="text-2xl font-bold mb-6 text-center">
            Create Your Blog<span className="text-blue-500 font-bold">ify</span>{" "}
            Account
          </h1>

          {/* Role */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded-md"
            required>
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded-md"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />

          {/* Status */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded-md">
            <option value="">Select Your Status</option>
            <option value="Student">Student</option>
            <option value="Working Professional">Working Professional</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Entrepreneur">Entrepreneur</option>
            <option value="Hobbyist Blogger">Hobbyist Blogger</option>
            <option value="Other">Other</option>
          </select>

          {/* Photo Upload */}
          <div className="flex items-center mb-4">
            <div className="w-20 h-20 mr-4 border rounded overflow-hidden">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  No Photo
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={changePhotoHandler}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Login Redirect */}
          <p className="text-center mb-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login Now
            </Link>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded-md text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            }`}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
