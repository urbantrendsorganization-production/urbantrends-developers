import React, { useState, useEffect } from 'react';
import { Code, Sparkles, Rocket, Github, Globe, Cpu, Zap, Star, Plus, ArrowRight } from 'lucide-react';
import { Form } from 'react-router-dom';

function AddProjects() {
    const [formData, setFormData] = useState({
        projectName: '',
        description: '',
        techStack: '',
        repoLink: '',
        liveDemo: '',
        category: ''
    });
    
    const [isAnimated, setIsAnimated] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [particles, setParticles] = useState([]);

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

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    

    const categories = [
        { icon: Globe, name: 'Web App', color: 'from-blue-500 to-cyan-500' },
        { icon: Cpu, name: 'AI/ML', color: 'from-purple-500 to-pink-500' },
        { icon: Code, name: 'API', color: 'from-green-500 to-teal-500' },
        { icon: Rocket, name: 'Mobile', color: 'from-orange-500 to-red-500' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-400 relative overflow-hidden">
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`
                        }}
                    />
                ))}
            </div>

            

            <div className="container mx-auto px-6 py-12 relative z-10">
                {/* Hero Section */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <Sparkles className="w-8 h-8 text-gray-400 animate-pulse" />
                        <h1 className="text-5xl font-bold bg-white bg-clip-text text-transparent">
                            Submit Your <span className='text-gray-400'>Masterpiece</span> 
                        </h1>
                        <Sparkles className="w-8 h-8 text-gray-400 animate-pulse" />
                    </div>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Transform your code into a showcase. Join our community of creators and let your projects shine in the digital universe.
                    </p>
                </div>

                {/* Category Selection */}
                <div className={`mb-12 transition-all duration-1000 delay-200 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h3 className="text-2xl font-bold text-white text-center mb-8">Choose Your Project Type</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {categories.map((category, index) => {
                            const IconComponent = category.icon;
                            return (
                                <div
                                    key={index}
                                    onClick={() => setFormData({...formData, category: category.name})}
                                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 ${
                                        formData.category === category.name 
                                            ? 'border-cyan-400 bg-gradient-to-r ' + category.color + ' text-white shadow-2xl' 
                                            : 'border-white/20 bg-white/5 backdrop-blur-sm hover:border-white/40 text-gray-300'
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
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                        <div className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Project Name */}
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-white font-medium">
                                        <Star className="w-4 h-4 text-yellow-400" />
                                        <span>Project Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="projectName"
                                        value={formData.projectName}
                                        onChange={handleInputChange}
                                        onFocus={() => setActiveField('projectName')}
                                        onBlur={() => setActiveField(null)}
                                        className={`w-full px-4 py-3 bg-white/10 border-2 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none ${
                                            activeField === 'projectName' ? 'border-cyan-400 bg-white/20 scale-105' : 'border-white/30 hover:border-white/50'
                                        }`}
                                        placeholder="Enter your project name"
                                    />
                                </div>

                                {/* Tech Stack */}
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-white font-medium">
                                        <Cpu className="w-4 h-4 text-green-400" />
                                        <span>Tech Stack</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="techStack"
                                        value={formData.techStack}
                                        onChange={handleInputChange}
                                        onFocus={() => setActiveField('techStack')}
                                        onBlur={() => setActiveField(null)}
                                        className={`w-full px-4 py-3 bg-white/10 border-2 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none ${
                                            activeField === 'techStack' ? 'border-cyan-400 bg-white/20 scale-105' : 'border-white/30 hover:border-white/50'
                                        }`}
                                        placeholder="React, Node.js, MongoDB..."
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-white font-medium">
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                    <span>Project Description</span>
                                </label>
                                <textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    onFocus={() => setActiveField('description')}
                                    onBlur={() => setActiveField(null)}
                                    rows="4"
                                    className={`w-full px-4 py-3 bg-white/10 border-2 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none resize-none ${
                                        activeField === 'description' ? 'border-cyan-400 bg-white/20 scale-105' : 'border-white/30 hover:border-white/50'
                                    }`}
                                    placeholder="Tell us about your amazing project..."
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Repository Link */}
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-white font-medium">
                                        <Github className="w-4 h-4 text-orange-400" />
                                        <span>Repository Link</span>
                                    </label>
                                    <input
                                        type="url"
                                        id="repoLink"
                                        value={formData.repoLink}
                                        onChange={handleInputChange}
                                        onFocus={() => setActiveField('repoLink')}
                                        onBlur={() => setActiveField(null)}
                                        className={`w-full px-4 py-3 bg-white/10 border-2 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none ${
                                            activeField === 'repoLink' ? 'border-cyan-400 bg-white/20 scale-105' : 'border-white/30 hover:border-white/50'
                                        }`}
                                        placeholder="https://github.com/username/repo"
                                    />
                                </div>

                                {/* Live Demo */}
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-white font-medium">
                                        <Globe className="w-4 h-4 text-blue-400" />
                                        <span>Live Demo (Optional)</span>
                                    </label>
                                    <input
                                        type="url"
                                        id="liveDemo"
                                        value={formData.liveDemo}
                                        onChange={handleInputChange}
                                        onFocus={() => setActiveField('liveDemo')}
                                        onBlur={() => setActiveField(null)}
                                        className={`w-full px-4 py-3 bg-white/10 border-2 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none ${
                                            activeField === 'liveDemo' ? 'border-cyan-400 bg-white/20 scale-105' : 'border-white/30 hover:border-white/50'
                                        }`}
                                        placeholder="https://your-project.vercel.app"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="text-center pt-6">
                                <button
                                    type="submit"
                                    className="group relative px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-cyan-400/50"
                                >
                                    <span className="flex items-center space-x-2">
                                        <Rocket className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                        <span>Launch Project</span>
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
            </div>
        </div>
    );
}

export default AddProjects;