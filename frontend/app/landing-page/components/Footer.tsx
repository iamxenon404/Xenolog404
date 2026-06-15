import { Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full max-w-[750px] mx-auto px-6 py-6 flex items-center justify-between border-t border-zinc-900 text-[10px] font-mono tracking-widest text-zinc-600 uppercase">
      <div className="flex items-center gap-2">
        <Cpu className="w-3.5 h-3.5 text-zinc-700" />
        <span>Status: Core_Online</span>
      </div>
      <div>
        © {new Date().getFullYear()} XenLog404
      </div>
    </footer>
  );
}