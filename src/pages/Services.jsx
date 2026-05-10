import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCheck } from 'react-icons/fa';
import SEO from '../components/SEO';
import { services } from '../data/services';

const Services = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <>
            <SEO
                title="Services"
                description="Discover our comprehensive tech services including web development, AI solutions, UI/UX design, and mobile app development."
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
                            Our <span className="gradient-text">Services</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Comprehensive digital solutions tailored to accelerate your business growth
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-white dark:bg-[#2C3531]" ref={ref}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="glass p-8 rounded-2xl card-hover"
                            >
                                <div className="flex items-start space-x-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#116466] to-[#D9B08C] rounded-xl flex items-center justify-center flex-shrink-0">
                                        <service.icon className="text-white text-3xl" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-[#2C3531] dark:text-white mb-3">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                                            {service.description}
                                        </p>
                                        <ul className="space-y-3">
                                            {service.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                                                    <FaCheck className="text-[#116466] dark:text-[#D9B08C] mr-3" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-[#D1E8E2]/30 dark:bg-[#116466]/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[#2C3531] dark:text-white mb-4">
                            Our Process
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">How we bring your ideas to life</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: '01', title: 'Requirement', desc: 'Understanding your needs and goals' },
                            { step: '02', title: 'Planning', desc: 'Creating a strategic roadmap' },
                            { step: '03', title: 'Development', desc: 'Building your solution' },
                            { step: '04', title: 'Launch', desc: 'Deploying and supporting' }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-[#116466] to-[#D9B08C] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white text-2xl font-bold">{item.step}</span>
                                </div>
                                <h3 className="text-xl font-bold text-[#2C3531] dark:text-white mb-2">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing CTA */}
            <section className="py-20 bg-gradient-to-br from-[#116466] to-[#2C3531] text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Contact us for a free consultation and custom quote
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-[#D9B08C] text-[#2C3531] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#FFCB9A] transition-colors"
                    >
                        Get a Quote
                    </a>
                </div>
            </section>
        </>
    );
};

export default Services;
