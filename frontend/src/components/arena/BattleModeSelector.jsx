import React from "react";
import { motion } from "framer-motion";
import { Swords, Users, Sparkles } from "lucide-react";

export default function BattleModeSelector({ onSelect }) {
 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="glass-panel p-6 space-y-4"
 >
 <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
 <Sparkles className="w-5 h-5 text-[var(--text-main)]" /> Choose Battle Mode:
 </h3>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {/* Solo Battle */}
 <motion.button
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 onClick={() => onSelect("solo")}
 className="group text-left p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden glass-button !bg-transparent !border-[var(--border-glass)] hover:border-[var(--text-muted)]"
 >
 <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-purple)]/5 rounded-full blur-3xl group-hover:bg-[var(--bg-glass-hover)] transition-all" />
 <div className="relative z-10 space-y-3">
 <div className="w-14 h-14 rounded-2xl bg-[var(--bg-glass-hover)] border border-[var(--accent-purple)]/20 flex items-center justify-center text-[var(--text-main)] group-hover:scale-110 transition-transform">
 <Swords className="w-7 h-7" />
 </div>
 <div>
 <h4 className="font-extrabold text-[var(--text-main)] text-xl">Solo Battle</h4>
 <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
 Challenge yourself against the AI boss. Answer questions, deal damage, and earn XP rewards based on your performance.
 </p>
 </div>
 <div className="flex gap-2 pt-2">
 <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-[var(--bg-glass-hover)] text-[var(--text-main)] border border-[var(--border-glass)]">Instant Start</span>
 <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-green-500/10 text-green-400 border border-green-500/30">XP Rewards</span>
 </div>
 </div>
 </motion.button>

 {/* Play With Friends */}
 <motion.button
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 onClick={() => onSelect("friends")}
 className="group text-left p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden glass-button !bg-transparent !border-[var(--border-glass)] hover:!border-[var(--accent-cyan)]"
 >
 <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-cyan)]/5 rounded-full blur-3xl group-hover:bg-[var(--accent-cyan)]/20 transition-all" />
 <div className="relative z-10 space-y-3">
 <div className="w-14 h-14 rounded-2xl bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/20 flex items-center justify-center text-[var(--accent-cyan)] group-hover:scale-110 transition-transform">
 <Users className="w-7 h-7" />
 </div>
 <div>
 <h4 className="font-extrabold text-[var(--text-main)] text-xl">Play With Friends</h4>
 <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
 Create or join a battle room. Compete head-to-head with synchronized questions, live scores, and real-time rankings.
 </p>
 </div>
 <div className="flex gap-2 pt-2">
 <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30">Multiplayer</span>
 <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">2× XP Bonus</span>
 </div>
 </div>
 </motion.button>
 </div>
 </motion.div>
 );
}
