import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { History, BarChart3, Target, Trophy, ChevronDown, ChevronUp } from "lucide-react";

export default function BattleHistory({ onClose }) {
 const [expandedIdx, setExpandedIdx] = useState(null);

 // Load battle history from localStorage
 const battles = useMemo(() => {
 try {
 return JSON.parse(localStorage.getItem("battle_arena_history") || "[]");
 } catch { return []; }
 }, []);

 // Compute analytics
 const totalBattles = battles.length;
 const totalWins = battles.filter(b => b.result === "win").length;
 const totalLosses = battles.filter(b => b.result === "loss").length;
 const avgAccuracy = totalBattles > 0
 ? Math.round(battles.reduce((s, b) => s + (b.accuracy || 0), 0) / totalBattles)
 : 0;

 // Company breakdown
 const companyStats = {};
 battles.forEach(b => {
 if (!companyStats[b.company]) companyStats[b.company] = { wins: 0, losses: 0, total: 0 };
 companyStats[b.company].total++;
 if (b.result === "win") companyStats[b.company].wins++;
 else companyStats[b.company].losses++;
 });

 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="glass-panel p-6 space-y-6 max-w-4xl mx-auto"
 >
 <div className="flex justify-between items-center">
 <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
 <History className="w-5 h-5 text-purple-400" /> Battle History & Analytics
 </h3>
 <button onClick={onClose} className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer transition-colors">
 Close ✕
 </button>
 </div>

 {totalBattles === 0 ? (
 <div className="text-center py-12">
 <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-3" />
 <p className="text-[var(--text-muted)] text-sm">No battles fought yet. Start your first battle!</p>
 </div>
 ) : (
 <>
 {/* Overview Stats */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 <div className="p-4 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)] text-center">
 <p className="text-2xl font-black text-[var(--text-main)]">{totalBattles}</p>
 <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold">Total Battles</p>
 </div>
 <div className="p-4 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)] text-center">
 <p className="text-2xl font-black text-green-400">{totalWins}</p>
 <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold">Victories</p>
 </div>
 <div className="p-4 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)] text-center">
 <p className="text-2xl font-black text-red-400">{totalLosses}</p>
 <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold">Defeats</p>
 </div>
 <div className="p-4 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)] text-center">
 <p className="text-2xl font-black text-[var(--text-main)]">{avgAccuracy}%</p>
 <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold">Avg Accuracy</p>
 </div>
 </div>

 {/* Company Breakdown */}
 {Object.keys(companyStats).length > 0 && (
 <div className="space-y-3">
 <h4 className="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
 <BarChart3 className="w-4 h-4 text-cyan-400" /> Company Performance
 </h4>
 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
 {Object.entries(companyStats).map(([company, stats]) => (
 <div key={company} className="p-3 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)] flex justify-between items-center">
 <span className="text-xs text-[var(--text-main)] font-bold">{company}</span>
 <div className="flex items-center gap-2 text-[10px]">
 <span className="text-green-400">{stats.wins}W</span>
 <span className="text-[var(--text-muted)]">/</span>
 <span className="text-red-400">{stats.losses}L</span>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Recent Battles */}
 <div className="space-y-3">
 <h4 className="text-sm font-bold text-[var(--text-main)]">Recent Battles</h4>
 <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
 {[...battles].reverse().slice(0, 20).map((b, idx) => (
 <button
 key={idx}
 onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
 className="w-full text-left p-3 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-glass)] hover:border-[var(--text-muted)] transition-all cursor-pointer"
 >
 <div className="flex justify-between items-center">
 <div className="flex items-center gap-3">
 <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${
 b.result === "win" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
 }`}>
 {b.result === "win" ? "Victory" : "Defeat"}
 </span>
 <span className="text-xs text-[var(--text-main)] font-bold">{b.company}</span>
 <span className="text-[10px] text-[var(--text-muted)]">{b.difficulty}</span>
 </div>
 <div className="flex items-center gap-3 text-[10px]">
 <span className="text-[var(--text-muted)]">{b.accuracy || 0}% acc</span>
 <span className="text-amber-400">+{b.xpEarned || 0} XP</span>
 {expandedIdx === idx ? <ChevronUp className="w-3 h-3 text-[var(--text-muted)]" /> : <ChevronDown className="w-3 h-3 text-[var(--text-muted)]" />}
 </div>
 </div>
 {expandedIdx === idx && (
 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mt-2 pt-2 border-t border-[#2d2e46]/30 text-[10px] text-[var(--text-muted)] grid grid-cols-4 gap-2">
 <span>Correct: {b.correct || 0}</span>
 <span>Wrong: {b.wrong || 0}</span>
 <span>Streak: {b.maxStreak || 0}</span>
 <span>Time: {b.totalTime || 0}s</span>
 </motion.div>
 )}
 </button>
 ))}
 </div>
 </div>
 </>
 )}
 </motion.div>
 );
}
