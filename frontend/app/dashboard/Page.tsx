'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Menu, X, Layers } from 'lucide-react';
import Dashboard from "./component/Dashboard";
import Sidebar from "./component/Sidebar";

interface Endpoint {
  id: string;
  url: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [selectedEndpointId, setSelectedEndpointId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userUID = session ? ((session.user as any).githubId || 'PRO_USER') : null;

  // Sync state loader
  useEffect(() => {
    if (!userUID) {
      setEndpoints([]);
      setSelectedEndpointId(null);
      return;
    }

    async function loadPersistentNodes() {
      try {
        const res = await fetch(`${BACKEND_URL}/user/${userUID}`);
        const data = await res.json();
        
        if (data.success && data.nodes) {
          const formattedEndpoints = data.nodes.map((node: any) => ({
            id: node.hardware_id,
            url: `${BACKEND_URL}/hook/${node.hardware_id}`
          }));
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
  }, [userUID]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-zinc-100 dark:bg-[#000000] text-zinc-900 dark:text-zinc-400 font-sans overflow-x-hidden">
      
      {/* MOBILE HEADER */}
      {session && (
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
      )}

      {/* SIDEBAR VIEWPORT */}
      {session && (
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
              setMobileMenuOpen(false); // Auto close menu on pick
            }} 
          />
        </aside>
      )}

      {/* MOBILE DIMMER OVERLAY */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* MAIN CONTENT DISPLAY */}
      <main className="flex-1 w-full min-w-0 overflow-y-auto">
        <Dashboard 
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