import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
 Clock, CheckCircle, AlertCircle, ArrowRight, Swords, Sparkles, Zap, Users
} from "lucide-react";
import { DIFFICULTY_DATA } from "@/data/companyData";
import TugOfWar from "./TugOfWar";

export default function MultiBattleArena({
 questions, difficulty, company, playerClass, opponentName,
 onBattleComplete
}) {
 const [currentIdx, setCurrentIdx] = useState(0);
 const [selectedOption, setSelectedOption] = useState(null);
 const [roundResolved, setRoundResolved] = useState(false);
 const [answers, setAnswers] = useState({});
 const [playerScore, setPlayerScore] = useState(0);
 const [opponentScore, setOpponentScore] = useState(0);
 const [comboStreak, setComboStreak] = useState(0);
 const [maxStreak, setMaxStreak] = useState(0);
 const [startTime] = useState(Date.now());
 const [questionStartTime, setQuestionStartTime] = useState(Date.now());

 const timerMax = DIFFICULTY_DATA[difficulty]?.timerSeconds || 45;
 const [timeLeft, setTimeLeft] = useState(timerMax);

 // Simulate opponent progress
 const opponentTimers = useRef([]);

 useEffect(() => {
 // Simulate opponent answering questions with some randomness
 questions.forEach((q, idx) => {
 const delay = (idx + 1) * (3000 + Math.random() * 5000);
 const timer = setTimeout(() => {
 // Opponent gets ~60-70% correct
 const correct = Math.random() < 0.65;
 if (correct) setOpponentScore(prev => prev + 1);
 }, delay);
 opponentTimers.current.push(timer);
 });
 return () => opponentTimers.current.forEach(clearTimeout);
 }, []);

 // Timer
 useEffect(() => {
 if (roundResolved) return;
 if (timeLeft <= 0) {
 handleTimeout();
 return;
 }
 const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
 return () => clearInterval(interval);
 }, [timeLeft, roundResolved]);

 const handleTimeout = () => {
 setRoundResolved(true);
 setComboStreak(0);
 };

 const handleSelect = (idx) => {
 if (roundResolved) return;
 setSelectedOption(idx);
 };

 const handleSubmit = () => {
 if (selectedOption === null || roundResolved) return;
 setRoundResolved(true);
 setAnswers(prev => ({ ...prev, [currentIdx]: selectedOption }));

 const isCorrect = selectedOption === questions[currentIdx].correct;
 if (isCorrect) {
 setPlayerScore(prev => prev + 1);
 const newStreak = comboStreak + 1;
 setComboStreak(newStreak);
 if (newStreak > maxStreak) setMaxStreak(newStreak);
 } else {
 setComboStreak(0);
 }
 };

 const handleNext = () => {
 if (currentIdx < questions.length - 1) {
 setCurrentIdx(prev => prev + 1);
 setSelectedOption(null);
 setRoundResolved(false);
 setTimeLeft(timerMax);
 setQuestionStartTime(Date.now());
 } else {
 // Battle complete
 const totalTime = Math.round((Date.now() - startTime) / 1000);
 onBattleComplete({
 answers: { ...answers, [currentIdx]: selectedOption },
 playerScore: playerScore + (selectedOption === questions[currentIdx]?.correct ? 1 : 0),
 opponentScore,
 maxStreak,
 totalTime,
 });
 }
 };

 const currentQ = questions[currentIdx];
 const progress = ((currentIdx + (roundResolved ? 1 : 0)) / questions.length) * 100;
 const opponentProgress = Math.min(((currentIdx + 1) / questions.length) * 100 * (0.7 + Math.random() * 0.5), 100);

 return (
 <div className="max-w-5xl mx-auto space-y-5 relative z-10">
 {/* Top Bar: Player vs Opponent */}
 <div className="glass-panel p-4 flex items-center justify-between gap-4">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-[var(--bg-glass-hover)] border border-[var(--border-glass)] flex items-center justify-center text-[var(--text-main)]">
 <Swords className="w-5 h-5" />
 </div>
 <div>
 <p className="text-xs font-bold text-[var(--text-main)]">You</p>
 <p className="text-lg font-black text-purple-400">{playerScore}</p>
 </div>
 </div>

 <div className="text-center flex-1">
 <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold tracking-wider">{company?.name} — {difficulty}</p>
 <p className="text-xs text-[var(--text-muted)] mt-1">Q {currentIdx + 1} / {questions.length}</p>
 {comboStreak > 1 && (
 <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-block mt-1">
 🔥 x{comboStreak} Streak!
 </span>
 )}
 </div>

 <div className="flex items-center gap-3">
 <div className="text-right">
 <p className="text-xs font-bold text-[var(--text-main)]">{opponentName || "Opponent"}</p>
 <p className="text-lg font-black text-[var(--accent-cyan)]">{opponentScore}</p>
 </div>
 <div className="w-10 h-10 rounded-xl bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30 flex items-center justify-center text-[var(--accent-cyan)]">
 <Users className="w-5 h-5" />
 </div>
 </div>
 </div>

 {/* Progress Bars */}
 <div className="grid grid-cols-2 gap-3">
 <div className="space-y-1">
 <div className="flex justify-between text-[10px]">
 <span className="text-[var(--text-muted)]">Your Progress</span>
 <span className="text-purple-400 font-bold">{Math.round(progress)}%</span>
 </div>
 <div className="w-full bg-[#0d0e19] h-2 rounded-full overflow-hidden">
 <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
 </div>
 </div>
 <div className="space-y-1">
 <div className="flex justify-between text-[10px]">
 <span className="text-[var(--text-muted)]">Opponent</span>
 <span className="text-cyan-400 font-bold">{Math.round(opponentProgress)}%</span>
 </div>
 <div className="w-full bg-[#0d0e19] h-2 rounded-full overflow-hidden">
 <div className="bg-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${opponentProgress}%` }} />
 </div>
 </div>
 </div>

 {/* Tug of War Animation */}
 <TugOfWar 
 playerHP={100 + (playerScore * 5) - (opponentScore * 5)} 
 enemyHP={100 + (opponentScore * 5) - (playerScore * 5)} 
 playerClass={playerClass} 
 isPullingLeft={roundResolved && selectedOption === currentQ.correct} 
 isPullingRight={roundResolved && selectedOption !== null && selectedOption !== currentQ.correct} 
 roundResolved={roundResolved} 
 />

 {/* Question Card */}
 <div className="glass-panel p-6 space-y-5">
 {/* Header */}
 <div className="flex justify-between items-center border-b border-[var(--border-glass)] pb-3">
 <span className="text-[10px] font-bold text-[var(--text-main)] uppercase tracking-widest">
 Question {currentIdx + 1}
 </span>
 <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs shadow-inner ${
 timeLeft <= 10 ? "bg-red-950/20 border border-red-500/30 text-red-400" : "bg-[var(--bg-glass)] border border-[var(--border-glass)] text-[var(--text-main)]"
 }`}>
 <Clock className="w-3.5 h-3.5" />
 <span>{timeLeft}s</span>
 </div>
 </div>

 {/* Question Text */}
 <p className="text-sm md:text-base text-[var(--text-main)] font-medium leading-relaxed">{currentQ.q}</p>

 {/* Options */}
 <div className="space-y-2.5">
 {currentQ.options.map((opt, idx) => {
 const isSelected = selectedOption === idx;
 const isCorrectAnswer = idx === currentQ.correct;
 let style = "bg-[var(--bg-glass)] border-[var(--border-glass)] text-[var(--text-muted)] hover:bg-[var(--bg-glass)] hover:text-[var(--text-main)]";
 if (roundResolved) {
 if (isCorrectAnswer) style = "bg-green-950/20 border-green-500 text-green-300";
 else if (isSelected) style = "bg-red-950/20 border-red-500 text-red-300";
 else style = "bg-[var(--bg-glass-hover)] border-[var(--border-glass)] text-gray-600 opacity-60";
 } else if (isSelected) {
 style = "bg-[var(--bg-glass-hover)] border-[var(--accent-purple)] text-[var(--text-main)]";
 }

 return (
 <button
 key={idx}
 disabled={roundResolved}
 onClick={() => handleSelect(idx)}
 className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between text-xs md:text-sm font-medium cursor-pointer ${style}`}
 >
 <div className="flex items-center gap-3">
 <span className="text-[var(--text-muted)] text-xs font-mono font-bold">{String.fromCharCode(65 + idx)}.</span>
 <span>{opt}</span>
 </div>
 <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
 isSelected ? "border-purple-400 bg-purple-600" : "border-gray-600"
 }`}>
 {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
 </div>
 </button>
 );
 })}
 </div>

 {/* Explanation */}
 {roundResolved && (
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className={`p-4 rounded-2xl border ${selectedOption === currentQ.correct ? "bg-green-950/10 border-green-500/20" : "bg-red-950/10 border-red-500/20"} space-y-1.5`}
 >
 <div className="flex items-center gap-2">
 {selectedOption === currentQ.correct
 ? <CheckCircle className="w-4 h-4 text-green-400" />
 : <AlertCircle className="w-4 h-4 text-red-400" />}
 <span className={`text-xs font-bold ${selectedOption === currentQ.correct ? "text-green-400" : "text-red-400"}`}>
 {selectedOption === currentQ.correct ? "Correct!" : "Incorrect!"}
 </span>
 </div>
 <p className="text-xs text-[var(--text-muted)] leading-relaxed">{currentQ.explanation}</p>
 </motion.div>
 )}

 {/* Actions */}
 <div className="flex justify-between items-center pt-3 border-t border-[var(--border-glass)]">
 <div className="text-[10px] text-[var(--text-muted)]">
 {roundResolved
 ? (currentIdx === questions.length - 1 ? "Final question!" : "Ready for next question")
 : "Select an answer and submit"}
 </div>
 {!roundResolved ? (
 <button
 onClick={handleSubmit}
 disabled={selectedOption === null}
 className={`font-bold py-2.5 px-6 rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer ${
 selectedOption === null
 ? "bg-[#1e1f33]/40 border border-[#2c2d44]/30 text-[var(--text-muted)] cursor-not-allowed"
 : "glass-button !bg-[var(--text-main)] !text-[var(--bg-base)] border border-[var(--border-glass)] hover:!bg-[var(--text-muted)] active:scale-95"
 }`}
 >
 Submit <Zap className="w-3.5 h-3.5" />
 </button>
 ) : (
 <button
 onClick={handleNext}
 className="glass-button !bg-[var(--text-main)] !text-[var(--bg-base)] border border-[var(--border-glass)] hover:!bg-[var(--text-muted)] !border-0 font-bold py-2.5 px-6 rounded-xl text-xs transition-all flex items-center gap-2 active:scale-95 cursor-pointer text-[var(--text-main)]"
 >
 {currentIdx === questions.length - 1 ? "View Results" : "Next"} <ArrowRight className="w-3.5 h-3.5" />
 </button>
 )}
 </div>
 </div>
 </div>
 );
}
