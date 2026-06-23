'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { Menu, X, Sun, Moon, ArrowRight, LayoutDashboard } from 'lucide-react';
import { useUser, UserButton } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { isSignedIn, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'kellymaxstudios@gmail.com';
  const isAdmin = isSignedIn && user?.primaryEmailAddress?.emailAddress === adminEmail;

  // Track page scroll to toggle glass backdrop styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav menu on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border/40 shadow-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/logo.jpeg" 
            alt="kellymax Logo" 
            className="h-9 w-auto object-contain rounded-md" 
          />
          <span className="text-2xl font-black tracking-widest text-gold-gradient uppercase">
            KellyMax
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium tracking-wide uppercase transition-colors relative py-1 ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions (Auth, Theme, Contact Callout) */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-border hover:bg-card text-muted-foreground hover:text-foreground transition-all duration-300"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center space-x-1.5 text-xs uppercase font-semibold text-primary hover:text-accent tracking-wider transition-colors mr-2"
              >
                <LayoutDashboard size={14} />
                <span>Dashboard</span>
              </Link>
            )}

            {isSignedIn ? (
              <UserButton />
            ) : (
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-gold-gradient text-zinc-950 hover:opacity-90 active:scale-95 transition-all flex items-center space-x-2"
              >
                <span>Book Session</span>
                <ArrowRight size={12} className="mt-0.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Nav Button */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          
          {isSignedIn && <UserButton />}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden w-full bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-lg font-semibold tracking-widest uppercase transition-colors ${
                      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center space-x-2 text-sm uppercase tracking-widest font-semibold text-primary pt-4 border-t border-border"
                >
                  <LayoutDashboard size={16} />
                  <span>Admin Dashboard</span>
                </Link>
              )}
              
              {!isAdmin && (
                <Link
                  href="/contact"
                  className="w-full py-4 text-center rounded-full text-sm font-semibold uppercase tracking-widest bg-gold-gradient text-zinc-950 flex items-center justify-center space-x-2"
                >
                  <span>Book Session</span>
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
