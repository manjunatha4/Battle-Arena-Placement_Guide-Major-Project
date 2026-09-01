import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const BentoCard = ({ children, className = "", delay = 0, hoverEffect = true }) => {
  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay: delay
      }}
      whileHover={hoverEffect ? { 
        boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
        borderColor: "rgba(255,255,255,0.3)"
      } : {}}
      className={`glass-panel overflow-hidden relative group transition-all duration-300 ${className}`}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-purple)]/0 via-[var(--accent-cyan)]/10 to-[var(--accent-blue)]/0 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative z-10 w-full h-full p-6 flex flex-col">
        {children}
      </div>
    </motion.div>
  );

  if (hoverEffect) {
    return (
      <Tilt 
        tiltMaxAngleX={5} 
        tiltMaxAngleY={5} 
        perspective={1000} 
        scale={1.02} 
        transitionSpeed={2000}
        gyroscope={true}
        className="h-full w-full"
      >
        {cardContent}
      </Tilt>
    );
  }

  return cardContent;
};

export default BentoCard;
