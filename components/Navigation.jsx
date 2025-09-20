"use client"
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  // Close the menu if a click occurs outside of it or the button
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        btnRef.current &&
        !btnRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-lg fixed w-full z-10 mb-3">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-5xl font-bold text-black-600">Gramid</h1>

        {/* Hamburger Menu Button */}
        <button
          ref={btnRef}
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen((prev) => !prev);
          }}
          className="md:hidden text-3xl focus:outline-none"
        >
          ☰
        </button>

        {/* Floating Menu */}
        <div
          ref={menuRef}
          className={`${
            isMenuOpen ? "absolute top-16 right-6" : "hidden"
          } bg-white shadow-lg rounded-lg w-48 p-4 space-y-4 transition-all`}
        >
          <Link
            href="/client"
            className="block text-gray-700 hover:text-blue-500 transition"
          >
            Home
          </Link>
          <Link
            href="/bazzar"
            className="block text-gray-700 hover:text-blue-500 transition"
          >
            Bazzar
          </Link>
          <Link
            href="/blog"
            className="block text-gray-700 hover:text-blue-500 transition"
          >
            Blog
          </Link>
          <Link
            href="/reel"
            className="block text-gray-700 hover:text-blue-500 transition"
          >
            Reels
          </Link>
          <Link
            href="/features"
            className="block text-gray-700 hover:text-blue-500 transition"
          >
            Features
          </Link>
          <Link
            href="/about"
            className="block text-gray-700 hover:text-blue-500 transition"
          >
            About Us
          </Link>
          <Link
            href="/help"
            className="block text-gray-700 hover:text-blue-500 transition"
          >
            Help
          </Link>
          <Link
            href="/profile"
            className="block text-gray-700 hover:text-blue-500 transition"
          >
            Profile
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-lg">
          <Link
            href="/client"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Home
          </Link>
          <Link
            href="/bazzar"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Bazzar
          </Link>
          <Link
            href="/blog"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Blog
          </Link>
          <Link
            href="/reel"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Reels
          </Link>
          <Link
            href="/features"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Features
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            About Us
          </Link>
          <Link
            href="/help"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Help
          </Link>
          <Link
            href="/profile"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
