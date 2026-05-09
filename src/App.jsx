import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

function App() {
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        // Check for saved dark mode preference
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode) {
            setDarkMode(JSON.parse(savedMode));
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true);
        }

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <HelmetProvider>
            <Router>
                <ScrollToTop />
                <div className="min-h-screen bg-white dark:bg-[#2C3531] transition-colors duration-300">
                    <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/careers" element={<Careers />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </HelmetProvider>
    );
}

export default App;