import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
 HelpCircle,
 Clock,
 BookOpen,
 Bookmark,
 CheckCircle,
 AlertCircle,
 ArrowRight,
 ArrowLeft,
 RefreshCw,
 Trophy,
 Swords,
 Shield,
 Flame,
 Zap,
 Sparkles,
 Star,
 Heart,
 User,
 Bot,
 History,
 Scroll,
} from "lucide-react";

// Arena Components
import TugOfWar from "@/components/arena/TugOfWar";
import CompanySelector from "@/components/arena/CompanySelector";
import DifficultySelector from "@/components/arena/DifficultySelector";
import QuestionCountSelector from "@/components/arena/QuestionCountSelector";
import BattleModeSelector from "@/components/arena/BattleModeSelector";
import RoomLobby from "@/components/arena/RoomLobby";
import MultiBattleArena from "@/components/arena/MultiBattleArena";
import BattleResults from "@/components/arena/BattleResults";
import BattleHistory from "@/components/arena/BattleHistory";
import { COMPANY_MAP, CLASS_TO_CATEGORY, DIFFICULTY_DATA } from "@/data/companyData";
import { COMPANY_QUESTIONS, pickQuestions } from "@/data/questionBanks";

// Mock Question Bank
const QUESTION_BANK = {
 numerical: [
 {
 q: "If A can complete a work in 10 days and B in 15 days, how many days will they take to complete it working together?",
 options: ["5 days", "6 days", "8 days", "7.5 days"],
 correct: 1,
 explanation: "Together, their 1-day work is (1/10 + 1/15) = 5/30 = 1/6. So they will take 6 days.",
 },
 {
 q: "A train 150m long passes a telegraph post in 9 seconds. What is the speed of the train in km/h?",
 options: ["50 km/h", "60 km/h", "75 km/h", "80 km/h"],
 correct: 1,
 explanation: "Speed = Distance/Time = 150m/9s = 50/3 m/s. In km/h: (50/3) * (18/5) = 60 km/h.",
 },
 {
 q: "A sum of money doubles itself in 8 years at simple interest. What is the rate of interest per annum?",
 options: ["10%", "12.5%", "15%", "8%"],
 correct: 1,
 explanation: "Let principal be P. SI = P. Interest rate R = (SI * 100) / (P * T) = (P * 100) / (P * 8) = 100/8 = 12.5%.",
 },
 {
 q: "The average weight of 8 persons increases by 2.5 kg when a new person comes in place of one of them weighing 65 kg. What is the weight of the new person?",
 options: ["76 kg", "82 kg", "85 kg", "90 kg"],
 correct: 2,
 explanation: "Total weight increase = 8 * 2.5 kg = 20 kg. Weight of new person = 65 kg + 20 kg = 85 kg.",
 },
 {
 q: "What is the probability of getting a sum of 9 from two throws of a dice?",
 options: ["1/6", "1/8", "1/9", "1/12"],
 correct: 2,
 explanation: "Favorable outcomes: (3,6), (4,5), (5,4), (6,3) = 4. Total outcomes = 36. Probability = 4/36 = 1/9.",
 },
 ],
 logical: [
 {
 q: "If COV is coded as 31522 in a certain code language, how will BED be coded?",
 options: ["254", "245", "542", "264"],
 correct: 0,
 explanation: "Letters are coded by their alphabetical position: C=3, O=15, V=22. So B=2, E=5, D=4 => 254.",
 },
 {
 q: "Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?",
 options: ["7", "10", "12", "13"],
 correct: 1,
 explanation: "The pattern is alternating: add 3, subtract 2. 7(+3)=10, 10(-2)=8, 8(+3)=11, 11(-2)=9, 9(+3)=12, 12(-2)=10.",
 },
 {
 q: "Pointing to a photograph, Vipul said, 'She is the daughter of my grandfather's only son.' How is Vipul related to the girl in the photograph?",
 options: ["Father", "Brother", "Cousin", "Uncle"],
 correct: 1,
 explanation: "Vipul's grandfather's only son is Vipul's father. The girl is Vipul's father's daughter, which makes her Vipul's sister. Vipul is her brother.",
 },
 {
 q: "Find the odd one out from the given options.",
 options: ["HTML", "CSS", "Python", "React"],
 correct: 2,
 explanation: "HTML, CSS, and React are frontend/web presentation technologies. Python is a general-purpose backend programming language.",
 },
 {
 q: "Statements: All bags are pockets. All pockets are boxes. Conclusion: I. All bags are boxes. II. Some boxes are bags.",
 options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
 correct: 2,
 explanation: "Bags are a subset of pockets, which are a subset of boxes. Therefore, all bags are boxes. Since bags occupy a part of boxes, some boxes are bags.",
 },
 ],
 verbal: [
 {
 q: "Identify the synonym of the word: 'ABANDON'.",
 options: ["Retain", "Discard", "Support", "Vindicate"],
 correct: 1,
 explanation: "To 'abandon' means to desert or give up completely, which is synonymous with 'discard'.",
 },
 {
 q: "Choose the word with the correct spelling.",
 options: ["Recieve", "Reccieve", "Receive", "Receve"],
 correct: 2,
 explanation: "The correct spelling is 'Receive' (remember: 'i' before 'e' except after 'c').",
 },
 {
 q: "Fill in the blank: 'The manager was angry ________ his assistant's constant delay.'",
 options: ["at", "with", "for", "on"],
 correct: 1,
 explanation: "We are angry 'with' a person for their actions, but angry 'at' a situation. Thus, 'with' fits grammatically.",
 },
 {
 q: "Find the antonym of the word: 'COMPASSIONATE'.",
 options: ["Merciful", "Indifferent", "Heartless", "Kind"],
 correct: 2,
 explanation: "Compassionate means feeling or showing sympathy. The exact antonym is 'Heartless' or 'Cruel'.",
 },
 {
 q: "Identify the grammatically correct sentence.",
 options: [
 "Neither the teacher nor the students was present.",
 "Neither the teacher nor the students were present.",
 "Neither the teacher nor the students has present.",
 "Neither the teacher nor the students is present.",
 ],
 correct: 1,
 explanation: "With 'neither... nor...', the verb agrees with the closer subject. 'Students' is plural, so 'were' is correct.",
 },
 ],
};

const BOSS_DATA = {
 numerical: {
 name: "Equation Leviathan",
 level: 5,
 hpMax: 100,
 desc: "A giant cybernetic beast composed of numerical matrices, algebraic equations, and calculus integrals.",
 skills: ["Fraction Smash", "Matrix Laser", "Asymptotic Slam"],
 gradient: "from-blue-600 to-cyan-500 ",
 },
 logical: {
 name: "Inference Golem",
 level: 6,
 hpMax: 100,
 desc: "A massive mechanical titan built from strict binary rules, logical syllogisms, and conditional gates.",
 skills: ["Binary Crushing", "Paradox Ray", "De Morgan Beam"],
 gradient: "from-purple-600 to-indigo-500 ",
 },
 verbal: {
 name: "Syntax Dragon",
 level: 7,
 hpMax: 100,
 desc: "A legendary crimson dragon breathing semantic fires, spellbinding anagrams, and lexicon riddles.",
 skills: ["Grammar Roast", "Vocabulary Claw", "Adjective Sweep"],
 gradient: "from-red-600 to-rose-500 ",
 },
};

