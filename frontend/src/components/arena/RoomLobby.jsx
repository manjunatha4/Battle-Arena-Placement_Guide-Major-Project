import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Share2, Users, ArrowRight, Loader2, CheckCircle } from "lucide-react";

function generateRoomCode() {
 const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
 let code = "";
 for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
 return code;
}

export default function RoomLobby({ onStartBattle, settings }) {
 const [mode, setMode] = useState(null); // 'create' | 'join'
 const [roomCode, setRoomCode] = useState("");
 const [joinCode, setJoinCode] = useState("");
 const [copied, setCopied] = useState(false);
 const [playersJoined, setPlayersJoined] = useState(1);
 const [joining, setJoining] = useState(false);
 const [joinError, setJoinError] = useState("");
 const [opponentName, setOpponentName] = useState("");

 const handleCreateRoom = () => {
 const code = generateRoomCode();
 setRoomCode(code);
 setMode("create");
 setPlayersJoined(1);

 // Simulate opponent joining after a delay (in real app this would be Socket.IO)
 setTimeout(() => {
 setPlayersJoined(2);
 setOpponentName("Challenger_" + Math.floor(Math.random() * 999));
 }, 3000 + Math.random() * 4000);
 };

 const handleJoinRoom = () => {
 if (joinCode.length !== 6) {
 setJoinError("Enter a valid 6-character room code.");
 return;
 }
 setJoining(true);
 setJoinError("");

 // Simulate joining (in real app this would be Socket.IO)
 setTimeout(() => {
 setJoining(false);
 setPlayersJoined(2);
 setMode("joined");
 setRoomCode(joinCode);
 setOpponentName("Host_" + Math.floor(Math.random() * 999));
 }, 1500);
 };

 const handleCopy = () => {
 navigator.clipboard.writeText(roomCode);
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 };

 const handleShare = () => {
 if (navigator.share) {
 navigator.share({ title: "Battle Arena Room", text: `Join my Battle Arena room! Code: ${roomCode}` });
 } else {
 handleCopy();
 }
 };

 // Auto-start when both players joined
 useEffect(() => {
 if (playersJoined >= 2 && (mode === "create" || mode === "joined")) {
 const timer = setTimeout(() => {
 onStartBattle({ roomCode, opponentName, isHost: mode === "create" });
 }, 2500);
 return () => clearTimeout(timer);
 }
 }, [playersJoined, mode]);

 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="glass-panel p-6 space-y-6"
 >
 <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
 <Users className="w-5 h-5 text-cyan-400" /> Multiplayer Battle Room
 </h3>

 {/* Choose Create or Join */}
 {!mode && (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <button
 onClick={handleCreateRoom}
 className="p-5 rounded-2xl border border-[var(--border-glass)] bg-[var(--bg-glass)] hover:border-cyan-500/40 hover:bg-[var(--accent-cyan)]/10 transition-all cursor-pointer text-left space-y-2 glass-button"
 >
 <h4 className="font-extrabold text-[var(--text-main)] text-lg">Create Room</h4>
 <p className="text-xs text-[var(--text-muted)]">Generate a game code and wait for your friend to join.</p>
 </button>
 <button
 onClick={() => setMode("join")}
 className="p-5 rounded-2xl border border-[var(--border-glass)] bg-[var(--bg-glass)] hover:border-purple-500/40 hover:bg-[var(--bg-glass-hover)] transition-all cursor-pointer text-left space-y-2 glass-button"
 >
 <h4 className="font-extrabold text-[var(--text-main)] text-lg">Join Room</h4>
 <p className="text-xs text-[var(--text-muted)]">Enter a game code shared by your friend to join their battle.</p>
 </button>
 </div>
 )}

 {/* Create Room View */}
 {mode === "create" && (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
 <div className="bg-[var(--bg-glass)] border border-[var(--border-glass)] p-6 rounded-2xl text-center space-y-4">
 <p className="text-xs text-[var(--text-muted)] uppercase font-bold tracking-wider">Your Game Code</p>
 <div className="text-4xl font-black text-[var(--text-main)] tracking-[0.3em] font-mono">{roomCode}</div>
 <div className="flex items-center justify-center gap-3">
 <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-[var(--text-main)] text-xs font-bold transition-all cursor-pointer">
 {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
 {copied ? "Copied!" : "Copy Code"}
 </button>
 <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-glass)] hover:border-purple-500/40 text-[var(--text-muted)] text-xs font-bold transition-all cursor-pointer">
 <Share2 className="w-3.5 h-3.5" /> Share
 </button>
 </div>
 </div>

 {/* Waiting indicator */}
 <div className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-[var(--bg-glass)] border border-[var(--border-glass)]">
 {playersJoined < 2 ? (
 <>
 <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
 <div>
 <p className="text-sm font-bold text-[var(--text-main)]">{playersJoined}/2 Players Joined</p>
 <p className="text-[10px] text-[var(--text-muted)]">Waiting for opponent to join...</p>
 </div>
 </>
 ) : (
 <>
 <CheckCircle className="w-5 h-5 text-green-400" />
 <div>
 <p className="text-sm font-bold text-green-400">2/2 Players Joined!</p>
 <p className="text-[10px] text-[var(--text-muted)]">Battle starting in a moment... ⚔️</p>
 </div>
 </>
 )}
 </div>
 </motion.div>
 )}

 {/* Join Room View */}
 {mode === "join" && (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
 <div className="flex items-center gap-3">
 <input
 type="text"
 maxLength={6}
 value={joinCode}
 onChange={(e) => { setJoinCode(e.target.value.toUpperCase()); setJoinError(""); }}
 placeholder="Enter 6-char code"
 className="flex-1 px-4 py-3 glass-input text-center text-lg font-mono tracking-[0.2em] uppercase"
 />
 <button
 onClick={handleJoinRoom}
 disabled={joining}
 className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-[var(--text-main)] font-bold text-sm transition-all cursor-pointer disabled:opacity-50"
 >
 {joining ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
 {joining ? "Joining..." : "Join"}
 </button>
 </div>
 {joinError && <p className="text-xs text-red-400">{joinError}</p>}
 </motion.div>
 )}

 {/* Joined Room View */}
 {mode === "joined" && (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-[var(--bg-glass)] border border-green-500/20">
 <CheckCircle className="w-5 h-5 text-green-400" />
 <div>
 <p className="text-sm font-bold text-green-400">Connected to room {roomCode}!</p>
 <p className="text-[10px] text-[var(--text-muted)]">Battle starting shortly... ⚔️</p>
 </div>
 </motion.div>
 )}
 </motion.div>
 );
}
