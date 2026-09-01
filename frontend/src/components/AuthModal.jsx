import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthModal } from '../context/AuthModalContext';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';
import { FiX } from 'react-icons/fi';

const AuthModal = () => {
  const { isOpen, view, closeModal } = useAuthModal();
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-md z-10 mx-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[var(--text-main)] transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* Glowing background effects behind the modal content */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[var(--bg-glass-hover)] blur-[80px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[var(--accent-cyan)]/10 blur-[80px] pointer-events-none -z-10"></div>

            {/* Form Content */}
            <div className="w-full relative shadow-2xl rounded-2xl overflow-hidden">
              {view === 'login' ? <LoginForm isModal={true} /> : <RegisterForm isModal={true} />}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