const CLASS_DATA = {
 mage: {
 name: "Math Mage",
 gradient: "from-cyan-400 to-blue-500",
 description: "Casts high-damage mathematical fireballs and analytical shields.",
 spells: ["Derivative Flare", "Pi Blast", "Geometric Beam"],
 },
 knight: {
 name: "Logic Knight",
 gradient: "from-purple-400 to-pink-500",
 description: "Channels raw logical reasoning into heavy dual-sword strikes.",
 spells: ["Syllogism Slash", "Binary Shield", "De Morgan strike"],
 },
 rogue: {
 name: "Grammar Rogue",
 gradient: "from-emerald-400 to-teal-500",
 description: "Strikes swift and silently using precise grammar shurikens and lexical stabs.",
 spells: ["Semantic Stab", "Synonym Shuriken", "Tense Parry"],
 },
};

export default function AptitudeTest() {
 const [activeCategory, setActiveCategory] = useState(null); // 'numerical', 'logical', 'verbal'
 const [playerClass, setPlayerClass] = useState(null);
 
 const [quizState, setQuizState] = useState("lobby"); // 'lobby', 'battle', 'victory', 'defeat', + new company flow states

 // ===== NEW: Company Battle Flow State =====
 const [selectedCompany, setSelectedCompany] = useState(null);
 const [selectedDifficulty, setSelectedDifficulty] = useState(null);
 const [questionCount, setQuestionCount] = useState(10);
 const [battleMode, setBattleMode] = useState(null); // 'solo' | 'friends'
 const [companyQuestions, setCompanyQuestions] = useState([]);
 const [companyAnswers, setCompanyAnswers] = useState({});
 const [opponentData, setOpponentData] = useState(null);
 const [showHistory, setShowHistory] = useState(false);
 const [coins, setCoins] = useState(() => parseInt(localStorage.getItem("battle_arena_coins") || "0"));
 
 // Player Progress Stats
 const [xp, setXp] = useState(() => parseInt(localStorage.getItem("battle_arena_xp") || "0"));
 const [level, setLevel] = useState(() => parseInt(localStorage.getItem("battle_arena_level") || "1"));
 const [battlesWon, setBattlesWon] = useState(() => parseInt(localStorage.getItem("battle_arena_won") || "0"));
 const [maxStreak, setMaxStreak] = useState(() => parseInt(localStorage.getItem("battle_arena_streak") || "0"));

 // Combat State
 const [questions, setQuestions] = useState([]);
 const [answers, setAnswers] = useState({});
 const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
 const [selectedOption, setSelectedOption] = useState(null);
 const [roundResolved, setRoundResolved] = useState(false); // whether current question choice is submitted

 // Battle HP
 const [playerHP, setPlayerHP] = useState(100);
 const [enemyHP, setEnemyHP] = useState(100);
 const [comboStreak, setComboStreak] = useState(0);
 const [battleLogs, setBattleLogs] = useState([]);
 
 // Timer State (Per question timer: 45 seconds)
 const [timeLeft, setTimeLeft] = useState(45);
 const [timerActive, setTimerActive] = useState(false);

 // Spells/Potions
 const [usedPotion, setUsedPotion] = useState(false);
 const [showPotionExplanation, setShowPotionExplanation] = useState(false);

 // Animations
 const [playerHitAnim, setPlayerHitAnim] = useState(false);
 const [enemyHitAnim, setEnemyHitAnim] = useState(false);
 const [playerAttackAnim, setPlayerAttackAnim] = useState(false);
 const [enemyAttackAnim, setEnemyAttackAnim] = useState(false);
 const [floatingDamage, setFloatingDamage] = useState(null); // { amount: number, isEnemy: boolean }
 const [levelUpMessage, setLevelUpMessage] = useState(false);
 const [isPullingLeft, setIsPullingLeft] = useState(false);
 const [isPullingRight, setIsPullingRight] = useState(false);

 // Save base profile setup
 useEffect(() => {
 if (playerClass) {
 localStorage.setItem("battle_arena_class", playerClass);
 }
 }, [playerClass]);

 // Sync general level & XP changes to LocalStorage
 useEffect(() => {
 localStorage.setItem("battle_arena_xp", xp.toString());
 localStorage.setItem("battle_arena_level", level.toString());
 localStorage.setItem("battle_arena_won", battlesWon.toString());
 localStorage.setItem("battle_arena_streak", maxStreak.toString());
 localStorage.setItem("battle_arena_coins", coins.toString());
 }, [xp, level, battlesWon, maxStreak, coins]);

 // Question Timer
 useEffect(() => {
 let interval = null;
 if (timerActive && quizState === "battle" && !roundResolved) {
 if (timeLeft > 0) {
 interval = setInterval(() => {
 setTimeLeft((prev) => prev - 1);
 }, 1000);
 } else {
 // Time ran out!
 handleTimeOut();
 }
 }
 return () => clearInterval(interval);
 }, [timeLeft, timerActive, quizState, roundResolved]);

 const handleStartTest = (category) => {
 setActiveCategory(category);
 setQuestions(QUESTION_BANK[category]);
 setAnswers({});
 setCurrentQuestionIdx(0);
 setSelectedOption(null);
 setRoundResolved(false);
 setPlayerHP(100);
 setEnemyHP(100);
 setComboStreak(0);
 setUsedPotion(false);
 setShowPotionExplanation(false);
 
 const boss = BOSS_DATA[category];
 const userClass = CLASS_DATA[playerClass];
 setBattleLogs([
 `⚔️ Battle initiated against ${boss.name}!`,
 `🛡️ You stand ready as a ${userClass.name}. Solve their riddles to attack!`,
 ]);
 
 setTimeLeft(45);
 setTimerActive(true);
 setQuizState("battle");
 };

 const handleTimeOut = () => {
 setRoundResolved(true);
 setComboStreak(0);
 
 const boss = BOSS_DATA[activeCategory];
 const enemyDmg = 15;
 
 setPlayerHP((prev) => Math.max(prev - enemyDmg, 0));
 setPlayerHitAnim(true);
 setFloatingDamage({ amount: enemyDmg, isEnemy: false });
 setIsPullingRight(true);
 
 setTimeout(() => {
 setPlayerHitAnim(false);
 setFloatingDamage(null);
 setIsPullingRight(false);
 }, 1500);

 const logEntry = `⏳ TIME RUN OUT! ${boss.name} casts ${boss.skills[0]} while you were charging your spell! Dealt ${enemyDmg} damage to you!`;
 setBattleLogs((prev) => [logEntry, ...prev]);

 // Check defeat
 if (playerHP - enemyDmg <= 0) {
 setTimeout(() => {
 setQuizState("defeat");
 setTimerActive(false);
 }, 1600);
 }
 };

 const handleSelectOption = (idx) => {
 if (roundResolved) return;
 setSelectedOption(idx);
 };

 const handleCastAction = () => {
 if (selectedOption === null || roundResolved) return;
 
 setRoundResolved(true);
 setAnswers((prev) => ({ ...prev, [currentQuestionIdx]: selectedOption }));
 
 const currentQuestion = questions[currentQuestionIdx];
 const isCorrect = selectedOption === currentQuestion.correct;
 const boss = BOSS_DATA[activeCategory];
 const userClass = CLASS_DATA[playerClass];
 
 if (isCorrect) {
 // Player attacks
 setPlayerAttackAnim(true);
 setIsPullingLeft(true);
 const newStreak = comboStreak + 1;
 setComboStreak(newStreak);
 if (newStreak > maxStreak) {
 setMaxStreak(newStreak);
 }
 
 // Calculate damage: base 20 + streak bonus + speed bonus
 const speedBonus = timeLeft > 30 ? 8 : timeLeft > 15 ? 4 : 0;
 const streakMultiplier = 1 + (newStreak - 1) * 0.25; // 25% extra dmg per combo count
 const damageDealt = Math.round(20 * streakMultiplier + speedBonus);
 
 setEnemyHP((prev) => Math.max(prev - damageDealt, 0));
 setEnemyHitAnim(true);
 setFloatingDamage({ amount: damageDealt, isEnemy: true });
 
 // Select spell name
 const spellName = userClass.spells[currentQuestionIdx % userClass.spells.length];
 const logEntry = `⚡ CRITICAL HIT! You cast ${spellName} (Streak x${newStreak}) dealing ${damageDealt} damage to ${boss.name}!`;
 
 setBattleLogs((prev) => [logEntry, ...prev]);
 
 setTimeout(() => {
 setPlayerAttackAnim(false);
 setEnemyHitAnim(false);
 setFloatingDamage(null);
 setIsPullingLeft(false);
 }, 1500);

 // Check Victory
 if (enemyHP - damageDealt <= 0) {
 setTimeout(() => {
 handleVictory();
 }, 1600);
 }
 } else {
 // Enemy attacks
 setEnemyAttackAnim(true);
 setIsPullingRight(true);
 setComboStreak(0);
 
 const enemyDmg = 20;
 setPlayerHP((prev) => Math.max(prev - enemyDmg, 0));
 setPlayerHitAnim(true);
 setFloatingDamage({ amount: enemyDmg, isEnemy: false });
 
 const skillName = boss.skills[currentQuestionIdx % boss.skills.length];
 const logEntry = `💥 BOSS COUNTER! ${boss.name} parries and counters with ${skillName}, dealing ${enemyDmg} damage to you!`;
 
 setBattleLogs((prev) => [logEntry, ...prev]);
 
 setTimeout(() => {
 setEnemyAttackAnim(false);
 setPlayerHitAnim(false);
 setFloatingDamage(null);
 setIsPullingRight(false);
 }, 1500);

 // Check Defeat
 if (playerHP - enemyDmg <= 0) {
 setTimeout(() => {
 setQuizState("defeat");
 setTimerActive(false);
 }, 1600);
 }
 }
 };

 const handleNextRound = () => {
 if (currentQuestionIdx < questions.length - 1) {
 setCurrentQuestionIdx((prev) => prev + 1);
 setSelectedOption(null);
 setRoundResolved(false);
 setTimeLeft(45);
 } else {
 // End of questions, but boss still alive
 setQuizState("defeat");
 setTimerActive(false);
 const logEntry = `⚠️ Run out of question spells! ${BOSS_DATA[activeCategory].name} overpowers you!`;
 setBattleLogs((prev) => [logEntry, ...prev]);
 }
 };

 const handleVictory = () => {
 setTimerActive(false);
 setQuizState("victory");
 
 // Increment wins
 const newWins = battlesWon + 1;
 setBattlesWon(newWins);
 
 // Sync Completed Course counts to Dashboard
 const completedCoursesCount = parseInt(localStorage.getItem("dashboard_courses_completed") || "8") + 1;
 localStorage.setItem("dashboard_courses_completed", completedCoursesCount.toString());

 // XP calculation: 100 base + 25 per correct answer + HP bonus
 let correctCount = 0;
 questions.forEach((q, idx) => {
 if (answers[idx] === q.correct) correctCount++;
 });
 // If completed final hit, count it too
 if (correctCount < questions.length && enemyHP <= 0) {
 correctCount = Math.min(correctCount + 1, questions.length);
 }

 const xpEarned = 100 + correctCount * 25 + Math.round(playerHP * 0.5);
 const newXp = xp + xpEarned;
 
 // Check level up: next level threshold = level * 150
 const xpNeeded = level * 150;
 if (newXp >= xpNeeded) {
 setLevel((prev) => prev + 1);
 setXp(newXp - xpNeeded);
 setLevelUpMessage(true);
 setTimeout(() => {
 setLevelUpMessage(false);
 }, 4000);
 } else {
 setXp(newXp);
 }
 };

 const handleUsePotion = () => {
 if (usedPotion || roundResolved) return;
 setUsedPotion(true);
 setShowPotionExplanation(true);
 
 setBattleLogs((prev) => [
 `🧪 You drank the Elixir of Insight! The runes align to reveal a clue.`,
 ...prev
 ]);
 };

 const formatTime = (seconds) => {
 return `${seconds}s`;
 };

 // ===== NEW: Company Battle Flow Handlers =====
 const handleCompanySelect = (company) => {
 setSelectedCompany(company);
 setQuizState("companyDifficulty");
 };

 const handleDifficultySelect = (diff) => {
 setSelectedDifficulty(diff);
 setQuizState("companyQuestionCount");
 };

 const handleQuestionCountSelect = (count) => {
 setQuestionCount(count);
 setQuizState("companyModeSelect");
 };

 const handleBattleModeSelect = (mode) => {
 setBattleMode(mode);
 if (mode === "solo") {
 startCompanyBattle();
 } else {
 setQuizState("companyRoomLobby");
 }
 };

 const startCompanyBattle = (multiplayerData) => {
 const category = CLASS_TO_CATEGORY[playerClass];
 const pool = COMPANY_QUESTIONS[selectedCompany?.id]?.[category]?.[selectedDifficulty] || [];
 const picked = pickQuestions(pool, questionCount);
 if (picked.length === 0) {
 // Fallback to existing question bank if no company questions
 const fallbackPool = QUESTION_BANK[category] || [];
 setCompanyQuestions(fallbackPool);
 } else {
 setCompanyQuestions(picked);
 }
 setCompanyAnswers({});
 if (multiplayerData) {
 setOpponentData(multiplayerData);
 }
 setQuizState("companyBattle");
 };

 const handleCompanyBattleComplete = (result) => {
 const { answers: finalAnswers, playerScore, opponentScore, maxStreak: streak, totalTime } = result;
 setCompanyAnswers(finalAnswers);

 const totalQ = companyQuestions.length;
 const correctCount = playerScore;
 const wrongCount = totalQ - correctCount;
 const accuracy = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
 const isWin = battleMode === "solo" ? accuracy >= 50 : playerScore > (opponentScore || 0);

 // XP calculation
 const diffMult = DIFFICULTY_DATA[selectedDifficulty]?.xpMultiplier || 1;
 const mpBonus = battleMode === "friends" ? 2 : 1;
 const xpEarned = Math.round((50 + correctCount * 15) * diffMult * mpBonus);
 const coinsEarned = Math.round(correctCount * 5 * diffMult);

 // Update stats
 const newXp = xp + xpEarned;
 const xpNeeded = level * 150;
 if (newXp >= xpNeeded) {
 setLevel(prev => prev + 1);
 setXp(newXp - xpNeeded);
 setLevelUpMessage(true);
 setTimeout(() => setLevelUpMessage(false), 4000);
 } else {
 setXp(newXp);
 }
 setCoins(prev => prev + coinsEarned);
 if (isWin) setBattlesWon(prev => prev + 1);
 if (streak > maxStreak) setMaxStreak(streak);

 // Save to battle history
 const historyEntry = {
 company: selectedCompany?.name,
 difficulty: selectedDifficulty,
 result: isWin ? "win" : "loss",
 correct: correctCount,
 wrong: wrongCount,
 accuracy,
 totalTime,
 xpEarned,
 coinsEarned,
 maxStreak: streak,
 date: new Date().toISOString(),
 };
 const history = JSON.parse(localStorage.getItem("battle_arena_history") || "[]");
 history.push(historyEntry);
 localStorage.setItem("battle_arena_history", JSON.stringify(history));

 // Store results for display
 setOpponentData(prev => ({
 ...prev,
 opponentScore,
 xpEarned,
 coinsEarned,
 isVictory: isWin,
 totalTime,
 maxStreak: streak,
 }));
 setQuizState("companyResults");
 };

 const resetCompanyFlow = () => {
 setSelectedCompany(null);
 setSelectedDifficulty(null);
 setQuestionCount(10);
 setBattleMode(null);
 setCompanyQuestions([]);
 setCompanyAnswers({});
 setOpponentData(null);
 setQuizState("lobby");
 };

 return (
 <div className="min-h-screen text-[var(--text-main)] p-4 md:p-8 space-y-8 font-sans relative overflow-hidden">
 
 {/* Background radial highlight */}
 <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none"></div>
 <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none"></div>

 {/* LEVEL UP POPUP OVERLAY */}
 <AnimatePresence>
 {levelUpMessage && (
 <motion.div
 initial={{ scale: 0.3, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 exit={{ scale: 0.5, opacity: 0 }}
 className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm pointer-events-none"
 >
 <div className="bg-gradient-to-b from-[#1c1d30] to-[#0d0e1b] border-2 border-yellow-500/50 p-8 rounded-3xl text-center space-y-4 max-w-sm shadow-sm ">
 <div className="w-20 h-20 rounded-full bg-yellow-500/20 border-2 border-yellow-400 flex items-center justify-center mx-auto text-yellow-400 shadow-sm">
 <Sparkles className="w-10 h-10" />
 </div>
 <h2 className="text-3xl font-extrabold text-[var(--text-main)] tracking-wider">
 LEVEL UP!
 </h2>
 <p className="text-[var(--text-muted)] text-sm">
 Your tactical understanding has expanded. You have achieved level {level}!
 </p>
 </div>
 </motion.div>
 )}
 </AnimatePresence>

 {/* LOBBY / PRE-BATTLE VIEW */}
 {quizState === "lobby" && (
 <div className="max-w-6xl mx-auto space-y-8 animate-fade-in relative z-10">
 
 {/* Header Summary */}
 <div className="flex flex-col md:flex-row items-center justify-between gap-6 glass-panel p-6 shadow-xl">
 <div className="flex items-center gap-4">
 <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-[var(--text-main)] shadow-sm">
 <Swords className="w-8 h-8" />
 </div>
 <div>
 <h1 className="text-3xl font-black text-[var(--text-main)] tracking-tight flex items-center gap-2">
 Aptitude Battle Arena
 </h1>
 <p className="text-[var(--text-muted)] text-xs md:text-sm">
 Duel powerful algorithms and clear placement benchmarks through gamified knowledge battles.
 </p>
 </div>
 </div>

 {/* Profile Level Widget */}
 <div className="flex items-center gap-4 glass-panel !bg-[var(--bg-glass)] p-4 shrink-0">
 <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-purple-500/20 flex items-center justify-center text-purple-400">
 <Star className="w-6 h-6 fill-purple-400/20" />
 </div>
 <div className="space-y-1 min-w-[120px]">
 <div className="flex justify-between items-center text-xs">
 <span className="text-[var(--text-muted)] font-medium">Level {level}</span>
 <span className="text-purple-400 font-bold">{Math.round((xp / (level * 150)) * 100)}%</span>
 </div>
 <div className="w-full bg-[var(--bg-glass)] h-2 rounded-full overflow-hidden border border-[var(--border-glass)]">
 <div
 className="bg-[var(--accent-purple)] h-full rounded-full transition-all duration-300 shadow-sm"
 style={{ width: `${Math.min((xp / (level * 150)) * 100, 100)}%` }}
 ></div>
 </div>
 <span className="text-[10px] text-[var(--text-muted)] block">
 XP: {xp} / {level * 150} | Wins: {battlesWon}
 </span>
 </div>
 </div>
 </div>

 {/* Class Picker */}
 <div className="glass-panel p-6">
 <h3 className="text-lg font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
 <User className="w-5 h-5 text-purple-400" /> Choose Your Fighter Class:
 </h3>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 {Object.entries(CLASS_DATA).map(([key, value]) => {
 const isSelected = playerClass === key;
 return (
 <button
 key={key}
 onClick={() => setPlayerClass(key)}
 className={`text-left p-5 rounded-2xl border transition-all flex flex-col justify-between group relative overflow-hidden cursor-pointer glass-button ${
 isSelected
 ? "!bg-gradient-to-tr from-[var(--accent-purple)]/20 to-[var(--accent-cyan)]/20 !border-[var(--accent-purple)] shadow-sm"
 : "!bg-transparent !border-[var(--border-glass)] hover:border-[var(--text-muted)]"
 }`}
 >
 <div className="space-y-2 relative z-10">
 <div className="flex justify-between items-center">
 <h4 className="font-extrabold text-lg text-[var(--text-main)]">{value.name}</h4>
 <span
 className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
 isSelected ? "border-purple-400 bg-purple-600" : "border-gray-600"
 }`}
 >
 {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
 </span>
 </div>
 <p className="text-xs text-[var(--text-muted)] leading-relaxed">
 {value.description}
 </p>
 </div>

 <div className="mt-4 flex flex-wrap gap-1.5 relative z-10">
 {value.spells.map((s, i) => (
 <span key={i} className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-[var(--bg-glass)] text-[var(--text-main)] border border-[var(--border-glass)]">
 {s}
 </span>
 ))}
 </div>
 </button>
 );
 })}
 </div>

 {/* Company Selector — shows below class picker */}
 <AnimatePresence mode="wait">
 {playerClass && (
 <motion.div
 key={playerClass}
 initial={{ opacity: 0, y: -30 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: 30 }}
 transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
 className="mt-6"
 >
 <CompanySelector playerClass={playerClass} onSelect={handleCompanySelect} />
 </motion.div>
 )}
 </AnimatePresence>
 </div>



 {/* Battle History Button */}
 <div className="flex justify-center">
 <button
 onClick={() => setShowHistory(true)}
 className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[var(--bg-glass)] border border-[var(--border-glass)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--accent-purple)]/40 font-bold text-xs transition-all cursor-pointer"
 >
 <History className="w-4 h-4 text-[var(--text-main)]" /> View Battle History & Analytics
 </button>
 </div>

 {/* Battle History Modal */}
 {showHistory && (
 <BattleHistory onClose={() => setShowHistory(false)} />
 )}

 {/* Lobby Info Section */}
 <div className="glass-panel p-6 shadow-xl max-w-4xl mx-auto space-y-4">
 <h3 className="text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
 <Trophy className="w-5 h-5 text-yellow-400" /> Battle Arena Regulations
 </h3>
 <ul className="space-y-3 pl-1 text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
 <li className="flex gap-3">
 <span className="text-purple-400 mt-0.5">⚔️</span>
 <span>Select an option representing your combat spell. Click <strong>Execute Action</strong> to resolve the round.</span>
 </li>
 <li className="flex gap-3">
 <span className="text-purple-400 mt-0.5">⚡</span>
 <span>Answering correctly deals high damage to the Boss. Answering in under 15 seconds rewards speed bonuses.</span>
 </li>
 <li className="flex gap-3">
 <span className="text-purple-400 mt-0.5">🔥</span>
 <span>Consecutive correct answers build a <strong>Combo Streak</strong>, multiplying your damage output significantly.</span>
 </li>
 <li className="flex gap-3">
 <span className="text-purple-400 mt-0.5">💥</span>
 <span>Answering incorrectly breaks your combo streak and prompts the Boss to deal 20 damage to you.</span>
 </li>
 <li className="flex gap-3">
 <span className="text-purple-400 mt-0.5">🧪</span>
 <span>Use your <strong>Elixir of Insight</strong> once per battle to reveal a conceptual hint if you get stuck.</span>
 </li>
 </ul>
 </div>
 </div>
 )}

 {/* ===== NEW: COMPANY BATTLE FLOW VIEWS ===== */}

 {/* DIFFICULTY SELECTION */}
 {quizState === "companyDifficulty" && (
 <div className="max-w-6xl mx-auto space-y-6 animate-fade-in relative z-10">
 <button onClick={() => setQuizState("lobby")} className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer transition-colors mb-2">
 <ArrowLeft className="w-3.5 h-3.5" /> Back to Lobby
 </button>
 <DifficultySelector company={selectedCompany} onSelect={handleDifficultySelect} />
 </div>
 )}

 {/* QUESTION COUNT SELECTION */}
 {quizState === "companyQuestionCount" && (
 <div className="max-w-6xl mx-auto space-y-6 animate-fade-in relative z-10">
 <button onClick={() => setQuizState("companyDifficulty")} className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer transition-colors mb-2">
 <ArrowLeft className="w-3.5 h-3.5" /> Back to Difficulty
 </button>
 <QuestionCountSelector onSelect={handleQuestionCountSelect} maxAvailable={50} />
 </div>
 )}

 {/* BATTLE MODE SELECTION */}
 {quizState === "companyModeSelect" && (
 <div className="max-w-6xl mx-auto space-y-6 animate-fade-in relative z-10">
 <button onClick={() => setQuizState("companyQuestionCount")} className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer transition-colors mb-2">
 <ArrowLeft className="w-3.5 h-3.5" /> Back to Question Count
 </button>
 <BattleModeSelector onSelect={handleBattleModeSelect} />
 </div>
 )}

 {/* ROOM LOBBY (Multiplayer) */}
 {quizState === "companyRoomLobby" && (
 <div className="max-w-6xl mx-auto space-y-6 animate-fade-in relative z-10">
 <button onClick={() => setQuizState("companyModeSelect")} className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer transition-colors mb-2">
 <ArrowLeft className="w-3.5 h-3.5" /> Back to Mode Select
 </button>
 <RoomLobby
 settings={{ company: selectedCompany, difficulty: selectedDifficulty, questionCount }}
 onStartBattle={(data) => startCompanyBattle(data)}
 />
 </div>
 )}

 {/* COMPANY BATTLE (Live Quiz) */}
 {quizState === "companyBattle" && companyQuestions.length > 0 && (
 <div className="animate-fade-in relative z-10">
 <MultiBattleArena
 questions={companyQuestions}
 difficulty={selectedDifficulty}
 company={selectedCompany}
 playerClass={playerClass}
 opponentName={battleMode === "friends" ? (opponentData?.opponentName || "Opponent") : null}
 onBattleComplete={handleCompanyBattleComplete}
 />
 </div>
 )}

 {/* COMPANY RESULTS */}
 {quizState === "companyResults" && (
 <div className="animate-fade-in relative z-10">
 <BattleResults
 questions={companyQuestions}
 answers={companyAnswers}
 playerHP={100}
 enemyHP={0}
 comboMax={opponentData?.maxStreak || 0}
 xpEarned={opponentData?.xpEarned || 0}
 coinsEarned={opponentData?.coinsEarned || 0}
 totalTime={opponentData?.totalTime || 0}
 difficulty={selectedDifficulty}
 company={selectedCompany}
 playerClass={playerClass}
 level={level}
 isVictory={opponentData?.isVictory || false}
 isMultiplayer={battleMode === "friends"}
 opponentName={opponentData?.opponentName}
 opponentScore={opponentData?.opponentScore}
 onReturnToLobby={resetCompanyFlow}
 onRetryBattle={() => startCompanyBattle()}
 />
 </div>
 )}

 {/* ACTIVE BATTLE VIEW */}
 {quizState === "battle" && (
 <div className="max-w-6xl mx-auto space-y-6 animate-fade-in relative z-10">
 
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
 
 {/* LEFT COLUMN: SPELL COMMANDS & QUESTIONS */}
 <div className="lg:col-span-5 glass-panel p-6 shadow-xl space-y-6">
 
 {/* Question Panel Header */}
 <div className="flex justify-between items-center border-b border-[#2d2e46]/40 pb-4">
 <div>
 <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest block">
 Domain Challenge: {activeCategory}
 </span>
 <h2 className="text-md font-bold text-[var(--text-main)]">
 Round {currentQuestionIdx + 1} of {questions.length}
 </h2>
 </div>

 <div className="flex items-center gap-3">
 <button
 onClick={handleUsePotion}
 disabled={usedPotion || roundResolved}
 className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl border text-[11px] font-bold transition duration-200 cursor-pointer ${
 usedPotion
 ? "border-[#2c2d44]/30 text-[var(--text-muted)] bg-[#15162a]/20 cursor-not-allowed"
 : "bg-purple-950/30 border-purple-500/40 text-purple-300 hover:border-purple-500"
 }`}
 >
 <span>🧪 Insight Potion</span>
 </button>

 <div className="flex items-center gap-2 bg-[var(--bg-glass)] border border-[var(--border-glass)] px-3.5 py-1.5 rounded-xl text-[var(--text-main)] font-mono text-xs shadow-inner">
 <Clock className="w-3.5 h-3.5 text-[var(--text-main)]" />
 <span>{formatTime(timeLeft)}</span>
 </div>
 </div>
 </div>

 {/* Riddle Spell Lock Description */}
 <div className="py-2">
 <span className="text-[9px] text-[var(--text-muted)] uppercase font-black tracking-widest block mb-1">Riddle Spell Lock:</span>
 <p className="text-sm md:text-base text-[var(--text-main)] font-medium leading-relaxed font-sans">
 {questions[currentQuestionIdx].q}
 </p>
 </div>

 {/* Spells/Attack Options List */}
 <div className="space-y-3 pt-1">
 {questions[currentQuestionIdx].options.map((opt, idx) => {
 const isSelected = selectedOption === idx;
 const isCorrectAnswer = idx === questions[currentQuestionIdx].correct;
 
 let buttonStyle = "bg-[var(--bg-glass)] border-[var(--border-glass)] text-[var(--text-muted)] hover:bg-[var(--bg-glass-hover)] hover:text-[var(--text-main)]";
 if (roundResolved) {
 if (isCorrectAnswer) {
 buttonStyle = "bg-green-950/20 border-green-500 text-green-300 shadow-md shadow-green-500/5";
 } else if (isSelected) {
 buttonStyle = "bg-red-950/20 border-red-500 text-red-300 shadow-md shadow-red-500/5";
 } else {
 buttonStyle = "bg-[var(--bg-glass)] border-[var(--border-glass)] text-gray-600 opacity-60";
 }
 } else if (isSelected) {
 buttonStyle = "bg-purple-950/25 border-purple-500 text-[var(--text-main)] shadow-inner";
 }

 return (
 <button
 key={idx}
 disabled={roundResolved}
 onClick={() => handleSelectOption(idx)}
 className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between text-xs md:text-sm font-medium leading-relaxed cursor-pointer ${buttonStyle}`}
 >
 <div className="flex items-center gap-3">
 <span className="text-[var(--text-muted)] text-xs font-mono font-bold">0{idx + 1}.</span>
 <span>{opt}</span>
 </div>
 <div
 className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
 isSelected ? "border-purple-400 bg-purple-600" : "border-gray-600"
 }`}
 >
 {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
 </div>
 </button>
 );
 })}
 </div>

 {/* Insight Clue Potion Display */}
 {showPotionExplanation && (
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="p-4 bg-purple-950/10 border border-purple-500/20 rounded-2xl space-y-1.5"
 >
 <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block flex items-center gap-1">
 🧪 Elixir Insight Tip:
 </span>
 <p className="text-xs text-[var(--text-muted)] leading-relaxed font-mono">
 {questions[currentQuestionIdx].explanation}
 </p>
 </motion.div>
 )}

 {/* Round Resolution Area */}
 {roundResolved && !showPotionExplanation && (
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className={`p-4 rounded-2xl border ${selectedOption === questions[currentQuestionIdx].correct ? "bg-green-950/10 border-green-500/20" : "bg-red-950/10 border-red-500/20"} space-y-1.5`}
 >
 <div className="flex items-center gap-2">
 {selectedOption === questions[currentQuestionIdx].correct ? (
 <CheckCircle className="w-4 h-4 text-green-400" />
 ) : (
 <AlertCircle className="w-4 h-4 text-red-400" />
 )}
 <span className={`text-xs font-bold ${selectedOption === questions[currentQuestionIdx].correct ? "text-green-400" : "text-red-400"}`}>
 {selectedOption === questions[currentQuestionIdx].correct ? "Spell Successful!" : "Spell Failed!"}
 </span>
 </div>
 <div className="text-xs text-[var(--text-muted)] leading-relaxed">
 <span className="font-semibold text-[var(--text-main)] block mb-0.5 font-mono">Explanation:</span>
 <p className="font-sans text-[var(--text-muted)] text-xs leading-normal">{questions[currentQuestionIdx].explanation}</p>
 </div>
 </motion.div>
 )}

 {/* Cast Commands Footer */}
 <div className="flex justify-between items-center border-t border-[#2d2e46]/30 pt-5 mt-5">
 <button
 onClick={() => setQuizState("lobby")}
 className="flex items-center gap-2 font-bold py-2.5 px-5 rounded-2xl text-xs transition duration-200 border border-[var(--border-glass)] text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer bg-[var(--bg-glass)] hover:bg-[var(--bg-glass-hover)]"
 >
 Retreat
 </button>

 {!roundResolved ? (
 <button
 onClick={handleCastAction}
 disabled={selectedOption === null}
 className={`font-black py-2.5 px-6 rounded-2xl text-xs transition duration-200 uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-md ${
 selectedOption === null
 ? "bg-[#1e1f33]/40 border border-[#2c2d44]/30 text-[var(--text-muted)] cursor-not-allowed"
 : "bg-purple-600 hover:bg-purple-700 border border-purple-500 text-[var(--text-main)] shadow-purple-600/20 active:scale-95"
 }`}
 >
 Execute Attack <Swords className="w-4.5 h-4.5" />
 </button>
 ) : (
 <button
 onClick={handleNextRound}
 className="bg-purple-600 hover:bg-purple-700 text-[var(--text-main)] border border-purple-500 font-bold py-2.5 px-6 rounded-2xl text-xs transition duration-200 flex items-center gap-2 active:scale-95 cursor-pointer shadow-md shadow-purple-600/20"
 >
 {currentQuestionIdx === questions.length - 1 ? "Resolve Battle" : "Next Round"} <ArrowRight className="w-4.5 h-4.5" />
 </button>
 )}
 </div>

 </div>

 {/* RIGHT COLUMN: BATTLE ARENA (TUG OF WAR PLAYGROUND) */}
 <div className="lg:col-span-7 glass-panel p-6 space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
 
 {/* Damage Float Indicator for feedback */}
 {floatingDamage && (
 <motion.div
 initial={{ opacity: 1, y: 0 }}
 animate={{ opacity: 0, y: -60 }}
 className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
 >
 <span className={`text-4xl font-black tracking-wider font-mono ${floatingDamage.isEnemy ? "text-purple-400" : "text-red-500"}`}>
 -{floatingDamage.amount} HP
 </span>
 </motion.div>
 )}

 {/* Combatants stats header */}
 <div className="flex justify-between items-center pb-4 border-b border-[#2d2e46]/40 gap-4">
 {/* Left Side: Challenger */}
 <div className="space-y-1">
 <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block">Challenger</span>
 <h4 className="font-extrabold text-[var(--text-main)] text-sm">{CLASS_DATA[playerClass].name}</h4>
 <span className="text-[10px] text-[var(--text-muted)] block">Level {level} | Streak: {comboStreak}</span>
 </div>
 
 {/* Center: Vs banner or Combo indicator */}
 <div className="text-center">
 {comboStreak > 0 ? (
 <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 ">
 x{comboStreak} Combo!
 </span>
 ) : (
 <span className="text-xs font-black text-[var(--text-muted)]">VS</span>
 )}
 </div>

 {/* Right Side: Boss */}
 <div className="text-right space-y-1">
 <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block">Overlord Boss</span>
 <h4 className="font-extrabold text-[var(--text-main)] text-sm">{BOSS_DATA[activeCategory].name}</h4>
 <span className="text-[10px] text-[var(--text-muted)] block">Level {BOSS_DATA[activeCategory].level}</span>
 </div>
 </div>

 {/* High-Fidelity Health Bars Grid */}
 <div className="grid grid-cols-2 gap-4">
 {/* Player Health Bar */}
 <div className="space-y-1">
 <div className="flex justify-between text-[11px] font-bold">
 <span className="text-[var(--text-muted)]">Player HP</span>
 <span className={playerHP > 40 ? "text-green-400" : "text-red-400"}>{playerHP}/100</span>
 </div>
 <div className="w-full bg-[var(--bg-glass)] h-2.5 rounded-full overflow-hidden border border-[var(--border-glass)]">
 <div
 className={`h-full rounded-full transition-all duration-500 ${playerHP > 60 ? "bg-green-500" : playerHP > 30 ? "bg-yellow-500" : "bg-red-500"}`}
 style={{ width: `${playerHP}%` }}
 ></div>
 </div>
 </div>

 {/* Boss Health Bar */}
 <div className="space-y-1">
 <div className="flex justify-between text-[11px] font-bold">
 <span className="text-[var(--text-muted)]">Boss HP</span>
 <span className="text-red-400">{enemyHP}/100</span>
 </div>
 <div className="w-full bg-[var(--bg-glass)] h-2.5 rounded-full overflow-hidden border border-[var(--border-glass)]">
 <div
 className="bg-red-500 h-full rounded-full transition-all duration-500"
 style={{ width: `${enemyHP}%` }}
 ></div>
 </div>
 </div>
 </div>

 {/* TUG OF WAR ARENA (Matches reference image) */}
 <TugOfWar
 playerHP={playerHP}
 enemyHP={enemyHP}
 playerClass={playerClass}
 isPullingLeft={isPullingLeft}
 isPullingRight={isPullingRight}
 roundResolved={roundResolved}
 />

 {/* Combat Logs Ticker */}
 <div className="bg-[var(--bg-glass)] border border-[var(--border-glass)] p-3.5 rounded-2xl flex gap-3 items-start">
 <Scroll className="w-4.5 h-4.5 text-[var(--text-main)] shrink-0 mt-0.5" />
 <div className="space-y-1 h-[68px] overflow-y-auto w-full text-[10px] md:text-xs leading-relaxed pr-1 text-[var(--text-muted)] font-mono">
 {battleLogs.map((log, idx) => (
 <div key={idx} className={idx === 0 ? "text-purple-300 font-semibold" : "text-[var(--text-muted)] opacity-70"}>
 {log}
 </div>
 ))}
 </div>
 </div>

 {/* Battle Modifiers / Loot Summary Info */}
 <div className="grid grid-cols-3 gap-3 text-[10px] text-[var(--text-muted)] pt-2 border-t border-[#23243a]/60">
 <div className="space-y-0.5">
 <span className="text-amber-400 font-bold block">Streak Multiplier</span>
 <span>Up to 1.75x+ Dmg</span>
 </div>
 <div className="space-y-0.5 text-center">
 <span className="text-blue-400 font-bold block">Speed Cast</span>
 <span>Answer &gt;30s: +8 Dmg</span>
 </div>
 <div className="space-y-0.5 text-right">
 <span className="text-green-400 font-bold block">Victory Rewards</span>
 <span>+100 base XP + Loot</span>
 </div>
 </div>

 </div>

 </div>

 </div>
 )}

 {/* VICTORY VIEW SCREEN */}
 {quizState === "victory" && (
 <div className="max-w-3xl mx-auto glass-panel !border-[var(--accent-cyan)] p-6 md:p-8 shadow-sm space-y-8 animate-fade-in relative z-10">
 
 {/* Header Victory Summary */}
 <div className="text-center space-y-4 pt-4 relative">
 <div className="w-20 h-20 rounded-full bg-yellow-500/10 border-2 border-yellow-400/50 flex items-center justify-center mx-auto text-yellow-400 shadow-sm">
 <Trophy className="w-10 h-10 animate-bounce" />
 </div>
 
 <div className="space-y-1">
 <h2 className="text-3xl font-black text-[var(--text-main)] tracking-wider">
 BATTLE VICTORY!
 </h2>
 <p className="text-[var(--text-muted)] text-xs md:text-sm">
 You have completely subdued {BOSS_DATA[activeCategory].name}!
 </p>
 </div>
 </div>

 {/* Victory Loot breakdown */}
 <div className="p-5 rounded-2xl bg-[#17182c] border border-[#2d2e46]/60 flex items-start gap-4">
 <Sparkles className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
 <div className="space-y-2 w-full">
 <h4 className="font-extrabold text-[var(--text-main)] text-sm">Combat Rewards Unlocked:</h4>
 <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs pt-1">
 <div className="p-3 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)]">
 <span className="text-[9px] text-[var(--text-muted)] block uppercase font-bold">Category Clear</span>
 <span className="text-[var(--text-main)] font-bold">{activeCategory}</span>
 </div>
 <div className="p-3 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)]">
 <span className="text-[9px] text-[var(--text-muted)] block uppercase font-bold">Max Combo Streak</span>
 <span className="text-amber-400 font-bold">{maxStreak} Combo</span>
 </div>
 <div className="p-3 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)]">
 <span className="text-[9px] text-[var(--text-muted)] block uppercase font-bold">Fighter Level</span>
 <span className="text-purple-400 font-bold">Level {level}</span>
 </div>
 </div>
 </div>
 </div>

 {/* Detailed Question Review List */}
 <div className="space-y-6 pt-2">
 <h3 className="text-md font-bold text-[var(--text-main)]">Review Tactical Explanations:</h3>
 
 <div className="space-y-4">
 {questions.map((q, idx) => {
 const userAnsIdx = answers[idx];
 const isCorrect = userAnsIdx === q.correct;
 return (
 <div
 key={idx}
 className="p-5 rounded-2xl bg-[var(--bg-glass)] border border-[var(--border-glass)] space-y-3"
 >
 <div className="flex justify-between items-start gap-3">
 <h4 className="font-bold text-[var(--text-main)] text-sm leading-relaxed">
 Round {idx + 1}. {q.q}
 </h4>
 <span
 className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 ${
 isCorrect
 ? "bg-green-500/10 text-green-400 border-green-500/20"
 : "bg-red-500/10 text-red-400 border-red-500/20"
 }`}
 >
 {isCorrect ? "Perfect Strike" : "Deflected"}
 </span>
 </div>

 <div className="space-y-2 text-xs">
 <p className="text-[var(--text-muted)]">
 Your Cast Action:{" "}
 <span className={isCorrect ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
 {userAnsIdx !== undefined ? q.options[userAnsIdx] : "(No Spell Cast)"}
 </span>
 </p>
 {!isCorrect && (
 <p className="text-[var(--text-muted)]">
 Correct Answer: <span className="text-green-400 font-bold">{q.options[q.correct]}</span>
 </p>
 )}
 
 <div className="p-3 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)] mt-2">
 <span className="text-[9px] text-[var(--text-main)] font-bold uppercase block mb-1">
 Explanation Runes:
 </span>
 <p className="text-[var(--text-muted)] leading-relaxed text-xs">{q.explanation}</p>
 </div>
 </div>
 </div>
 );
 })}
 </div>
 </div>

 {/* Footer Actions */}
 <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-end">
 <button
 onClick={() => setQuizState("lobby")}
 className="flex items-center justify-center gap-2 border border-[var(--border-glass)] hover:border-gray-500 text-[var(--text-muted)] font-bold py-3 px-6 rounded-xl transition duration-200 active:scale-95 text-xs bg-[var(--bg-glass)] cursor-pointer"
 >
 <RefreshCw className="w-4 h-4" /> Challenge Another Boss
 </button>
 
 <button
 onClick={() => setQuizState("lobby")}
 className="bg-purple-600 hover:bg-purple-700 text-[var(--text-main)] font-bold py-3 px-6 rounded-xl transition duration-200 active:scale-95 text-xs cursor-pointer shadow-md"
 >
 Finish Duel Review
 </button>
 </div>

 </div>
 )}

 {/* DEFEAT VIEW SCREEN */}
 {quizState === "defeat" && (
 <div className="max-w-3xl mx-auto glass-panel !border-red-500 p-6 md:p-8 shadow-sm space-y-8 animate-fade-in relative z-10">
 
 {/* Header Defeat Summary */}
 <div className="text-center space-y-4 pt-4 relative">
 <div className="w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-400/50 flex items-center justify-center mx-auto text-red-400 shadow-sm">
 <AlertCircle className="w-10 h-10 " />
 </div>
 
 <div className="space-y-1">
 <h2 className="text-3xl font-black text-[var(--text-main)] tracking-wider">
 DEFEATED IN BATTLE
 </h2>
 <p className="text-[var(--text-muted)] text-xs md:text-sm">
 You fell to the power of {BOSS_DATA[activeCategory].name}.
 </p>
 </div>
 </div>

 {/* Action Log Ticker in Defeat */}
 <div className="p-4 rounded-xl bg-red-950/10 border border-red-500/20 flex items-start gap-3">
 <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
 <div className="space-y-1">
 <h4 className="font-bold text-[var(--text-main)] text-sm">Fighter Resurrect System</h4>
 <p className="text-xs text-[var(--text-muted)] leading-relaxed">
 Do not despair! Review the explanation runes below to learn the math and grammar spells required to conquer this beast, and then retry the battle.
 </p>
 </div>
 </div>

 {/* Detailed Question Review List */}
 <div className="space-y-6 pt-2">
 <h3 className="text-md font-bold text-[var(--text-main)]">Study the Riddles:</h3>
 
 <div className="space-y-4">
 {questions.map((q, idx) => {
 const userAnsIdx = answers[idx];
 const isCorrect = userAnsIdx === q.correct;
 return (
 <div
 key={idx}
 className="p-5 rounded-2xl bg-[var(--bg-glass)] border border-[var(--border-glass)] space-y-3"
 >
 <div className="flex justify-between items-start gap-3">
 <h4 className="font-bold text-[var(--text-main)] text-sm leading-relaxed">
 Round {idx + 1}. {q.q}
 </h4>
 <span
 className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 ${
 isCorrect
 ? "bg-green-500/10 text-green-400 border-green-500/20"
 : "bg-red-500/10 text-red-400 border-red-500/20"
 }`}
 >
 {isCorrect ? "Perfect Strike" : "Deflected"}
 </span>
 </div>

 <div className="space-y-2 text-xs">
 <p className="text-[var(--text-muted)]">
 Your Cast Action:{" "}
 <span className={isCorrect ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
 {userAnsIdx !== undefined ? q.options[userAnsIdx] : "(No Spell Cast)"}
 </span>
 </p>
 {!isCorrect && (
 <p className="text-[var(--text-muted)]">
 Correct Answer: <span className="text-green-400 font-bold">{q.options[q.correct]}</span>
 </p>
 )}
 
 <div className="p-3 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)] mt-2">
 <span className="text-[9px] text-[var(--text-main)] font-bold uppercase block mb-1">
 Explanation Runes:
 </span>
 <p className="text-[var(--text-muted)] leading-relaxed text-xs">{q.explanation}</p>
 </div>
 </div>
 </div>
 );
 })}
 </div>
 </div>

 {/* Footer Actions */}
 <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-end">
 <button
 onClick={() => handleStartTest(activeCategory)}
 className="flex items-center justify-center gap-2 border border-red-500 hover:bg-red-950/20 text-red-400 font-bold py-3 px-6 rounded-xl transition duration-200 active:scale-95 text-xs bg-[var(--bg-glass)] cursor-pointer"
 >
 <RefreshCw className="w-4 h-4" /> Revive & Retry
 </button>
 
 <button
 onClick={() => setQuizState("lobby")}
 className="bg-purple-600 hover:bg-purple-700 text-[var(--text-main)] font-bold py-3 px-6 rounded-xl transition duration-200 active:scale-95 text-xs cursor-pointer shadow-md"
 >
 Return to Lobby
 </button>
 </div>

 </div>
 )}

 </div>
 );
}
