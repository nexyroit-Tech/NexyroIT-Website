import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTimes, FaTrash, FaClock, FaThumbsUp, FaBan, FaStar, FaSignOutAlt } from 'react-icons/fa';
import { db } from '../firebase';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore';
import SEO from '../components/SEO';

const ADMIN_PASSWORD = 'MessingyourIT@';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [testimonials, setTestimonials] = useState([]);
    const [activeTab, setActiveTab] = useState('pending');
    const [loading, setLoading] = useState(true);
    
    // Security states
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [isLockedOut, setIsLockedOut] = useState(false);
    const [lockoutTimer, setLockoutTimer] = useState(0);

    // Check session and lockout status
    useEffect(() => {
        const session = sessionStorage.getItem('adminAuth');
        if (session === 'true') {
            setIsAuthenticated(true);
        }

        // Check if user is currently locked out
        const lockoutUntil = localStorage.getItem('adminLockoutUntil');
        if (lockoutUntil) {
            const timeRemaining = parseInt(lockoutUntil) - Date.now();
            if (timeRemaining > 0) {
                setIsLockedOut(true);
                setLockoutTimer(Math.ceil(timeRemaining / 1000));
            } else {
                localStorage.removeItem('adminLockoutUntil');
            }
        }
    }, []);

    // Handle lockout countdown
    useEffect(() => {
        let interval;
        if (isLockedOut && lockoutTimer > 0) {
            interval = setInterval(() => {
                setLockoutTimer((prev) => {
                    if (prev <= 1) {
                        setIsLockedOut(false);
                        setFailedAttempts(0);
                        localStorage.removeItem('adminLockoutUntil');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isLockedOut, lockoutTimer]);

    // Fetch testimonials in real-time
    useEffect(() => {
        if (!isAuthenticated) return;

        const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTestimonials(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [isAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (isLockedOut) return;

        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('adminAuth', 'true');
            setPasswordError('');
            setFailedAttempts(0);
        } else {
            const newAttempts = failedAttempts + 1;
            setFailedAttempts(newAttempts);
            
            if (newAttempts >= 3) {
                // Lockout for 15 minutes (900000 ms)
                const lockoutTime = Date.now() + 15 * 60 * 1000;
                localStorage.setItem('adminLockoutUntil', lockoutTime.toString());
                setIsLockedOut(true);
                setLockoutTimer(15 * 60);
                setPasswordError('Too many failed attempts. Access blocked.');
            } else {
                setPasswordError('Invalid credentials.');
            }
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('adminAuth');
    };

    const handleApprove = async (id) => {
        await updateDoc(doc(db, 'testimonials', id), { status: 'approved' });
    };

    const handleReject = async (id) => {
        await updateDoc(doc(db, 'testimonials', id), { status: 'rejected' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            await deleteDoc(doc(db, 'testimonials', id));
        }
    };

    const filteredTestimonials = testimonials.filter(t => t.status === activeTab);

    const tabs = [
        { key: 'pending', label: 'Pending', icon: FaClock, color: 'text-yellow-500' },
        { key: 'approved', label: 'Approved', icon: FaThumbsUp, color: 'text-green-500' },
        { key: 'rejected', label: 'Rejected', icon: FaBan, color: 'text-red-500' }
    ];

    // Login Screen
    if (!isAuthenticated) {
        return (
            <>
                <SEO title="Admin" />
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#D1E8E2] to-[#FFCB9A]/30 dark:from-[#2C3531] dark:to-[#116466]/20 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass p-8 rounded-2xl w-full max-w-md mx-4"
                    >
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#116466] to-[#D9B08C] rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-2xl">🔒</span>
                            </div>
                            <h1 className="text-3xl font-bold text-[#2C3531] dark:text-white">Admin Panel</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">Enter password to continue</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2C3531] text-[#2C3531] dark:text-white focus:ring-2 focus:ring-[#116466] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                autoFocus
                                disabled={isLockedOut}
                            />
                            {passwordError && (
                                <p className="text-red-500 text-sm text-center">{passwordError}</p>
                            )}
                            {isLockedOut && (
                                <p className="text-yellow-500 text-sm text-center font-medium">
                                    Try again in {Math.floor(lockoutTimer / 60)}:{(lockoutTimer % 60).toString().padStart(2, '0')}
                                </p>
                            )}
                            <button 
                                type="submit" 
                                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLockedOut}
                            >
                                {isLockedOut ? 'Locked' : 'Login'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </>
        );
    }

    // Admin Dashboard
    return (
        <>
            <SEO title="Admin Dashboard" />
            <div className="min-h-screen bg-gradient-to-br from-[#D1E8E2] to-[#FFCB9A]/30 dark:from-[#2C3531] dark:to-[#116466]/20 pt-28 pb-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#2C3531] dark:text-white">
                                Testimonial Manager
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Manage client feedback and testimonials
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                        >
                            <FaSignOutAlt />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {tabs.map(tab => {
                            const count = testimonials.filter(t => t.status === tab.key).length;
                            return (
                                <div key={tab.key} className="glass p-4 rounded-xl text-center">
                                    <div className={`text-3xl font-bold ${tab.color}`}>{count}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">{tab.label}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-2 mb-8">
                        {tabs.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === tab.key
                                    ? 'bg-[#116466] text-white shadow-lg'
                                    : 'glass text-gray-700 dark:text-gray-300 hover:bg-[#116466]/10'
                                    }`}
                            >
                                <tab.icon />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Testimonials List */}
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="w-12 h-12 border-4 border-[#116466] border-t-[#D9B08C] rounded-full animate-spin mx-auto" />
                            <p className="text-gray-600 dark:text-gray-400 mt-4">Loading testimonials...</p>
                        </div>
                    ) : filteredTestimonials.length === 0 ? (
                        <div className="text-center py-20 glass rounded-2xl">
                            <p className="text-gray-600 dark:text-gray-400 text-xl">
                                No {activeTab} testimonials found.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <AnimatePresence>
                                {filteredTestimonials.map((testimonial) => (
                                    <motion.div
                                        key={testimonial.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        className="glass p-6 rounded-2xl"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-1 mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            className={i < (testimonial.rating || 5) ? 'text-[#FFCB9A]' : 'text-gray-300'}
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-gray-700 dark:text-gray-300 italic mb-3">
                                                    "{testimonial.content}"
                                                </p>
                                                <div>
                                                    <span className="font-bold text-[#2C3531] dark:text-white">
                                                        {testimonial.name}
                                                    </span>
                                                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                                                        — {testimonial.role}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-gray-400 mt-2">
                                                    {testimonial.createdAt?.toDate?.()
                                                        ? testimonial.createdAt.toDate().toLocaleDateString('en-US', {
                                                            year: 'numeric', month: 'short', day: 'numeric'
                                                        })
                                                        : 'Unknown date'
                                                    }
                                                </div>
                                            </div>

                                            <div className="flex space-x-2 flex-shrink-0">
                                                {activeTab === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(testimonial.id)}
                                                            className="flex items-center space-x-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                        >
                                                            <FaCheck /> <span>Approve</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(testimonial.id)}
                                                            className="flex items-center space-x-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                                        >
                                                            <FaTimes /> <span>Reject</span>
                                                        </button>
                                                    </>
                                                )}
                                                {activeTab === 'rejected' && (
                                                    <button
                                                        onClick={() => handleApprove(testimonial.id)}
                                                        className="flex items-center space-x-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                    >
                                                        <FaCheck /> <span>Approve</span>
                                                    </button>
                                                )}
                                                {activeTab === 'approved' && (
                                                    <button
                                                        onClick={() => handleReject(testimonial.id)}
                                                        className="flex items-center space-x-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                                                    >
                                                        <FaBan /> <span>Unpublish</span>
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(testimonial.id)}
                                                    className="flex items-center space-x-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Admin;
