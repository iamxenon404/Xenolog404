'use client';

import Header from './components/Header';
import Footer from './components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-400 font-sans flex flex-col justify-between">
      
      {/* TOP HEADER */}
      <Header />

      {/* MAIN HERO CONTENT PLACEHOLDER */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
          Workspace Pending
        </h1>
        <p className="text-zinc-600 text-xs mt-2 font-mono">
          Ready to inject hero sections.
        </p>
      </main>

      {/* BOTTOM FOOTER */}
      <Footer />
      
    </div>
  );
}