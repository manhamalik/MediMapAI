import React, { useState } from "react";
import Link from "next/link";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav
      style={{ fontFamily: "Noto Sans, sans-serif" }}
      className="bg-black text-white py-4 px-6 flex justify-between items-center z-[1000] sticky top-0 font-semibold"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </Link>

          {/* Dropdown menu */}
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

      {/* Login Button */}
      <Link href="/login">
        <div className="bg-white text-black font-bold px-4 py-2 rounded hover:bg-gray-200 transition duration-300 cursor-pointer">
          LOGIN
        </div>
      </Link>
    </nav>
  );
};

export default NavBar;
