'use client';

import { useState } from 'react';
import { Terminal, Radio, LayoutGrid, Trash2, Loader2 } from 'lucide-react';

interface Endpoint {
  id: string;
  url: string;
}

interface SidebarProps {
  endpoints: Endpoint[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  // 🍏 Pass down state setters to clean up elements dynamically
  setEndpoints: React.Dispatch<React.SetStateAction<Endpoint[]>>;
  userUID: string | null;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export default function Sidebar({ endpoints, selectedId, onSelect, setEndpoints, userUID }: SidebarProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // 🍏 Prevent triggering onSelect when clicking the trash icon
    
    if (!confirm("Are you sure you want to terminate this node link? This wipes all intercepted history logs permanently.")) {
      return;
    }

    // Guest Mode local lifecycle cleanup
    if (!userUID || userUID === 'guest_session') {
      const activeGuests = endpoints.filter(ep => ep.id !== id);
      setEndpoints(activeGuests);
      localStorage.setItem('xen_guest_endpoints', JSON.stringify(activeGuests));
      return;
    }

    // Authenticated Account persistence layer cleanup
    setDeletingId(id);
    try {
      const res = await fetch(`${BACKEND_URL}/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userUID })
      });

      if (res.ok) {
        setEndpoints((prev) => prev.filter(ep => ep.id !== id));
      } else {
        alert("Failed to drop node segment execution layer.");
      }
    } catch (err) {
      console.error("Deletion communication pipeline dropped:", err);
    } finally {
      setDeletingId(null);
    }
  };

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
                
                {/* INTERACTIVE ACTIONS BOX */}
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {isActive && !isDeleting && (
                    <Radio className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                  )}

                  <button
                    disabled={isDeleting}
                    onClick={(e) => handleDelete(e, ep.id)}
                    className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 dark:hover:bg-rose-500/20 transition-all"
                    title="Purge Node Layout"
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