'use client';

import { useState } from 'react';
import { Menu, X, Layers } from 'lucide-react';
import Dashboard from "./component/Dashboard";
import Sidebar from "./component/Sidebar"; // Keeping sidebar separate and modular

export default function DashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-zinc-100 dark:bg-[#000000] text-zinc-900 dark:text-zinc-400 font-sans overflow-x-hidden">
      
      {/* 1. MOBILE RESPONSIVE TOP HEADER CONTROLLER */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white dark:bg-[#050505] border-b border-zinc-200 dark:border-white/5 relative z-50">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-500 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white">
            Control_Panel
          </span>
        </div>
        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white hover:scale-105 active:scale-95 transition-transform"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* 2. ADAPTIVE SIDEBAR CONTAINER */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-[#050505] md:bg-transparent md:dark:bg-transparent
        border-r border-zinc-200 dark:border-white/5 md:border-none
        transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0 shadow-2xl backdrop-blur-3xl' : '-translate-x-full'}
      `}>
        {/* You can inject endpoints/props right into Sidebar here as needed */}
        <Sidebar 
          endpoints={[]} 
          selectedId={null} 
          onSelect={() => setMobileMenuOpen(false)} // Auto-collapses drawer on selection change
        />
      </aside>

      {/* 3. MOBILE OUTSIDE BLUR OVERLAY */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* 4. MAIN WORKSPACE VIEWPORT */}
      <main className="flex-1 w-full min-w-0 overflow-y-auto">
        <Dashboard />
      </main>

    </div>
  );
}