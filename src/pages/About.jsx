import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaRocket, FaBullseye, FaEye, FaUsers } from 'react-icons/fa';
import SEO from '../components/SEO';
import { team } from '../data/team';

const About = () => {
    const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });

    const milestones = [
        { year: '2020', title: 'Foundation', description: 'Nexyro IT was founded with a vision to transform digital innovation' },
        { year: '2021', title: 'First Major Client', description: 'Secured partnership with Fortune 500 company' },
        { year: '2022', title: 'Team Expansion', description: 'Grew to 15+ talented professionals' },
        { year: '2023', title: 'AI Division Launch', description: 'Launched dedicated AI and Machine Learning services' },
        { year: '2024', title: 'Global Recognition', description: 'Awarded Best Tech Startup of the Year' }
    ];

    return (
        <>
            <SEO
                title="About Us"
                description="Learn about Nexyro IT's mission, vision, and the passionate team behind our innovative technology solutions."
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
                            About <span className="gradient-text">Nexyro IT</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            We are a team of passionate innovators dedicated to engineering the future of digital technology
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-white dark:bg-[#2C3531]" ref={ref1}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={inView1 ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="glass p-8 rounded-2xl"
                        >
                            <div className="w-16 h-16 bg-[#116466] rounded-full flex items-center justify-center mb-6">
                                <FaBullseye className="text-white text-3xl" />
                            </div>
                            <h2 className="text-3xl font-bold text-[#2C3531] dark:text-white mb-4">Our Mission</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                To empower businesses with innovative technology solutions that drive growth,
                                efficiency, and digital transformation. We strive to make cutting-edge technology
                                accessible and impactful for organizations of all sizes.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={inView1 ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="glass p-8 rounded-2xl"
                        >
                            <div className="w-16 h-16 bg-[#D9B08C] rounded-full flex items-center justify-center mb-6">
                                <FaEye className="text-white text-3xl" />
                            </div>
                            <h2 className="text-3xl font-bold text-[#2C3531] dark:text-white mb-4">Our Vision</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                To be the leading technology partner for businesses worldwide, recognized for
                                our innovative solutions, exceptional quality, and commitment to shaping a
                                better digital future for all.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-[#D1E8E2]/30 dark:bg-[#116466]/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[#2C3531] dark:text-white mb-4">Our Core Values</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: FaRocket, title: 'Innovation', desc: 'Pushing boundaries with creative solutions' },
                            { icon: FaUsers, title: 'Collaboration', desc: 'Working together to achieve excellence' },
                            { icon: FaBullseye, title: 'Excellence', desc: 'Delivering quality in everything we do' }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="text-center p-8 glass rounded-2xl"
                            >
                                <value.icon className="w-16 h-16 text-[#116466] dark:text-[#D9B08C] mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-[#2C3531] dark:text-white mb-2">{value.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-white dark:bg-[#2C3531]" ref={ref2}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView2 ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-[#2C3531] dark:text-white mb-4">About Us</h2>
                        <p className="text-gray-600 dark:text-gray-300">The visionaries behind Nexyro IT</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView2 ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="glass rounded-2xl overflow-hidden card-hover"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-80 object-cover object-top"
                                    loading="lazy"
                                />
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-[#2C3531] dark:text-white mb-1">{member.name}</h3>
                                    <p className="text-[#116466] dark:text-[#D9B08C] font-medium mb-3">{member.role}</p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{member.bio}</p>
                                    <div className="flex space-x-4">
                                        <a href={member.social.linkedin} className="text-gray-400 hover:text-[#116466]">
                                            LinkedIn
                                        </a>
                                        <a href={member.social.twitter} className="text-gray-400 hover:text-[#116466]">
                                            Twitter
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-[#D1E8E2]/30 dark:bg-[#116466]/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[#2C3531] dark:text-white mb-4">Why Choose Us?</h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            We bring a fresh perspective, modern technologies, and unwavering dedication to every project.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'Modern Tech Stack', desc: 'We use the latest tools and frameworks to build fast, scalable, and future-proof solutions.' },
                            { title: 'Dedicated Team', desc: 'Our passionate team treats your project as our own, ensuring the highest level of commitment.' },
                            { title: 'Client-Centric', desc: 'We listen to your needs and tailor our strategies to match your specific business goals.' },
                            { title: 'Fast Delivery', desc: 'We follow agile methodologies to deliver high-quality results within your timeline.' }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass p-6 rounded-2xl border-t-4 border-[#116466] dark:border-[#D9B08C]"
                            >
                                <h3 className="text-xl font-bold text-[#2C3531] dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;