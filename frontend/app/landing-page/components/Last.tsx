'use client';

import { Terminal, ArrowDown, Network, Cpu, Database } from 'lucide-react';

export default function WorkFlowMatrix() {
  const pipelineSteps = [
    {
      id: "STAGE_01",
      title: "Endpoint Generation",
      subtitle: "v1.xenlog.dev // unique_hash",
      desc: "Instantly provision an isolated, public HTTP endpoint path ready to accept incoming structural data payloads from any third-party service.",
      icon: Terminal,
      meta: "GET/POST >> GENERATED_URI"
    },
    {
      id: "STAGE_02",
      title: "Packet Ingestion",
      subtitle: "tls_handshake // raw_stream",
      desc: "Our ingestion layer catches the incoming request data, immediately freezing the network headers, query strings, and request origins.",
      icon: Network,
      meta: "HTTP_200 >> CAPTURE_BUFFER"
    },
    {
      id: "STAGE_03",
      title: "Payload Parsing Engine",
      subtitle: "json_validation // structural_lint",
      desc: "The incoming raw data stream is parsed securely. Complex payloads, form parameters, and binary segments are isolated and formatted.",
      icon: Cpu,
      meta: "RAW_DATA >> STRUCT_JSON"
    },
    {
      id: "STAGE_04",
      title: "Reactive Dashboard Broadcast",
      subtitle: "websocket_pipe // sub_second_push",
      desc: "The sanitized webhook payload is instantly pushed over persistent socket tunnels, rendering the live data stream directly on your view log UI.",
      icon: Database,
      meta: "WS_EMIT >> DASHBOARD_RENDER"
    }
  ];

  return (
    <section className="w-full max-w-[850px] mx-auto px-8 py-24 border-t border-zinc-900/60 text-left">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col space-y-2 mb-16">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-zinc-500" />
          <h2 className="text-[11px] font-black uppercase text-zinc-400 tracking-[0.3em]">Ingestion_Matrix</h2>
        </div>
        <p className="text-[12px] text-zinc-500 font-medium max-w-md font-sans">
          How data moves from an external server directly into your interactive dashboard live view.
        </p>
      </div>

      {/* MATRIX PIPELINE CASCADE */}
      <div className="space-y-4">
        {pipelineSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex flex-col space-y-4">
              
              {/* INDIVIDUAL PIPELINE BLOCK */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 rounded-2xl border border-zinc-900 bg-zinc-950/20 font-mono items-center relative overflow-hidden">
                
                {/* LEFT BLOCK: IDENTIFIER & ICON (4 Columns) */}
                <div className="md:col-span-4 flex items-center gap-4">
                  <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-indigo-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-zinc-600 tracking-wider block font-bold">{step.id}</span>
                    <h3 className="text-xs font-black uppercase text-white tracking-tight">{step.title}</h3>
                    <span className="text-[9px] text-zinc-500 block">{step.subtitle}</span>
                  </div>
                </div>

                {/* MIDDLE BLOCK: DESCRIPTIVE COPY (5 Columns) */}
                <div className="md:col-span-5 text-[11px] text-zinc-400 font-sans font-medium leading-relaxed pr-2">
                  {step.desc}
                </div>

                {/* RIGHT BLOCK: METRIC LOG STRING (3 Columns) */}
                <div className="md:col-span-3 text-[10px] text-zinc-600 bg-black/40 border border-zinc-900 px-3 py-2 rounded-lg text-right truncate hidden md:block">
                  {step.meta}
                </div>

              </div>

              {/* DOWNTREND ROUTER ARROW */}
              {index !== pipelineSteps.length - 1 && (
                <div className="flex justify-start md:justify-center w-full md:max-w-[33%] pl-8 md:pl-0 my-1">
                  <div className="p-1 rounded-md border border-zinc-900 bg-zinc-950 text-zinc-700">
                    <ArrowDown className="w-3 h-3 animate-pulse" />
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </section>
  );
}