'use client';

import { ArrowUpRight, FolderGit2, Github, Coffee, Play, User } from 'lucide-react';

export default function Projects() {
  return (
    <section className="w-full max-w-[850px] mx-auto px-8 py-24 border-t border-zinc-900/60 mt-12">
      
      {/* SECTION 1: DEV PORTALS (REPLACES THE OLD PROJECT CARDS GRID) */}
      <div className="flex items-center gap-2 mb-8">
        <FolderGit2 className="w-4 h-4 text-zinc-500" />
        <h2 className="text-[11px] font-black uppercase text-zinc-400 tracking-[0.3em]">Developer_Portals</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {/* GITHUB CARD */}
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group block p-6 rounded-xl border border-zinc-900 bg-zinc-950/10 hover:border-zinc-800 transition-all cursor-pointer min-h-[160px] flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-white" />
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                  Open Source Codebase
                </h3>
              </div>
              <span className="text-[8px] font-mono uppercase px-2 py-0.5 rounded border bg-emerald-500/5 border-emerald-500/10 text-emerald-400">
                Active
              </span>
            </div>
            <p className="text-[12px] text-zinc-500 leading-relaxed font-medium pr-4">
              Explore my repositories, track live development contributions, and view implementation histories for all current packages and scripting utilities.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-zinc-600 group-hover:text-zinc-400 transition-colors mt-6">
            <span>View My GitHub</span>
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </a>

        {/* PORTFOLIO CARD */}
        <a 
          href="#" 
          className="group block p-6 rounded-xl border border-zinc-900 bg-zinc-950/10 hover:border-zinc-800 transition-all cursor-pointer min-h-[160px] flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-white" />
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                  Engineering Portfolio
                </h3>
              </div>
              <span className="text-[8px] font-mono uppercase px-2 py-0.5 rounded border bg-indigo-500/5 border-indigo-500/10 text-indigo-400">
                Online
              </span>
            </div>
            <p className="text-[12px] text-zinc-500 leading-relaxed font-medium pr-4">
              Dive into detailed system case studies, architectural breakdowns, core engineering proficiencies, and professional milestones.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-zinc-600 group-hover:text-zinc-400 transition-colors mt-6">
            <span>Explore Portfolio</span>
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </a>
      </div>

      {/* SECTION 2: FULL CONTEXT ACTIONS (CONVERTED FROM PLAIN BUTTONS INTO DETAILED SECTIONS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12 border-t border-zinc-900/40">
        
        {/* GET STARTED ACTION ZONE */}
        <div className="flex flex-col justify-between p-6 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/20">
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase font-mono tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
              Deployment Initialization
            </h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Ready to link your workflow parameters? Spin up your clean local space core, pipe in your active context pipelines, and stop running browser tabs.
            </p>
          </div>
          <button className="mt-6 flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-[11px] font-mono font-black uppercase tracking-wider transition-all active:scale-[0.98]">
            <Play className="w-3.5 h-3.5 fill-current" />
            Launch App Environment
          </button>
        </div>

        {/* SUPPORT / DONATION ZONE */}
        <div className="flex flex-col justify-between p-6 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/20">
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase font-mono tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
              Sustain the Architecture
            </h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              This environment runs completely ad-free with zero telemetry capture layers. Consider backing development infrastructure costs to keep processing runtimes up.
            </p>
          </div>
          <a 
            href="https://buymeacoffee.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white text-[11px] font-mono font-bold uppercase tracking-wider transition-all border border-zinc-800 hover:border-zinc-700 active:scale-[0.98]"
          >
            <Coffee className="w-3.5 h-3.5 text-amber-500" />
            Buy Me A Coffee // Support Build
          </a>
        </div>

      </div>

    </section>
  );
}