import React, { useState, useEffect } from 'react';
import { Code, Sparkles, Rocket, Github, Globe, Cpu, Zap, Star, Plus, ArrowRight } from 'lucide-react';
import { Form } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function AddProjects() {
    const [formData, setFormData] = useState({
        project_type: '',
        project_name: '',
        tech_stack: '',
        project_description: '',
        repo_link: '',
        live_link: ''
    });
    
    const [isAnimated, setIsAnimated] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [particles, setParticles] = useState([]);
    const URBANTRENDS_URL = import.meta.env.VITE_MAIN_LINK;
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setIsAnimated(true);
        // Generate floating particles
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 2,
            duration: 3 + Math.random() * 2
        }));
        setParticles(newParticles);
    }, []);

    const validateForm = (formData) => {
            if (!formData.project_type.trim()) return 'Please select a project type.';
            if (!formData.project_name.trim()) return 'Project name is required.';
            if (!formData.tech_stack.trim()) return 'Tech stack is required.';
            if (!formData.project_description.trim()) return 'Project description is required.';
            if (!formData.repo_link.trim()) return 'Repository link is required.';

            if (formData.repo_link && !/^https?:\/\/.+/.test(formData.repo_link)) return 'Repository link must be a valid URL.';
            if (formData.live_link && formData.live_link.trim() && !/^https?:\/\/.+/.test(formData.live_link)) return 'Live demo link must be a valid URL.';
            return null; // No errors
        }
        

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMsg = validateForm(formData);
        if (errorMsg) {
            toast.error(errorMsg);
            return;
        }
        const toastId = toast.loading('Submitting your project...');

        // Basic validation for required fields
        try {
            setIsSubmitting(true);
            const response = await axios.post(`${URBANTRENDS_URL}api/add-projects`, formData);
            toast.success('Project submitted successfully!', { id: toastId });
            // Reset form
            setFormData({
                project_type: '',
                project_name: '',
                tech_stack: '',
                project_description: '',
                repo_link: '',
                live_link: ''
            });
            console.log('Response:', response.data);
            
 
        } catch (error) {
            console.error('Error submitting project:', error.message);

            if (error.response) {
                toast.error(`Error: ${error.response.data.error || 'Server error occurred.'}`);
            } else if (error.request) {
                toast.error('No response from server. Please try again later.');
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
            toast.dismiss(toastId);
        }
    }

    const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // update by field name
    });
  };

    

    const categories = [
        { icon: Globe, name: 'Web App', color: 'from-blue-500 to-cyan-500' },
        { icon: Cpu, name: 'AI/ML', color: 'from-purple-500 to-pink-500' },
        { icon: Code, name: 'API', color: 'from-green-500 to-teal-500' },
        { icon: Rocket, name: 'Others', color: 'from-orange-500 to-red-500' }
    ];

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
                {/* Hero Section */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <Sparkles className="w-8 h-8 text-gray-900 dark:text-gray-200 animate-pulse" />
                        <h1 className="text-5xl font-bold dark:text-gray-400">
                            Submit Your <span className='dark:text-gray-400'>Masterpiece</span> 
                        </h1>
                        <Sparkles className="w-8 h-8 text-gray-900 dark:text-gray-200 animate-pulse" />
                    </div>
                    <p className="text-xl text-gray-900 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Transform your code into a showcase. Join our community of creators and let your projects shine in the digital universe.
                    </p>
                </div>

                {/* Category Selection */}
                <div className={`mb-12 transition-all duration-1000 delay-200 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-8">Choose Your Project Type</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {categories.map((category, index) => {
                            const IconComponent = category.icon;
                            return (
                                <div
                                    key={index}
                                    onClick={() => setFormData({...formData, project_type: category.name})}
                                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 ${
                                        formData.project_type === category.name
                                            ? 'border-cyan-400 bg-gradient-to-r ' + category.color + ' text-white shadow-2xl'
                                            : 'border-gray-300 dark:border-white/20 bg-black/5 backdrop-blur-sm hover:border-gray-400 text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    <IconComponent className="w-8 h-8 mx-auto mb-3" />
                                    <p className="text-sm font-medium text-center">{category.name}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Form */}
                <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-400 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-gray-500 dark:border-white/20 shadow-2xl">
                        <div className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
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
                                        className={`w-full px-4 py-3 dark:bg-white/10 border-2 rounded-xl text-black placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none ${
                                            activeField === 'project_name' ? 'border-cyan-400 dark:bg-white/20 scale-105' : 'border-gray-500 hover:border-gray-700 dark:border-white/30 dark:hover:border-white/50'
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
                                        className={`w-full px-4 py-3 bg-white/10 border-2 rounded-xl text-black placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none ${
                                            activeField === 'tech_stack' ? 'border-cyan-400 bg-white/20 scale-105' : 'border-gray-500 hover:border-gray-600 dark:border-white/30 dark:hover:border-white/50'
                                        }`}
                                        placeholder="React, Node.js, MongoDB..."
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-gray-500 dark:text-white font-medium">
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                    <span>Project Description</span>
                                </label>
                                <textarea
                                    id="project_description"
                                    name='project_description'
                                    value={formData.project_description}
                                    onChange={handleInputChange}
                                    onFocus={() => setActiveField('project_description')}
                                    onBlur={() => setActiveField(null)}
                                    rows="4"
                                    className={`w-full px-4 py-3 bg-white/10 border-2 rounded-xl text-black placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none resize-none ${
                                        activeField === 'project_description' ? 'border-cyan-400 bg-white/20 scale-105' : 'border-gray-500 hover:border-gray-600 dark:border-white/30 dark:hover:border-white/50'
                                    }`}
                                    placeholder="Tell us about your amazing project..."
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Repository Link */}
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
                                        onFocus={() => setActiveField('repo_link')}
                                        onBlur={() => setActiveField(null)}
                                        className={`w-full px-4 py-3 bg-white/10 border-2 rounded-xl text-black placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none ${
                                            activeField === 'repo_link' ? 'border-cyan-400 bg-white/20 scale-105' : 'border-gray-500 hover:border-gray-700 dark:border-white/30 dark:hover:border-white/50'
                                        }`}
                                        placeholder="https://github.com/username/repo"
                                    />
                                </div>

                                {/* Live Demo */}
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
                                        onFocus={() => setActiveField('live_link')}
                                        onBlur={() => setActiveField(null)}
                                        className={`w-full px-4 py-3 bg-white/10 border-2 rounded-xl text-black placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none ${
                                            activeField === 'live_link' ? 'border-cyan-400 bg-white/20 scale-105' : 'border-gray-500 hover:border-gray-700 dark:border-white/30 dark:hover:border-white/50'
                                        }`}
                                        placeholder="https://your-project.vercel.app"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
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
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Stats */}
                <div className={`mt-16 text-center transition-all duration-1000 delay-600 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-cyan-400 mb-2">1,247</div>
                            <div className="text-gray-400">Projects Submitted</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-400 mb-2">854</div>
                            <div className="text-gray-400">Active Developers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-400 mb-2">392</div>
                            <div className="text-gray-400">Featured Projects</div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddProjects;