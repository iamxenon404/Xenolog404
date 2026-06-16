'use client';

import { ArrowUpRight, FolderGit2, Github, Coffee, Play } from 'lucide-react';

export default function Projects() {
  // Add your other projects here! You can swap these out whenever.
  const personalProjects = [
    {
      name: "SaaS Platform (On Pause)",
      desc: "An ambitious software service built to solve workflows. Currently on hold but resuming soon.",
      status: "Paused",
      link: "#"
    },
    {
      name: "XenCore Utils",
      desc: "A collection of lightweight development scripts and configuration tools built for rapid backend prototyping.",
      status: "Production",
      link: "https://github.com"
    }
  ];

  return (
    <section className="w-full max-w-[750px] mx-auto px-6 py-12 border-t border-zinc-900/60">
      
      {/* HEADER SECTION WITH INTEGRATED GITHUB UTILITY */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-zinc-500" />
          <h2 className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.3em]">Other_Builds</h2>
        </div>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 text-[9px] font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-all"
        >
          <Github className="w-3 h-3" />
          <span>View My GitHub</span>
          <ArrowUpRight className="w-2.5 h-2.5" />
        </a>
      </div>

      {/* GRID DISPLAY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {personalProjects.map((project, i) => (
          <a
            key={i}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-5 rounded-xl border border-zinc-900 bg-zinc-950/10 hover:border-zinc-800 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                {project.name}
              </h3>
              <span className={`text-[8px] font-mono uppercase px-2 py-0.5 rounded border ${
                project.status === 'Production' 
                  ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400' 
                  : 'bg-amber-500/5 border-amber-500/10 text-amber-400'
              }`}>
                {project.status}
              </span>
            </div>
            
            <p className="text-[11px] text-zinc-500 leading-normal font-medium pr-4">
              {project.desc}
            </p>

            <div className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-zinc-600 group-hover:text-zinc-400 transition-colors mt-4">
              <span>View Build</span>
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>
        ))}
      </div>

      {/* FOOTER CALL-TO-ACTION MATRIX */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
        <button className="flex items-center justify-center gap-2 w-full sm:w-auto sm:flex-1 px-4 py-3 rounded-lg bg-white hover:bg-zinc-200 text-black text-[10px] font-mono font-black uppercase tracking-wider transition-all active:scale-[0.98]">
          <Play className="w-3.5 h-3.5 fill-current" />
          Get Started
        </button>
        <a 
          href="https://buymeacoffee.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-lg bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white text-[10px] font-mono font-bold uppercase tracking-wider transition-all border border-zinc-900 hover:border-zinc-800 active:scale-[0.98]"
        >
          <Coffee className="w-3.5 h-3.5 text-amber-500" />
          Buy Me A Coffee
        </a>
      </div>

    </section>
  );
}