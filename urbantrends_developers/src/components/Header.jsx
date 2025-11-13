import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/urbantrends.svg";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDeveloper } from "../context/DeveloperContext";
import axios from "axios";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  const { developerId, setDeveloperId } = useDeveloper();
  const dropdownRef = useRef(null);

  const backendUrl = import.meta.env.VITE_BACKEND_LINK;

  const URBANTRENDS_URL = `${backendUrl}/devs/add-dev`

  // Remember last login/signup in localStorage
  useEffect(() => {
  if (isAuthenticated && user) {
    // Save user info locally
    localStorage.setItem("lastUser", JSON.stringify(user));

    // Save user to backend
    const saveUser = async () => {
      try {
        const payload = {
          auth0_id: user.sub,
          github_username: user.nickname || "",
          email: user.email,
          name: user.name,
          avatar_url: user.picture
        };

        const response = await axios.post(
          URBANTRENDS_URL,
          payload
        );

        console.log("User saved:", response.data);

        // Save developer ID to localStorage AND context
        const devId = response.data.developer?.id; //  Correct path
        if (devId) {
          localStorage.setItem("developerId", devId);
          setDeveloperId(devId); // reactive for other components
          console.log("Developer ID saved:", devId);
        }
      } catch (error) {
        console.error("Error saving user:", error.response?.data || error.message);
      }
    };

    saveUser();
  }
}, [isAuthenticated, user, setDeveloperId]);




  const lastUser = JSON.parse(localStorage.getItem("lastUser") || "null");

  // Click outside dropdown to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-login if previously logged in
  // useEffect(() => {
  //   if (!isAuthenticated && lastUser) {
  //     loginWithRedirect({ login_hint: lastUser.email });
  //   }
  // }, []); // only run once on mount

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    localStorage.removeItem("lastUser");
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <header className="bg-gradient-to-r from-white via-[#F8F9FA] to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer transform hover:scale-105 transition-transform duration-200"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="UrbanTrends" className="w-12 sm:h-16 h-[30px] drop-shadow-sm" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <div className="bg-white/80 dark:bg-gray-900 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
              <ul className="flex items-center gap-8 text-gray-700 font-medium dark:text-white">
                <li onClick={() => navigate('/')} className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-300 transition-colors duration-200">Home</li>
                <li className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-300 transition-colors duration-200">Community</li>
                <li className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-300 transition-colors duration-200">Developers</li>
                <li onClick={toggleTheme} className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-300 transition-colors duration-200">
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </li>
              </ul>
            </div>
          </nav>

          {/* Auth / Account */}
          <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            {isLoading ? (
              <span className="text-sm text-gray-500 dark:text-gray-400">Loading...</span>
            ) : (isAuthenticated || lastUser) ? (
              <>
                {/* Avatar */}
                <div
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full cursor-pointer bg-cover bg-center border-2 border-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ring-2 ring-gray-200/50 hover:ring-blue-300/50"
                  style={{ backgroundImage: `url(${user?.picture || lastUser?.picture})` }}
                  title={user?.name || lastUser?.name}
                  onClick={toggleDropdown}
                ></div>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-14 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-700/50 z-50 overflow-hidden">
                    <div className="p-4 flex flex-col gap-2 text-gray-800 dark:text-gray-100">
                      <span className="font-medium truncate">{user?.name || lastUser?.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 truncate">{user?.email || lastUser?.email}</span>
                      <button
                        onClick={handleLogout}
                        className="mt-2 w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm px-4 py-2 rounded-lg transition-all"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow-md transition-all"
              >
                Login
              </button>
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-2 bg-white/90 dark:bg-gray-900 backdrop-blur-md rounded-lg shadow-lg p-4">
            <ul className="flex flex-col gap-4 text-gray-700 dark:text-white">
              <li onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }} className="cursor-pointer hover:text-blue-600 transition-colors">Home</li>
              <li className="cursor-pointer hover:text-blue-600 transition-colors">Community</li>
              <li className="cursor-pointer hover:text-blue-600 transition-colors">Developers</li>
              <li onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }} className="cursor-pointer hover:text-blue-600 transition-colors">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </li>
              {!isLoading && (
                (isAuthenticated || lastUser) ? (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm px-4 py-2 rounded-lg transition-all"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <button
                      onClick={() => loginWithRedirect()}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow-md transition-all"
                    >
                      Login
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        )}

      </div>
    </header>
  );
}

export default Header;
