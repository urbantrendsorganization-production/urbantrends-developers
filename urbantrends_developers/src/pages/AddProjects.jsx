import React, { useState, useEffect } from 'react';
import { Code, Sparkles, Rocket, Github, Globe, Cpu, Star, ArrowRight } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDeveloper } from '../context/DeveloperContext';
import { useAuth0 } from '@auth0/auth0-react';

function AddProjects() {
    const { developerId } = useDeveloper();
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();

    const [formData, setFormData] = useState({
        project_name: '',
        tech_stack: '',
        project_description: '',
        repo_link: '',
        live_link: ''
    });

    const backendUrl = import.meta.env.VITE_BACKEND_LINK;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [particles, setParticles] = useState([]);
    const [isAnimated, setIsAnimated] = useState(false);

    const URBANTRENDS_URL = `${backendUrl}/projects/add`; // direct endpoint

    // Particle animation setup
    useEffect(() => {
        setIsAnimated(true);
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 2,
            duration: 3 + Math.random() * 2
        }));
        setParticles(newParticles);
    }, []);

    const validateForm = (data) => {
        if (!data.project_name.trim()) return 'Project name is required.';
        if (!data.tech_stack.trim()) return 'Tech stack is required.';
        if (!data.project_description.trim()) return 'Project description is required.';
        if (!data.repo_link.trim()) return 'Repository link is required.';
        if (!/^https?:\/\/.+/.test(data.repo_link)) return 'Repository link must be a valid URL.';
        if (data.live_link && data.live_link.trim() && !/^https?:\/\/.+/.test(data.live_link))
            return 'Live demo link must be a valid URL.';
        if (!developerId) return 'Developer ID not found. Please login first.';
        return null;
    };

    const handleSubmit = async (e) => {
  e.preventDefault();

  const errorMsg = validateForm(formData);
  if (errorMsg) {
    toast.error(errorMsg);
    return;
  }

  const toastId = toast.loading('Submitting your project...');
  setIsSubmitting(true);

  try {
    const payload = {
      developer_id: Number(developerId),
      project_name: formData.project_name,
      description: formData.project_description,
      tech_stack: formData.tech_stack,
      repository_url: formData.repo_link,
      live_url: formData.live_link || null,
      status: "in_progress"
    };

    console.log("Submitting project payload:", payload);

    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    const response = await axios.post(`${URBANTRENDS_URL}`, payload);

    // Success toast: replace loading toast
    toast.success(`Project submitted successfully, ${user.name}!`, { id: toastId });

    setFormData({
      project_name: '',
      project_description: '',
      tech_stack: '',
      repo_link: '',
      live_link: ''
    });

    console.log('Response:', response.data);

  } catch (error) {
    console.error('Error submitting project:', error);

    // Replace loading toast with error
    toast.error(error.response?.data?.error || 'Server error occurred.', { id: toastId });

  } finally {
    setIsSubmitting(false);
  }
};






    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute w-1 h-1 bg-black dark:bg-white/50 rounded-full animate-pulse"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`
                        }}
                    />
                ))}
            </div>

            <form onSubmit={handleSubmit} className="container mx-auto px-6 py-12 relative z-10">
                <div className={`text-center mb-16 transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <Sparkles className="w-8 h-8 text-gray-900 dark:text-gray-200 animate-pulse" />
                        <h1 className="text-5xl font-bold dark:text-gray-400">
                            Submit Your <span className='dark:text-gray-400'>Masterpiece</span>
                        </h1>
                        <Sparkles className="w-8 h-8 text-gray-900 dark:text-gray-200 animate-pulse" />
                    </div>
                    <p className="text-xl text-gray-900 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Transform your code into a showcase. Join our community of creators and let your projects shine.
                    </p>
                </div>

                <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-400 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-gray-500 dark:border-white/20 shadow-2xl space-y-8">
                        {/* Project Name */}
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2 text-gray-500 dark:text-white font-medium">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span>Project Name</span>
                            </label>
                            <input
                                type="text"
                                name='project_name'
                                value={formData.project_name}
                                onChange={handleInputChange}
                                onFocus={() => setActiveField('project_name')}
                                onBlur={() => setActiveField(null)}
                                className={`w-full px-4 py-3 border-2 rounded-xl text-black placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none ${activeField === 'project_name' ? 'border-cyan-400 scale-105' : 'border-gray-500 hover:border-gray-700'
                                    }`}
                                placeholder="Enter your project name"
                            />
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2 text-gray-500 dark:text-white font-medium">
                                <Cpu className="w-4 h-4 text-green-400" />
                                <span>Tech Stack</span>
                            </label>
                            <input
                                type="text"
                                name='tech_stack'
                                value={formData.tech_stack}
                                onChange={handleInputChange}
                                onFocus={() => setActiveField('tech_stack')}
                                onBlur={() => setActiveField(null)}
                                className={`w-full px-4 py-3 border-2 rounded-xl text-black placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none ${activeField === 'tech_stack' ? 'border-cyan-400 scale-105' : 'border-gray-500 hover:border-gray-700'
                                    }`}
                                placeholder="React, Node.js, MongoDB..."
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2 text-gray-500 dark:text-white font-medium">
                                <Sparkles className="w-4 h-4 text-purple-400" />
                                <span>Project Description</span>
                            </label>
                            <textarea
                                name='project_description'
                                value={formData.project_description}
                                onChange={handleInputChange}
                                rows="4"
                                className={`w-full px-4 py-3 border-2 rounded-xl text-black placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none resize-none ${activeField === 'project_description' ? 'border-cyan-400 scale-105' : 'border-gray-500 hover:border-gray-700'
                                    }`}
                                placeholder="Tell us about your amazing project..."
                            />
                        </div>

                        {/* Repository & Live Link */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-gray-500 dark:text-white font-medium">
                                    <Github className="w-4 h-4 text-orange-400" />
                                    <span>Repository Link</span>
                                </label>
                                <input
                                    type="url"
                                    name='repo_link'
                                    value={formData.repo_link}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 rounded-xl placeholder-gray-400 backdrop-blur-sm focus:outline-none"
                                    placeholder="https://github.com/username/repo"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-gray-500 dark:text-white font-medium">
                                    <Globe className="w-4 h-4 text-blue-400" />
                                    <span>Live Demo (Optional)</span>
                                </label>
                                <input
                                    type="url"
                                    name='live_link'
                                    value={formData.live_link}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 rounded-xl placeholder-gray-400 backdrop-blur-sm focus:outline-none"
                                    placeholder="https://your-project.vercel.app"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="text-center pt-6">
                            <button
                                type="submit"
                                className="group relative px-12 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-cyan-400/50"
                                disabled={isSubmitting}
                            >
                                <span className="flex items-center space-x-2">
                                    <Rocket className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    <span>{isSubmitting ? 'Submitting...' : 'Submit Project'}</span>
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddProjects;
