import React, { useState } from "react";
import logo from "../assets/logo2.svg";
import accountImage from "../assets/account.jpeg";
import { Menu, X } from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F5F5F5]">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <img src={logo} alt="UrbanTrends" className="w-24 sm:w-28 md:w-36" />

        {/* Desktop Navigation */}
        <nav className="hidden lg:block bg-[#E6E6E6] px-6 py-3 rounded-lg shadow shadow-black/20">
          <ul className="flex items-center gap-10 text-gray-700 font-bold text-lg">
            <li className="cursor-pointer hover:text-gray-900 transition">Contact</li>
            <li className="cursor-pointer hover:text-gray-900 transition">Community</li>
            <li className="cursor-pointer hover:text-gray-900 transition">Developers</li>
            <li className="cursor-pointer hover:text-gray-900 transition">Theme</li>
          </ul>
        </nav>

        {/* Right side (Account + Menu) */}
        <div className="flex items-center gap-4">
          {/* Profile circle */}
          <div
            className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full cursor-pointer bg-cover bg-center border-2 border-black"
            style={{ backgroundImage: `url(${accountImage})` }}
          ></div>

          {/* Hamburger (only on small/medium screens) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Navigation Drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-[#E6E6E6] shadow-md shadow-black/20">
          <ul className="flex flex-col items-center gap-6 py-6 text-gray-700 font-bold text-lg">
            <li className="cursor-pointer hover:text-gray-900 transition">Contact</li>
            <li className="cursor-pointer hover:text-gray-900 transition">Community</li>
            <li className="cursor-pointer hover:text-gray-900 transition">Developers</li>
            <li className="cursor-pointer hover:text-gray-900 transition">Theme</li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
