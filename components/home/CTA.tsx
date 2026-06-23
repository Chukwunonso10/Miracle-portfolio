'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="py-24 px-6 bg-background relative">
      {/* Decorative side light */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto rounded-2xl bg-card border border-border p-8 sm:p-16 text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gold-gradient/2 opacity-[0.02]" />
        
        <div className="space-y-4 relative z-10 max-w-2xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Collaborations</h2>
          <h3 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
            Let's Shape Your <br className="sm:hidden" />
            <span className="text-gold-gradient">Brand Story</span> Together.
          </h3>
          <p className="text-muted-foreground font-light text-sm sm:text-base leading-relaxed">
            Ready to design a premium brand identity, secure event coverage, or craft a custom visual media campaign? Contact us today to coordinate a discovery session.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-4"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-gradient text-zinc-950 font-bold uppercase tracking-widest text-xs hover:opacity-90 active:scale-95 transition-all text-center flex items-center justify-center space-x-2"
          >
            <span>Initiate Project</span>
            <ArrowRight size={14} />
          </Link>
          <a
            href="https://wa.me/2348000000000"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-border bg-background hover:bg-background/85 text-foreground font-bold uppercase tracking-widest text-xs active:scale-95 transition-all text-center flex items-center justify-center space-x-2"
          >
            <MessageSquare size={14} className="text-primary" />
            <span>Chat on WhatsApp</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
