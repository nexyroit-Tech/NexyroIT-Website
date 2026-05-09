import { motion } from 'framer-motion';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C3531]">
            <motion.div
                className="w-16 h-16 border-4 border-[#116466] border-t-[#D9B08C] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

export default LoadingSpinner;