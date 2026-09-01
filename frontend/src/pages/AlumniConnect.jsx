import React, { useState } from "react";
import {
 Users,
 Search,
 MessageSquare,
 Mail,
 Briefcase,
 GraduationCap,
 X,
 CheckCircle,
 Linkedin,
} from "lucide-react";

const ALUMNI_LIST = [
 {
 id: 1,
 name: "Manjunatha R",
 role: "Software Engineer II",
 company: "Google",
 gradYear: 2023,
 location: "Bangalore, India",
 tags: ["Mentorship", "Referrals", "System Design"],
 image: "/alumni1.jpg",
 },
 {
 id: 2,
 name: "Dhanush",
 role: "Frontend Developer",
 company: "Microsoft",
 gradYear: 2024,
 location: "Hyderabad, India",
 tags: ["React", "Frontend Tricks"],
 image: "/alumni2.jpg",
 },
 {
 id: 3,
 name: "Ganesh K",
 role: "Product Manager",
 company: "Meta",
 gradYear: 2022,
 location: "Remote, India",
 tags: ["Product Strategy", "Interview Tips", "Behavioral Prep"],
 image: "/alumni3.jpg",
 },
 {
 id: 4,
 name: "Lakshmish A",
 role: "Software Development Engineer",
 company: "Amazon",
 gradYear: 2023,
 location: "Pune, India",
 tags: ["Referrals", "DSA Tricks", "Mock Coding"],
 image: "/alumni4.jpg",
 },
];



