"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";

const backgroundData = [
 "fSdD2iui", "8dkFaZ4H", "gGxT3zkf", "x6t9wpR", "PuUKgx9c", "FiM5dhXzW", "WDPvDCBG",
 "QztXTafcF", "gGzot4rF", "NaOt7yWVD", "LrkBMa6gS", "OqlilAo9w", "xKxv9tHW", "QuT2rkF",
 "5kKx+FSJ", "vZw4Tf3E", "F1kaf12Ij", "1FQ2+x48", "8vepZkY", "O6k5FHz9", "mP1+suK",
 "NA6TY0wcE", "qqW6dY2", "FiM5dhXzW", "YDDves2RE", "Tf3Em", "QztXTafcF", "PuUKgx9c"
];

const glowWords = backgroundData.map((text, i) => (
 <motion.span
 key={i}
 className="text-xs text-[#6e6eff]/30 font-mono select-none px-1"
 animate={{ opacity: [0.1, 0.4, 0.1], y: [0, -2, 0] }}
 transition={{
 repeat: Infinity,
 repeatType: "loop",
 duration: 3 + Math.random() * 2,
 delay: i * 0.02,
 }}
 >
 {text}
 </motion.span>
));

const PrivacyProtection = () => {
 return (
 <div className="relative min-h-screen bg-transparent flex flex-col items-center justify-center text-[var(--text-main)] overflow-hidden px-6">

 {/* 3D Grid Effect */}
 <div className="absolute inset-0 z-0 perspective-[1000px] overflow-hidden">
 <div className="absolute bottom-0 w-full h-[500px] [transform-style:preserve-3d] animate-gridWave">
 <div className="w-full h-full bg-[linear-gradient(to_right,rgba(110,110,255,0.1)_1px,transparent_1px),linear-gradient(to_top,rgba(110,110,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] scale-150 blur-sm" />
 </div>
 </div>

 {/* Floating glow text */}
 <div className="absolute top-0 left-0 w-full h-full flex flex-wrap items-center justify-center text-center blur-sm z-10 pointer-events-none">
 {glowWords}
 </div>

  {/* Content Wrapper */}
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="z-20 flex flex-col items-center justify-center p-10 md:p-14 glass-panel max-w-2xl mx-auto"
  >
    {/* Lock icon */}
    <motion.div
    className="text-[var(--text-main)] text-6xl mb-4"
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1 }}
    >
    <FaLock />
    </motion.div>

    {/* Tag */}
    <motion.div
    className="bg-[var(--bg-glass-hover)] px-4 py-1 rounded-full text-sm text-[var(--text-main)] font-medium mb-4 border border-[var(--border-glass)]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4 }}
    >
    Encryption
    </motion.div>

    {/* Title */}
    <motion.h1
    className="text-4xl md:text-5xl font-extrabold text-center text-[var(--text-main)] mb-4"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.6, duration: 0.8 }}
    >
    Hardened security
    </motion.h1>

    {/* Description */}
    <motion.p
    className="text-center text-sm md:text-lg text-[var(--text-main)] opacity-90 max-w-xl"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8 }}
    >
    Your data is end-to-end encrypted. No one, not even us, can see your private information. Your privacy is protected by default.
    </motion.p>
  </motion.div>
  </div>
 );
};

export default PrivacyProtection;
