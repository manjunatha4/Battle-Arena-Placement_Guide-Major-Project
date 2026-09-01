import React from "react";
import { motion } from "framer-motion";
import { Shield, Flame, Zap } from "lucide-react";
import { DIFFICULTY_DATA } from "@/data/companyData";

const ICONS = { easy: Zap, medium: Shield, hard: Flame };

export default function DifficultySelector({ onSelect, company }) {
 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="glass-panel p-6 space-y-4"
 >
 <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
 <Shield className="w-5 h-5 text-[var(--text-main)]" /> Select Difficulty for {company?.name || "Company"}:
 </h3>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 {Object.entries(DIFFICULTY_DATA).map(([key, diff], idx) => {
 const Icon = ICONS[key];
 return (
 <motion.button
 key={key}
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 transition={{ delay: idx * 0.08 }}
 onClick={() => onSelect(key)}
 className={`group text-left p-5 rounded-2xl border transition-all cursor-pointer overflow-hidden relative glass-button !bg-transparent !border-[var(--border-glass)] hover:${diff.border} hover:shadow-lg ${diff.glow}`}
 >
 <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl ${diff.bg} opacity-10 group-hover:opacity-40 transition-all`} />
 <div className="relative z-10 space-y-3">
 <div className={`w-12 h-12 rounded-xl ${diff.bg} border ${diff.border} flex items-center justify-center ${diff.color} group-hover:scale-110 transition-transform`}>
 <Icon className="w-6 h-6" />
 </div>
 <div>
 <h4 className="font-extrabold text-[var(--text-main)] text-lg">{diff.label}</h4>
 <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-1">{diff.description}</p>
 </div>
 <div className="flex items-center gap-3 text-[10px] pt-2 border-t border-[var(--border-glass)]">
 <span className={`${diff.color} font-bold`}>XP ×{diff.xpMultiplier}</span>
 <span className="text-[var(--text-muted)]">|</span>
 <span className="text-[var(--text-muted)]">{diff.timerSeconds}s per question</span>
 </div>
 </div>
 </motion.button>
 );
 })}
 </div>
 </motion.div>
 );
}
