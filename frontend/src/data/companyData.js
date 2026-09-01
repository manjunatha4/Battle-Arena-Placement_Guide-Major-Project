// Company metadata organized by Fighter Class
// Each company has: id, name, accentColor, bgGlow, borderColor, description

export const COMPANY_MAP = {
  mage: [
    { id: "amazon", name: "Amazon", accent: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", glow: "bg-amber-500/5", desc: "E-commerce & cloud giant — heavy on quantitative aptitude." },
    { id: "google", name: "Google", accent: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", glow: "bg-blue-500/5", desc: "Search & AI leader — analytical problem-solving focus." },
    { id: "microsoft", name: "Microsoft", accent: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", glow: "bg-cyan-500/5", desc: "Enterprise software — data interpretation & arithmetic." },
    { id: "infosys", name: "Infosys", accent: "text-blue-300", bg: "bg-blue-400/10", border: "border-blue-400/30", glow: "bg-blue-400/5", desc: "IT services — speed math & calculation-heavy rounds." },
    { id: "tcs", name: "TCS", accent: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30", glow: "bg-indigo-500/5", desc: "Largest IT employer — classic quant aptitude patterns." },
    { id: "accenture", name: "Accenture", accent: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", glow: "bg-purple-500/5", desc: "Consulting powerhouse — percentage & profit/loss focus." },
    { id: "wipro", name: "Wipro", accent: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/30", glow: "bg-teal-500/5", desc: "IT services — time, work, and speed problems." },
    { id: "adobe", name: "Adobe", accent: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", glow: "bg-red-500/5", desc: "Creative software — probability & combinatorics focus." },
    { id: "goldman", name: "Goldman Sachs", accent: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30", glow: "bg-yellow-500/5", desc: "Finance titan — advanced number theory & series." },
    { id: "oracle", name: "Oracle", accent: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30", glow: "bg-rose-500/5", desc: "Database leader — algebra & equation-based questions." },
  ],
  knight: [
    { id: "amazon", name: "Amazon", accent: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", glow: "bg-amber-500/5", desc: "Leadership principles meet logical deduction." },
    { id: "google", name: "Google", accent: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", glow: "bg-blue-500/5", desc: "Pattern recognition & analytical reasoning." },
    { id: "microsoft", name: "Microsoft", accent: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", glow: "bg-cyan-500/5", desc: "Critical thinking & logical puzzles." },
    { id: "cisco", name: "Cisco", accent: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/30", glow: "bg-sky-500/5", desc: "Networking logic — sequential reasoning focus." },
    { id: "oracle", name: "Oracle", accent: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30", glow: "bg-rose-500/5", desc: "Database logic — syllogisms & truth tables." },
    { id: "ibm", name: "IBM", accent: "text-blue-300", bg: "bg-blue-400/10", border: "border-blue-400/30", glow: "bg-blue-400/5", desc: "AI & enterprise — complex arrangement problems." },
    { id: "flipkart", name: "Flipkart", accent: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30", glow: "bg-yellow-500/5", desc: "E-commerce — coding-decoding & series patterns." },
    { id: "sap", name: "SAP", accent: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30", glow: "bg-indigo-500/5", desc: "Enterprise software — data sufficiency & logic." },
    { id: "samsung", name: "Samsung", accent: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30", glow: "bg-violet-500/5", desc: "Hardware giant — spatial reasoning & puzzles." },
    { id: "adobe", name: "Adobe", accent: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", glow: "bg-red-500/5", desc: "Creative tech — blood relations & direction sense." },
  ],
  rogue: [
    { id: "accenture", name: "Accenture", accent: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", glow: "bg-purple-500/5", desc: "Consulting — grammar & sentence correction focus." },
    { id: "capgemini", name: "Capgemini", accent: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", glow: "bg-blue-500/5", desc: "IT consulting — verbal reasoning & comprehension." },
    { id: "infosys", name: "Infosys", accent: "text-blue-300", bg: "bg-blue-400/10", border: "border-blue-400/30", glow: "bg-blue-400/5", desc: "IT services — vocabulary & reading passages." },
    { id: "tcs", name: "TCS", accent: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30", glow: "bg-indigo-500/5", desc: "Largest IT — email writing & sentence arrangement." },
    { id: "wipro", name: "Wipro", accent: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/30", glow: "bg-teal-500/5", desc: "IT services — error spotting & fill-in-the-blanks." },
    { id: "cognizant", name: "Cognizant", accent: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", glow: "bg-cyan-500/5", desc: "IT services — para jumbles & cloze tests." },
    { id: "deloitte", name: "Deloitte", accent: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30", glow: "bg-green-500/5", desc: "Big Four — advanced vocabulary & idioms." },
    { id: "ey", name: "EY", accent: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30", glow: "bg-yellow-500/5", desc: "Ernst & Young — sentence completion & analogies." },
    { id: "pwc", name: "PwC", accent: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30", glow: "bg-orange-500/5", desc: "PricewaterhouseCoopers — critical reasoning & grammar." },
    { id: "techmahindra", name: "Tech Mahindra", accent: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30", glow: "bg-rose-500/5", desc: "IT services — synonyms, antonyms & tense correction." },
  ],
};

// Map Fighter Class key to question category type
export const CLASS_TO_CATEGORY = {
  mage: "numerical",
  knight: "logical",
  rogue: "verbal",
};

// Difficulty metadata
export const DIFFICULTY_DATA = {
  easy: {
    label: "Easy",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    glow: "shadow-green-500/10",
    xpMultiplier: 1,
    timerSeconds: 60,
    description: "Foundational questions. Great for warming up.",
  },
  medium: {
    label: "Medium",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    glow: "shadow-amber-500/10",
    xpMultiplier: 1.5,
    timerSeconds: 45,
    description: "Standard placement-level. Tests core understanding.",
  },
  hard: {
    label: "Hard",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    glow: "shadow-red-500/10",
    xpMultiplier: 2.5,
    timerSeconds: 30,
    description: "Expert-level brain twisters. Only for the elite.",
  },
};
