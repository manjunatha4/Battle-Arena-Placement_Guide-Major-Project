import React from 'react';
import { useTheme } from './ThemeProvider';

export default function Background3D() {
 const { theme } = useTheme();

 return (
 <div className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden">
 {/* Base Gradients */}
 <div 
 className={`absolute inset-0 transition-opacity duration-1000 ${
 theme === 'dark' 
 ? 'opacity-60 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/60 via-[#09090b]/20 to-[#09090b]'
 : 'opacity-50 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-300/50 via-blue-50/10 to-transparent'
 }`}
 />
 <div 
 className={`absolute inset-0 transition-opacity duration-1000 ${
 theme === 'dark'
 ? 'opacity-40 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/40 via-[#09090b]/10 to-transparent'
 : 'opacity-50 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-300/40 via-purple-50/10 to-transparent'
 }`}
 />

 {/* Animated Glowing Orbs */}
 <div className={`absolute top-[20%] left-[15%] w-96 h-96 rounded-full blur-[128px] mix-blend-screen transition-colors duration-1000 ${
 theme === 'dark' ? 'bg-purple-600/30' : 'bg-blue-400/30'
 }`} style={{ animationDuration: '4s' }} />

 <div className={`absolute bottom-[10%] right-[15%] w-[30rem] h-[30rem] rounded-full blur-[128px] mix-blend-screen transition-colors duration-1000 ${
 theme === 'dark' ? 'bg-cyan-600/20' : 'bg-purple-400/30'
 }`} style={{ animationDuration: '6s', animationDelay: '1s' }} />
 </div>
 );
}
