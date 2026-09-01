import React, { useState } from "react";
import {
 Bell,
 BellOff,
 ExternalLink,
 Calendar,
 Users,
 X,
 CheckCircle,
 Trophy,
} from "lucide-react";

const PLATFORMS = [
 {
 id: "leetcode",
 name: "LeetCode",
 desc: "Practice coding skills with algorithmic problems and prepare for technical interviews.",
 details: "Weekly contests",
 users: "2M+ users",
 url: "https://leetcode.com/contest/",
 accentColor: "border-t-[#f59e0b]", // orange
 btnColor: "bg-[#f59e0b] hover:bg-[#d97706]",
 contests: [
 { name: "Weekly Contest 438", date: "June 7, 2026", time: "8:00 AM" },
 { name: "Biweekly Contest 150", date: "June 13, 2026", time: "8:00 PM" },
 ],
 },
 {
 id: "hackerrank",
 name: "HackerRank",
 desc: "Coding challenges for both developers & companies, supporting multiple programming languages.",
 details: "Monthly contests",
 users: "5M+ users",
 url: "https://www.hackerrank.com/contests",
 accentColor: "border-t-[#10b981]", // green
 btnColor: "bg-[#10b981] hover:bg-[#059669]",
 contests: [
 { name: "HackerRank World Hackathon", date: "June 25, 2026", time: "6:00 PM" },
 { name: "Monthly Code Sprint", date: "July 2, 2026", time: "9:00 AM" },
 ],
 },
 {
 id: "codeforces",
 name: "CodeForces",
 desc: "Competitive programming website featuring regular contests and comprehensive problemset.",
 details: "Bi-weekly contests",
 users: "1.5M+ users",
 url: "https://codeforces.com/contests",
 accentColor: "border-t-[#3b82f6]", // blue
 btnColor: "bg-[#3b82f6] hover:bg-[#2563eb]",
 contests: [
 { name: "Codeforces Round 1024 (Div. 2)", date: "June 8, 2026", time: "7:35 PM" },
 { name: "Educational Codeforces Round 172", date: "June 12, 2026", time: "7:35 PM" },
 ],
 },
 {
 id: "codechef",
 name: "CodeChef",
 desc: "Platform fostering competitive programming with long & short contests and practice problems.",
 details: "Weekly contests",
 users: "1M+ users",
 url: "https://www.codechef.com/contests",
 accentColor: "border-t-[#f97316]", // deep orange
 btnColor: "bg-[#f97316] hover:bg-[#ea580c]",
 contests: [
 { name: "Starters 179 (Div. 3 & 4)", date: "June 10, 2026", time: "8:00 PM" },
 { name: "CodeChef Cook-Off", date: "June 24, 2026", time: "8:00 PM" },
 ],
 },
 {
 id: "atcoder",
 name: "AtCoder",
 desc: "Japanese programming contest platform with high-quality algorithm contests.",
 details: "Weekly contests",
 users: "500K+ users",
 url: "https://atcoder.jp/contests/",
 accentColor: "border-t-[#6366f1]", // indigo
 btnColor: "bg-[#6366f1] hover:bg-[#4f46e5]",
 contests: [
 { name: "AtCoder Beginner Contest 361", date: "June 6, 2026", time: "5:30 PM" },
 { name: "AtCoder Regular Contest 180", date: "June 14, 2026", time: "5:30 PM" },
 ],
 },
 {
 id: "topcoder",
 name: "TopCoder",
 desc: "Pioneering competitive programming platform with Single Round Matches and Marathon Matches.",
 details: "Occasional contests",
 users: "1M+ users",
 url: "https://www.topcoder.com/community/member-programs/srm-schedule",
 accentColor: "border-t-[#ec4899]", // pink
 btnColor: "bg-[#ec4899] hover:bg-[#db2777]",
 contests: [
 { name: "SRM 903", date: "June 18, 2026", time: "9:00 PM" },
 { name: "Marathon Match 155", date: "July 5, 2026", time: "10:00 AM" },
 ],
 },
];

