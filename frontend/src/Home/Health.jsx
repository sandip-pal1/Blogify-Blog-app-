import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Health() {
  const { blogs } = useAuth();
  const healthBlogs = blogs?.filter(
    (blog) => blog.category === "Health & Lifestyle"
  );
  console.log(healthBlogs);
  return (
    <div>
      <div className="container mx-auto my-12 p-4 px-20 py-3">
        <h1 className="text-2xl font-bold mb-6">Health & Lifestyle</h1>
        <p className="text-center mb-8">
          In today’s busy world, maintaining health and lifestyle means finding
          balance—between work and rest, technology and nature, body and mind.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {healthBlogs && healthBlogs.length > 0 ? (
            healthBlogs.map((blog, index) => (
              <Link
                to={`/blog/${blog._id}`}
                key={index}
                className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
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
            <div className=" flex h-screen items-center justify-center">
              Loading....
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Health;
