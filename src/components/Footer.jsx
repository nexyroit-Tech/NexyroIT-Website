import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#2C3531] text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <img
                                src="/images/logo.png"
                                alt="Nexyro IT Logo"
                                className="h-12 w-auto object-contain transition-all duration-300 bg-white/95 p-1.5 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                            />
                        </div>
                        <p className="text-gray-400 mb-4 max-w-md">
                            Engineering the future digital world. We transform ideas into innovative
                            technology solutions that drive business growth.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.linkedin.com/in/nexyro-it-undefined-596938409" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D9B08C] transition-colors">
                                <FaLinkedin size={24} />
                            </a>
                            <a href="https://x.com/NexyroIT" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D9B08C] transition-colors">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://github.com/nexyroit-Tech" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D9B08C] transition-colors">
                                <FaGithub size={24} />
                            </a>
                            <a href="https://www.instagram.com/nexyroit" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D9B08C] transition-colors">
                                <FaInstagram size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-[#D9B08C] transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-gray-400 hover:text-[#D9B08C] transition-colors">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/projects" className="text-gray-400 hover:text-[#D9B08C] transition-colors">
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link to="/careers" className="text-gray-400 hover:text-[#D9B08C] transition-colors">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>nexyroit@gmail.com</li>
                            <li>+92 339 5022555</li>
                            <li>Islamabad, Pakistan</li>
                            <li>Islamabad, 44000</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>
                        &copy; {currentYear}{' '}
                        <Link to="/admin" className="cursor-default hover:text-gray-300 transition-colors">
                            Nexyro IT
                        </Link>
                        . All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;