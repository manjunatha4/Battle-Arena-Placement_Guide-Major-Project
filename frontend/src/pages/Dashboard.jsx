import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Brain,
  Calendar,
  Trophy,
  BookOpen,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Circle,
  Lightbulb,
  TrendingUp,
  Swords,
  Star,
} from "lucide-react";
import dsaTopics from "../data/dsaContent.js";

export default function Dashboard() {
  const navigate = useNavigate();

  // Load todo items from localStorage or defaults
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("dashboard_todos");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      { id: 1, text: "Upload your resume for AI analysis", completed: false },
      { id: 2, text: "Complete your first AI mock interview", completed: false },
    ];
  });

  const [newTodo, setNewTodo] = useState("");

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("dashboard_todos", JSON.stringify(todos));
  }, [todos]);

  // Load profile name from localStorage or default to "Candidate"
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("profile_name") || "Candidate";
  });

  // Load resume score or default to "N/A"
  const [resumeScore, setResumeScore] = useState(() => {
    return localStorage.getItem("resume_ats_score") ? `${localStorage.getItem("resume_ats_score")}%` : "N/A";
  });

  // Load interview details dynamically
  const [interviewsGiven, setInterviewsGiven] = useState(() => {
    return localStorage.getItem("dashboard_interviews_given") || "0";
  });

  const [interviewScore, setInterviewScore] = useState(() => {
    return localStorage.getItem("dashboard_interview_score") || "N/A";
  });

  // Load dynamic course completions
  const [completedLectures, setCompletedLectures] = useState(() => {
    return JSON.parse(localStorage.getItem("completed_lectures") || "[]");
  });

  const [completedAssignments, setCompletedAssignments] = useState(() => {
    return JSON.parse(localStorage.getItem("completed_assignments") || "[]");
  });

  // Load Battle Arena Stats
  const [battleLevel, setBattleLevel] = useState(() => {
    return parseInt(localStorage.getItem("battle_arena_level") || "1");
  });
  const [battleXp, setBattleXp] = useState(() => {
    return parseInt(localStorage.getItem("battle_arena_xp") || "0");
  });
  const [battleWins, setBattleWins] = useState(() => {
    return parseInt(localStorage.getItem("battle_arena_won") || "0");
  });
  const [battleClass, setBattleClass] = useState(() => {
    const classKey = localStorage.getItem("battle_arena_class") || "mage";
    const classNames = { mage: "Math Mage", knight: "Logic Knight", rogue: "Grammar Rogue" };
    return classNames[classKey] || "Math Mage";
  });

  // Calculate completed courses (number of topics where all lectures are completed)
  const coursesCompleted = dsaTopics.filter(topic =>
    topic.lectures.length > 0 && topic.lectures.every(l => completedLectures.includes(l.id))
  ).length;

  // Calculate progress of a specific topic
  const getTopicProgress = (topicId) => {
    const topic = dsaTopics.find(t => t.id === topicId);
    if (!topic) return 0;
    const total = topic.lectures.length + topic.assignments.length;
    if (total === 0) return 0;
    const completedCount =
      topic.lectures.filter(l => completedLectures.includes(l.id)).length +
      topic.assignments.filter(a => completedAssignments.includes(a.id)).length;
    return Math.round((completedCount / total) * 100);
  };

  // Determine path step status based on lecture completion
  const allLectures = dsaTopics.flatMap(t => t.lectures);
  const allLecturesCompleted = allLectures.length > 0 && allLectures.every(l => completedLectures.includes(l.id));
  const dsaStatus = allLecturesCompleted ? "completed" : "active";
  const sysDesignStatus = allLecturesCompleted ? "active" : "locked";

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const newTask = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
    };
    setTodos([...todos, newTask]);
    setNewTodo("");
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0b10] text-[#e2e8f0] p-6 md:p-8 space-y-8 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <span className="animate-wiggle inline-block">👋</span> Welcome, {username}!
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Resume Score"
          value={resumeScore}
          icon={Brain}
          iconColor="text-purple-400"
          bgColor="bg-purple-950/20 border-purple-900/30"
        />
        <StatCard
          title="Interviews Given"
          value={interviewsGiven}
          icon={Calendar}
          iconColor="text-blue-400"
          bgColor="bg-blue-950/20 border-blue-900/30"
        />
        <StatCard
          title="Interview Score"
          value={interviewScore}
          icon={Trophy}
          iconColor="text-yellow-400"
          bgColor="bg-yellow-950/20 border-yellow-900/30"
        />
        <StatCard
          title="Courses Completed"
          value={coursesCompleted.toString()}
          icon={BookOpen}
          iconColor="text-green-400"
          bgColor="bg-green-950/20 border-green-900/30"
        />
        <StatCard
          title="Battle Arena Level"
          value={`Lv. ${battleLevel}`}
          icon={Swords}
          iconColor="text-red-400"
          bgColor="bg-red-950/20 border-red-900/30"
        />
      </div>

      {/* Grid of Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* AI Interview Assistant */}
        <div className="bg-[#13141f] border border-[#212235] p-6 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#383a5c] transition-all">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-600/10 rounded-full blur-xl group-hover:bg-purple-600/20 transition-all"></div>
          <div>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                🤖 AI Interview Assistant
              </h2>
            </div>
            
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="w-16 h-16 bg-purple-950/40 border border-purple-500/40 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-lg font-semibold text-gray-200">Ready for your next interview?</p>
              <p className="text-xs text-purple-400 mt-1">Your last score: {interviewScore}</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/app/interview")}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-xl transition duration-200 shadow-lg shadow-purple-600/20 active:scale-[0.98] cursor-pointer"
          >
            Start Mock Interview
          </button>
        </div>

        {/* Job Recommendations */}
        <div className="bg-[#13141f] border border-[#212235] p-6 rounded-2xl shadow-xl flex flex-col justify-between hover:border-[#383a5c] transition-all">
          <div>
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              💼 Job Recommendations
            </h2>
            
            <div className="space-y-4">
              {/* Job 1 */}
              <div className="p-4 rounded-xl bg-[#1b1c2b] border border-[#2d2e46]/60 flex items-center justify-between hover:bg-[#202133] transition-all">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-sm">Senior Frontend Developer</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                      95% Match
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Google</p>
                  <p className="text-[11px] text-purple-400 mt-0.5">Remote</p>
                </div>
                <Link
                  to="/app/job"
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 group"
                >
                  Apply <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

              {/* Job 2 */}
              <div className="p-4 rounded-xl bg-[#1b1c2b] border border-[#2d2e46]/60 flex items-center justify-between hover:bg-[#202133] transition-all">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-sm">Full Stack Engineer</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                      88% Match
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Microsoft</p>
                  <p className="text-[11px] text-purple-400 mt-0.5">Bangalore</p>
                </div>
                <Link
                  to="/app/job"
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 group"
                >
                  Apply <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          <Link
            to="/app/job"
            className="w-full mt-4 text-center text-xs text-gray-400 hover:text-white font-medium border border-[#2a2b42] hover:border-gray-600 py-2.5 rounded-xl transition duration-200"
          >
            View All Job Recommendations
          </Link>
        </div>

        {/* Aptitude Battle Arena Widget */}
        <div className="bg-[#13141f] border border-[#212235] p-6 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#383a5c] transition-all">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-600/10 rounded-full blur-xl group-hover:bg-red-600/20 transition-all"></div>
          <div>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                ⚔️ Battle Arena
              </h2>
            </div>
            
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <div className="w-16 h-16 bg-red-950/40 border border-red-500/40 rounded-full flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(239,68,68,0.35)] animate-pulse">
                <Swords className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-md font-extrabold text-gray-200">{battleClass}</p>
              <p className="text-xs text-gray-400 mt-1">Level {battleLevel} Challenger</p>
              
              {/* XP Progress Bar */}
              <div className="w-full space-y-1.5 mt-4">
                <div className="flex justify-between text-[10px] font-bold text-gray-400 px-1">
                  <span>XP Progress</span>
                  <span>{battleXp} / {battleLevel * 150}</span>
                </div>
                <div className="w-full bg-[#0d0e19] h-2 rounded-full overflow-hidden border border-[#2d2e46]/40">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((battleXp / (battleLevel * 150)) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 mt-2">Total Battles Won: {battleWins}</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/app/aptitude")}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-xl transition duration-200 shadow-lg shadow-red-600/20 active:scale-[0.98] cursor-pointer mt-2"
          >
            Enter Battle Arena
          </button>
        </div>

        {/* Today's Goals (Interactive To-do list) */}
        <div className="bg-[#13141f] border border-[#212235] p-6 rounded-2xl shadow-xl flex flex-col justify-between hover:border-[#383a5c] transition-all">
          <div>
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              🎯 Today's Goals
            </h2>

            <div className="space-y-3 max-h-[190px] overflow-y-auto pr-1">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-[#1b1c2b] border border-[#2d2e46]/30 hover:border-purple-500/30 transition-all"
                >
                  <button
                    onClick={() => handleToggleTodo(todo.id)}
                    className="flex items-center gap-3 text-left flex-1 cursor-pointer"
                  >
                    {todo.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-purple-400/70 hover:text-purple-400 shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        todo.completed ? "line-through text-gray-500" : "text-gray-200"
                      } transition-all`}
                    >
                      {todo.text}
                    </span>
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-gray-500 hover:text-red-400 p-1 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {todos.length === 0 && (
                <p className="text-xs text-gray-500 text-center py-6">No goals for today! Add some below.</p>
              )}
            </div>
          </div>

          <form onSubmit={handleAddTodo} className="flex gap-2 mt-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task"
              className="flex-1 bg-[#1b1c2b] border border-[#2d2e46] text-sm text-gray-200 px-4 py-2.5 rounded-xl placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition duration-200 active:scale-95 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </form>
        </div>
      </div>

      {/* Second Row of Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* DSA Progress */}
        <div className="bg-[#13141f] border border-[#212235] p-6 rounded-2xl shadow-xl hover:border-[#383a5c] transition-all">
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            📊 DSA Progress
          </h2>
          <div className="space-y-4">
            <ProgressBar label="Arrays" progress={getTopicProgress("arrays")} color="from-purple-500 to-indigo-500" />
            <ProgressBar label="Strings" progress={getTopicProgress("strings")} color="from-pink-500 to-rose-500" />
            <ProgressBar label="Linked Lists" progress={getTopicProgress("linked-lists")} color="from-blue-500 to-cyan-500" />
            <ProgressBar label="Binary Trees" progress={getTopicProgress("binary-trees")} color="from-teal-500 to-green-500" />
          </div>
        </div>

        {/* Learning Path */}
        <div className="bg-[#13141f] border border-[#212235] p-6 rounded-2xl shadow-xl hover:border-[#383a5c] transition-all">
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            🗺️ Learning Path
          </h2>
          <div className="space-y-4 relative pl-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#2d2e46]">
            
            <PathStep
              title="HTML & CSS Essentials"
              status="completed"
              desc="Completed lectures and building layout mockups."
            />
            <PathStep
              title="JavaScript & React Deep Dive"
              status="completed"
              desc="State management, hooks, and routing setup."
            />
            <PathStep
              title="Data Structures & Algorithms"
              status={dsaStatus}
              desc="Currently learning Stacks, Queues, and Trees."
            />
            <PathStep
              title="System Design & Mock Interviews"
              status={sysDesignStatus}
              desc="Advance metrics and mock interview reviews."
            />
          </div>
        </div>

        {/* AI Tips for You */}
        <div className="bg-[#13141f] border border-[#212235] p-6 rounded-2xl shadow-xl hover:border-[#383a5c] transition-all">
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            🧠 AI Tips for You
          </h2>
          <div className="space-y-4">
            <TipItem
              tip="Add your recent project to GitHub and update the link in your profile."
            />
            <TipItem
              tip="Your System Design skills need attention. Review the horizontal scaling lecture."
            />
            <TipItem
              tip="Revise Linked Lists and reverse operations before scheduling your next mock interview."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponents

function StatCard({ title, value, icon: Icon, iconColor, bgColor }) {
  return (
    <div className={`p-6 rounded-2xl border flex items-center justify-between shadow-xl transition-transform hover:-translate-y-1 ${bgColor}`}>
      <div className="space-y-1.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{title}</span>
        <p className="text-3xl font-extrabold text-white">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-xl bg-gray-900/60 border border-[#2d2e46] flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
    </div>
  );
}

function ProgressBar({ label, progress, color }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-semibold text-gray-300">
        <span>{label}</span>
        <span className="text-purple-400">{progress}%</span>
      </div>
      <div className="w-full bg-[#1b1c2b] border border-[#2d2e46]/30 h-2.5 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function PathStep({ title, status, desc }) {
  let indicator = (
    <div className="absolute -left-[20px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#2d2e46] border-2 border-[#13141f]" />
  );
  let textStyle = "text-gray-500";

  if (status === "completed") {
    indicator = (
      <div className="absolute -left-[20px] top-1.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-[#13141f] shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
    );
    textStyle = "text-gray-300";
  } else if (status === "active") {
    indicator = (
      <div className="absolute -left-[22px] top-1 w-4.5 h-4.5 rounded-full bg-purple-500 border-2 border-[#13141f] shadow-[0_0_10px_rgba(168,85,247,0.7)] animate-pulse" />
    );
    textStyle = "text-white font-semibold";
  }

  return (
    <div className="relative pl-4 space-y-0.5">
      {indicator}
      <h4 className={`text-sm ${textStyle}`}>{title}</h4>
      <p className="text-xs text-gray-400">{desc}</p>
    </div>
  );
}

function TipItem({ tip }) {
  return (
    <div className="p-3.5 rounded-xl bg-[#1b1c2b] border border-[#2d2e46]/30 flex items-start gap-3 hover:border-purple-500/20 transition-all">
      <div className="p-1 rounded-lg bg-purple-950/40 border border-purple-500/20 shrink-0">
        <Lightbulb className="w-4 h-4 text-purple-400 animate-pulse" />
      </div>
      <p className="text-xs text-gray-300 leading-relaxed">{tip}</p>
    </div>
  );
}

