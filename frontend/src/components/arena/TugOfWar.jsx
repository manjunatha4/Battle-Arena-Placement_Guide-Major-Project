import React from "react";

export default function TugOfWar({ playerHP, enemyHP, playerClass, isPullingLeft, isPullingRight, roundResolved }) {
 // shiftX is positive when player has more HP (ribbon moves left)
 // so we translate by -shiftX
 const shiftX = (playerHP - enemyHP) * 1.5; 
 
 // Set up active and idle class animations
 let leftTeamClass = "";
 if (isPullingLeft) leftTeamClass = "animate-left-pulling";
 else if (isPullingRight) leftTeamClass = "animate-left-dragged";
 else if (!roundResolved) leftTeamClass = "animate-idle-left";

 let rightTeamClass = "";
 if (isPullingRight) rightTeamClass = "animate-right-pulling";
 else if (isPullingLeft) rightTeamClass = "animate-right-dragged";
 else if (!roundResolved) rightTeamClass = "animate-idle-right";
 
 let ropeClass = "";
 if (!roundResolved) ropeClass = "animate-rope-jitter";
 
 return (
 <div className="w-full glass-panel !bg-[var(--bg-glass)] p-4 relative overflow-hidden flex flex-col items-center justify-center shadow-inner">
 {/* Self-contained CSS Animations */}
 <style>{`
 @keyframes sway-left-puller {
 0% { transform: translate(0, 0) rotate(0deg); }
 25% { transform: translate(-12px, 0) rotate(-4deg); }
 50% { transform: translate(-18px, 1px) rotate(-6deg); }
 75% { transform: translate(-6px, 0) rotate(-2deg); }
 100% { transform: translate(0, 0) rotate(0deg); }
 }
 @keyframes drag-left-puller {
 0% { transform: translate(0, 0) rotate(0deg); }
 25% { transform: translate(-15px, 2px) rotate(3deg); }
 50% { transform: translate(-20px, 3px) rotate(4deg); }
 75% { transform: translate(-8px, 1px) rotate(1deg); }
 100% { transform: translate(0, 0) rotate(0deg); }
 }
 @keyframes sway-right-puller {
 0% { transform: translate(0, 0) rotate(0deg); }
 25% { transform: translate(12px, 0) rotate(4deg); }
 50% { transform: translate(18px, 1px) rotate(6deg); }
 75% { transform: translate(6px, 0) rotate(2deg); }
 100% { transform: translate(0, 0) rotate(0deg); }
 }
 @keyframes drag-right-puller {
 0% { transform: translate(0, 0) rotate(0deg); }
 25% { transform: translate(15px, 2px) rotate(-3deg); }
 50% { transform: translate(20px, 3px) rotate(-4deg); }
 75% { transform: translate(8px, 1px) rotate(-1deg); }
 100% { transform: translate(0, 0) rotate(0deg); }
 }
 
 /* Constant Idle Strain Tug Animations */
 @keyframes sway-idle-left {
 0% { transform: translate(0, 0) rotate(0deg); }
 50% { transform: translate(-3px, 0.5px) rotate(-1.5deg); }
 100% { transform: translate(0, 0) rotate(0deg); }
 }
 @keyframes sway-idle-right {
 0% { transform: translate(0, 0) rotate(0deg); }
 50% { transform: translate(3px, 0.5px) rotate(1.5deg); }
 100% { transform: translate(0, 0) rotate(0deg); }
 }
 @keyframes rope-jitter {
 0% { transform: translate(0, 0); }
 50% { transform: translate(0, -1px); }
 100% { transform: translate(0, 0); }
 }
 
 .animate-left-pulling {
 animation: sway-left-puller 1.2s ease-in-out infinite;
 }
 .animate-left-dragged {
 animation: drag-right-puller 1.2s ease-in-out infinite;
 }
 .animate-right-pulling {
 animation: sway-right-puller 1.2s ease-in-out infinite;
 }
 .animate-right-dragged {
 animation: drag-left-puller 1.2s ease-in-out infinite;
 }
 
 .animate-idle-left {
 animation: sway-idle-left 1.5s ease-in-out infinite;
 }
 .animate-idle-right {
 animation: sway-idle-right 1.5s ease-in-out infinite;
 }
 .animate-rope-jitter {
 animation: rope-jitter 0.18s linear infinite;
 }
 `}</style>
 
 <svg viewBox="0 0 800 280" className="w-full max-w-4xl h-auto select-none">
 <defs>
 {/* Blue Pattern for Left Team shirts */}
 <pattern id="blueStripes" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
 <rect width="12" height="12" fill="#2563eb" />
 <line x1="0" y1="0" x2="0" y2="12" stroke="#60a5fa" strokeWidth="3.5" />
 <line x1="0" y1="0" x2="12" y2="0" stroke="#1d4ed8" strokeWidth="1.5" />
 </pattern>
 {/* Red Pattern for Right Team shirts */}
 <pattern id="redStripes" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
 <rect width="12" height="12" fill="#dc2626" />
 <line x1="0" y1="0" x2="0" y2="12" stroke="#f87171" strokeWidth="3.5" />
 <line x1="0" y1="0" x2="12" y2="0" stroke="#b91c1c" strokeWidth="1.5" />
 </pattern>
 </defs>

 {/* Ground grid / Shadow line */}
 <line x1="80" y1="237" x2="720" y2="237" stroke="#1e293b" strokeWidth="3" />
 <ellipse cx="400" cy="237" rx="300" ry="10" fill="rgba(30, 41, 59, 0.1)" />

 {/* Dotted Center line (benchmark mark) */}
 <line x1="400" y1="30" x2="400" y2="250" stroke="#475569" strokeWidth="1.5" strokeDasharray="5 5" />

 {/* Translation Group (moves left or right based on rope offset) */}
 <g style={{ transform: `translateX(${-shiftX}px)`, transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
 
 {/* The Rope */}
 <path d="M -150 150 L 950 150" stroke="#5c4033" strokeWidth="4.5" strokeLinecap="round" className={ropeClass} />
 {/* Rope shadow / texture effect overlay */}
 <path d="M -150 150 L 950 150" stroke="#795548" strokeWidth="4.5" strokeDasharray="6 3" strokeLinecap="round" opacity="0.6" className={ropeClass} />

 {/* Red ribbon hanging in the center */}
 <g className={ropeClass}>
 <polygon points="393,150 407,150 400,168" fill="#ef4444" />
 <path d="M 397 168 Q 394 182 393 186 M 403 168 Q 406 182 407 186" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
 </g>

 {/* LEFT TEAM: BLUE SHIRTS (Player side) */}
 <g className={leftTeamClass}>
 
 {/* Puller 1 (Leftmost) */}
 <g transform="translate(0, 0)">
 {/* Head */}
 <circle cx="210" cy="100" r="14" fill="#ffb27a" stroke="#1e293b" strokeWidth="1" />
 {/* Skullcap matching style */}
 <path d="M 197 97 Q 210 78 223 97 Z" fill="#2c2d3a" stroke="#fff" strokeWidth="0.8" />
 <line x1="202" y1="91" x2="218" y2="91" stroke="#fff" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
 {/* Leaning Torso (Blue Striped Shirt) */}
 <path d="M 190 112 Q 200 112 210 112 L 202 175 L 180 175 Z" fill="url(#blueStripes)" stroke="#1d4ed8" strokeWidth="1.2" />
 {/* Arms pulling rope */}
 <path d="M 206 130 Q 235 135 244 150 Q 235 155 204 145 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1" />
 <circle cx="244" cy="150" r="4.5" fill="#ffb27a" />
 {/* Legs in pulling stance (Dark pants) */}
 <path d="M 180 175 L 155 230 L 168 230 L 190 175 Z" fill="#111827" />
 <path d="M 155 230 L 140 230 L 142 237 L 168 237 Z" fill="#2563eb" /> {/* Shoe */}
 <path d="M 200 175 L 210 205 L 202 230 L 214 230 L 222 205 L 204 175 Z" fill="#111827" />
 <path d="M 202 230 L 188 230 L 190 237 L 214 237 Z" fill="#2563eb" /> {/* Shoe */}
 </g>

 {/* Puller 2 (Rightmost player) */}
 <g transform="translate(90, 0)">
 <circle cx="210" cy="100" r="14" fill="#ffb27a" stroke="#1e293b" strokeWidth="1" />
 <path d="M 197 97 Q 210 78 223 97 Z" fill="#2c2d3a" stroke="#fff" strokeWidth="0.8" />
 <line x1="202" y1="91" x2="218" y2="91" stroke="#fff" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
 <path d="M 190 112 Q 200 112 210 112 L 202 175 L 180 175 Z" fill="url(#blueStripes)" stroke="#1d4ed8" strokeWidth="1.2" />
 <path d="M 206 130 Q 235 135 244 150 Q 235 155 204 145 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1" />
 <circle cx="244" cy="150" r="4.5" fill="#ffb27a" />
 <path d="M 180 175 L 155 230 L 168 230 L 190 175 Z" fill="#111827" />
 <path d="M 155 230 L 140 230 L 142 237 L 168 237 Z" fill="#2563eb" />
 <path d="M 200 175 L 210 205 L 202 230 L 214 230 L 222 205 L 204 175 Z" fill="#111827" />
 <path d="M 202 230 L 188 230 L 190 237 L 214 237 Z" fill="#2563eb" />
 </g>

 </g>

 {/* RIGHT TEAM: RED SHIRTS (Boss side) */}
 <g className={rightTeamClass}>
 
 {/* Puller 3 (Leftmost enemy) */}
 <g transform="translate(290, 0)">
 {/* Head */}
 <circle cx="210" cy="100" r="14" fill="#ffb27a" stroke="#1e293b" strokeWidth="1" />
 {/* Skullcap */}
 <path d="M 197 97 Q 210 78 223 97 Z" fill="#2c2d3a" stroke="#fff" strokeWidth="0.8" />
 <line x1="202" y1="91" x2="218" y2="91" stroke="#fff" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
 {/* Torso leaning right */}
 <path d="M 210 112 Q 220 112 230 112 L 240 175 L 218 175 Z" fill="url(#redStripes)" stroke="#b91c1c" strokeWidth="1.2" />
 {/* Arms pulling left */}
 <path d="M 214 130 Q 185 135 176 150 Q 185 155 216 145 Z" fill="#dc2626" stroke="#b91c1c" strokeWidth="1" />
 <circle cx="176" cy="150" r="4.5" fill="#ffb27a" />
 {/* Legs bracing right */}
 <path d="M 240 175 L 265 230 L 252 230 L 230 175 Z" fill="#111827" />
 <path d="M 265 230 L 280 230 L 278 237 L 252 237 Z" fill="#dc2626" /> {/* Shoe */}
 <path d="M 220 175 L 210 205 L 218 230 L 206 230 L 198 205 L 216 175 Z" fill="#111827" />
 <path d="M 218 230 L 232 230 L 230 237 L 206 237 Z" fill="#dc2626" /> {/* Shoe */}
 </g>

 {/* Puller 4 (Rightmost enemy) */}
 <g transform="translate(380, 0)">
 <circle cx="210" cy="100" r="14" fill="#ffb27a" stroke="#1e293b" strokeWidth="1" />
 <path d="M 197 97 Q 210 78 223 97 Z" fill="#2c2d3a" stroke="#fff" strokeWidth="0.8" />
 <line x1="202" y1="91" x2="218" y2="91" stroke="#fff" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
 <path d="M 210 112 Q 220 112 230 112 L 240 175 L 218 175 Z" fill="url(#redStripes)" stroke="#b91c1c" strokeWidth="1.2" />
 <path d="M 214 130 Q 185 135 176 150 Q 185 155 216 145 Z" fill="#dc2626" stroke="#b91c1c" strokeWidth="1" />
 <circle cx="176" cy="150" r="4.5" fill="#ffb27a" />
 <path d="M 240 175 L 265 230 L 252 230 L 230 175 Z" fill="#111827" />
 <path d="M 265 230 L 280 230 L 278 237 L 252 237 Z" fill="#dc2626" />
 <path d="M 220 175 L 210 205 L 218 230 L 206 230 L 198 205 L 216 175 Z" fill="#111827" />
 <path d="M 218 230 L 232 230 L 230 237 L 206 237 Z" fill="#dc2626" />
 </g>

 </g>

 </g>
 </svg>
 </div>
 );
}
