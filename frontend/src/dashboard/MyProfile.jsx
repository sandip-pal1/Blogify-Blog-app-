import React from "react";
import { useAuth } from "../context/AuthProvider";

function MyProfile() {
  const { profile } = useAuth();
  console.log(profile);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 lg:ml-64">
      <div className="flex justify-center items-center min-h-screen py-12 px-4">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-md w-full transform hover:scale-105 transition-all duration-300">
          {/* Header Section with Background */}
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
              <div className="flex justify-center">
                <img
                  src={profile?.photo?.url}
                  alt="avatar"
                  className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="px-8 py-12 mt-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 capitalize">
                {profile?.name}
              </h2>
              <div className="w-24  h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email</p>
                  <p className="text-gray-800 font-semibold">
                    {profile?.email}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Phone</p>
                  <p className="text-gray-800 font-semibold">
                    {profile?.phone}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Status</p>
                  <div className="flex items-center">
                    <p className="text-gray-800 font-semibold capitalize">
                      {profile?.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Edit Profile
              </button>
              <button className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
                Settings
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gray-50 px-8 py-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">12</p>
                <p className="text-sm text-gray-600">Posts</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">480</p>
                <p className="text-sm text-gray-600">Likes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-600">1560</p>
                <p className="text-sm text-gray-600">Views</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
