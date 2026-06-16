'use client';

import { ArrowUpRight, FolderGit2, Github, Coffee, Play, User } from 'lucide-react';

export default function Projects() {
  return (
    <section className="w-full max-w-[850px] mx-auto px-8 py-24 border-t border-zinc-900/60 mt-12">
      
      {/* SECTION HEADER */}
      <div className="flex items-center gap-2 mb-8">
        <FolderGit2 className="w-4 h-4 text-zinc-500" />
        <h2 className="text-[11px] font-black uppercase text-zinc-400 tracking-[0.3em]">Workspace_Hub</h2>
      </div>

      {/* BENTO BOX GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(140px,_auto)]">
        
        {/* CARD 1: GITHUB PORTAL (Large Feature Block - 7 Columns Wide) */}
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group md:col-span-7 md:row-span-2 p-6 rounded-2xl border border-zinc-900 bg-zinc-950/20 hover:border-zinc-800 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <Github className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                  Open Source Codebase
                </h3>
              </div>
              <span className="text-[8px] font-mono uppercase px-2 py-0.5 rounded border bg-emerald-500/5 border-emerald-500/10 text-emerald-400">
                Active
              </span>
            </div>
            <p className="text-[12px] text-zinc-500 leading-relaxed font-medium pr-4">
              Explore my public repositories, track live development logs, and view complete implementation histories for all scripting utilities and backend tools.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-zinc-600 group-hover:text-zinc-400 transition-colors mt-8">
            <span>View My GitHub</span>
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </a>

        {/* CARD 2: PORTFOLIO PORTAL (Compact Block - 5 Columns Wide) */}
        <a 
          href="#" 
          className="group md:col-span-5 md:row-span-2 p-6 rounded-2xl border border-zinc-900 bg-zinc-950/20 hover:border-zinc-800 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                  Portfolio
                </h3>
              </div>
              <span className="text-[8px] font-mono uppercase px-2 py-0.5 rounded border bg-indigo-500/5 border-indigo-500/10 text-indigo-400">
                Online
              </span>
            </div>
            <p className="text-[12px] text-zinc-500 leading-relaxed font-medium">
              Dive straight into core system designs, architecture writeups, and technical proficiencies.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-zinc-600 group-hover:text-zinc-400 transition-colors mt-8">
            <span>Explore Portfolio</span>
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </a>

        {/* CARD 3: GET STARTED ZONE (Balanced Split - 6 Columns Wide) */}
        <div className="md:col-span-6 p-6 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/10 flex flex-col justify-between">
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase font-mono tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
              Deployment Initialization
            </h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Ready to link your workspace parameters? Spin up your clean local space core, pipe in your active context pipelines, and clear your browser clutter.
            </p>
          </div>
          <button className="mt-6 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black text-[11px] font-mono font-black uppercase tracking-wider transition-all active:scale-[0.98]">
            <Play className="w-3.5 h-3.5 fill-current" />
            Launch Environment
          </button>
        </div>

        {/* CARD 4: SUPPORT ZONE (Balanced Split - 6 Columns Wide) */}
        <div className="md:col-span-6 p-6 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/10 flex flex-col justify-between">
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase font-mono tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
              Sustain the Architecture
            </h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              This sandbox runs with zero tracking layers or data hoarding. Consider backing active infrastructure runtimes to keep server operations clean.
            </p>
          </div>
          <a 
            href="https://buymeacoffee.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white text-[11px] font-mono font-bold uppercase tracking-wider transition-all border border-zinc-800 hover:border-zinc-700 active:scale-[0.98]"
          >
            <Coffee className="w-3.5 h-3.5 text-amber-500" />
            Buy Me A Coffee // Support Build
          </a>
        </div>

      </div>

    </section>
  );
}