import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import devImage from "../assets/projects.jpg";
import { useNavigate } from "react-router-dom";
import { siPaypal, siGithub, siPinterest, siGoogle } from "simple-icons/icons";
import axios from "axios";

function Home() {
  const accessKey = import.meta.env.VITE_ACCESS_KEY;
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  // Fetch images from Unsplash API
  useEffect(() => {
    const fetchImages = async () => {
      if (!accessKey) {
        console.error("Unsplash Access Key is missing. Please set it in the .env file.");
        return;
      }
      try {
        const res = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: {
              query: "technology",
              per_page: 10,
              client_id: accessKey,
              width: 4000,
              height: 6000
            },
          }
        );
        const filter = res.data.results.filter(img => img.height >= img.width);
        setImages(filter);
      } catch (error) {
        console.error("Error fetching images from Unsplash:", error);
      }
    };

    fetchImages();
  }, []);

  // Cycle through images every 5 seconds
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [images]);


  // Trigger animations on mount


  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen relative 
    bg-gradient-to-br from-slate-50 via-white to-blue-50 
    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ">

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-60 h-60 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>


      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Content */}
          <div className={`flex-1 text-center lg:text-left transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            {/* Main Heading */}
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight">
                <span className="block text-black dark:text-white">SHOWCASE YOUR</span>
                <span className="block text-black dark:text-white">BEST PROJECTS,</span>
                <span className="block bg-gradient-to-r from-gray-700 via-gray-700 to-gray-900 bg-clip-text dark:from-gray-200 dark:via-gray-200 dark:to-gray-300 text-transparent animate-gradient">
                  GET NOTICED FIRST
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="mb-8 max-w-2xl mx-auto lg:mx-0">
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                Transform your projects into compelling stories that captivate clients,
                impress employers, and inspire collaborators.
                <span className="text-gray-700 dark:text-gray-300 underline font-medium"> Stand out in today's competitive landscape.</span>
              </p>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/add-project")}
                className="group relative px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 hover:text-black">
                  Add Project
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={() => navigate("/projects")}
                className="group px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  View Projects
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Stats/Features Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects Showcased</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
              </div>
            </div>

            {/* Partners Container */}
            <div className="w-full max-w-lg mx-auto lg:mx-0">
              <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-3 uppercase tracking-wider font-medium">Trusted By</p>
                  <div className="flex items-center justify-center space-x-6 opacity-60">
                    {/* Placeholder partner logos */}
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-gray-600 dark:to-gray-500 rounded flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                        fill="white"
                      >
                        <title>{siPaypal.title}</title>
                        <path d={siPaypal.path} />
                      </svg>
                    </div>
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-gray-600 dark:to-gray-500 rounded flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                        fill="white"
                      >
                        <title>{siGithub.title}</title>
                        <path d={siGithub.path} />
                      </svg>
                    </div>
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-gray-600 dark:to-gray-500 rounded flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                        fill="white"
                      >
                        <title>{siPinterest.title}</title>
                        <path d={siPinterest.path} />
                      </svg>
                    </div>
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-gray-600 dark:to-gray-500 rounded flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                        fill="white"
                      >
                        <title>{siGoogle.title}</title>
                        <path d={siGoogle.path} />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className={`relative transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
            {/* Mobile Image - Show only on small devices */}
            <div className="block lg:hidden relative group mb-8">
              <div className="relative w-full max-w-sm mx-auto h-64 sm:h-80 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={devImage}
                  alt="Showcase your development projects"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Desktop Portrait Box - Show only on large devices */}
            <div className="hidden lg:flex flex-col items-center justify-center">
              <div className="relative group">
                {/* Portrait container with golden ratio proportions */}
                <div className="relative w-80 h-[500px] bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border-2 border-gray-200/50 overflow-hidden group-hover:shadow-3xl transition-all duration-500">
                  {/* Portrait frame */}
                  <div className="absolute inset-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-inner flex items-center justify-center">
                    {/* Placeholder for portrait image */}
                    <div className="relative w-full h-full aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden">
                      {/* You can replace this div with your portrait image */}
                      {images.length > 0 && (
                        <img
                          src={images[index].urls.regular}
                          alt={images[index].alt_description || "Unsplash Image"}
                          className="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
                        />
                      )}

                      {/* Subtle pattern overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                    </div>
                  </div>

                  {/* Frame highlights */}
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-white/50 ring-inset"></div>

                  {/* Decorative corner elements */}
                  <div className="absolute top-6 left-6 w-4 h-4 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full shadow-lg opacity-80"></div>
                  <div className="absolute top-6 right-6 w-4 h-4 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full shadow-lg opacity-80"></div>
                  <div className="absolute bottom-6 left-6 w-4 h-4 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full shadow-lg opacity-80"></div>
                  <div className="absolute bottom-6 right-6 w-4 h-4 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full shadow-lg opacity-80"></div>
                </div>

                {/* Background decoration */}
                <div className="absolute inset-0 -z-10 transform translate-x-6 translate-y-6">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl opacity-60"></div>
                </div>

                {/* Floating accent elements */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center group-hover:-rotate-12 transition-transform duration-500">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Caption below portrait
              <div className="mt-6 text-center">
                <p className="text-gray-700 font-semibold text-lg">Your Professional Image</p>
                <p className="text-gray-500 text-sm mt-1">Make a lasting first impression</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent pointer-events-none"></div>
    </div>
  );
}

export default Home;