'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Plus, Webhook, AlertCircle, Loader2, Cpu, Globe, ArrowUpRight, Github, LogOut, ShieldAlert } from 'lucide-react';
import EndpointCard from './EndpointCard';
import Sidebar from './Sidebar'; // Importing the new side nav navigation panel

interface Endpoint {
  id: string;
  url: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [selectedEndpointId, setSelectedEndpointId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract custom githubId or default user identifier from your oauth token hook wrapper
  const userUID = session ? ((session.user as any).githubId || 'PRO_USER') : null;

  // FETCH STORED ENDPOINTS FROM POSTGRES UPON AUTH HANDSHAKE
  useEffect(() => {
    if (!userUID) {
      setEndpoints([]);
      setSelectedEndpointId(null);
      return;
    }

    async function loadPersistentNodes() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/logs/user/${userUID}`);
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
        console.error('XEN_FETCH_ERROR: Could not fetch active account nodes.', err);
      }
    }

    loadPersistentNodes();
  }, [userUID]);

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/create`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userUID || 'guest_session' }) // Anchor target user payload
      });
      const data = await res.json();
      
      setEndpoints((prev) => [data, ...prev]);
      setSelectedEndpointId(data.id);
    } catch (err) {
      setError('XEN_LINK_ERROR: API gateway unreachable.');
    } finally {
      setLoading(false);
    }
  };

  const activeEndpoint = endpoints.find(ep => ep.id === selectedEndpointId);

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-[#000000] transition-colors duration-700 font-sans overflow-hidden">
      
      {/* 1. SIDEBAR MATRIX INTEGRATION */}
      {session && (
        <Sidebar 
          endpoints={endpoints} 
          selectedId={selectedEndpointId} 
          onSelect={setSelectedEndpointId} 
        />
      )}

      {/* MAIN CONTAINER STREAM */}
      <main className="flex-1 relative z-10 overflow-y-auto selection:bg-indigo-500/30 text-zinc-900 dark:text-zinc-400">
        
        {/* ELITE BACKGROUND UI */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 dark:brightness-0" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute top-[-10%] right-1/4 w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-900/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-[700px] mx-auto px-6 py-12">
          
          {/* PREMIUM NAV BAR */}
          <nav className="flex items-center justify-between mb-20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-zinc-900 dark:bg-white shadow-2xl transition-transform hover:rotate-12">
                <Webhook className="w-5 h-5 text-white dark:text-black" />
              </div>
              <span className="text-xl font-black tracking-tighter italic uppercase text-zinc-900 dark:text-white">
                XenLog<span className="text-indigo-600 dark:text-indigo-500">404</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {status === "loading" ? (
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-500/10 border border-zinc-500/20 text-[10px] font-black uppercase tracking-wider">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-500" />
                </div>
              ) : session ? (
                <div className="flex items-center gap-3 bg-zinc-200/60 dark:bg-zinc-900/40 border border-zinc-300/50 dark:border-white/5 pl-2 pr-3 py-1 rounded-full text-[10px] font-black tracking-wider shadow-sm transition-all hover:border-zinc-400 dark:hover:white/10 group/user">
                  <img 
                    src={session.user?.image || ""} 
                    alt="GitHub Avatar" 
                    className="w-6 h-6 rounded-full border border-zinc-300 dark:border-white/20 shadow-sm"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-zinc-900 dark:text-white uppercase tracking-tight text-[9px] truncate max-w-[80px]">{session.user?.name}</span>
                    <span className="text-[8px] font-mono font-bold text-indigo-500 tracking-normal">UID: {userUID}</span>
                  </div>
                  <button 
                    onClick={() => signOut()}
                    title="Disconnect Node"
                    className="ml-1 p-1 rounded-full text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 dark:hover:bg-rose-500/20 transition-all active:scale-95"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn('github')}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950 dark:bg-white border border-zinc-800 dark:border-zinc-200 text-[10px] font-black uppercase tracking-widest text-white dark:text-black hover:scale-[1.03] active:scale-[0.97] transition-all shadow-md group/btn"
                >
                  <Github className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform" />
                  Connect Node
                </button>
              )}

              <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                System_Online
              </div>
            </div>
          </nav>

          {/* WORKSPACE HEADLINE */}
          <header className="flex flex-col items-center mb-16 text-center">
            <h1 className="text-7xl font-black tracking-tighter text-zinc-900 dark:text-white mb-6 bg-gradient-to-b from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
              Inspector
            </h1>
            <p className="text-zinc-500 dark:text-zinc-500 text-lg font-medium leading-relaxed max-w-md">
              The elite standard for capturing and debugging webhooks in real-time.
            </p>
          </header>

          {/* PRIMARY FUNCTIONAL HUD CARD */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[32px] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative bg-zinc-200/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/10 rounded-[32px] p-2 backdrop-blur-3xl shadow-2xl">
              <div className="bg-white dark:bg-[#050505] rounded-[26px] p-8 border border-zinc-100 dark:border-white/5">
                <section className="space-y-10">
                  
                  {!session && status !== "loading" && (
                    <div className="flex items-center justify-between gap-4 bg-amber-500/5 border border-amber-500/10 p-3.5 rounded-xl text-amber-600 dark:text-amber-400 text-[9px] font-bold uppercase tracking-widest leading-normal">
                      <div className="flex items-center gap-2.5">
                        <ShieldAlert className="w-4 h-4 shrink-0 opacity-80" />
                        <span>Guest Mode active. Endpoints auto-purge after 24 hours of total inactivity.</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleCreate}
                    disabled={loading}
                    className="group relative w-full flex items-center justify-between px-6 py-5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 overflow-hidden"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 dark:via-black/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <div className="flex items-center gap-3 relative z-10">
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                      <span className="tracking-widest uppercase text-xs font-black">
                        {loading ? 'Spawning Node...' : session ? 'Deploy Permanent Link' : 'Deploy Temporary Link'}
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity relative z-10" />
                  </button>

                  {error && (
                    <div className="flex items-center gap-3 bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl text-rose-500 dark:text-rose-400 text-[10px] font-black uppercase tracking-widest">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  {/* ACTIVE LINKS / CONTEXT LOG VIEWER HUD */}
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
                      <h2 className="text-[10px] font-black text-zinc-400 dark:text-zinc-700 uppercase tracking-[0.4em]">
                        {session ? 'Focused_Network_Node' : 'Active_Network_Nodes'}
                      </h2>
                      {session && (
                        <span className="self-start sm:self-auto text-[10px] bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded border border-zinc-200 dark:border-white/10 text-zinc-500 font-mono">
                          {endpoints.length} CHANNELS AVAIL
                        </span>
                      )}
                    </div>

                    {activeEndpoint ? (
                      <div className="grid gap-4">
                        {/* Render focusing targeted entity card entry */}
                        <EndpointCard id={activeEndpoint.id} url={activeEndpoint.url} />
                        
                        {/* REAL-TIME LOG VIEWER HOOK SPLIT */}
                        <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-white/5">
                          {/* <LogViewer id={activeEndpoint.id} /> */}
                        </div>
                      </div>
                    ) : (
                      !loading && (
                        <div className="py-24 flex flex-col items-center justify-center border border-dashed border-zinc-200 dark:border-zinc-900 rounded-3xl bg-zinc-50/50 dark:bg-white/[0.01] group/empty">
                          <Webhook className="w-10 h-10 text-zinc-300 dark:text-zinc-800 mb-4 group-hover/empty:scale-110 transition-transform" />
                          <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-800 uppercase tracking-[0.2em]">Awaiting Uplink Deployment</p>
                        </div>
                      )
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* BOTTOM METRICS */}
          <footer className="mt-16 grid grid-cols-2 gap-4">
            {[
              { label: 'Throughput', value: '24ms / Global', icon: Cpu, color: 'text-indigo-500' },
              { label: 'Security', value: 'AES-256 Enabled', icon: Globe, color: 'text-emerald-500' }
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded-2xl p-5 flex items-center gap-4 group hover:border-indigo-500/50 transition-colors cursor-default shadow-sm">
                <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-white/5 group-hover:scale-110 transition-transform">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-zinc-400 dark:text-zinc-600 font-black tracking-tighter">{stat.label}</p>
                  <p className="text-xs text-zinc-900 dark:text-zinc-300 font-mono font-bold tracking-tight">{stat.value}</p>
                </div>
              </div>
            ))}
          </footer>
        </div>
      </main>
    </div>
  );
}