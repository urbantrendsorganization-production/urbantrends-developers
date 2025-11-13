import React, { useEffect, useState } from 'react';
import { Github, Globe, Code2, Sparkles, ExternalLink, Rocket, Clock, Zap, TrendingUp } from 'lucide-react';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  
  // Simulated backend URL - replace with your actual one
  const backendUrl = import.meta.env.VITE_BACKEND_LINK;
  const URBANTRENDS_URL = `${backendUrl}/projects/projects/`;

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      // Simulated API call with demo data
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Replace above with actual API call:
      const response = await fetch(URBANTRENDS_URL);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setProjects(Array.isArray(data.projects) ? data.projects : data);
      
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  const getStatusColor = (status) => {
    return status === 'completed' 
      ? 'from-green-400 to-emerald-500' 
      : 'from-yellow-400 to-orange-500';
  };

  const getStatusText = (status) => {
    return status === 'completed' ? 'Completed' : 'In Progress';
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden'>
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="inline-flex items-center justify-center space-x-2 mb-6 px-6 py-3 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full text-white font-semibold shadow-lg">
            <Rocket className="w-5 h-5" />
            <span>Urbantrends Project Gallery</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-slate-800 via-gray-600 to-gray-800 bg-clip-text text-transparent leading-tight">
            Featured Projects
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore innovative solutions crafted by talented developers
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-slate-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-slate-600 text-lg font-medium">Loading amazing projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
              <Code2 className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">No Projects Yet</h3>
            <p className="text-slate-500">Be the first to submit a project!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-700 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className={`bg-white/70 backdrop-blur-xl rounded-3xl p-8 border-2 border-slate-200/50 shadow-xl transition-all duration-500 h-full flex flex-col ${
                  hoveredProject === project.id ? 'scale-105 shadow-2xl shadow-blue-200/50 border-blue-300' : ''
                }`}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-800 mb-2 line-clamp-2">
                        {project.project_name}
                      </h3>
                      <div className={`inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r ${getStatusColor(project.status)} rounded-full text-white text-xs font-semibold`}>
                        <Clock className="w-3 h-3" />
                        <span>{getStatusText(project.status)}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl">
                      <Code2 className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 mb-6 line-clamp-3 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  {project.tech_stack && (
                    <div className="mb-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <Zap className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-semibold text-slate-700">Tech Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tech_stack.split(',').map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gradient-to-r from-slate-100 to-blue-50 text-slate-700 text-xs font-medium rounded-full border border-slate-200"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <a
                      href={project.repository_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                    >
                      <Github className="w-4 h-4 transition-transform group-hover:rotate-12" />
                      <span>Code</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-gray-500 to-slate-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                      >
                        <Globe className="w-4 h-4 transition-transform group-hover:rotate-12" />
                        <span>Live</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {!isLoading && projects.length > 0 && (
          <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center space-x-8 px-8 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">
                  <span className="font-bold text-2xl text-blue-600">{projects.length}</span>
                  <span className="text-sm ml-2">Projects</span>
                </span>
              </div>
              <div className="h-8 w-px bg-slate-300"></div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span className="text-slate-700">
                  <span className="font-bold text-2xl text-purple-600">{projects.filter(p => p.status === 'completed').length}</span>
                  <span className="text-sm ml-2">Completed</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;