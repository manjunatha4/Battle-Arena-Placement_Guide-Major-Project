import React from 'react';
import { motion } from 'framer-motion';

const FloatingGlass = () => {
  // Generate tactical debris shapes
  const shapes = Array.from({ length: 20 }).map((_, i) => {
    const size = Math.random() * 60 + 20; // 20px to 80px
    const initialX = Math.random() * 100; // 0% to 100%
    const initialY = Math.random() * 100; // 0% to 100%
    const duration = Math.random() * 30 + 30; // 30s to 60s
    const delay = Math.random() * -30; // Random start time
    
    // 3 types of shapes: square/rectangle (crate piece), circle (shell casing), polygon (shrapnel)
    const type = Math.floor(Math.random() * 3);
    
    let shapeClass = "absolute border backdrop-blur-md ";
    
    // Make them look like dark metal, rusted iron, or tactical glass
    const colorTheme = Math.random();
    if (colorTheme > 0.8) {
      shapeClass += "border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 shadow-[0_0_10px_rgba(16,185,129,0.3)] "; // Glowing tactical green
    } else if (colorTheme > 0.6) {
      shapeClass += "border-[var(--accent-purple)] bg-[var(--accent-purple)]/10 shadow-[0_0_10px_rgba(249,115,22,0.3)] "; // Glowing rusty orange
    } else {
      shapeClass += "border-[var(--border-glass)] bg-slate-900/60 shadow-lg "; // Dark metal shrapnel
    }
    
    let extraStyle = {};
    
    if (type === 0) {
      // Square/Rectangle
      shapeClass += "rounded-sm";
      extraStyle = { width: size, height: size * (Math.random() > 0.5 ? 1 : 1.5) };
    } else if (type === 1) {
      // Circle / Ring
      shapeClass += "rounded-full";
      if (Math.random() > 0.5) {
        shapeClass += " !bg-transparent border-2";
      }
      extraStyle = { width: size, height: size };
    } else {
      // Polygon / Shrapnel
      shapeClass += "rounded-sm";
      extraStyle = { 
        width: size, 
        height: size, 
        clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" // Pentagon shape
      };
    }

    return (
      <motion.div
        key={i}
        className={shapeClass}
        style={{
          ...extraStyle,
          left: `${initialX}%`,
          top: `${initialY}%`,
          zIndex: 5
        }}
        animate={{
          y: ["-40vh", "40vh", "-40vh"],
          x: ["-20vw", "20vw", "-20vw"],
          rotateX: [0, 180, 360],
          rotateY: [0, 180, 360],
          rotateZ: [0, 90, 180, 360]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay
        }}
      />
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
      {shapes}
    </div>
  );
};

export default FloatingGlass;
