import React from "react";
import { motion } from "framer-motion";

const features = [
 {
 icon: "☁️",
 title: "Learn DSA",
 description: "Enhance your skills with personalized learning paths",
 },
 {
 icon: "🕸️",
 title: "Battle Ground",
 description: "A secure environment to practice and hone your abilities",
 },
 {
 icon: "👤",
 title: "Connect with Alumni",
 description: "Build meaningful connections with industry experts",
 },
 {
 icon: "🤖",
 title: "Aptitude Tests",
 description: "Test and improve your logic and problem-solving",
 },
 {
 icon: "📈",
 title: "Predict Job",
 description: "Get insights into potential career trajectories",
 }
];

const FeatureCard = ({ icon, title, description, index }) => {
 return (
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: index * 0.1 }}
 viewport={{ once: true }}
 className="glass-panel p-6 rounded-2xl flex flex-col items-start gap-4 hover:border-[var(--text-muted)] transition-colors hover:shadow-sm"
 >
 <div className="text-4xl bg-[var(--bg-glass)] p-3 rounded-xl border border-[var(--border-glass)] shadow-sm">
 {icon}
 </div>
 <h3 className="text-xl font-semibold text-[var(--text-main)]">{title}</h3>
 <p className="text-[var(--text-main)] opacity-75 text-sm">{description}</p>
 </motion.div>
 );
};

const FeaturesGrid = () => {
 return (
 <div className="py-20 bg-transparent text-[var(--text-main)] px-6 md:px-12 flex flex-col items-center">
  <div className="glass-panel p-8 md:p-12 max-w-7xl w-full">
  {/* Heading matching screenshot 3 */}
  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-[var(--text-main)]">
  Placement preparation from ground up
  </h2>
  <p className="text-[var(--text-main)] opacity-80 text-lg md:text-xl text-center max-w-3xl mb-16 mx-auto">
  Here are the most highly used features by our students, helping them
  secure their dream jobs.
  </p>

  {/* 3-column Grid layout */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
  {features.map((feature, idx) => (
  <FeatureCard key={idx} index={idx} {...feature} />
  ))}
  </div>

  {/* Decorative dots pattern at the bottom */}
  <div className="mt-16 flex gap-2 justify-center">
  <span className="w-2 h-2 rounded-full bg-gray-500"></span>
  <span className="w-2 h-2 rounded-full bg-gray-400"></span>
  <span className="w-2 h-2 rounded-full bg-gray-300"></span>
  </div>
  </div>
 </div>
 );
};

export default FeaturesGrid;
