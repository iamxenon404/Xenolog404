'use client';

import { useState } from 'react';
import { Terminal, Radio, LayoutGrid, Trash2, Loader2, ShieldAlert, ArrowLeft } from 'lucide-react';

interface Endpoint {
  id: string;
  url: string;
}

interface SidebarProps {
  endpoints: Endpoint[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  setEndpoints: React.Dispatch<React.SetStateAction<Endpoint[]>>;
  userUID: string | null;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export default function Sidebar({ endpoints, selectedId, onSelect, setEndpoints, userUID }: SidebarProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [promptDeleteId, setPromptDeleteId] = useState<string | null>(null);

  const executePurge = async (id: string) => {
    setPromptDeleteId(null);
    
    if (!userUID || userUID === 'guest_session') {
      const activeGuests = endpoints.filter(ep => ep.id !== id);
      setEndpoints(activeGuests);
      localStorage.setItem('xen_guest_endpoints', JSON.stringify(activeGuests));
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`${BACKEND_URL}/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userUID })
      });

      if (res.ok) {
        setEndpoints((prev) => prev.filter(ep => ep.id !== id));
      }
    } catch (err) {
      console.error("Deletion communication pipeline dropped:", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <aside className="w-64 shrink-0 h-screen bg-zinc-50 dark:bg-[#030303] border-r border-zinc-200 dark:border-white/5 flex flex-col z-20 relative overflow-hidden">
      
      {/* CUSTOM OVERLAY POP-UP PROMPT */}
      {promptDeleteId && (
        <div className="absolute inset-0 z-30 bg-white dark:bg-[#030303] flex flex-col justify-between p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="space-y-6 mt-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black tracking-widest text-zinc-900 dark:text-white uppercase italic">
                CRITICAL_OVERRIDE
              </h3>
              <p className="text-[10px] text-zinc-400 font-mono mt-2 leading-relaxed uppercase tracking-wider">
                Terminate segment link <span className="text-indigo-500">{promptDeleteId.slice(0, 8)}</span>? This action purges all captured logs across database clusters.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <button
              onClick={() => executePurge(promptDeleteId)}
              className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-rose-600/10 active:scale-95"
            >
              CONFIRM_PURGE
            </button>
            <button
              onClick={() => setPromptDeleteId(null)}
              className="w-full py-3 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-500 dark:text-zinc-400 font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> ABORT_ACTION
            </button>
          </div>
        </div>
      )}

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
            const isDeleting = deletingId === ep.id;

            return (
              <div
                key={ep.id}
                onClick={() => onSelect(ep.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-300 group cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-[#0c0c0c] border-indigo-500 text-zinc-900 dark:text-white shadow-md'
                    : 'bg-transparent border-transparent hover:bg-zinc-200/50 dark:hover:bg-white/[0.02] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`p-1.5 rounded-lg border transition-colors ${
                    isActive ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-500' : 'bg-zinc-100 dark:bg-white/5 border-transparent text-zinc-400'
                  }`}>
                    <Terminal className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate flex flex-col min-w-0">
                    <span className="font-mono text-xs font-bold tracking-tight truncate">
                      {ep.id.slice(0, 12)}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider opacity-60 font-semibold mt-0.5">
                      Node Segment
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {isActive && !isDeleting && (
                    <Radio className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                  )}

                  <button
                    disabled={isDeleting}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPromptDeleteId(ep.id);
                    }}
                    className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 dark:hover:bg-rose-500/20 transition-all"
                  >
                    {isDeleting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-400" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}