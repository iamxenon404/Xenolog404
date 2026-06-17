'use client';

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import Projects from './components/Projects';
import WorkFlowMatrix from './components/Last';

// 1. Define the TypeScript interface for the props
interface LandingPageProps {
  onEnterGuest: () => void;
}

// 2. Destructure the prop and apply the type definition
export default function LandingPage({ onEnterGuest }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-[#000000] text-zinc-600 dark:text-zinc-400 font-sans flex flex-col justify-between relative overflow-hidden pt-24 transition-colors duration-700">
      
      {/* SOFT GLOW DESIGN LAYER */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* COMPONENT LAYOUT SHELL */}
      <Header />
      
      <main className="flex-1 flex flex-col justify-center">
        {/* 3. Pass the prop down directly to the Hero component */}
        <Hero onEnterGuest={onEnterGuest} />
        <Features />
        <Projects onEnterGuest={onEnterGuest} />
        <WorkFlowMatrix />
      </main>

      <Footer />
    </div>
  );
}