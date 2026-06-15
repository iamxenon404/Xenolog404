import { ArrowUpRight, FolderGit2 } from 'lucide-react';

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
      <div className="flex items-center gap-2 mb-6">
        <FolderGit2 className="w-4 h-4 text-zinc-500" />
        <h2 className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.3em]">Other_Builds</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
    </section>
  );
}