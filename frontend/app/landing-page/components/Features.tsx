'use client';

import { Zap, Shield, RefreshCw } from 'lucide-react';

export default function Features() {
  const items = [
    {
      title: "Blazing Speed",
      desc: "Optimized SQLite engine layer for instant sub-second log streams.",
      icon: Zap
    },
    {
      title: "Zero Tracking",
      desc: "We don't drop target cookies, store emails, or hoard your custom payloads.",
      icon: Shield
    },
    {
      title: "Auto-Purge",
      desc: "Guest workspace channels automatically clear out after 24 hours of inactivity.",
      icon: RefreshCw
    }
  ];

  return (
    <section className="w-full max-w-[850px] mx-auto px-8 py-20 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-zinc-900">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex flex-col items-center sm:items-start p-6 rounded-xl bg-zinc-950/30 border border-zinc-900 text-center sm:text-left min-h-[160px] justify-start">
            <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg mb-4">
              <Icon className="w-4 h-4 text-indigo-500" />
            </div>
            <h3 className="text-[11px] font-black uppercase tracking-wider text-white mb-2">
              {item.title}
            </h3>
            <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
              {item.desc}
            </p>
          </div>
        );
      })}
    </section>
  );
}