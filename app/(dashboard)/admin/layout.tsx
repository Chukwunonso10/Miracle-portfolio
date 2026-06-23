'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  Settings, 
  MessageSquare, 
  Star, 
  Home, 
  Menu, 
  X,
  Sparkles,
  Mail
} from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

const ADMIN_LINKS = [
  { name: 'Overview', path: '/admin', icon: LayoutDashboard },
  { name: 'Projects', path: '/admin/projects', icon: Briefcase },
  { name: 'Services', path: '/admin/services', icon: Settings },
  { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
  { name: 'Messages', path: '/admin/contact-messages', icon: MessageSquare },
  { name: 'Subscribers', path: '/admin/newsletter', icon: Mail },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex relative">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`w-64 border-r border-border bg-background flex flex-col justify-between fixed md:sticky top-0 h-screen z-50 transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col space-y-8 pt-8 px-6">
          {/* Logo brand */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/logo.jpeg" 
                alt="Miracle Logo" 
                className="h-8 w-auto object-contain rounded-md" 
              />
              <span className="text-xl font-black tracking-widest text-gold-gradient uppercase">
                KellyMax
              </span>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-full border border-border text-muted-foreground"
            >
              <X size={16} />
            </button>
          </div>

          {/* Links list */}
          <nav className="flex flex-col space-y-1">
            {ADMIN_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-primary text-zinc-950'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon size={16} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile block */}
        <div className="p-6 border-t border-border flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs uppercase font-bold tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            <Home size={14} />
            <span>Public Site</span>
          </Link>
          <UserButton />
        </div>
      </aside>

      {/* Main Panel Content Wrap */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="border-b border-border bg-background px-6 py-4 flex items-center justify-between md:justify-end">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
              Authenticated Admin Portal
            </span>
            {/* User profile toggle on mobile header if sidebar is closed */}
            <div className="md:hidden">
              <UserButton />
            </div>
          </div>
        </header>

        {/* Client panel view */}
        <main className="p-6 sm:p-10 max-w-7xl w-full mx-auto flex-grow pb-24">
          {children}
        </main>
      </div>

    </div>
  );
}
