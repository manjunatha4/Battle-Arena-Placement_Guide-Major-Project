import React, { useState, useEffect } from "react";
import { User, Mail, Briefcase, GraduationCap, Code, CheckCircle, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
 const [profile, setProfile] = useState({
 name: "",
 email: "prasad.placement@finallyplaced.edu",
 role: "Frontend Engineer",
 degree: "B.Tech in Computer Science & Eng.",
 skills: "React, JavaScript, CSS, Node.js, Python, DSA",
 });

 const [toastMsg, setToastMsg] = useState("");

 useEffect(() => {
 const savedName = localStorage.getItem("profile_name");
 const savedEmail = localStorage.getItem("profile_email");
 const savedRole = localStorage.getItem("profile_role");
 const savedDegree = localStorage.getItem("profile_degree");
 const savedSkills = localStorage.getItem("profile_skills");

 setProfile({
 name: savedName || "Prasad",
 email: savedEmail || "prasad.placement@finallyplaced.edu",
 role: savedRole || "Frontend Engineer",
 degree: savedDegree || "B.Tech in Computer Science & Eng.",
 skills: savedSkills || "React, JavaScript, CSS, Node.js, Python, DSA",
 });
 }, []);

 const handleSave = (e) => {
 e.preventDefault();
 localStorage.setItem("profile_name", profile.name);
 localStorage.setItem("profile_role", profile.role);
 localStorage.setItem("profile_degree", profile.degree);
 localStorage.setItem("profile_skills", profile.skills);

 setToastMsg("Profile details updated successfully!");
 setTimeout(() => setToastMsg(""), 3000);
 };

 return (
 <div className="min-h-screen text-[var(--text-main)] p-6 md:p-8 space-y-8 font-sans relative">
 <AnimatePresence>
 {toastMsg && (
 <motion.div 
 initial={{ opacity: 0, y: 50, scale: 0.9 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: 50, scale: 0.9 }}
 className="fixed bottom-6 right-6 z-50 glass-panel border border-[var(--accent-cyan)] text-[var(--text-main)] px-5 py-3 shadow-2xl flex items-center gap-3"
 >
 <CheckCircle className="w-5 h-5 text-[var(--accent-cyan)] shrink-0" />
 <span className="text-sm font-semibold">{toastMsg}</span>
 </motion.div>
 )}
 </AnimatePresence>

 <motion.div 
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 className="space-y-2 relative z-10"
 >
 <h1 className="text-3xl font-extrabold flex items-center gap-2">
 <User className="w-8 h-8 text-[var(--text-main)]" /> Candidate Profile
 </h1>
 <p className="text-[var(--text-muted)] text-sm">
 Manage your personal placement files, education, and target positions.
 </p>
 </motion.div>

 <motion.div 
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: 0.1 }}
 className="glass-panel p-6 md:p-8 max-w-2xl relative z-10"
 >
 <form onSubmit={handleSave} className="space-y-6">
 <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-[var(--border-glass)]">
 <motion.div 
 whileHover={{ rotate: 10, scale: 1.05 }}
 className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[var(--accent-purple)]/20 to-[var(--accent-cyan)]/20 border border-[var(--accent-cyan)]/30 flex items-center justify-center text-[var(--accent-cyan)] shadow-sm text-3xl font-extrabold shrink-0 backdrop-blur-md"
 >
 {profile.name ? profile.name[0].toUpperCase() : "P"}
 </motion.div>
 <div className="text-center sm:text-left">
 <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-main)] to-[var(--text-muted)]">{profile.name}</h2>
 <p className="text-xs text-[var(--text-muted)] mt-1">{profile.degree}</p>
 <p className="text-[11px] text-[var(--text-main)] font-semibold mt-1 bg-[var(--bg-glass-hover)] px-2 py-0.5 rounded-full inline-block">{profile.role}</p>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
 <div className="space-y-1.5">
 <label className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider flex items-center gap-1.5">
 <User className="w-3.5 h-3.5" /> Full Name
 </label>
 <input
 type="text"
 value={profile.name}
 onChange={(e) => setProfile({ ...profile, name: e.target.value })}
 required
 className="w-full glass-input px-4 py-2.5"
 />
 </div>

 <div className="space-y-1.5">
 <label className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider flex items-center gap-1.5">
 <Mail className="w-3.5 h-3.5" /> Email Address
 </label>
 <input
 type="email"
 value={profile.email}
 disabled
 className="w-full glass-input opacity-60 px-4 py-2.5 cursor-not-allowed"
 />
 </div>

 <div className="space-y-1.5">
 <label className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider flex items-center gap-1.5">
 <GraduationCap className="w-3.5 h-3.5" /> Education Degree
 </label>
 <input
 type="text"
 value={profile.degree}
 onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
 required
 className="w-full glass-input px-4 py-2.5"
 />
 </div>

 <div className="space-y-1.5">
 <label className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider flex items-center gap-1.5">
 <Briefcase className="w-3.5 h-3.5" /> Targeted Role
 </label>
 <input
 type="text"
 value={profile.role}
 onChange={(e) => setProfile({ ...profile, role: e.target.value })}
 required
 className="w-full glass-input px-4 py-2.5"
 />
 </div>
 </div>

 <div className="space-y-1.5">
 <label className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider flex items-center gap-1.5">
 <Code className="w-3.5 h-3.5" /> Core Tech Skills
 </label>
 <input
 type="text"
 value={profile.skills}
 onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
 required
 className="w-full glass-input px-4 py-2.5"
 />
 </div>

 <div className="flex justify-end pt-4 border-t border-[var(--border-glass)]">
 <motion.button
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 type="submit"
 className="glass-button !bg-[var(--text-main)] !text-[var(--bg-base)] border border-[var(--border-glass)] hover:!bg-[var(--text-muted)] font-bold py-3 px-6 rounded-xl text-sm flex items-center gap-2 shadow-sm border-0"
 >
 <Save className="w-4 h-4" /> Save Changes
 </motion.button>
 </div>
 </form>
 </motion.div>
 </div>
 );
}
