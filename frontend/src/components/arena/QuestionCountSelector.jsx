import React, { useState } from "react";
import { motion } from "framer-motion";
import { Hash, AlertCircle } from "lucide-react";

const PRESETS = [10, 20, 30, 50];

export default function QuestionCountSelector({ onSelect, maxAvailable }) {
 const [custom, setCustom] = useState("");
 const [error, setError] = useState("");

 const handleCustomSubmit = () => {
 const num = parseInt(custom);
 if (isNaN(num) || num < 5 || num > 100) {
 setError("Enter a number between 5 and 100.");
 return;
 }
 setError("");
 onSelect(Math.min(num, maxAvailable || 100));
 };

 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="glass-panel p-6 space-y-4"
 >
 <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
 <Hash className="w-5 h-5 text-[var(--text-main)]" /> Number of Questions:
 </h3>
 <p className="text-xs text-[var(--text-muted)]">Choose how many questions you want in this battle.</p>

 <div className="flex flex-wrap gap-3">
 {PRESETS.map((n) => (
 <motion.button
 key={n}
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 onClick={() => onSelect(Math.min(n, maxAvailable || n))}
 className="px-6 py-3 rounded-xl glass-button !border-[var(--border-glass)] !bg-transparent text-[var(--text-main)] font-bold text-sm hover:border-[var(--text-muted)] transition-all cursor-pointer"
 >
 {n} Qs
 </motion.button>
 ))}
 </div>

 <div className="flex items-center gap-3 pt-2">
 <div className="relative flex-1 max-w-[200px]">
 <input
 type="number"
 min="5"
 max="100"
 value={custom}
 onChange={(e) => { setCustom(e.target.value); setError(""); }}
 placeholder="Custom (5-100)"
 className="w-full px-4 py-2.5 glass-input text-xs"
 />
 </div>
 <button
 onClick={handleCustomSubmit}
 className="glass-button !bg-[var(--text-main)] !text-[var(--bg-base)] border border-[var(--border-glass)] hover:!bg-[var(--text-muted)] !border-0 px-5 py-2.5 text-[var(--text-main)] font-bold text-xs transition-all cursor-pointer"
 >
 Set
 </button>
 </div>

 {error && (
 <div className="flex items-center gap-2 text-xs text-red-400">
 <AlertCircle className="w-3.5 h-3.5" /> {error}
 </div>
 )}
 </motion.div>
 );
}
