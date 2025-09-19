import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils"

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/blogs/my-blog`,
          { withCredentials: true }
        );
        console.log(data);
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`${BACKEND_URL}/api/blogs/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Blog deleted successfully");
        navigateTo("/dashboard");
        setMyBlogs((value) => value.filter((blog) => blog._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.message || "Failed to delete blog");
      });
  };

  return (
    <div>
      <div className="my-12 lg:ml-64">
        {/* Centered container with proper spacing */}
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {myBlogs && myBlogs.length > 0 ? (
              myBlogs.map((element) => (
                <Link
                  to={`/blog/${element._id}`}
                  className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm hover:shadow-xl transition-shadow duration-300"
                  key={element._id}>
                  {element?.blogImage && (
                    <img
                      src={element?.blogImage.url}
                      alt="blogImg"
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <span className="text-sm text-blue-600 font-medium uppercase tracking-wide">
                      {element.category}
                    </span>
                    <h4 className="text-xl font-semibold my-3 text-gray-800 line-clamp-2">
                      {element.title}
                    </h4>
                    <div className="flex justify-between mt-6 gap-3">
                      <Link
                        to={`/blog/update/${element._id}`}
                        className="flex-1 text-center text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md px-4 py-2 border border-blue-200 hover:border-blue-300 transition-all duration-200 font-medium">
                        UPDATE
                      </Link>
                      <button
                        onClick={() => handleDelete(element._id)}
                        className="flex-1 text-red-600 bg-red-50 hover:bg-red-100 rounded-md px-4 py-2 border border-red-200 hover:border-red-300 transition-all duration-200 font-medium">
                        DELETE
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12">
                <p className="text-lg">You have not posted any blog to see!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
