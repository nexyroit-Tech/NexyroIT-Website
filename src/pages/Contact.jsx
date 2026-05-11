import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import SEO from '../components/SEO';

const Contact = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Check if we just returned from a successful form submission
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            setSubmitted(true);
            // Clean up the URL
            window.history.replaceState({}, document.title, window.location.pathname);
            // Hide message after 5 seconds
            setTimeout(() => setSubmitted(false), 5000);
        }
    }, []);

    return (
        <>
            <SEO
                title="Contact Us"
                description="Get in touch with Nexyro IT. We're here to help with your next project."
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
                            Get In <span className="gradient-text">Touch</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Have a question or want to work together? We'd love to hear from you.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info & Form */}
            <section className="py-20 bg-white dark:bg-[#2C3531]" ref={ref}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8 }}
                                className="glass p-6 rounded-2xl"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-[#116466] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaMapMarkerAlt className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#2C3531] dark:text-white mb-2">Address</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Islamabad, Pakistan<br />
                                            Islamabad, 44000
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="glass p-6 rounded-2xl"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-[#116466] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaEnvelope className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#2C3531] dark:text-white mb-2">Email</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            <a href="mailto:nexyroit@gmail.com" className="hover:text-[#116466] dark:hover:text-[#D9B08C] transition-colors">
                                                nexyroit@gmail.com
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="glass p-6 rounded-2xl"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-[#116466] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaPhone className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#2C3531] dark:text-white mb-2">Phone</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            <a href="https://wa.me/923395022555" target="_blank" rel="noopener noreferrer" className="hover:text-[#116466] dark:hover:text-[#D9B08C] transition-colors">
                                                +92 339 5022555
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="glass p-6 rounded-2xl"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-[#116466] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaClock className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#2C3531] dark:text-white mb-2">Business Hours</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Mon - Sat: 9:00 AM - 10:00 PM<br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8 }}
                                className="glass p-8 rounded-2xl"
                            >
                                <h2 className="text-3xl font-bold text-[#2C3531] dark:text-white mb-6">
                                    Send us a Message
                                </h2>

                                {submitted ? (
                                    <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-400 px-4 py-6 rounded-lg text-center">
                                        <p className="text-xl font-bold mb-2">Thank You!</p>
                                        <p>Your message has been sent successfully. We'll get back to you soon.</p>
                                    </div>
                                ) : (
                                    <form action="https://formsubmit.co/nexyroit@gmail.com" method="POST" className="space-y-6">
                                        {/* FormSubmit Configuration */}
                                        <input type="hidden" name="_next" value={window.location.href + "?success=true"} />
                                        <input type="hidden" name="_captcha" value="false" />
                                        <input type="hidden" name="_subject" value="New Contact Form Submission!" />
                                        <input type="hidden" name="_template" value="table" />

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Your Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
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
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2C3531] text-[#2C3531] dark:text-white focus:ring-2 focus:ring-[#116466] focus:border-transparent"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Subject *
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                required
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2C3531] text-[#2C3531] dark:text-white focus:ring-2 focus:ring-[#116466] focus:border-transparent"
                                                placeholder="How can we help?"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                name="message"
                                                rows="6"
                                                required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2C3531] text-[#2C3531] dark:text-white focus:ring-2 focus:ring-[#116466] focus:border-transparent"
                                                placeholder="Tell us about your project..."
                                            />
                                        </div>

                                        <button 
                                            type="submit" 
                                            className="w-full btn-primary py-4 text-lg flex justify-center items-center"
                                        >
                                            Send Message
                                        </button>
                                    </form>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-0">
                <div className="w-full h-96 bg-gray-300 dark:bg-gray-700">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106203.2205562774!2d72.93661138240562!3d33.6844201736186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515133b45273!2sIslamabad%2C%20Islamabad%20Capital%20Territory!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Company Location"
                    />
                </div>
            </section>
        </>
    );
};

export default Contact;
