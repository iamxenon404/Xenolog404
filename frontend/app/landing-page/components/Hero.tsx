'use client';

import { ArrowRight, Github } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';

interface HeroProps {
  onEnterGuest: () => void;
}

export default function Hero({ onEnterGuest }: HeroProps) {
  const { data: session } = useSession();

  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-20 max-w-[600px] mx-auto">
      {/* BADGE */}
      <div className="mb-6 px-3 py-1 rounded-full border border-indigo-500/10 bg-indigo-500/5 text-[9px] font-mono tracking-[0.2em] uppercase text-indigo-400">
        ⚡ Sub-Millisecond Payload Capture
      </div>

      {/* HEADLINE */}
      <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-none mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
        Catch Webhooks.<br />Zero Bloat.
      </h1>

      {/* SUBTITLE */}
      <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm font-medium leading-relaxed mb-10 max-w-sm">
        An elite, privacy-first webhook inspector. Inspect raw HTTP incoming payloads over the live internet with no trackers and no database hoarding.
      </p>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs justify-center">
        <button
          onClick={onEnterGuest}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-[10px] font-black uppercase tracking-widest transition-all border border-zinc-800 active:scale-[0.98]"
        >
          Open Guest HUD
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {!session && (
          <button
            onClick={() => signIn('github')}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest transition-all hover:bg-zinc-200 active:scale-[0.98]"
          >
            <Github className="w-3.5 h-3.5" />
            Sync GitHub
          </button>
        )}
      </div>
    </section>
  );
}