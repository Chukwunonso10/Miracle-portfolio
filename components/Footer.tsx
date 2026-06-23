'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Youtube, Linkedin, ArrowRight, Facebook } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribed(true);
        setEmail('');
        setMessage('Thank you for subscribing!');
        setTimeout(() => {
          setSubscribed(false);
          setMessage('');
        }, 5000);
      } else {
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Subscription failed:', err);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-background border-t border-border pt-20 pb-10 text-muted-foreground">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Summary */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center space-x-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logo.jpeg" 
              alt="Miracle Logo" 
              className="h-10 w-auto object-contain rounded-md" 
            />
            <span className="text-2xl font-black tracking-widest text-gold-gradient uppercase">
              KellyMax
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
            Premium media services, brand identity creation, and bespoke photography. Blending visual excellence with corporate narrative design.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/kelly_max_studios?igsh=dWJ4cnByZmZxeTI3"
              target="_blank"
              rel="noreferrer noopener"
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://www.facebook.com/share/1BHjxtP9NM/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>

        {/* Quick Sitemap */}
        <div className="space-y-6">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">Navigation</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-primary transition-colors">
                Selected Works
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary transition-colors">
                Services & Pricing
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary transition-colors">
                About & Experience
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact & Booking
              </Link>
            </li>
            <li className="pt-2 border-t border-border/40">
              <Link href="/admin" className="text-xs text-muted-foreground/50 hover:text-primary transition-colors">
                Admin Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">Get In Touch</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center space-x-3">
              <Mail size={16} className="text-primary shrink-0" />
              <a href="mailto:kellymaxstudios@gmail.com" className="hover:text-primary transition-colors">
                kellymaxstudios@gmail.com
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={16} className="text-primary shrink-0" />
              <a href="https://wa.me/2348159248420" className="hover:text-primary transition-colors">
                +2348159248420 (WhatsApp)
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <MapPin size={16} className="text-primary shrink-0" />
              <span>Enugu, Nigeria</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="space-y-6">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">Newsletter</h4>
          <p className="text-xs leading-relaxed text-muted-foreground/80">
            Subscribe to receive insights on branding, photography updates, and exclusive design packages.
          </p>
          <form onSubmit={handleSubscribe} className="relative flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full bg-card border border-border focus:border-primary px-4 py-3 rounded-full text-xs placeholder:text-muted-foreground/45 focus:outline-none pr-12 transition-all duration-300"
              required
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-1 p-2 rounded-full bg-primary hover:bg-accent text-zinc-950 transition-colors disabled:opacity-50"
              aria-label="Subscribe"
            >
              <ArrowRight size={14} />
            </button>
          </form>
          {message && (
            <p className={`text-xs ${subscribed ? 'text-primary' : 'text-destructive-foreground bg-destructive/15 border border-destructive/25 px-3 py-1.5 rounded-lg inline-block'} animate-pulse`}>
              {message}
            </p>
          )}
        </div>
      </div>

      {/* Underline and Credits */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground/60 space-y-4 md:space-y-0">
        <p>&copy; {new Date().getFullYear()} Kelly Max Studio. All rights reserved.</p>
        <p className="flex space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}
