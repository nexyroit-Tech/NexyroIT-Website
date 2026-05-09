import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import SEO from '../components/SEO';
import { projects, categories } from '../data/projects';

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <>
            <SEO
                title="Projects"
                description="Explore our portfolio of innovative projects showcasing web development, AI solutions, mobile apps, and UI/UX design."
            />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-[#D1E8E2] to-[#FFCB9A]/30 dark:from-[#2C3531] dark:to-[#116466]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-[#2C3531] dark:text-white mb-6">
                            Our <span className="gradient-text">Projects</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Discover how we've helped businesses transform their digital presence
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-12 bg-white dark:bg-[#2C3531] sticky top-20 z-30 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${filter === category
                                        ? 'bg-[#116466] text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#116466]/20'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-20 bg-[#D1E8E2]/30 dark:bg-[#116466]/10" ref={ref}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        layout
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5 }}
                                className="group glass rounded-2xl overflow-hidden card-hover"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-4 right-4 flex space-x-2">
                                        <a
                                            href={project.link}
                                            className="p-2 bg-white/90 dark:bg-[#2C3531]/90 rounded-full text-[#116466] hover:text-[#D9B08C] transition-colors"
                                            aria-label="View project"
                                        >
                                            <FaExternalLinkAlt size={16} />
                                        </a>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <span className="text-sm text-[#116466] dark:text-[#D9B08C] font-medium">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl font-bold text-[#2C3531] dark:text-white mt-2 mb-3">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-[#116466]/10 dark:bg-[#116466]/20 text-[#116466] dark:text-[#D9B08C] text-sm rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-600 dark:text-gray-400 text-xl">
                                No projects found in this category.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-[#116466] to-[#2C3531] text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6">Have a Project in Mind?</h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Let's collaborate to create something amazing together
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-[#D9B08C] text-[#2C3531] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#FFCB9A] transition-colors"
                    >
                        Start a Project
                    </a>
                </div>
            </section>
        </>
    );
};

export default Projects;