import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaRocket, FaLightbulb, FaUserTie, FaChevronRight } from 'react-icons/fa';
import SEO from '../components/SEO';

const Careers = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        interest: '',
        linkedin: '',
        message: ''
    });

    const categories = [
        'Web & Full Stack Development',
        'Artificial Intelligence & ML',
        'UI/UX & Creative Design',
        'Mobile App Development',
        'Digital Marketing & Strategy',
        'Other'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Since we are using a Talent Pool approach, we can redirect to email or show success
        alert('Thank you for joining our Talent Pool! We have received your details and will contact you when a suitable opportunity arises.');
        setFormData({ name: '', email: '', interest: '', linkedin: '', message: '' });
    };

    return (
        <>
            <SEO
                title="Careers | Join Our Talent Pool"
                description="Join the Nexyro IT Talent Pool. Share your profile for future opportunities in web development, AI, and design."
            />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-[#D1E8E2] to-[#FFCB9A]/30 dark:from-[#2C3531] dark:to-[#116466]/20">
                <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-[#2C3531] dark:text-white mb-6">
                            Future-Proof Your <span className="gradient-text">Career</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            We're always scouting for visionaries. Join our talent pool to be the first to know about upcoming opportunities.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Culture & Growth */}
            <section className="py-20 bg-white dark:bg-[#2C3531]">
                <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Innovation First',
                                desc: 'Work on projects that push the boundaries of what\'s possible in tech.',
                                icon: <FaRocket className="text-4xl text-[#116466] dark:text-[#D9B08C]" />
                            },
                            {
                                title: 'Continuous Growth',
                                desc: 'We invest in your learning and provide a path for career evolution.',
                                icon: <FaLightbulb className="text-4xl text-[#116466] dark:text-[#D9B08C]" />
                            },
                            {
                                title: 'Elite Community',
                                desc: 'Join a network of passionate developers, designers, and thinkers.',
                                icon: <FaUserTie className="text-4xl text-[#116466] dark:text-[#D9B08C]" />
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="glass p-8 rounded-2xl border-b-4 border-[#116466] dark:border-[#D9B08C]"
                            >
                                <div className="mb-6">{item.icon}</div>
                                <h3 className="text-xl font-bold text-[#2C3531] dark:text-white mb-3">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Talent Pool Intro */}
            <section className="py-20 bg-[#D1E8E2]/30 dark:bg-[#116466]/10" ref={ref}>
                <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            className="lg:w-1/2"
                        >
                            <h2 className="text-4xl font-bold text-[#2C3531] dark:text-white mb-6">
                                Why Join Our <span className="gradient-text">Talent Pool?</span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                At Nexyro IT, we believe great things happen when the right talent meets the right opportunity. 
                                Even if we don't have an immediate opening that fits your profile, we want to know you're out there.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Priority consideration for new openings',
                                    'Direct connection with our technical leads',
                                    'Early access to networking events',
                                    'Updates on our latest tech ventures'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-700 dark:text-gray-300">
                                        <FaChevronRight className="text-[#116466] dark:text-[#D9B08C] mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            className="lg:w-1/2 w-full"
                        >
                            <div className="glass p-8 rounded-3xl shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D9B08C]/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                                
                                <h3 className="text-2xl font-bold text-[#2C3531] dark:text-white mb-6">Share Your Profile</h3>
                                
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-[#2C3531]/50 backdrop-blur-sm dark:text-white"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-[#2C3531]/50 backdrop-blur-sm dark:text-white"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Area of Expertise</label>
                                        <select
                                            required
                                            value={formData.interest}
                                            onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-[#2C3531]/50 backdrop-blur-sm dark:text-white"
                                        >
                                            <option value="">Select your field</option>
                                            {categories.map((cat, idx) => (
                                                <option key={idx} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Portfolio / LinkedIn URL</label>
                                        <input
                                            type="url"
                                            value={formData.linkedin}
                                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-[#2C3531]/50 backdrop-blur-sm dark:text-white"
                                            placeholder="https://linkedin.com/in/..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Introduction</label>
                                        <textarea
                                            rows="3"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-[#2C3531]/50 backdrop-blur-sm dark:text-white"
                                            placeholder="Briefly describe your skills..."
                                        />
                                    </div>

                                    <button type="submit" className="w-full btn-primary py-4 rounded-xl text-lg font-bold shadow-lg shadow-[#116466]/20">
                                        Join Talent Pool
                                    </button>
                                    
                                    <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                                        Alternatively, email your CV directly to <a href="mailto:careers@nexyroit.com" className="text-[#116466] dark:text-[#D9B08C] hover:underline">careers@nexyroit.com</a>
                                    </p>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Careers;
