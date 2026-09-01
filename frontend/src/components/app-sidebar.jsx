import React from 'react';
import {
 Calendar, Home, User, Briefcase, FileText, BrainCog,
 Settings, HelpCircle, LogOut, BookOpen, Trophy, Users, Sparkles
} from "lucide-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
 Sidebar,
 SidebarContent,
 SidebarGroup,
 SidebarGroupContent,
 SidebarGroupLabel,
 SidebarMenu,
 SidebarMenuButton,
 SidebarMenuItem,
} from "@/components/ui/sidebar";

const mainItems = [
 { title: "Dashboard", url: "/app", icon: Home },
 { title: "Learn DSA", url: "/app/dsa", icon: BookOpen },
 { title: "Mock Interview", url: "/app/interview", icon: BrainCog },
 { title: "Contests", url: "/app/contests", icon: Calendar },
 { title: "Battle Arena", url: "/app/aptitude", icon: HelpCircle },
 { title: "Jobs", url: "/app/job", icon: Briefcase },
 { title: "Alumni", url: "/app/alumni", icon: Users },
];

const generalItems = [
 { title: "Profile", url: "/app/profile", icon: User },
 { title: "Settings", url: "/app/settings", icon: Settings },
];

export default function AppSidebar() {
 const location = useLocation();
 const navigate = useNavigate();

 const handleLogout = (e) => {
 e.preventDefault();
 localStorage.clear();
 navigate("/");
 };

 return (
 <Sidebar className="relative h-full md:py-4 md:pl-4 md:pr-2 md:w-[260px] border-0 !bg-transparent">
 <div className="glass-panel h-full flex flex-col border border-[var(--border-glass)] !bg-[var(--bg-glass)] shadow-2xl md:rounded-2xl overflow-hidden backdrop-blur-2xl w-full">
 <SidebarContent className="flex flex-col h-full bg-transparent">
 
 {/* Logo */}
 <div className="flex items-center gap-3 px-6 py-6 mb-2">
 <div className="w-8 h-8 rounded-full bg-[var(--bg-glass-hover)] border border-[var(--border-glass)] flex items-center justify-center shrink-0">
 <Sparkles className="w-4 h-4 text-[var(--text-main)]" />
 </div>
 <span className="font-extrabold text-[var(--text-main)] tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400 dark:from-white dark:to-gray-300 whitespace-nowrap">
 Battle Arena
 </span>
 </div>
 
 <div className="flex-grow overflow-y-auto custom-scrollbar px-2 space-y-6">
 {/* Main menu */}
 <SidebarGroup>
 <SidebarGroupLabel className="px-4 py-2 text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">
 Main Menu
 </SidebarGroupLabel>
 <SidebarGroupContent>
 <SidebarMenu className="space-y-1">
 {mainItems.map((item) => {
 const isActive = location.pathname === item.url;
 return (
 <SidebarMenuItem key={item.title}>
 <SidebarMenuButton asChild>
 <Link
 to={item.url}
 className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden group ${
 isActive
 ? "bg-[var(--bg-glass-hover)] text-[var(--text-main)] shadow-sm border border-[var(--border-glass)]"
 : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-glass-hover)]"
 }`}
 >
 {isActive && (
 <motion.div 
 layoutId="active-nav"
 className="absolute left-0 top-0 w-1 h-full bg-white rounded-r-md"
 />
 )}
 <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? "text-[var(--text-main)]" : ""}`} />
 <span className="text-sm font-semibold">{item.title}</span>
 </Link>
 </SidebarMenuButton>
 </SidebarMenuItem>
 );
 })}
 </SidebarMenu>
 </SidebarGroupContent>
 </SidebarGroup>
 
 {/* General menu */}
 <SidebarGroup>
 <SidebarGroupLabel className="px-4 py-2 text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">
 General
 </SidebarGroupLabel>
 <SidebarGroupContent>
 <SidebarMenu className="space-y-1">
 {generalItems.map((item) => {
 const isActive = location.pathname === item.url;
 return (
 <SidebarMenuItem key={item.title}>
 <SidebarMenuButton asChild>
 <Link
 to={item.url}
 className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${
 isActive
 ? "bg-[var(--bg-glass-hover)] text-[var(--text-main)] shadow-inner"
 : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-glass-hover)]"
 }`}
 >
 <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
 <span className="text-sm font-semibold">{item.title}</span>
 </Link>
 </SidebarMenuButton>
 </SidebarMenuItem>
 );
 })}
 </SidebarMenu>
 </SidebarGroupContent>
 </SidebarGroup>
 </div>
 
 {/* Logout button */}
 <div className="mt-auto p-4 border-t border-[var(--border-glass)]">
 <button
 onClick={handleLogout}
 className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 border border-red-500/20 hover:border-red-500/40 transition-all font-bold text-sm cursor-pointer"
 >
 <LogOut className="w-4 h-4" />
 <span>Log Out</span>
 </button>
 </div>
 
 </SidebarContent>
 </div>
 </Sidebar>
 );
}