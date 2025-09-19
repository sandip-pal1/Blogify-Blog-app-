import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const { setIsAuthenticated, setProfile } = useAuth();

  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/users/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("jwt", data.token);

      toast.success(data.message || "User Logged in successfully", {
        duration: 3000,
      });

      setProfile(data);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setRole("");
      navigateTo("/");
      window.location.reload();  //  Force reload 
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Please fill the required fields",
        {
          duration: 3000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleLogin}>
            <div className="text-2xl font-bold mb-6 text-center">
              Blog<span className="text-blue-500 font-bold">ify</span>
            </div>
            <h1 className="text-xl font-semibold mb-6">Login</h1>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
              required
            >
              <option value="">Select Role</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2  border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2  border rounded-md"
                required
              />
            </div>

            <p className="text-center mb-4 ">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600">
                Register Now
              </Link>
            </p>

        
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-2 rounded-md text-white flex items-center justify-center
                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-800 duration-300"}
              `}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* ✅ Demo Account Section */}
          <div className="mt-6 text-center bg-gray-50 p-4 rounded-md border">
            <h2 className="font-semibold mb-2 text-gray-700">Demo Account</h2>
            <p className="text-sm text-gray-600">Email: <span className="font-mono">sandy@gmail.com</span></p>
            <p className="text-sm text-gray-600">Role: <span className="font-mono">user</span></p>
            <p className="text-sm text-gray-600">Password: <span className="font-mono">1234</span></p>
            <p className="text-xs text-gray-500 mt-2">
              Use these credentials if you don’t want to register.  
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
