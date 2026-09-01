import React from "react";
import { motion } from "framer-motion";
import { Building2, ChevronRight } from "lucide-react";
import { COMPANY_MAP } from "@/data/companyData";

export default function CompanySelector({ playerClass, onSelect }) {
 const companies = COMPANY_MAP[playerClass] || [];

 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="glass-panel p-6 space-y-4"
 >
 <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
 <Building2 className="w-5 h-5 text-[var(--text-main)]" /> Select Target Company:
 </h3>
 <p className="text-xs text-[var(--text-muted)]">Choose a placement company to practice their specific question patterns.</p>

 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
 {companies.map((company, idx) => (
 <motion.button
 key={company.id}
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 transition={{ delay: idx * 0.04 }}
 onClick={() => onSelect(company)}
 className={`group relative text-left p-4 rounded-2xl border transition-all cursor-pointer overflow-hidden glass-button !border-[var(--border-glass)] !bg-transparent`}
 >
 <div className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl ${company.glow} opacity-30 group-hover:w-24 group-hover:h-24 group-hover:opacity-60 transition-all`} />
 <div className="relative z-10 space-y-2">
 <div className={`w-10 h-10 rounded-xl ${company.bg} border ${company.border} flex items-center justify-center ${company.accent} font-black text-sm group-hover:scale-110 transition-transform`}>
 {company.name.charAt(0)}
 </div>
 <h4 className="font-extrabold text-[var(--text-main)] text-sm truncate">{company.name}</h4>
 <p className="text-[10px] text-[var(--text-muted)] leading-relaxed line-clamp-2">{company.desc}</p>
 </div>
 <ChevronRight className="absolute bottom-3 right-3 w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] transition-colors" />
 </motion.button>
 ))}
 </div>
 </motion.div>
 );
}
