import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BACKEND_URL } from "../utils"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/users/my-profile`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(data);
        setProfile(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/blogs/all-blogs`,
          { withCredentials: true }
        );
        console.log(data);
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
    fetchProfile();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        isAuthenticated,
        setIsAuthenticated,
        setProfile,
      }}>
      {" "}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
