import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils"

function Creator() {
  const [admin, setAdmin] = useState([]);
  console.log(admin);
  
  useEffect(() => {
    const fetchAdmins = async () => {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/users/admins`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setAdmin(data);
    };
    fetchAdmins();
  }, []);
  
  return (
    <div className="container mx-auto p-4 py-8">
      {/* Title stays in original position */}
      <h1 className="text-2xl font-semibold mb-6 px-20">Popular Creators</h1>
      
      {/* Centered container for images with proper spacing */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-8">
          {admin && admin.length > 0 ? (
            admin.slice(0, 4).map((element) => {
              return (
                <div key={element._id} className="flex flex-col items-center">
                  <div className="mb-4">
                    <img
                      src={element.photo.url}
                      alt="admin"
                      className="w-56 h-56 object-cover border border-black rounded-full"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-medium capitalize">{element.name}</p>
                    <p className="text-gray-600 text-sm capitalize">{element.status}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-4 text-center text-gray-500">
              No creators found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Creator;