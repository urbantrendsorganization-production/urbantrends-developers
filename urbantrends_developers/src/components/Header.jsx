import React, { useState } from "react";
import logo from "../assets/logo2.svg";
import accountImage from '../assets/account.jpeg'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-white via-[#F8F9FA] to-white border-b border-gray-200/50 dark:bg-black dark:text-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-200">
            <img 
              src={logo} 
              alt="UrbanTrends" 
              className="h-12 w-auto sm:h-16 lg:h-30 drop-shadow-sm" 
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
              <ul className="flex items-center gap-8 text-gray-700 font-medium">
                <li className="relative group">
                  <span className="cursor-pointer hover:text-gray-900 transition-colors duration-200 py-2">
                    Contact
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></div>
                </li>
                <li className="relative group">
                  <span className="cursor-pointer hover:text-gray-900 transition-colors duration-200 py-2">
                    Community
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></div>
                </li>
                <li className="relative group">
                  <span className="cursor-pointer hover:text-gray-900 transition-colors duration-200 py-2">
                    Developers
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></div>
                </li>
                <button  className="relative group">
                  <span className="cursor-pointer hover:text-gray-900 transition-colors duration-200 py-2">
                    Theme
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></div>
                </button>
              </ul>
            </div>
          </nav>

          {/* Desktop Account & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Account Circle - Desktop */}
            <div className="hidden sm:block">
              <div 
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full cursor-pointer bg-cover bg-center border-2 border-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ring-2 ring-gray-200/50 hover:ring-blue-300/50"
                style={{ backgroundImage: `url(${accountImage})` }}
              ></div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100/50 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-100 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 px-2">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 p-4">
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#" 
                    className="block px-4 py-3 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="block px-4 py-3 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="block px-4 py-3 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Developers
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="block px-4 py-3 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Theme
                  </a>
                </li>
              </ul>
              
              {/* Mobile Account Section */}
              <div className="mt-5 pt-4 border-t border-gray-200/50">
                <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/50 rounded-lg transition-colors duration-200 cursor-pointer">
                  <div 
                    className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-white shadow-md ring-2 ring-gray-200/50"
                    style={{ backgroundImage: `url(${accountImage})` }}
                  ></div>
                  <span className="text-gray-700 font-medium">Account</span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;