export default function Contests() {
 const [notifications, setNotifications] = useState({
 leetcode: true,
 hackerrank: false,
 codeforces: true,
 codechef: false,
 atcoder: false,
 topcoder: false,
 });

 const [activePlatform, setActivePlatform] = useState(null); // Selected platform for upcoming contests
 const [globalNotif, setGlobalNotif] = useState(true);
 const [toastMsg, setToastMsg] = useState("");

 const showToast = (msg) => {
 setToastMsg(msg);
 setTimeout(() => setToastMsg(""), 3500);
 };

 const handleToggleNotification = (id) => {
 const nextState = !notifications[id];
 setNotifications({ ...notifications, [id]: nextState });
 showToast(
 `${nextState ? "Enabled" : "Disabled"} notifications for ${
 PLATFORMS.find((p) => p.id === id).name
 }`
 );
 };

 const handleToggleGlobal = () => {
 const nextState = !globalNotif;
 setGlobalNotif(nextState);
 const updated = {};
 Object.keys(notifications).forEach((k) => {
 updated[k] = nextState;
 });
 setNotifications(updated);
 showToast(
 nextState
 ? "Subscribed to all platform notifications!"
 : "Unsubscribed from all platform notifications."
 );
 };

 return (
 <div className="min-h-screen text-[var(--text-main)] p-6 md:p-8 space-y-8 font-sans relative">
 {/* Toast Alert */}
 {toastMsg && (
 <div className="fixed bottom-6 right-6 z-50 glass-panel border border-[var(--accent-purple)] text-[var(--text-main)] px-5 py-3 shadow-2xl flex items-center gap-3 animate-slide-in">
 <CheckCircle className="w-5 h-5 text-[var(--accent-cyan)] shrink-0" />
 <span className="text-sm font-semibold">{toastMsg}</span>
 </div>
 )}

 {/* Header - Matches screenshot 2 */}
 <div className="text-center space-y-4 max-w-2xl mx-auto mb-10">
 <h1 className="text-4xl font-extrabold text-[var(--text-main)] tracking-tight">
 Coding Platforms Explorer
 </h1>
 <p className="text-[var(--text-muted)] text-sm md:text-md">
 Discover top competitive programming platforms and never miss a contest
 </p>

 <div className="pt-2">
 <button
 onClick={handleToggleGlobal}
 className={`inline-flex items-center gap-2 font-bold text-xs py-3 px-6 rounded-xl transition duration-200 active:scale-95 border ${
 globalNotif
 ? "glass-button !bg-[var(--text-main)] !text-[var(--bg-base)] border border-[var(--border-glass)] hover:!bg-[var(--text-muted)] shadow-sm"
 : "bg-[var(--bg-glass)] border-[var(--border-glass)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
 }`}
 >
 <Bell className="w-4 h-4" />
 {globalNotif ? "Notifications: Enabled for All" : "Manage All Notifications"}
 </button>
 </div>
 </div>

 {/* Contest Platforms Cards Grid - Matches screenshot 2 */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
 {PLATFORMS.map((platform) => {
 const isNotifEnabled = notifications[platform.id];
 return (
 <div
 key={platform.id}
 className={`glass-panel border-t-4 ${platform.accentColor} p-6 shadow-xl flex flex-col justify-between hover:border-[var(--text-muted)] hover:shadow-sm transition duration-300 group`}
 >
 <div>
 {/* Top header */}
 <div className="flex items-center justify-between mb-4">
 <div className="flex items-center gap-2.5">
 <div className="w-9 h-9 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-glass)] flex items-center justify-center">
 <Trophy className="w-5 h-5 text-[var(--text-main)]" />
 </div>
 <h2 className="text-xl font-bold text-[var(--text-main)] group-hover:text-[var(--text-main)] transition-colors">
 {platform.name}
 </h2>
 </div>
 
 <button
 onClick={() => handleToggleNotification(platform.id)}
 className={`p-2 rounded-lg transition duration-200 ${
 isNotifEnabled
 ? "bg-[var(--bg-glass-hover)] border border-[var(--border-glass)] text-[var(--text-main)]"
 : "bg-[var(--bg-glass)] border border-[var(--border-glass)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
 }`}
 title="Toggle Notification"
 >
 {isNotifEnabled ? <Bell className="w-4.5 h-4.5" /> : <BellOff className="w-4.5 h-4.5" />}
 </button>
 </div>

 <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6">
 {platform.desc}
 </p>

 {/* Substats */}
 <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-6 font-medium">
 <span className="flex items-center gap-1.5">
 <Calendar className="w-3.5 h-3.5" /> {platform.details}
 </span>
 <span className="flex items-center gap-1.5">
 <Users className="w-3.5 h-3.5" /> {platform.users}
 </span>
 </div>
 </div>

 {/* Action Buttons */}
 <div className="space-y-3.5 pt-2 border-t border-[var(--border-glass)]">
 <button
 onClick={() => setActivePlatform(platform)}
 className={`w-full text-[var(--text-main)] font-bold py-2.5 px-4 rounded-xl text-xs transition duration-200 active:scale-95 shadow-md ${platform.btnColor}`}
 >
 Show Contests
 </button>
 
 <div className="flex justify-between items-center px-1">
 <a
 href={platform.url}
 target="_blank"
 rel="noopener noreferrer"
 className="text-[11px] text-[var(--text-main)] hover:text-[var(--text-main)] font-bold flex items-center gap-1 group"
 >
 Visit {platform.name} <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
 </a>
 
 <span className="text-[10px] text-[var(--text-muted)] font-semibold uppercase">
 {isNotifEnabled ? "Subscribed" : "Muted"}
 </span>
 </div>
 </div>
 </div>
 );
 })}
 </div>

 {/* Contests Modal dialog */}
 {activePlatform && (
 <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
 <div className="glass-panel !bg-[var(--bg-glass-hover)] max-w-lg w-full p-6 shadow-2xl relative space-y-6">
 
 {/* Modal Header */}
 <div className="flex items-center justify-between border-b border-[var(--border-glass)] pb-4">
 <div className="flex items-center gap-2.5">
 <Trophy className="w-6 h-6 text-[var(--text-main)]" />
 <h3 className="text-xl font-bold text-[var(--text-main)]">
 {activePlatform.name} Contests
 </h3>
 </div>
 <button
 onClick={() => setActivePlatform(null)}
 className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-glass)] border border-[var(--border-glass)] transition-all"
 >
 <X className="w-4 h-4" />
 </button>
 </div>

 {/* Contests List */}
 <div className="space-y-4">
 <p className="text-xs text-[var(--text-muted)]">
 Below are the upcoming competitive programming contests scheduled on {activePlatform.name}.
 </p>
 
 <div className="space-y-3.5">
 {activePlatform.contests.map((contest, i) => (
 <div
 key={i}
 className="p-4 rounded-2xl bg-[var(--bg-glass)] border border-[var(--border-glass)] flex flex-col sm:flex-row justify-between sm:items-center gap-3"
 >
 <div>
 <h4 className="font-bold text-[var(--text-main)] text-sm">{contest.name}</h4>
 <p className="text-xs text-[var(--text-muted)] mt-1 flex items-center gap-1.5">
 <Calendar className="w-3.5 h-3.5 text-[var(--text-main)]" /> {contest.date} • {contest.time}
 </p>
 </div>

 <a
 href={activePlatform.url}
 target="_blank"
 rel="noopener noreferrer"
 className="glass-button !bg-[var(--text-main)] !text-[var(--bg-base)] border border-[var(--border-glass)] hover:!bg-[var(--text-muted)] font-bold text-xs py-2 px-4 rounded-xl text-center transition duration-200 shrink-0"
 >
 Register
 </a>
 </div>
 ))}
 </div>
 </div>

 {/* Modal Footer */}
 <div className="pt-2 flex justify-end">
 <button
 onClick={() => setActivePlatform(null)}
 className="bg-[var(--bg-glass)] border border-[var(--border-glass)] text-[var(--text-muted)] hover:text-[var(--text-main)] font-bold py-2.5 px-5 rounded-xl text-xs transition duration-200"
 >
 Close Window
 </button>
 </div>

 </div>
 </div>
 )}
 </div>
 );
}
