'use client';

import { ArrowUpRight, FolderGit2, Github, Play, User, Terminal, ArrowRight, Loader2 } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';

interface ProjectsProps {
  onEnterGuest: () => void;
}

export default function Projects({ onEnterGuest }: ProjectsProps) {
  const { data: session, status } = useSession();

  return (
    <section className="w-full max-w-[850px] mx-auto px-8 py-24 border-t border-zinc-200 dark:border-zinc-900/60 mt-12 text-left transition-colors duration-700">
      
      {/* SECTION HEADER */}
      <div className="flex items-center gap-2 mb-12">
        <FolderGit2 className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
        <h2 className="text-[11px] font-black uppercase text-zinc-500 dark:text-zinc-400 tracking-[0.3em] font-mono">XenLog_Nodes</h2>
      </div>

      {/* ASYMMETRIC LAYOUT SPLIT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: DENSE EXTERNAL PORTALS (4 Columns) */}
        <div className="md:col-span-4 space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-600 mb-2 px-1">
            // External_Profiles
          </div>
          
          {/* GITHUB PORTAL */}
          <a 
            href="https://github.com/iamxenon404/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/40 hover:border-zinc-300 dark:hover:border-zinc-800 transition-all cursor-pointer shadow-sm dark:shadow-none"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg group-hover:border-indigo-500/30 transition-colors">
                <Github className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-zinc-900 dark:text-white">GitHub</h3>
                <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">Source repositories</span>
              </div>
            </div>
            <ArrowUpRight className="w-3 h-3 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* PORTFOLIO PORTAL */}
          <a 
            href="https://xenon404.vercel.app" 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/40 hover:border-zinc-300 dark:hover:border-zinc-800 transition-all cursor-pointer shadow-sm dark:shadow-none"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg group-hover:border-indigo-500/30 transition-colors">
                <User className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-zinc-900 dark:text-white">Portfolio</h3>
                <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">System blueprints</span>
              </div>
            </div>
            <ArrowUpRight className="w-3 h-3 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </div>

        {/* RIGHT COLUMN: ACTION STACK WITH TWO BUTTONS */}
        <div className="md:col-span-8">
          
          {/* DEPLOYMENT PANEL SECTION */}
          <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/20 space-y-6 relative overflow-hidden group shadow-sm dark:shadow-none">
            <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-zinc-300 dark:text-zinc-800 tracking-widest hidden sm:block">
              XEN_INGEST_01
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Terminal className="w-3.5 h-3.5" />
                <span>Interceptor Protocol</span>
              </div>
              <h3 className="text-lg font-black tracking-tight text-zinc-900 dark:text-white uppercase font-mono">
                Launch Live Webhook Dashboard
              </h3>
              <p className="text-[12px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                Ready to stop guessing what your third-party APIs are sending? Generate a unique, transient HTTP intercept URL instantly. Pipe in your inbound JSON payloads, stream headers over zero-latency web sockets, and inspect nested structures in real time.
              </p>
            </div>

            {/* DUAL ACTION BUTTON SYSTEM */}
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-start relative z-20">
              
              {/* PRIMARY WORKSPACE LINK */}
              <button 
                onClick={onEnterGuest}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black text-[11px] font-mono font-black uppercase tracking-wider transition-all active:scale-[0.98] shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {session ? 'Open Dashboard Console' : 'Open Guest HUD'}
              </button>

              {/* SECONDARY AUTH SWITCH */}
              {status === "loading" ? (
                <div className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-400 text-[11px] font-mono font-black border border-zinc-200 dark:border-zinc-800/80 min-w-[140px]">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Checking System Node...
                </div>
              ) : session ? (
                /* ALREADY IN: BACKUP ROUTE TO DASHBOARD */
                <button
                  onClick={onEnterGuest}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-mono font-black uppercase tracking-wider transition-all active:scale-[0.98] shadow-md group/proj-dash"
                >
                  Go to Dashboard
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover/proj-dash:translate-x-0.5 transition-transform" />
                </button>
              ) : (
                /* OFFLINE: RUN LOGIN FLOW */
                <button
                  onClick={() => signIn('github')}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[11px] font-mono font-black uppercase tracking-wider transition-all border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 active:scale-[0.98]"
                >
                  <Github className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                  Sync GitHub
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}