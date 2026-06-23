'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string | null;
  clientAvatar: string | null;
  testimonialText: string;
  rating: number;
}

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="py-24 px-6 bg-background/40 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header section */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Endorsements</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Client Testimonials
          </h3>
          <p className="text-muted-foreground font-light text-sm">
            Read what corporate brands and personal agencies say about our creative solutions and deliverables.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, i) => {
            const avatarUrl = test.clientAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200';
            
            return (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 rounded-xl glass-card relative flex flex-col justify-between"
              >
                {/* Quote details */}
                <div className="space-y-6 relative">
                  <div className="absolute top-0 right-0 text-muted-foreground/20 select-none">
                    <Quote size={32} />
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: test.rating }).map((_, idx) => (
                      <Star key={idx} size={14} className="text-accent fill-accent" />
                    ))}
                  </div>

                  <p className="text-muted-foreground text-sm font-light leading-relaxed italic pt-2">
                    "{test.testimonialText}"
                  </p>
                </div>

                {/* Profile block */}
                <div className="flex items-center space-x-4 pt-8 mt-6 border-t border-border/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatarUrl}
                    alt={test.clientName}
                    className="w-10 h-10 rounded-full object-cover border border-border"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{test.clientName}</h4>
                    <p className="text-[10px] uppercase text-muted-foreground tracking-wider font-semibold">
                      {test.clientRole} {test.clientCompany ? `@ ${test.clientCompany}` : ''}
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
