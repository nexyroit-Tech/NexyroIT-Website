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
            <section className="py-24 bg-[#D1E8E2]/30 dark:bg-[#116466]/10" ref={ref}>
                <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl font-bold text-[#2C3531] dark:text-white mb-6">
                            Building the <span className="gradient-text">Future Team</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                            We are currently not actively recruiting or accepting new entries into our talent pool while we focus on our current projects. 
                            However, the future is bright and we will be opening new opportunities soon!
                        </p>
                        
                        <div className="inline-block glass px-8 py-4 rounded-2xl border border-[#116466]/20 dark:border-[#D9B08C]/20">
                            <p className="text-[#116466] dark:text-[#D9B08C] font-semibold flex items-center justify-center">
                                <span className="relative flex h-3 w-3 mr-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#116466] dark:bg-[#D9B08C] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#116466] dark:bg-[#D9B08C]"></span>
                                </span>
                                Opportunities Opening Soon
                            </p>
                        </div>
                        
                        <p className="mt-12 text-gray-500 dark:text-gray-400">
                            Stay tuned and follow our journey. We can't wait to grow with you!
                        </p>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Careers;
