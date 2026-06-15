'use client';

import { ArrowRight, Github } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';

interface HeroProps {
  onEnterGuest: () => void;
}

export default function Hero({ onEnterGuest }: HeroProps) {
  const { data: session } = useSession();

  return (
    <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-12 pb-20 max-w-[750px] mx-auto relative z-10">
      
      {/* MONOCHROME SYSTEM BADGE */}
      <div className="mb-6 px-3 py-1 rounded-md border border-zinc-800 bg-zinc-950 text-[9px] font-mono tracking-[0.25em] uppercase text-zinc-400">
        SYS_STATUS // LATENCY_SUB_MS
      </div>

      {/* HEADLINE */}
      <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95] mb-6 bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent">
        Catch Webhooks.<br />Zero Bloat.
      </h1>

      {/* SUBTITLE */}
      <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm font-medium leading-relaxed mb-10 max-w-md">
        An elite, privacy-first webhook inspector. Inspect raw HTTP incoming payloads over the live internet with no trackers, no background telemetry, and no database hoarding.
      </p>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-sm justify-center mb-16 relative z-20">
        <button
          onClick={onEnterGuest}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-[10px] font-black uppercase tracking-widest transition-all border border-zinc-800 hover:border-zinc-700 active:scale-[0.98]"
        >
          Open Guest HUD
          <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
        </button>

        {!session ? (
          <button
            onClick={() => signIn('github')}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest transition-all hover:bg-zinc-100 active:scale-[0.98]"
          >
            <Github className="w-3.5 h-3.5" />
            Sync GitHub
          </button>
        ) : (
          <div className="flex items-center justify-center px-6 py-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 text-[10px] font-mono uppercase tracking-widest select-none">
            [ STATUS_CONNECTED ]
          </div>
        )}
      </div>

      {/* UPGRADED ULTRA-CLEAN LIVE LOG WINDOW */}
      <div className="w-full rounded-lg border border-zinc-900 bg-[#050505] text-left font-mono text-[11px] text-zinc-500 overflow-hidden tracking-normal">
        
        {/* Top Minimal Utility Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#09090b] border-b border-zinc-900">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-bold text-zinc-500 tracking-[0.15em]">CONSOLE // INSTANT_FEED</span>
            <div className="h-2 w-[1px] bg-zinc-800" />
            <span className="text-[9px] text-zinc-600">ID: NODE_404_ALPHA</span>
          </div>
          <div className="text-[9px] text-zinc-600 font-bold tracking-widest uppercase">
            STREAMING_ACTIVE
          </div>
        </div>
        
        {/* Code Grid Layout */}
        <div className="p-5 space-y-3 overflow-x-auto leading-relaxed whitespace-nowrap bg-gradient-to-b from-transparent to-zinc-950/10">
          
          {/* Log Entry 1 */}
          <div className="flex items-start gap-4">
            <span className="text-zinc-700 select-none text-[10px]">01</span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-zinc-900 text-zinc-300 border border-zinc-800">POST</span>
              <span className="text-zinc-300 font-medium">/api/v1/incoming</span>
              <span className="text-zinc-600">→ status:</span>
              <span className="text-zinc-400">200_ok</span>
              <span className="text-zinc-700 font-light">[{new Date().toLocaleTimeString()}]</span>
            </div>
          </div>

          {/* Log Entry 2 (JSON Detail Breakout) */}
          <div className="flex items-start gap-4 border-t border-zinc-900/60 pt-3">
            <span className="text-zinc-700 select-none text-[10px]">02</span>
            <div className="space-y-1 w-full text-zinc-400">
              <div><span className="text-zinc-600">Headers:</span> <span className="text-zinc-500">{"{ 'content-type': 'application/json' }"}</span></div>
              <div className="text-zinc-600">Payload:</div>
              <div className="pl-4 text-zinc-500 bg-zinc-950/50 p-2.5 rounded border border-zinc-900 max-w-fit font-medium">
                <div>{"{"}</div>
                <div className="pl-4"><span className="text-zinc-400">"event"</span>: <span className="text-zinc-300">"checkout.session.completed"</span>,</div>
                <div className="pl-4"><span className="text-zinc-400">"livemode"</span>: <span className="text-zinc-300">true</span>,</div>
                <div className="pl-4"><span className="text-zinc-400">"currency"</span>: <span className="text-zinc-300">"usd"</span></div>
                <div>{"}"}</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}