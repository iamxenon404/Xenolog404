'use client';

import { ArrowRight, Github, Terminal } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';

interface HeroProps {
  onEnterGuest: () => void;
}

export default function Hero({ onEnterGuest }: HeroProps) {
  const { data: session } = useSession();

  return (
    <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-12 pb-20 max-w-[750px] mx-auto relative z-10">
      
      {/* GLOWING ACTION BADGE */}
      <div className="mb-6 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-[9px] font-mono tracking-[0.2em] uppercase text-indigo-400 shadow-sm shadow-indigo-500/5 animate-pulse">
        ⚡ Sub-Millisecond Payload Capture
      </div>

      {/* HEADLINE */}
      <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95] mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
        Catch Webhooks.<br />Zero Bloat.
      </h1>

      {/* SUBTITLE */}
      <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm font-medium leading-relaxed mb-10 max-w-md">
        An elite, privacy-first webhook inspector. Inspect raw HTTP incoming payloads over the live internet with no trackers, no tracking scripts, and no database hoarding.
      </p>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-sm justify-center mb-16 relative z-20">
        <button
          onClick={onEnterGuest}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-[10px] font-black uppercase tracking-widest transition-all border border-zinc-800 hover:border-zinc-700 active:scale-[0.98] shadow-lg shadow-black"
        >
          Open Guest HUD
          <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
        </button>

        {!session ? (
          <button
            onClick={() => signIn('github')}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest transition-all hover:bg-zinc-100 hover:scale-[1.01] active:scale-[0.98] shadow-lg"
          >
            <Github className="w-3.5 h-3.5" />
            Sync GitHub
          </button>
        ) : (
          <div className="flex items-center justify-center px-6 py-3.5 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-indigo-400 text-[10px] font-mono uppercase tracking-widest select-none">
            ● Profile_Linked
          </div>
        )}
      </div>

      {/* VISUAL CENTERPIECE: MOCK CONTAINER (Builds high trust instantly) */}
      <div className="w-full rounded-xl border border-zinc-900 bg-zinc-950/20 backdrop-blur-sm text-left font-mono text-[11px] text-zinc-500 overflow-hidden shadow-2xl shadow-indigo-500/[0.02]">
        {/* Top Window Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 border-b border-zinc-900">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-[10px] text-zinc-400 tracking-wider font-bold">LIVE_STREAM_LOG</span>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-zinc-800" />
            <span className="w-2 h-2 rounded-full bg-zinc-800" />
            <span className="w-2 h-2 rounded-full bg-indigo-500/40" />
          </div>
        </div>
        
        {/* Mock Code Block */}
        <div className="p-4 space-y-2 overflow-x-auto leading-normal whitespace-nowrap">
          <div><span className="text-emerald-500 font-bold">POST</span> <span className="text-zinc-300">https://xenlog404.com/api/v1/node_404</span> <span className="text-zinc-600">200 OK</span></div>
          <div className="text-zinc-600">{"{"}</div>
          <div className="pl-4"><span className="text-indigo-400">"event"</span>: <span className="text-amber-300">"payment.succeeded"</span>,</div>
          <div className="pl-4"><span className="text-indigo-400">"timestamp"</span>: <span className="text-zinc-400">{new Date().toISOString()}</span>,</div>
          <div className="pl-4"><span className="text-indigo-400">"secure_handshake"</span>: <span className="text-emerald-400">true</span></div>
          <div className="text-zinc-600">{"}"}</div>
        </div>
      </div>

    </section>
  );
}