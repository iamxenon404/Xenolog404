'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Github, Terminal, Activity, ShieldAlert, Cpu } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';

interface HeroProps {
  onEnterGuest: () => void;
}

export default function Hero({ onEnterGuest }: HeroProps) {
  const { data: session } = useSession();
  const [mountedTime, setMountedTime] = useState<string>('');

  useEffect(() => {
    setMountedTime(new Date().toLocaleTimeString());
  }, []);

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-12 px-4 sm:px-6 pt-16 pb-24 max-w-[850px] mx-auto relative z-10 text-left">
      
      {/* LEFT SIDE: PREMIUM TYPOGRAPHY & CTA */}
      <div className="flex-1 flex flex-col items-start max-w-md">
        {/* INTERACTIVE GLOW BADGE */}
        <div className="mb-6 flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-[10px] font-mono tracking-wider text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
          <Activity className="w-3 h-3 text-indigo-400 animate-pulse" />
          <span>SYS_STATUS // EDGE_STREAM_READY</span>
        </div>

        {/* HIGH-CONTRAST GRADIENT HEADLINE */}
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-[0.95] mb-5">
          Catch Webhooks.
          <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 font-extrabold drop-shadow-[0_2px_10px_rgba(99,102,241,0.2)]">
            Zero Latency.
          </span>
        </h1>

        {/* SUBTITLE */}
        <p className="text-zinc-400 text-xs sm:text-sm font-medium leading-relaxed mb-8">
          An elite, privacy-first webhook inspector. Stream raw HTTP incoming payloads over the live internet with no cookies, zero third-party tracking, and automatic 24-hour memory purges.
        </p>

        {/* INTERACTION HUB */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs justify-start relative z-20">
          <button
            onClick={onEnterGuest}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_4px_20px_rgba(99,102,241,0.25)] active:scale-[0.98] border border-indigo-400/20"
          >
            Open Guest HUD
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {!session ? (
            <button
              onClick={() => signIn('github')}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-[10px] font-black uppercase tracking-widest transition-all border border-zinc-800 hover:border-zinc-700 active:scale-[0.98]"
            >
              <Github className="w-3.5 h-3.5 text-zinc-400" />
              Sync GitHub
            </button>
          ) : (
            <div className="flex items-center justify-center px-5 py-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase tracking-widest select-none shadow-[0_0_10px_rgba(16,185,129,0.05)]">
              ● LINK_ACTIVE
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: HIGH-FIDELITY IDE CODE TERMINAL */}
      <div className="w-full lg:w-[380px] shrink-0 rounded-xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl text-left font-mono text-[11px] overflow-hidden tracking-normal shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group hover:border-indigo-500/30 transition-all duration-300">
        
        {/* Hidden internal glow effect on hover */}
        <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Top Navigation Control Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-zinc-800/80 relative z-10">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[9px] font-bold text-zinc-300 tracking-wider">XEN_CONSOLE // FEED</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/40" />
            <span className="w-2 h-2 rounded-full bg-amber-500/40" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
        
        {/* Terminal Live Workspace Body */}
        <div className="p-4 space-y-4 overflow-x-auto leading-relaxed relative z-10">
          
          {/* Request Header Block */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-zinc-500 border-b border-zinc-900 pb-1">
              <span>METRIC</span>
              <span>VALUE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Method:</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">POST</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Endpoint:</span>
              <span className="text-zinc-300 font-medium">/api/v1/node_404</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Latency:</span>
              <span className="text-indigo-400 font-bold">0.42 ms</span>
            </div>
          </div>

          {/* Raw JSON Payload Block */}
          <div className="space-y-1.5 pt-2 border-t border-zinc-900">
            <div className="flex items-center justify-between text-[10px] text-zinc-500">
              <span>INCOMING_PAYLOAD</span>
              <span className="text-zinc-600 text-[9px]">{mountedTime || '--:--:--'}</span>
            </div>
            
            <div className="text-zinc-400 bg-black/40 p-3 rounded-lg border border-zinc-900 font-medium font-mono text-[10.5px]">
              <div>{"{"}</div>
              <div className="pl-4"><span className="text-indigo-400">"event"</span>: <span className="text-amber-300">"stripe.charge.succeeded"</span>,</div>
              <div className="pl-4"><span className="text-indigo-400">"livemode"</span>: <span className="text-emerald-400">true</span>,</div>
              <div className="pl-4">
                <span className="text-indigo-400">"data"</span>: {"{"}
                <span className="text-zinc-500 font-light"> "amount": 4900, "currency": "usd" </span>
                {"}"}
              </div>
              <div>{"}"}</div>
            </div>
          </div>

          {/* Connection Footer Meta */}
          <div className="flex items-center gap-4 text-[9px] text-zinc-600 pt-1">
            <div className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-zinc-600" />
              <span>TLS_1.3</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 text-zinc-600" />
              <span>IP_MASKED</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}