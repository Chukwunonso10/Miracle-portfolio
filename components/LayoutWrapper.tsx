'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import PageTransition from './PageTransition';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminOrAuth = pathname?.startsWith('/admin') || pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up');

  if (isAdminOrAuth) {
    return (
      <main className="flex-grow">
        <PageTransition>{children}</PageTransition>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
