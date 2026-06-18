'use client';

import { useRouter } from 'next/navigation';
import LandingPage from "./landing-page/page";

export default function Home() {
  const router = useRouter();

  const handleEnterGuest = () => {
    // 🍏 Routinely push the user to your new standalone dashboard route
    router.push('/dashboard'); 
  };

  return <LandingPage onEnterGuest={handleEnterGuest} />;
}