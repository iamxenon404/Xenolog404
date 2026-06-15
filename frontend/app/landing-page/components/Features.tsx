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
    <section className="w-full max-w-[750px] mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-zinc-900">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex flex-col items-center sm:items-start p-4 rounded-xl bg-zinc-950/30 border border-zinc-900 text-center sm:text-left">
            <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg mb-3">
              <Icon className="w-4 h-4 text-indigo-500" />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-wider text-white mb-1">
              {item.title}
            </h3>
            <p className="text-[11px] text-zinc-500 leading-normal font-medium">
              {item.desc}
            </p>
          </div>
        );
      })}
    </section>
  );
}