export default function AlumniConnect() {
 const [searchTerm, setSearchTerm] = useState("");
 const [selectedAlumni, setSelectedAlumni] = useState(null);
 const [sessionType, setSessionType] = useState("Quick Chat");
 const [requestText, setRequestText] = useState("");
 const [toastMsg, setToastMsg] = useState("");

 const filteredAlumni = ALUMNI_LIST.filter((alumni) => {
 const term = searchTerm.toLowerCase();
 return (
 alumni.name.toLowerCase().includes(term) ||
 alumni.company.toLowerCase().includes(term) ||
 alumni.role.toLowerCase().includes(term) ||
 alumni.tags.some((t) => t.toLowerCase().includes(term))
 );
 });

 const handleSendRequest = (e) => {
 e.preventDefault();
 if (!requestText.trim()) return;

 setToastMsg(`Mentorship request sent to ${selectedAlumni.name}!`);
 setSelectedAlumni(null);
 setRequestText("");
 setTimeout(() => setToastMsg(""), 3500);
 };

 return (
 <div className="min-h-screen text-[var(--text-main)] p-6 md:p-8 space-y-8 font-sans relative">
 {/* Toast Alert */}
 {toastMsg && (
 <div className="fixed bottom-6 right-6 z-50 glass-panel border border-[var(--accent-purple)] text-[var(--text-main)] px-5 py-3 shadow-2xl flex items-center gap-3 animate-slide-in">
 <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
 <span className="text-sm font-semibold">{toastMsg}</span>
 </div>
 )}

 {/* Header */}
 <div className="space-y-4 max-w-xl">
 <h1 className="text-3xl font-extrabold text-[var(--text-main)] flex items-center gap-2">
 <Users className="w-8 h-8 text-[var(--text-main)]" /> Alumni Connect
 </h1>
 <p className="text-[var(--text-muted)] text-sm">
 Search and connect with Battle Arena - Placement Guide alumni working at top companies. Seek referrals, mock interview guidance, or career advice.
 </p>
 </div>

 {/* Search Bar */}
 <div className="max-w-md relative">
 <input
 type="text"
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 placeholder="Filter by name, company, role, or skill tag..."
 className="w-full glass-input text-sm text-[var(--text-main)] pl-11 pr-4 py-3 placeholder-[var(--text-muted)] focus:outline-none focus:!border-[var(--accent-purple)] transition-all shadow-md"
 />
 <Search className="absolute left-4 top-3.5 w-4.5 h-4.5 text-[var(--text-muted)]" />
 </div>

 {/* Alumni Cards Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
 {filteredAlumni.map((alumni) => (
 <div
 key={alumni.id}
 className="glass-panel p-5 shadow-xl hover:border-[var(--text-muted)]/50 transition-all flex flex-col sm:flex-row gap-5 hover:shadow-sm"
 >
 {/* Profile Avatar */}
 <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-[var(--border-glass)] mx-auto sm:mx-0">
 <img
 src={alumni.image}
 alt={alumni.name}
 className="w-full h-full object-cover"
 />
 </div>

 {/* Profile Details */}
 <div className="flex-1 flex flex-col justify-between text-center sm:text-left space-y-4">
 <div className="space-y-1.5">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
 <h2 className="text-lg font-bold text-[var(--text-main)]">{alumni.name}</h2>
 <span className="text-[10px] font-bold text-[var(--text-main)] bg-[var(--bg-glass-hover)] border border-[var(--border-glass)] px-2 py-0.5 rounded-full inline-block self-center sm:self-start">
 Class of {alumni.gradYear}
 </span>
 </div>
 

 <p className="text-[11px] text-[var(--text-muted)] flex items-center justify-center sm:justify-start gap-1">
 <GraduationCap className="w-3.5 h-3.5 text-[var(--text-muted)]" /> {alumni.location}
 </p>
 </div>

 {/* Tags */}
 <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
 {alumni.tags.map((tag, idx) => (
 <span
 key={idx}
 className="text-[10px] font-semibold text-[var(--text-muted)] bg-[var(--bg-glass)] border border-[var(--border-glass)] px-2 py-0.5 rounded"
 >
 {tag}
 </span>
 ))}
 </div>

 {/* Actions */}
 <div className="flex justify-between items-center pt-2 border-t border-[var(--border-glass)]">
 <a
 href="https://linkedin.com"
 target="_blank"
 rel="noopener noreferrer"
 className="text-[var(--text-muted)] hover:text-[var(--accent-cyan)] p-1.5 rounded transition-all"
 >
 <Linkedin className="w-4 h-4" />
 </a>

 <button
 onClick={() => setSelectedAlumni(alumni)}
 className="glass-button !bg-[var(--text-main)] !text-[var(--bg-base)] border border-[var(--border-glass)] hover:!bg-[var(--text-muted)] font-bold py-2 px-4 rounded-xl text-xs transition duration-200 active:scale-95 flex items-center gap-1 shadow-sm"
 >
 <MessageSquare className="w-3.5 h-3.5" /> Request Mentorship
 </button>
 </div>
 </div>
 </div>
 ))}

 {filteredAlumni.length === 0 && (
 <p className="text-sm text-[var(--text-muted)] text-center py-12 col-span-2">
 No alumni found matching your query 😕
 </p>
 )}
 </div>

 {/* Mentorship Modal Dialog */}
 {selectedAlumni && (
 <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
 <form
 onSubmit={handleSendRequest}
 className="glass-panel !bg-[var(--bg-glass-hover)] max-w-md w-full p-6 shadow-2xl relative space-y-5"
 >
 {/* Modal Header */}
 <div className="flex items-center justify-between border-b border-[var(--border-glass)] pb-3">
 <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
 <Mail className="w-5 h-5 text-[var(--text-main)]" /> Connect with {selectedAlumni.name}
 </h3>
 <button
 type="button"
 onClick={() => setSelectedAlumni(null)}
 className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-glass)] border border-[var(--border-glass)] transition-all"
 >
 <X className="w-4 h-4" />
 </button>
 </div>

 {/* Selected Info */}
 <p className="text-xs text-[var(--text-muted)]">
 Send a request to discuss career advice or referrals. {selectedAlumni.name} is generally responsive within 48 hours.
 </p>

 {/* Input Selection */}
 <div className="space-y-1.5">
 <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block">
 Session Focus Type
 </label>
 <select
 value={sessionType}
 onChange={(e) => setSessionType(e.target.value)}
 className="w-full glass-input text-xs text-[var(--text-main)] px-3.5 py-2.5 rounded-xl focus:outline-none focus:!border-[var(--accent-purple)] transition-all [&>option]:bg-black [&>option]:text-[var(--text-main)]"
 >
 <option value="Quick Chat">Quick Chat (15 min)</option>
 <option value="Mock Interview">Mock Coding Session (45 min)</option>
 <option value="Referral Request">Referral Inquiry</option>
 </select>
 </div>

 {/* Description Textarea */}
 <div className="space-y-1.5">
 <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block">
 Your Invitation Note
 </label>
 <textarea
 value={requestText}
 onChange={(e) => setRequestText(e.target.value)}
 required
 placeholder="Include details about your query, your current preparation level, and how they can help..."
 className="w-full min-h-[110px] p-3 glass-input text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:!border-[var(--accent-purple)] transition-all resize-none"
 />
 </div>

 {/* Action Footer */}
 <div className="flex gap-2 justify-end pt-2 border-t border-[var(--border-glass)]">
 <button
 type="button"
 onClick={() => setSelectedAlumni(null)}
 className="bg-[var(--bg-glass)] border border-[var(--border-glass)] text-[var(--text-muted)] hover:text-[var(--text-main)] font-bold py-2.5 px-4 rounded-xl text-xs transition duration-200"
 >
 Cancel
 </button>
 
 <button
 type="submit"
 className="glass-button !bg-[var(--text-main)] !text-[var(--bg-base)] border border-[var(--border-glass)] hover:!bg-[var(--text-muted)] font-bold py-2.5 px-5 rounded-xl text-xs transition duration-200 active:scale-95 shadow-sm"
 >
 Send Request
 </button>
 </div>
 </form>
 </div>
 )}
 </div>
 );
}
