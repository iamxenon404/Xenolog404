'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Menu, X, Layers } from 'lucide-react';
import Dashboard from "./component/Dashboard";
import Sidebar from "./component/Sidebar";

interface Endpoint {
  id: string;
  url: string;
  createdAt?: number; // Track when it was made
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

          // Filter out links older than 24 hours
          const activeGuests = parsed.filter(ep => {
            if (!ep.createdAt) return true; // fallback for older entries
            return now - ep.createdAt < oneDayInMs;
          });

          // Save the cleaned list back if things expired
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
      // Stamp endpoints with creation time if missing
      const stamped = endpoints.map(ep => ({
        ...ep,
        createdAt: ep.createdAt || Date.now()
      }));
      localStorage.setItem('xen_guest_endpoints', JSON.stringify(stamped));
    } else if (userUID === 'guest_session' && endpoints.length === 0) {
      localStorage.removeItem('xen_guest_endpoints');
    }
  }, [endpoints, userUID]);

  const ValidatedDashboard = Dashboard as React.ComponentType<DashboardPropsType>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-zinc-100 dark:bg-[#000000] text-zinc-900 dark:text-zinc-400 font-sans overflow-x-hidden">
      
      {/* MOBILE HEADER - Always rendered now */}
      <div className="lg:hidden flex items-center justify-between px-6 py-4 bg-white dark:bg-[#050505] border-b border-zinc-200 dark:border-white/5 relative z-50">
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

      {/* SIDEBAR VIEWPORT - Condition removed so it renders immediately */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-[#030303] lg:bg-transparent
        transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <Sidebar 
          endpoints={endpoints} 
          selectedId={selectedEndpointId} 
          onSelect={(id) => {
            setSelectedEndpointId(id);
            setMobileMenuOpen(false);
          }} 
        />
      </aside>

      {/* MOBILE DIMMER OVERLAY */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
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