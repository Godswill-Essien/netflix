"use client";

import { useEffect, useState } from "react";
import { IoIosCamera } from "react-icons/io";

import { useRouter } from "next/navigation";
import { logout,isAuth } from "../api/auth/depends";
interface User {
  _id: string;

  name?: string;
  email: string;
  type?: string;
  otp?: string;
  isVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

 
  // Fetch current user from API
  useEffect(() => {
     if (!isAuth()){
    window.location.href = "/login"
    return
  }
    async function fetchUser() {
      try {
        const res = await fetch("/api/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
        //   location.href = "/login"
        } else {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setUser(null);
      }

      setLoading(false);
    }

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900/50 backgroundxn text-white">
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-8 md:space-y-0">
          
          {/* Profile Picture */}
          <div className="relative ">
            <img
              src="https://plus.unsplash.com/premium_photo-1739786995646-480d5cfd83dc?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile Picture"
              className="w-32 h-32 rounded-full border-4 border-red-600 hover:scale-105 duration-500 ease-in "
            />

            {/* Edit Profile Button */}
            <button className="absolute bottom-0  text-3xl right-0 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-5 transition-all">
              <IoIosCamera  className="hover:opacity-55 "/>
            </button>
          </div>

          {/* Profile Details */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-semibold">
              {user.name}
            </h1>

            <p className="text-lg text-gray-400 mt-2">
              {user.type ? user.type.toUpperCase() : "Profile"}
            </p>

            {/* Edit and other options */}
            <div className="mt-4 space-y-3">
              <button className="w-full py-3 px-4 text-left text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all">
                Edit Profile
              </button>

              <button className="w-full py-3 px-4 text-left text-white bg-black rounded-lg hover:translate-y-[-5px] transition-all ease-in duration-500">
                Manage Profiles
              </button>

              <button onClick={()=> logout()} className="w-full py-3 px-4 text-left text-red-500 bg-transparent rounded-lg hover:bg-red-600 hover:text-white transition-all">
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Additional Profile Options */}
        <div className="mt-10 text-center md:text-left">
          <h2 className="text-xl font-semibold">Profile Options</h2>

          <p className="text-gray-400 mt-2">Choose what you want to do next.</p>

          <div className="mt-6 space-y-4">
            <button className="w-full  py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all">
              Change Password
            </button>

            <button className="w-full py-3 px-4 bg-black  text-white rounded-lg hover:translate-y-[-5px] duration-500 ease-in transition-all">
              Language Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
