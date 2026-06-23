'use client';

import React from 'react';
import { Award, Briefcase, Eye, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';

const STATS_ITEMS = [
  {
    icon: Briefcase,
    value: '120+',
    label: 'Projects Delivered',
  },
  {
    icon: ThumbsUp,
    value: '45+',
    label: 'Corporate Clients',
  },
  {
    icon: Award,
    value: '08',
    label: 'Creative Accolades',
  },
  {
    icon: Eye,
    value: '99%',
    label: 'Client Retention Rate',
  },
];

export default function Stats() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto rounded-2xl border border-border bg-card relative overflow-hidden py-16 px-8 sm:px-12">
        {/* Animated backdrop glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-center">
          {STATS_ITEMS.map((stat, i) => {
            const Icon = stat.icon;
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="space-y-4"
              >
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-background border border-border text-primary">
                    <Icon size={16} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
