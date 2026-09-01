import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Sun, Moon, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useAuthModal } from "../context/AuthModalContext";
import LogoBattle from "../assets/logo-battle.png";

const Navbar = () => {
 const [isOpen, setIsOpen] = useState(false);
 const navigate = useNavigate();
 const { theme, toggleTheme } = useTheme();
 const { openModal } = useAuthModal();

 return (
 <motion.nav 
 initial={{ y: -100 }}
 animate={{ y: 0 }}
 transition={{ type: "spring", stiffness: 100, damping: 20 }}
 className="fixed top-4 left-0 right-0 mx-auto w-[95%] max-w-7xl glass-panel text-[var(--text-main)] py-3 px-6 md:px-8 flex items-center justify-between z-50 border border-[var(--border-glass)]"
 >
 {/* Logo */}
 <motion.div 
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 className="flex items-center space-x-2 cursor-pointer -ml-4"
 onClick={() => navigate("/")}
 >
 <img src={LogoBattle} alt="Battle Arena Logo" className="w-48 h-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" />
 </motion.div>

 {/* Desktop Menu */}
 <div className="hidden md:flex items-center space-x-4">
 {/* Theme Toggle */}
 <motion.button 
 whileHover={{ scale: 1.1, rotate: 15 }}
 whileTap={{ scale: 0.9 }}
 onClick={toggleTheme}
 className="p-2 rounded-full hover:bg-[var(--bg-glass-hover)] transition-colors border border-transparent hover:border-[var(--border-glass)] text-[var(--text-main)]"
 >
 {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
 </motion.button>

 <div className="h-6 w-px bg-[var(--border-glass)] mx-2"></div>

 <button 
 onClick={() => openModal('login')} 
 className="px-4 py-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
 >
 Login
 </button>
 <motion.button 
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 onClick={() => openModal('register')} 
 className="glass-button px-6 py-2 text-sm font-bold text-[var(--text-main)]"
 >
 SignUp
 </motion.button>
 </div>

 {/* Mobile Menu Button & Theme Toggle */}
 <div className="flex md:hidden items-center space-x-4">
 <motion.button 
 whileTap={{ scale: 0.9 }}
 onClick={toggleTheme}
 className="p-2 text-[var(--text-main)]"
 >
 {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
 </motion.button>

 <button
 className="text-[var(--text-main)] text-2xl"
 onClick={() => setIsOpen(!isOpen)}
 >
 {isOpen ? <FiX /> : <FiMenu />}
 </button>
 </div>

 {/* Mobile Menu */}
 <AnimatePresence>
 {isOpen && (
 <motion.div 
 initial={{ opacity: 0, y: -20, scale: 0.95 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: -20, scale: 0.95 }}
 transition={{ duration: 0.2 }}
 className="absolute top-20 left-0 w-full glass-panel p-6 shadow-2xl flex flex-col items-center space-y-4 md:hidden border border-[var(--border-glass)]"
 >
 <button 
 onClick={() => { openModal('login'); setIsOpen(false); }}
 className="w-full py-3 text-[var(--text-main)] hover:bg-[var(--bg-glass-hover)] rounded-xl transition-colors font-medium"
 >
 Login
 </button>
 <button 
 onClick={() => { openModal('register'); setIsOpen(false); }}
 className="glass-button w-full py-3 text-[var(--text-main)] font-bold"
 >
 SignUp
 </button>
 </motion.div>
 )}
 </AnimatePresence>
 </motion.nav>
 );
};

export default Navbar;
