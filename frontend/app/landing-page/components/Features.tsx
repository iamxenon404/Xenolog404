'use client';

import { Zap, Shield, RefreshCw } from 'lucide-react';

export default function Features() {
  const items = [
    {
      title: "Sub-Second Ingestion",
      desc: "Engineered with a lightweight SQLite storage layer to capture and display concurrent incoming webhook payloads without drop or delay.",
      icon: Zap
    },
    {
      title: "Zero Payload Tracking",
      desc: "Absolute telemetry privacy. We do not drop identification cookies, store client metadata, or read inside your custom header parameters.",
      icon: Shield
    },
    {
      title: "Ephemeral Data Purge",
      desc: "Transient log routing. Your generated guest endpoint channels and inspected request histories automatically scrub clean after 24 hours.",
      icon: RefreshCw
    }
  ];

  return (
    <section className="w-full max-w-[850px] mx-auto px-8 py-20 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-zinc-900">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex flex-col items-center sm:items-start p-6 rounded-xl bg-zinc-950/30 border border-zinc-900 text-center sm:text-left min-h-[180px] justify-start">
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