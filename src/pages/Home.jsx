import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCode, FaRocket, FaLightbulb } from 'react-icons/fa';
import SEO from '../components/SEO';
import { services } from '../data/services';
import { projects } from '../data/projects';

const Home = () => {
    const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <>
            <SEO
                title="Home"
                description="Nexyro IT - Engineering the Future Digital World. Innovative tech solutions for modern businesses."
            />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#D1E8E2] via-[#FFCB9A]/20 to-[#D9B08C]/20 dark:from-[#2C3531] dark:via-[#116466]/20 dark:to-[#2C3531]">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#116466]/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#D9B08C]/20 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-[#2C3531] dark:text-white mb-6 leading-tight">
                            Engineering the{' '}
                            <span className="gradient-text">Future Digital</span> World
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            We transform innovative ideas into powerful digital solutions.
                            Join us in shaping tomorrow's technology today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="btn-primary inline-flex items-center justify-center">
                                Get Started <FaArrowRight className="ml-2" />
                            </Link>
                            <Link to="/projects" className="btn-secondary inline-flex items-center justify-center">
                                View Our Work
                            </Link>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {[
                            { number: '50+', label: 'Projects Delivered' },
                            { number: '30+', label: 'Happy Clients' },
                            { number: '5+', label: 'Years Experience' },
                            { number: '100%', label: 'Client Satisfaction' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-[#116466] dark:text-[#D9B08C]">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 mt-2">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-20 bg-white dark:bg-[#2C3531]" ref={ref1}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        ref={ref1}
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView1 ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-[#2C3531] dark:text-white mb-4">
                            Who We Are
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#116466] to-[#D9B08C] mx-auto rounded-full" />
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={inView1 ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3 className="text-3xl font-bold text-[#2C3531] dark:text-white mb-4">
                                Building Tomorrow's Technology Today
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                Nexyro IT is a cutting-edge technology startup founded by three passionate innovators.
                                We specialize in creating transformative digital solutions that help businesses thrive
                                in the modern world.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                From AI-powered applications to stunning user interfaces, we combine technical
                                expertise with creative vision to deliver exceptional results.
                            </p>
                            <Link to="/about" className="text-[#116466] dark:text-[#D9B08C] font-semibold hover:underline inline-flex items-center">
                                Learn More About Us <FaArrowRight className="ml-2" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={inView1 ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#116466] to-[#D9B08C] rounded-2xl transform rotate-3 opacity-20" />
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                                alt="Team collaboration"
                                className="relative rounded-2xl shadow-2xl w-full"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Preview */}
            <section className="py-20 bg-[#D1E8E2]/30 dark:bg-[#116466]/10" ref={ref2}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView2 ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-[#2C3531] dark:text-white mb-4">
                            Our Services
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Comprehensive digital solutions tailored to your business needs
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView2 ? "visible" : "hidden"}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {services.slice(0, 6).map((service) => (
                            <motion.div
                                key={service.id}
                                variants={itemVariants}
                                className="glass dark:glass bg-white/50 dark:bg-[#2C3531]/50 p-8 rounded-2xl card-hover"
                            >
                                <service.icon className="w-12 h-12 text-[#116466] dark:text-[#D9B08C] mb-4" />
                                <h3 className="text-xl font-bold text-[#2C3531] dark:text-white mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="text-center mt-12">
                        <Link to="/services" className="btn-primary inline-flex items-center">
                            View All Services <FaArrowRight className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="py-20 bg-white dark:bg-[#2C3531]" ref={ref3}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView3 ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-[#2C3531] dark:text-white mb-4">
                            Featured Projects
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Explore our latest work and success stories
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView3 ? "visible" : "hidden"}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {projects.slice(0, 3).map((project) => (
                            <motion.div
                                key={project.id}
                                variants={itemVariants}
                                className="group relative overflow-hidden rounded-2xl shadow-lg card-hover"
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2C3531] via-[#2C3531]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <span className="text-[#D9B08C] text-sm font-medium">{project.category}</span>
                                        <h3 className="text-white text-xl font-bold mt-2">{project.title}</h3>
                                        <p className="text-gray-300 text-sm mt-2">{project.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="text-center mt-12">
                        <Link to="/projects" className="btn-secondary inline-flex items-center">
                            View All Projects <FaArrowRight className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gradient-to-br from-[#116466] to-[#2C3531] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
                        <div className="w-20 h-1 bg-[#D9B08C] mx-auto rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Michael Roberts",
                                role: "CEO, TechStart Inc.",
                                content: "Nexyro IT transformed our digital presence completely. Their team's expertise and dedication exceeded our expectations."
                            },
                            {
                                name: "Emily Zhang",
                                role: "Product Manager, InnovateCo",
                                content: "The AI solution they built for us has increased our efficiency by 300%. Truly exceptional work!"
                            },
                            {
                                name: "David Kumar",
                                role: "Founder, Digital Dynamics",
                                content: "Professional, innovative, and reliable. Nexyro IT is our go-to partner for all tech projects."
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="glass p-8 rounded-2xl"
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-[#FFCB9A]">★</span>
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                                <div>
                                    <div className="font-bold">{testimonial.name}</div>
                                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#D1E8E2] dark:bg-[#2C3531]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-[#2C3531] dark:text-white mb-6">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Let's collaborate to bring your vision to life with cutting-edge technology solutions.
                    </p>
                    <Link to="/contact" className="btn-primary inline-flex items-center text-lg px-8 py-4">
                        Get In Touch <FaArrowRight className="ml-2" />
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Home;