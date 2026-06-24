'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Menu, X, Layers, ShieldAlert, ArrowLeft } from 'lucide-react';
import Dashboard from "./component/Dashboard";
import Sidebar from "./component/Sidebar";

interface Endpoint {
  id: string;
  url: string;
  createdAt?: number;
}

type DashboardPropsType = {
  endpoints: Endpoint[];
  setEndpoints: React.Dispatch<React.SetStateAction<Endpoint[]>>;
  selectedEndpointId: string | null;
  setSelectedEndpointId: React.Dispatch<React.SetStateAction<string | null>>;
  userUID: any;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [selectedEndpointId, setSelectedEndpointId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // 🍏 State lifted up to handle the screen-centered overlay
  const [promptDeleteId, setPromptDeleteId] = useState<string | null>(null);

  const userUID = session ? ((session.user as any).githubId || 'PRO_USER') : 'guest_session';

  // 1. Initial Load: Try restoring Guest links from LocalStorage first
  useEffect(() => {
    if (!session || userUID === 'guest_session') {
      const saved = localStorage.getItem('xen_guest_endpoints');
      if (saved) {
        try {
          const parsed: Endpoint[] = JSON.parse(saved);
          const now = Date.now();
          const oneDayInMs = 24 * 60 * 60 * 1000;

          const activeGuests = parsed.filter(ep => {
            if (!ep.createdAt) return true;
            return now - ep.createdAt < oneDayInMs;
          });

          if (activeGuests.length !== parsed.length) {
            localStorage.setItem('xen_guest_endpoints', JSON.stringify(activeGuests));
          }

          setEndpoints(activeGuests);
          if (activeGuests.length > 0) {
            setSelectedEndpointId(activeGuests[0].id);
          }
        } catch (e) {
          console.error("Failed parsing cached guest links", e);
        }
      }
    }
  }, [session, userUID]);

  // 2. Fetch authenticated database links when logged in
  useEffect(() => {
    if (!session || userUID === 'guest_session') return;

    async function loadPersistentNodes() {
      try {
        const res = await fetch(`${BACKEND_URL}/user/${userUID}`);
        const data = await res.json();
        
        if (data.success && data.nodes) {
          const formattedEndpoints = data.nodes.map((node: any) => {
            const hardwareId = node.hardware_id || node.id || node._id;
            return {
              id: String(hardwareId),
              url: `${BACKEND_URL}/hook/${hardwareId}`
            };
          });

          setEndpoints(formattedEndpoints);
          if (formattedEndpoints.length > 0) {
            setSelectedEndpointId(formattedEndpoints[0].id);
          }
        }
      } catch (err) {
        console.error('XEN_FETCH_ERROR:', err);
      }
    }

    loadPersistentNodes();
  }, [userUID, session]);

  // 3. Backup State Changes: Save guest links to local storage whenever a new one is added
  useEffect(() => {
    if (userUID === 'guest_session' && endpoints.length > 0) {
      const stamped = endpoints.map(ep => ({
        ...ep,
        createdAt: ep.createdAt || Date.now()
      }));
      localStorage.setItem('xen_guest_endpoints', JSON.stringify(stamped));
    } else if (userUID === 'guest_session' && endpoints.length === 0) {
      localStorage.removeItem('xen_guest_endpoints');
    }
  }, [endpoints, userUID]);

  // 🍏 Unified deletion logic triggered from within the modal
  const handleConfirmDelete = async () => {
    if (!promptDeleteId) return;
    const idToDelete = promptDeleteId;
    setPromptDeleteId(null); // Clear prompt view state

    if (!userUID || userUID === 'guest_session') {
      const activeGuests = endpoints.filter(ep => ep.id !== idToDelete);
      setEndpoints(activeGuests);
      localStorage.setItem('xen_guest_endpoints', JSON.stringify(activeGuests));
      if (selectedEndpointId === idToDelete) {
        setSelectedEndpointId(activeGuests[0]?.id || null);
      }
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/delete/${idToDelete}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userUID })
      });

      if (res.ok) {
        const remaining = endpoints.filter(ep => ep.id !== idToDelete);
        setEndpoints(remaining);
        if (selectedEndpointId === idToDelete) {
          setSelectedEndpointId(remaining[0]?.id || null);
        }
      } else {
        alert("Failed to drop node segment execution layer.");
      }
    } catch (err) {
      console.error("Deletion communication pipeline dropped:", err);
    }
  };

  const ValidatedDashboard = Dashboard as React.ComponentType<DashboardPropsType>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-zinc-100 dark:bg-[#000000] text-zinc-900 dark:text-zinc-400 font-sans overflow-x-hidden relative">
      
      {/* 🍏 HIGH-TECH GLOBAL SCREEN MODAL OVERLAY */}
      {promptDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md p-6 bg-white dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded-[32px] shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-widest text-zinc-900 dark:text-white uppercase italic">
                  CRITICAL_OVERRIDE
                </h3>
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-0.5">
                  Action: Purge_Node_Sequence
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono uppercase tracking-wide leading-relaxed bg-zinc-50 dark:bg-white/[0.02] p-4 rounded-2xl border border-zinc-200/50 dark:border-white/5">
              Are you sure you want to drop link sequence <span className="text-indigo-500 font-bold">{promptDeleteId}</span>? This completely wipes out all logged streams permanently.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPromptDeleteId(null)}
                className="py-3.5 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 transition-all flex items-center justify-center gap-2 border border-transparent dark:border-white/5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Abort_Action
              </button>
              <button
                onClick={handleConfirmDelete}
                className="py-3.5 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 transition-all active:scale-95"
              >
                Confirm_Purge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE HEADER */}
      <div className="lg:hidden flex items-center justify-between px-6 py-4 bg-white dark:bg-[#050505] border-b border-zinc-200 dark:border-white/5 relative z-30">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white">
            Cluster_Nodes ({endpoints.length})
          </span>
        </div>
        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* SIDEBAR VIEWPORT */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-[#030303] lg:bg-transparent
        transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        {/* 🍏 Pass down setPromptDeleteId function to sidebar prop space */}
        <Sidebar 
          endpoints={endpoints} 
          selectedId={selectedEndpointId} 
          setPromptDeleteId={setPromptDeleteId}
          onSelect={(id) => {
            setSelectedEndpointId(id);
            setMobileMenuOpen(false);
          }} 
        />
      </aside>

      {/* MOBILE DIMMER OVERLAY */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* MAIN CONTENT DISPLAY */}
      <main className="flex-1 w-full min-w-0 overflow-y-auto">
        <ValidatedDashboard 
          endpoints={endpoints} 
          setEndpoints={setEndpoints}
          selectedEndpointId={selectedEndpointId}
          setSelectedEndpointId={setSelectedEndpointId}
          userUID={userUID}
        />
      </main>
    </div>
  );
}