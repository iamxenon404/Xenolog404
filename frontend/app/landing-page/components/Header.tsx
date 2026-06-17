'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Webhook, Github, LogOut, Star, ArrowUpRight, Loader2 } from 'lucide-react';

export default function Header() {
  const { data: session, status } = useSession();
  const [stars, setStars] = useState<number | null>(null);

  const REPO_URL = "https://github.com/iamxenon404/Xenolog404";
  const API_URL = "https://api.github.com/repos/iamxenon404/Xenolog404";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => setStars(null));
  }, []);

  return (
    /* FIXED BAR CONTAINER WITH GLASSMORPHISM AND MATCHED DASHBOARD BACKGROUND PALETTE */
    <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-100/70 dark:bg-[#000000]/70 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-900/80 transition-colors duration-700">
      <header className="w-full max-w-[750px] mx-auto px-4 sm:px-6 py-5 flex items-center justify-between relative">
        
        {/* LEFT: LOGO */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black shadow-sm">
            <Webhook className="w-4 h-4" />
          </div>
          <span className="text-sm font-black tracking-tighter italic uppercase text-zinc-900 dark:text-white">
            XenLog<span className="text-indigo-600 dark:text-indigo-500">404</span>
          </span>
        </div>

        {/* CENTER: LIVE STAR CHIP */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-200/40 dark:bg-zinc-950/40 hover:border-indigo-500/30 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all group"
          >
            <Star className="w-3 h-3 text-indigo-500 group-hover:text-amber-400 group-hover:rotate-12 transition-all" />
            <span className="hidden sm:inline">Star on GitHub</span>
            <span className="font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-200 dark:bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-300 dark:border-zinc-800 text-[9px] sm:text-[10px]">
              {stars !== null ? stars : '0'}
            </span>
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
          </a>
        </div>

        {/* RIGHT: LIVE AUTH ACTIONS */}
        <div className="shrink-0">
          {status === "loading" ? (
            <div className="flex items-center justify-center p-2 rounded-xl bg-zinc-500/10 border border-zinc-500/20">
              <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />
            </div>
          ) : session ? (
            /* ACTIVE SESSION HUD CHIP */
            <div className="flex items-center gap-2 bg-zinc-200/60 dark:bg-zinc-900/40 border border-zinc-300/50 dark:border-white/5 pl-1.5 pr-2 py-1 rounded-xl text-[10px] font-black tracking-wider shadow-sm transition-all hover:border-zinc-400 dark:hover:border-white/10 group/user">
              <img 
                src={session.user?.image || ""} 
                alt="Avatar" 
                className="w-5 h-5 rounded-lg border border-zinc-300 dark:border-white/20 shadow-sm"
              />
              <span className="hidden md:inline text-zinc-900 dark:text-white uppercase tracking-tight text-[9px] truncate max-w-[60px]">
                {session.user?.name?.split(' ')[0]}
              </span>
              <button 
                onClick={() => signOut()}
                title="Disconnect"
                className="p-1 rounded-md text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 dark:hover:bg-rose-500/20 transition-all active:scale-95"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            /* ACTIVE SIGN IN HANDSHAKE */
            <button
              onClick={() => signIn('github')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.98] shadow-sm group/btn"
            >
              <Github className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform" />
              Connect
            </button>
          )}
        </div>
      </header>
    </div>
  );
}