'use client';

import React from 'react';
import { Camera, Palette, Video, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';

const PILLARS = [
  {
    icon: Camera,
    title: 'Commercial Photography',
    description: 'High-contrast fashion, corporate, and editorial imagery structured to articulate brand narratives and capture timeless elegance.',
  },
  {
    icon: Palette,
    title: 'Brand Identity Design',
    description: 'Bespoke design systems, typography layouts, and guidelines that translate corporate visions into premium consumer products.',
  },
  {
    icon: Video,
    title: 'Cinematic Production',
    description: 'High-definition digital films, promotional brand reels, and event documentations shot with deep focus and narrative depth.',
  },
  {
    icon: PenTool,
    title: 'Digital Content Creation',
    description: 'Strategic asset creation tailored for multi-channel engagement, ensuring consistent aesthetics and brand loyalty.',
  },
];

export default function Intro() {
  return (
    <section className="py-24 px-6 bg-background/40 relative">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Philosophy & Expertise</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              Bridging Artistic Vision With Corporate Strategy
            </h3>
          </div>
          <div className="lg:col-span-6">
            <p className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base">
              A premium brand deserves more than generic assets. We create custom media ecosystems that validate your pricing, engage your target audience, and secure your place as an industry authority. We call this strategic creativity.
            </p>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 rounded-xl glass-card relative group flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-card border border-border text-primary group-hover:scale-110 transition-transform duration-300">
                    <Icon size={20} />
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-foreground">{pillar.title}</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
