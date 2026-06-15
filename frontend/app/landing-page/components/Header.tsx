'use client';

import { signIn, useSession, signOut } from 'next-auth/react';
import { Webhook, Github, LogOut } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full max-w-[750px] mx-auto px-6 py-6 flex items-center justify-between border-b border-zinc-900">
      {/* BRAND LOGO */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-white text-black">
          <Webhook className="w-4 h-4" />
        </div>
        <span className="text-sm font-black tracking-tighter italic uppercase text-white">
          XenLog<span className="text-indigo-500">404</span>
        </span>
      </div>

      {/* AUTH ACTIONS */}
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