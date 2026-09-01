import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Zap, Target, Clock, Award, BarChart3, ArrowRight, RefreshCw, Sparkles, XCircle, CheckCircle } from "lucide-react";

export default function BattleResults({
 questions, answers, playerHP, enemyHP, comboMax, xpEarned, coinsEarned,
 totalTime, difficulty, company, playerClass, level, isVictory,
 isMultiplayer, opponentName, opponentScore, onReturnToLobby, onRetryBattle
}) {
 const totalQuestions = questions.length;
 let correctCount = 0;
 let wrongCount = 0;
 let skippedCount = 0;

 questions.forEach((q, idx) => {
 if (answers[idx] === undefined) skippedCount++;
 else if (answers[idx] === q.correct) correctCount++;
 else wrongCount++;
 });

 const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
 const avgTime = totalQuestions > 0 ? Math.round(totalTime / totalQuestions) : 0;

 return (
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 className={`max-w-4xl mx-auto border p-6 md:p-8 rounded-3xl space-y-8 relative z-10 glass-panel ${
 isVictory
 ? "border-yellow-500/40 shadow-sm"
 : "border-red-500/40 shadow-sm"
 }`}
 >
 {/* Victory / Defeat Header */}
 <div className="text-center space-y-4 pt-4">
 <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center mx-auto ${
 isVictory
 ? "bg-yellow-500/10 border-yellow-400/50 text-yellow-400 shadow-sm"
 : "bg-red-500/10 border-red-400/50 text-red-400 shadow-sm"
 }`}>
 {isVictory ? <Trophy className="w-10 h-10 animate-bounce" /> : <XCircle className="w-10 h-10 " />}
 </div>
 <h2 className={`text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r ${
 isVictory ? "from-yellow-300 to-amber-500" : "from-red-400 to-rose-600"
 }`}>
 {isVictory ? "BATTLE VICTORY!" : "DEFEATED IN BATTLE"}
 </h2>
 <p className="text-[var(--text-muted)] text-sm">
 {isVictory
 ? `You conquered the ${company?.name || "challenge"}! Outstanding performance.`
 : `The ${company?.name || "challenge"} proved too difficult this time. Study and retry!`}
 </p>
 </div>

 {/* Multiplayer Head-to-Head */}
 {isMultiplayer && opponentName && (
 <div className="bg-[var(--bg-glass)] border border-[var(--border-glass)] p-5 rounded-2xl">
 <h4 className="text-sm font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
 <Award className="w-4 h-4 text-cyan-400" /> Head-to-Head Results
 </h4>
 <div className="grid grid-cols-3 gap-4 text-center">
 <div>
 <p className="text-xs text-[var(--text-muted)] mb-1">You</p>
 <p className={`text-2xl font-black ${correctCount > (opponentScore || 0) ? "text-green-400" : "text-[var(--text-main)]"}`}>{correctCount}</p>
 </div>
 <div className="flex items-center justify-center">
 <span className="text-lg font-black text-[var(--text-muted)]">VS</span>
 </div>
 <div>
 <p className="text-xs text-[var(--text-muted)] mb-1">{opponentName}</p>
 <p className={`text-2xl font-black ${(opponentScore || 0) > correctCount ? "text-green-400" : "text-[var(--text-main)]"}`}>{opponentScore || 0}</p>
 </div>
 </div>
 </div>
 )}

 {/* Stats Grid */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 <div className="p-4 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)] text-center space-y-1">
 <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
 <p className="text-xl font-black text-green-400">{correctCount}</p>
 <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold">Correct</p>
 </div>
 <div className="p-4 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)] text-center space-y-1">
 <XCircle className="w-5 h-5 text-red-400 mx-auto" />
 <p className="text-xl font-black text-red-400">{wrongCount}</p>
 <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold">Wrong</p>
 </div>
 <div className="p-4 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)] text-center space-y-1">
 <Target className="w-5 h-5 text-purple-400 mx-auto" />
 <p className="text-xl font-black text-[var(--text-main)]">{accuracy}%</p>
 <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold">Accuracy</p>
 </div>
 <div className="p-4 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)] text-center space-y-1">
 <Clock className="w-5 h-5 text-cyan-400 mx-auto" />
 <p className="text-xl font-black text-[var(--accent-cyan)]">{avgTime}s</p>
 <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold">Avg Time</p>
 </div>
 </div>

 {/* XP & Rewards */}
 <div className="p-5 rounded-2xl bg-[var(--bg-glass)] border border-[var(--border-glass)] flex items-start gap-4">
 <Sparkles className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
 <div className="space-y-2 w-full">
 <h4 className="font-extrabold text-[var(--text-main)] text-sm">Rewards Earned:</h4>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
 <div className="p-3 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)]">
 <span className="text-[9px] text-[var(--text-muted)] block uppercase font-bold">XP Earned</span>
 <span className="text-amber-400 font-bold text-lg">+{xpEarned || 0}</span>
 </div>
 <div className="p-3 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)]">
 <span className="text-[9px] text-[var(--text-muted)] block uppercase font-bold">Coins</span>
 <span className="text-yellow-400 font-bold text-lg">+{coinsEarned || 0}</span>
 </div>
 <div className="p-3 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)]">
 <span className="text-[9px] text-[var(--text-muted)] block uppercase font-bold">Max Streak</span>
 <span className="text-orange-400 font-bold text-lg">{comboMax || 0}</span>
 </div>
 <div className="p-3 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)]">
 <span className="text-[9px] text-[var(--text-muted)] block uppercase font-bold">Level</span>
 <span className="text-purple-400 font-bold text-lg">{level || 1}</span>
 </div>
 </div>
 </div>
 </div>

 {/* Question Review */}
 <div className="space-y-4">
 <h3 className="text-md font-bold text-[var(--text-main)] flex items-center gap-2">
 <BarChart3 className="w-4 h-4 text-purple-400" /> Question Review:
 </h3>
 <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
 {questions.map((q, idx) => {
 const userAns = answers[idx];
 const isCorrect = userAns === q.correct;
 const wasSkipped = userAns === undefined;
 return (
 <div key={idx} className="p-4 rounded-2xl bg-[var(--bg-glass)] border border-[var(--border-glass)] space-y-2">
 <div className="flex justify-between items-start gap-3">
 <h4 className="font-bold text-[var(--text-main)] text-xs leading-relaxed">
 Q{idx + 1}. {q.q}
 </h4>
 <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 ${
 wasSkipped ? "bg-gray-500/10 text-[var(--text-muted)] border-gray-500/20"
 : isCorrect ? "bg-green-500/10 text-green-400 border-green-500/20"
 : "bg-red-500/10 text-red-400 border-red-500/20"
 }`}>
 {wasSkipped ? "Skipped" : isCorrect ? "Correct" : "Wrong"}
 </span>
 </div>
 <div className="text-[11px] space-y-1">
 <p className="text-[var(--text-muted)]">
 Your Answer: <span className={isCorrect ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
 {userAns !== undefined ? q.options[userAns] : "(Skipped)"}
 </span>
 </p>
 {!isCorrect && (
 <p className="text-[var(--text-muted)]">
 Correct: <span className="text-green-400 font-bold">{q.options[q.correct]}</span>
 </p>
 )}
 <div className="p-2.5 bg-[var(--bg-glass)] rounded-lg border border-[var(--border-glass)] mt-1">
 <p className="text-[var(--text-muted)] text-[10px] leading-relaxed">{q.explanation}</p>
 </div>
 </div>
 </div>
 );
 })}
 </div>
 </div>

 {/* Actions */}
 <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-end">
 <button
 onClick={onRetryBattle}
 className="flex items-center justify-center gap-2 border border-[var(--border-glass)] hover:border-[var(--text-muted)] text-[var(--text-muted)] font-bold py-3 px-6 rounded-xl transition duration-200 active:scale-95 text-xs bg-[var(--bg-glass)] cursor-pointer"
 >
 <RefreshCw className="w-4 h-4" /> Retry Battle
 </button>
 <button
 onClick={onReturnToLobby}
 className="glass-button !bg-[var(--text-main)] !text-[var(--bg-base)] border border-[var(--border-glass)] hover:!bg-[var(--text-muted)] font-bold py-3 px-6 rounded-xl transition duration-200 active:scale-95 text-xs cursor-pointer shadow-sm"
 >
 Return to Lobby
 </button>
 </div>
 </motion.div>
 );
}
