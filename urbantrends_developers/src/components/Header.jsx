import React, { useState } from "react";
import logo from "../assets/urbantrends.svg";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header
      className="
        bg-gradient-to-r from-white via-[#F8F9FA] to-white 
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
        border-b border-gray-200/50 dark:border-gray-700/50
        shadow-sm sticky top-0 z-50
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-200 cursor-pointer"
               onClick={() => navigate("/")}>
            <img src={logo} alt="UrbanTrends" className="w-12 sm:h-16 lg:h-30 drop-shadow-sm" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <div className="bg-white/80 dark:bg-gray-900 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
              <ul className="flex items-center gap-8 text-gray-700 font-medium">
                <li onClick={() => navigate('/')} className="cursor-pointer hover:text-gray-900 dark:text-white transition-colors duration-200">Home</li>
                <li className="cursor-pointer hover:text-gray-900 dark:text-white transition-colors duration-200">Community</li>
                <li className="cursor-pointer hover:text-gray-900 dark:text-white transition-colors duration-200">Developers</li>
                <li onClick={toggleTheme} className="cursor-pointer hover:text-gray-900 dark:text-white transition-colors duration-200">
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </li>
              </ul>
            </div>
          </nav>

          {/* Account / Auth */}
          <div className="flex items-center gap-4">
            {!isLoading && (
              isAuthenticated ? (
                <>
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full cursor-pointer bg-cover bg-center border-2 border-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ring-2 ring-gray-200/50 hover:ring-blue-300/50"
                    style={{ backgroundImage: `url(${user?.picture})` }}
                    title={user?.name}
                  ></div>

                  {/* Logout button */}
                  <button
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                    className="hidden sm:block bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm px-4 py-2 rounded-lg transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => loginWithRedirect()}
                  className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow-md transition-all"
                >
                  Login
                </button>
              )
            )}

            {/* Mobile menu toggle */}
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
      </div>
    </header>
  );
}

export default Header;
