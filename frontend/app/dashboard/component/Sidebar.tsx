'use client';

import { Terminal, Radio, LayoutGrid } from 'lucide-react';

interface Endpoint {
  id: string;
  url: string;
}

interface SidebarProps {
  endpoints: Endpoint[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function Sidebar({ endpoints, selectedId, onSelect }: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 h-screen bg-zinc-50 dark:bg-[#030303] border-r border-zinc-200 dark:border-white/5 flex flex-col z-20 relative">
      <div className="p-6 border-b border-zinc-200 dark:border-white/5 flex items-center gap-2">
        <LayoutGrid className="w-4 h-4 text-indigo-500" />
        <h2 className="text-[10px] font-black tracking-[0.3em] text-zinc-400 dark:text-zinc-500 uppercase">
          Terminal_Cluster
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {endpoints.length === 0 ? (
          <div className="py-8 text-center text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-600">
            No Saved Interfaces
          </div>
        ) : (
          endpoints.map((ep) => {
            const isActive = ep.id === selectedId;
            return (
              <button
                key={ep.id}
                onClick={() => onSelect(ep.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-300 group ${
                  isActive
                    ? 'bg-white dark:bg-[#0c0c0c] border-indigo-500 text-zinc-900 dark:text-white shadow-md'
                    : 'bg-transparent border-transparent hover:bg-zinc-200/50 dark:hover:bg-white/[0.02] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-1.5 rounded-lg border transition-colors ${
                    isActive ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-500' : 'bg-zinc-100 dark:bg-white/5 border-transparent text-zinc-400'
                  }`}>
                    <Terminal className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate flex flex-col">
                    <span className="font-mono text-xs font-bold tracking-tight">
                      {ep.id.slice(0, 12)}...
                    </span>
                    <span className="text-[9px] uppercase tracking-wider opacity-60 font-semibold mt-0.5">
                      Node Segment
                    </span>
                  </div>
                </div>
                
                {isActive && (
                  <Radio className="w-3.5 h-3.5 text-indigo-500 animate-pulse shrink-0" />
                )}
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}