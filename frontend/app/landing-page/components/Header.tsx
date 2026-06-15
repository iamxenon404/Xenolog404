'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession, signOut } from 'next-auth/react';
import { Webhook, Github, LogOut, Star } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();
  const [stars, setStars] = useState<number | null>(null);

  // REPLACE WITH YOUR ACTUAL GITHUB USERNAME AND REPO NAME
  const REPO_URL = "https://github.com/your-username/xenlog404";
  const API_URL = "https://api.github.com/repos/your-username/xenlog404";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => setStars(null)); // Fallback gracefully if rate-limited
  }, []);

  return (
    <header className="w-full max-w-[750px] mx-auto px-6 py-6 flex items-center justify-between border-b border-zinc-900/60">
      {/* BRAND & REPO AREA */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white text-black shadow-lg shadow-indigo-500/5">
            <Webhook className="w-4 h-4" />
          </div>
          <span className="text-sm font-black tracking-tighter italic uppercase text-white">
            XenLog<span className="text-indigo-500">404</span>
          </span>
        </div>

        {/* REPO CHIP */}
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800/80 text-[10px] font-mono text-zinc-400 hover:text-white transition-all group active:scale-95 shadow-sm"
        >
          <Github className="w-3 h-3 text-zinc-500 group-hover:text-white transition-colors" />
          <Star className="w-3 h-3 text-amber-500 fill-amber-500/20" />
          <span>{stars !== null ? stars : '—'}</span>
        </a>
      </div>

      {/* AUTH ACTIONS */}
      <div>
        {session ? (
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 font-mono tracking-tight">{session.user?.name}</span>
            <button 
              onClick={() => signOut()}
              title="Disconnect Node"
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-500 hover:bg-rose-500/5 transition-all active:scale-95"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn('github')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-black uppercase tracking-widest transition-all hover:bg-zinc-200 active:scale-[0.98] shadow-sm shadow-white/5"
          >
            <Github className="w-3.5 h-3.5" />
            Connect
          </button>
        )}
      </div>
    </header>
  );
}