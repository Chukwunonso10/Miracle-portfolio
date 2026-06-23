'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Palette, Instagram, Video, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Camera: Camera,
  Palette: Palette,
  Instagram: Instagram,
  Video: Video,
};

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceRange: string | null;
  icon: string;
}

export default function ServicesSummary({ services }: { services: Service[] }) {
  return (
    <section className="py-24 px-6 bg-background/40 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Title row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Solutions</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-none">
              Services & Specialties
            </h3>
          </div>
          <Link
            href="/services"
            className="group flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-primary hover:text-accent transition-colors"
          >
            <span>View All Services</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Services List Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Camera;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 rounded-xl glass-card relative group flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Top line with Icon and Number badge */}
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-lg bg-card border border-border text-primary group-hover:scale-105 transition-transform duration-300">
                      <Icon size={18} />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground/60">
                      [0{i + 1}]
                    </span>
                  </div>

                  {/* Info block */}
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-foreground">{service.name}</h4>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Bottom row: Pricing & link */}
                <div className="flex items-center justify-between pt-8 mt-6 border-t border-border/40">
                  {service.priceRange ? (
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Starting at</p>
                      <p className="text-sm font-semibold text-primary">{service.priceRange}</p>
                    </div>
                  ) : (
                    <div />
                  )}
                  <Link
                    href={`/services#${service.slug}`}
                    className="flex items-center space-x-1.5 text-xs uppercase font-bold tracking-wider text-foreground group-hover:text-primary transition-colors"
                  >
                    <span>Details</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
