import React, { useState } from "react";
import { Settings, Save, CheckCircle, RefreshCw, Eye, Volume2 } from "lucide-react";

export default function SettingsPage() {
 const [toastMsg, setToastMsg] = useState("");
 const [options, setOptions] = useState({
 tts: true,
 visualIndicators: true,
 autoselect: false,
 });

 const handleSave = (e) => {
 e.preventDefault();
 setToastMsg("Settings applied successfully!");
 setTimeout(() => setToastMsg(""), 3000);
 };

 const handleReset = () => {
 localStorage.clear();
 setToastMsg("Platform parameters reset to defaults.");
 setTimeout(() => {
 window.location.reload();
 }, 1500);
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

 {/* Header */}
 <div className="space-y-2">
 <h1 className="text-3xl font-extrabold text-[var(--text-main)] flex items-center gap-2">
 <Settings className="w-8 h-8 text-[var(--text-main)]" /> Platform Settings
 </h1>
 <p className="text-[var(--text-muted)] text-sm">
 Fine-tune the mock AI coach volume, visual indicators, and local cache.
 </p>
 </div>

 <div className="glass-panel max-w-xl shadow-2xl space-y-6">
 <form onSubmit={handleSave} className="space-y-6">
 
 <div className="space-y-4">
 
 {/* Toggle 1 */}
 <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-glass)]">
 <div className="flex items-start gap-3">
 <Volume2 className="w-5 h-5 text-[var(--text-main)] shrink-0 mt-0.5" />
 <div>
 <h3 className="font-bold text-[var(--text-main)] text-sm">Audio TTS Synthesis</h3>
 <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Read aloud AI questions inside mock interviews.</p>
 </div>
 </div>
 <input
 type="checkbox"
 checked={options.tts}
 onChange={(e) => setOptions({ ...options, tts: e.target.checked })}
 className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
 />
 </div>

 {/* Toggle 2 */}
 <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-glass)]">
 <div className="flex items-start gap-3">
 <Eye className="w-5 h-5 text-[var(--text-main)] shrink-0 mt-0.5" />
 <div>
 <h3 className="font-bold text-[var(--text-main)] text-sm">Real-time Visual Cues</h3>
 <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Show overlays and active recording signs in camera feed.</p>
 </div>
 </div>
 <input
 type="checkbox"
 checked={options.visualIndicators}
 onChange={(e) => setOptions({ ...options, visualIndicators: e.target.checked })}
 className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
 />
 </div>

 {/* Toggle 3 (Always Dark Mode notice) */}
 <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-glass)]">
 <div>
 <h3 className="font-bold text-[var(--text-main)] text-sm">Theme Selection</h3>
 <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Supports both Light and Dark mode globally.</p>
 </div>
 <span className="text-[10px] font-bold text-[var(--text-main)] uppercase tracking-wider bg-[var(--bg-glass-hover)] border border-[var(--border-glass)] px-2.5 py-1 rounded-full">
 Global Theme
 </span>
 </div>

 </div>

 {/* Form Actions */}
 <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[var(--border-glass)] justify-between items-center">
 
 <button
 type="button"
 onClick={handleReset}
 className="w-full sm:w-auto flex items-center justify-center gap-2 border border-red-500/30 hover:border-red-500/80 text-red-400 font-bold py-2.5 px-5 rounded-xl text-xs transition duration-200"
 >
 <RefreshCw className="w-4 h-4" /> Reset Local Cache
 </button>

 <button
 type="submit"
 className="w-full sm:w-auto glass-button !bg-[var(--text-main)] !text-[var(--bg-base)] border border-[var(--border-glass)] hover:!bg-[var(--text-muted)] font-bold py-3 px-6 rounded-xl text-xs transition duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-sm"
 >
 <Save className="w-4 h-4" /> Save Settings
 </button>
 </div>

 </form>
 </div>
 </div>
 );
}
