import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import SEO from '../components/SEO';

const Careers = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        position: '',
        resume: null,
        message: ''
    });

    const positions = [
        {
            id: 1,
            title: 'Senior Full Stack Developer',
            type: 'Full-time',
            location: 'Remote / On-site',
            department: 'Engineering',
            description: 'Looking for an experienced developer to lead our web development projects.'
        },
        {
            id: 2,
            title: 'UI/UX Designer',
            type: 'Full-time',
            location: 'Remote',
            department: 'Design',
            description: 'Creative designer to craft beautiful and intuitive user experiences.'
        },
        {
            id: 3,
            title: 'AI/ML Engineer',
            type: 'Full-time',
            location: 'On-site',
            department: 'AI Solutions',
            description: 'Build cutting-edge AI models and machine learning solutions.'
        },
        {
            id: 4,
            title: 'Software Engineering Intern',
            type: 'Internship',
            location: 'Remote / On-site',
            department: 'Engineering',
            description: '6-month internship program for aspiring software developers.'
        },
        {
            id: 5,
            title: 'UI Design Intern',
            type: 'Internship',
            location: 'Remote',
            department: 'Design',
            description: 'Learn from industry experts while working on real projects.'
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your application! We will get back to you soon.');
        setFormData({ name: '', email: '', position: '', resume: null, message: '' });
    };

    return (
        <>
            <SEO
                title="Careers"
                description="Join the Nexyro IT team. Explore career opportunities and internships in web development, AI, and design."
            />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-[#D1E8E2] to-[#FFCB9A]/30 dark:from-[#2C3531] dark:to-[#116466]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-[#2C3531] dark:text-white mb-6">
                            Join Our <span className="gradient-text">Team</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Be part of a passionate team shaping the future of technology
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Why Join Us */}
            <section className="py-20 bg-white dark:bg-[#2C3531]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Innovative Projects',
                                desc: 'Work on cutting-edge technologies and challenging projects',
                                icon: '🚀'
                            },
                            {
                                title: 'Growth Opportunities',
                                desc: 'Continuous learning and career development programs',
                                icon: '📈'
                            },
                            {
                                title: 'Flexible Work',
                                desc: 'Remote-friendly with flexible working hours',
                                icon: '🏠'
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="glass p-8 rounded-2xl text-center"
                            >
                                <div className="text-5xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold text-[#2C3531] dark:text-white mb-2">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-20 bg-[#D1E8E2]/30 dark:bg-[#116466]/10" ref={ref}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-[#2C3531] dark:text-white mb-4">
                            Open Positions
                        </h2>
                    </motion.div>

                    <div className="flex justify-center items-center py-12">
                        <div className="glass p-12 rounded-2xl text-center max-w-2xl w-full">
                            <h3 className="text-3xl font-bold text-[#2C3531] dark:text-white mb-4">
                                More Positions Coming Soon!
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                We are currently not hiring for any specific roles, but we are always on the lookout for talented individuals. Feel free to submit your resume for future opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section id="apply" className="py-20 bg-white dark:bg-[#2C3531]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="glass p-8 rounded-2xl"
                    >
                        <h2 className="text-3xl font-bold text-[#2C3531] dark:text-white mb-6 text-center">
                            Apply for a Position
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2C3531] text-[#2C3531] dark:text-white focus:ring-2 focus:ring-[#116466] focus:border-transparent"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2C3531] text-[#2C3531] dark:text-white focus:ring-2 focus:ring-[#116466] focus:border-transparent"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Position Applying For *
                                </label>
                                <select
                                    required
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2C3531] text-[#2C3531] dark:text-white focus:ring-2 focus:ring-[#116466] focus:border-transparent"
                                >
                                    <option value="">Select a position</option>
                                    {positions.map(pos => (
                                        <option key={pos.id} value={pos.title}>{pos.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Resume/CV *
                                </label>
                                <input
                                    type="file"
                                    required
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2C3531] text-[#2C3531] dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Cover Letter
                                </label>
                                <textarea
                                    rows="5"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2C3531] text-[#2C3531] dark:text-white focus:ring-2 focus:ring-[#116466] focus:border-transparent"
                                    placeholder="Tell us why you're a great fit..."
                                />
                            </div>

                            <button type="submit" className="w-full btn-primary py-4 text-lg">
                                Submit Application
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Careers;
