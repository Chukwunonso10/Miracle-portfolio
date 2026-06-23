'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Camera, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 pt-12 pb-24 bg-background">
      {/* Visual background lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-1/10 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-zinc-800/10 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left text panel */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm"
          >
            <Sparkles size={12} className="text-primary animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Premium Media & branding studio
            </span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-foreground"
            >
              Crafting Visual <br />
              <span className="text-gold-gradient">Masterpieces</span> <br />
              For Premium Brands.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg text-muted-foreground max-w-xl font-light leading-relaxed"
            >
              We merge commercial photography, film direction, and strategic graphic design to tell compelling stories that command market attention and elevate trust.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4"
          >
            <Link
              href="/portfolio"
              className="px-8 py-4 rounded-full bg-gold-gradient text-zinc-950 font-bold uppercase tracking-widest text-xs hover:opacity-90 active:scale-95 transition-all text-center flex items-center justify-center space-x-2"
            >
              <span>Explore Works</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full border border-border bg-card hover:bg-card/70 text-foreground font-bold uppercase tracking-widest text-xs active:scale-95 transition-all text-center flex items-center justify-center space-x-2"
            >
              <Camera size={14} className="text-primary" />
              <span>Book Consultation</span>
            </Link>
          </motion.div>
        </div>

        {/* Right card media panel */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-border shadow-2xl group"
          >
            {/* Main visual (Placeholder image using premium photography) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800"
              alt="Creative director workspace"
              className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            
            {/* Interactive Badge (Floating Widget) */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl glass-card backdrop-blur-md flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Featured Project</p>
                <h3 className="text-base font-bold text-foreground mt-1">Aura Botanicals</h3>
                <p className="text-xs text-muted-foreground font-light mt-0.5">Commercial Campaign 2025</p>
              </div>
              <Link 
                href="/portfolio/aura-gin-branding"
                className="p-3.5 rounded-full bg-background border border-border text-primary hover:text-background hover:bg-primary transition-all duration-300"
                aria-label="View Project"
              >
                <Play size={14} fill="currentColor" className="ml-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
