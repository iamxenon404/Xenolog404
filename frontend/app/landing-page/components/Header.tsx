'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession, signOut } from 'next-auth/react';
import { Webhook, Github, LogOut, Star, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();
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
    <header className="w-full max-w-[750px] mx-auto px-6 py-6 flex items-center justify-between border-b border-zinc-900 relative">
      {/* LEFT: LOGO */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-white text-black">
          <Webhook className="w-4 h-4" />
        </div>
        <span className="text-sm font-black tracking-tighter italic uppercase text-white">
          XenLog<span className="text-indigo-500">404</span>
        </span>
      </div>

      {/* CENTER: LIVE STAR CHIP */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden sm:block">
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-950/40 hover:border-indigo-500/30 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all group"
        >
          <Star className="w-3 h-3 text-indigo-500 group-hover:text-amber-400 group-hover:rotate-12 transition-all" />
          <span>Star on GitHub</span>
          <span className="font-mono text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
            {stars !== null ? stars : '0'}
          </span>
          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>

      {/* RIGHT: AUTH ACTIONS */}
      <div>
        {session ? (
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 font-mono">{session.user?.name}</span>
            <button 
              onClick={() => signOut()}
              className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-rose-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn('github')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-black uppercase tracking-widest transition-all hover:bg-zinc-200 active:scale-[0.98]"
          >
            <Github className="w-3.5 h-3.5" />
            Connect
          </button>
        )}
      </div>
    </header>
  );
}