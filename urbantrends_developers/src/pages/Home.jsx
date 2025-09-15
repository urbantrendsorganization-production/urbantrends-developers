import React from "react";
import Header from "../components/Header";
import devImage from "../assets/projects.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-12 py-12 gap-10">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            SHOWCASE YOUR BEST <br /> PROJECTS, GET <br />
            <span className="font-bold bg-gradient-to-r from-[#8796A6] to-[#343A40] bg-clip-text text-transparent">
              NOTICED FIRST
            </span>
          </h1>

          <h2 className="mt-6 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-light">
            Showcasing your projects isn’t just about putting them online—it’s about making them shine. <br />
            By presenting your work in a clear, professional, and engaging way, you give clients, <br />
            employers, and collaborators a reason to notice you first.
          </h2>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 justify-center lg:justify-start">
            <button
              onClick={() => navigate("/add-project")}
              className="bg-[#343A40] px-8 py-4 text-white rounded-lg shadow-md hover:bg-[#1F1F1F] transition"
            >
              Add Project
            </button>
            <button
              onClick={() => navigate("/projects")}
              className="bg-[#8796A6] px-8 py-4 text-white rounded-lg shadow-md hover:bg-[#6B7A88] transition"
            >
              View Projects
            </button>
          </div>

          {/* Partners Container */}
          <div className="w-full sm:w-3/4 h-28 sm:h-40 bg-gradient-to-r from-[#E9E9E9] to-[#B0B0B0] mt-8 border border-gray-400 rounded-xl flex items-center justify-center shadow-sm mx-auto lg:mx-0">
            <p className="text-gray-700 font-medium">Partner Logos Here</p>
          </div>
        </div>

        {/* Right Content (Image) */}
        <div className="w-full sm:w-[400px] md:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl shadow-md shadow-black overflow-hidden">
          <img
            src={devImage}
            alt="development image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
