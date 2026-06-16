'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Github, Terminal, Cpu, ShieldAlert, Activity } from 'lucide-react';
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
    <section className="w-full max-w-6xl mx-auto px-6 py-12 relative z-10 text-left transition-colors duration-700">
      
      {/* HEADER MATRIX TRACKING - Status Bar indicator */}
      <div className="flex items-center justify-between border border-zinc-200 dark:border-zinc-900 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-4 py-3 rounded-md mb-12 shadow-sm">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-indigo-600 dark:text-indigo-400">
          <Activity className="w-3 h-3 text-indigo-500 dark:text-indigo-400 animate-pulse" />
          <span>SYS_STATUS // INGESTION_CLUSTER_ONLINE</span>
        </div>
        <div className="flex items-center gap-2 text-[9px] text-zinc-400 dark:text-zinc-600 font-mono">
          <span>SOCKET_TUNNEL // ACTIVE</span>
        </div>
      </div>

      {/* TWO-COLUMN GRID SYSTEM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL: CONTENT CONTROL HUB (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#050505] p-8 rounded-md shadow-sm">
            {/* GRADIENT HEADLINE */}
            <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-[0.95] mb-5 font-mono">
              Catch Webhooks.
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-500 font-extrabold drop-shadow-[0_2px_10px_rgba(99,102,241,0.15)]">
                Zero Latency.
              </span>
            </h1>

            {/* SUBTITLE */}
            <p className="text-zinc-500 dark:text-zinc-500 text-xs sm:text-sm font-medium leading-relaxed mb-8 font-sans">
              An elite, privacy-first webhook inspector. Stream raw HTTP incoming payloads over the live internet with no cookies, zero third-party tracking, and automatic 24-hour memory purges.
            </p>

            {/* INTERACTION ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-start relative z-20">
              <button
                onClick={onEnterGuest}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black text-[11px] font-mono font-black uppercase tracking-wider transition-all active:scale-[0.98] shadow-md"
              >
                Open Guest HUD
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              {/* AUTH ACTIONS COMPONENT (HIDDEN IN GUEST-ONLY OVERRIDES) */}
              {/* {!session ? (
                <button
                  onClick={() => signIn('github')}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[11px] font-mono font-black uppercase tracking-wider transition-all border border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 active:scale-[0.98]"
                >
                  <Github className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                  Sync GitHub
                </button>
              ) : (
                <div className="flex items-center justify-center px-5 py-3 rounded bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono uppercase tracking-widest select-none">
                  LINK_ACTIVE
                </div>
              )} 
              */}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: LIVE RUNTIME FEED (5 Columns) */}
        <div className="lg:col-span-5 w-full rounded-md border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#050505] text-left font-mono text-[11px] overflow-hidden tracking-normal shadow-xl relative group">
          
          {/* Top Header Window Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-900/30 border-b border-zinc-200 dark:border-zinc-900 relative z-10">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">XEN_CONSOLE // FEED</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
          
          {/* Terminal Core Space */}
          <div className="p-4 space-y-4 overflow-x-auto leading-relaxed relative z-10">
            
            {/* Structural Network Grid Row */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-600 border-b border-zinc-100 dark:border-zinc-900 pb-1 tracking-wider">
                <span>METRIC</span>
                <span>VALUE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 dark:text-zinc-500">Method:</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">POST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 dark:text-zinc-500">Endpoint:</span>
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">/v1/intercept_hash</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 dark:text-zinc-500">Latency:</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">0.42 ms</span>
              </div>
            </div>

            {/* Upgraded Data Capture Display Window */}
            <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-900">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-600">
                <span>INCOMING_PAYLOAD</span>
                <span className="text-zinc-400 dark:text-zinc-600 text-[9px] font-bold">{mountedTime || '--:--:--'}</span>
              </div>
              
              <div className="text-zinc-700 dark:text-zinc-400 bg-zinc-50 dark:bg-black/40 p-3 rounded border border-zinc-200 dark:border-zinc-900 font-medium font-mono text-[10.5px]">
                <div>{"{"}</div>
                <div className="pl-4"><span className="text-indigo-600 dark:text-indigo-400">"event"</span>: <span className="text-amber-600 dark:text-amber-300">"stripe.charge.succeeded"</span>,</div>
                <div className="pl-4"><span className="text-indigo-600 dark:text-indigo-400">"livemode"</span>: <span className="text-emerald-600 dark:text-emerald-400">true</span>,</div>
                <div className="pl-4">
                  <span className="text-indigo-600 dark:text-indigo-400">"data"</span>: {"{"}
                  <span className="text-zinc-400 dark:text-zinc-500 font-light"> "amount": 4900, "currency": "usd" </span>
                  {"}"}
                </div>
                <div>{"}"}</div>
              </div>
            </div>

            {/* Metadata Footer Matrix */}
            <div className="flex items-center gap-4 text-[9px] text-zinc-400 dark:text-zinc-600 pt-2 border-t border-zinc-100 dark:border-zinc-900">
              <div className="flex items-center gap-1">
                <Cpu className="w-3 h-3 text-zinc-400 dark:text-zinc-600" />
                <span>TLS_1.3</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-zinc-400 dark:text-zinc-600" />
                <span>PAYLOAD_ENCRYPTED</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}