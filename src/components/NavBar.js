import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const NavBar = () => {
  const { currentUser, userData, logout, loading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (loading) {
    return (
      <nav className="bg-black text-white py-4 px-6 flex justify-between items-center">
        <p>Loading...</p>
      </nav>
    );
  }

  const displayName =
    userData?.firstName && userData?.lastName
      ? `${userData.firstName} ${userData.lastName}`
      : currentUser?.email || "";

  return (
    <nav
      style={{ fontFamily: "Noto Sans Multani, sans-serif" }}
      className="bg-black text-white py-4 px-6 flex justify-between items-center z-[1000] sticky top-0 font-bold"
    >
      {/* Logo */}
      <Link href="/">
        <img src="/images/new-logo.png" alt="Logo" className="w-[11vw] h-auto" />
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-8">
        <Link href="/tracker">TRACKER</Link>
        <Link href="/tumordetection">TUMOR DETECTION</Link>

        {/* Tumor Guide Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <Link href="/tumorguide">
            <button className="hover:text-gray-400 transition duration-300 flex items-center">
              TUMOR GUIDE
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </Link>
          {isDropdownOpen && (
            <div className="absolute left-0 top-full bg-black text-white shadow-lg rounded-md z-[1100]">
              <Link href="/tumorguide#types">
                <div className="block px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  TYPES & CAUSES
                </div>
              </Link>
              <Link href="/tumorguide#symptoms">
                <div className="block px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  SYMPTOMS
                </div>
              </Link>
              <Link href="/tumorguide#treatments">
                <div className="block px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  TREATMENTS
                </div>
              </Link>
            </div>
          )}
        </div>

        <Link href="/about">ABOUT</Link>
      </div>

      {/* Authentication Section */}
      {currentUser ? (
        <div className="flex items-center space-x-4">
          <span className="text-gray-300">Signed in as {displayName}</span>
          <button
            onClick={logout}
            className="bg-[#5EDEF4] text-black font-bold px-4 py-2 rounded-[0.75rem] hover:bg-red-500 transition duration-300"
          >
            LOGOUT
          </button>
        </div>
      ) : (
        <Link href="/login">
          <div className="bg-white text-black font-bold px-4 py-2 rounded-[0.75rem] hover:bg-gray-200 transition duration-300 cursor-pointer">
            LOGIN
          </div>
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
