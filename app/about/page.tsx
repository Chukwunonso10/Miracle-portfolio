'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Compass, Camera, Palette, Video } from 'lucide-react';

const TIMELINE = [
  {
    year: '2023 - Present',
    role: 'Creative Director & Founder',
    company: 'Miracles Studio',
    description: 'Providing visual consultancy, commercial editorial captures, and unified brand assets for high-growth corporate firms.',
  },
  {
    year: '2021 - 2023',
    role: 'Senior Media Specialist',
    company: 'Vanguard Marketing Agency',
    description: 'Managed video direction, brand assets production, and digital campaign curation for retail and startup clients.',
  },
  {
    year: '2019 - 2021',
    role: 'Lead Graphic Designer',
    company: 'Apex Design Lab',
    description: 'Spearheaded layout design, typography construction, packaging visuals, and physical brand books creation.',
  },
  {
    year: '2018 - 2019',
    role: 'Freelance Photographer & Assistant',
    company: 'Self-employed',
    description: 'Event photo coverage, photo retouching, and local fashion editorial assistance.',
  },
];

const SKILLS = [
  { name: 'Commercial Photography', level: '95%', category: 'Visuals' },
  { name: 'Video Direction & Editing', level: '90%', category: 'Visuals' },
  { name: 'Brand Strategy & Identity', level: '92%', category: 'Design' },
  { name: 'Editorial Layouts & Typography', level: '88%', category: 'Design' },
  { name: 'Social Campaign Planning', level: '85%', category: 'Marketing' },
  { name: 'Digital Post-Processing & Grading', level: '94%', category: 'Visuals' },
];

export default function AboutPage() {
  return (
    <div className="bg-background py-16 sm:py-24 px-6 page-transition">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Page Title Header */}
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-widest text-primary font-bold">The Creative Director</p>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight leading-tight">
            Designing Aesthetics That <span className="text-gold-gradient">Command Attention</span>.
          </h1>
          <p className="text-muted-foreground font-light text-sm sm:text-base leading-relaxed">
            I am a multi-disciplinary visual creator. My mission is to translate complex product narratives into high-end visual representations that inspire trust and drive growth.
          </p>
        </div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-border shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800"
              alt="Creative portrait"
              className="w-full h-full object-cover grayscale brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>

          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-2xl font-bold text-foreground">About My Practice</h2>
            <div className="space-y-4 text-muted-foreground text-sm font-light leading-relaxed">
              <p>
                My professional journey began at the intersection of classical arts and digital layout systems. Over the past 7 years, I have collaborated with start-ups, event organizers, and premium corporate boards to refine their brand imagery.
              </p>
              <p>
                Whether directing a 3-minute commercial film, framing an editorial photo series, or structuring a comprehensive logo system, I maintain a strict focus on minimalism, spacious layouts, and harmonious tones.
              </p>
              <p>
                Every brand has a core truth. My creative process is dedicated to identifying that truth and packaging it in a visual format that appeals directly to your target audience.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-border">
              <div className="space-y-1">
                <Compass className="text-primary" size={20} />
                <h4 className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Focus</h4>
                <p className="text-sm font-bold text-foreground">Minimalism</p>
              </div>
              <div className="space-y-1">
                <Camera className="text-primary" size={20} />
                <h4 className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Medium</h4>
                <p className="text-sm font-bold text-foreground">Digital & Print</p>
              </div>
              <div className="space-y-1">
                <Award className="text-primary" size={20} />
                <h4 className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Standard</h4>
                <p className="text-sm font-bold text-foreground">4K & Vector</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline (Journey & Experience) */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold">The Journey</h2>
            <h3 className="text-3xl font-extrabold text-foreground">Work Experience</h3>
          </div>
          
          <div className="relative border-l border-border pl-8 ml-4 space-y-10">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.role + i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Dot */}
                <span className="absolute -left-[41px] top-1.5 h-6 w-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h4 className="text-lg font-bold text-foreground">{item.role}</h4>
                    <span className="text-xs font-mono text-primary font-semibold">{item.year}</span>
                  </div>
                  <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground">{item.company}</p>
                  <p className="text-muted-foreground font-light text-sm max-w-2xl leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills & Indices */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold">The Mechanics</h2>
            <h3 className="text-3xl font-extrabold text-foreground">Skills & Expertise</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SKILLS.map((skill, i) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-foreground">{skill.name}</span>
                  <span className="font-mono text-xs text-primary">{skill.level}</span>
                </div>
                {/* Progress bar background */}
                <div className="h-[2px] w-full bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: i * 0.05 }}
                    className="h-full bg-gold-gradient rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA panel */}
        <div className="p-8 sm:p-16 rounded-xl border border-border bg-card text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Let's Craft Something Inspiring</h3>
          <p className="text-muted-foreground text-sm font-light max-w-xl mx-auto leading-relaxed">
            I am always open to exploring partnerships with startups, corporate groups, agency executives, and marketing professionals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-gold-gradient text-zinc-950 font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-all"
          >
            <span>Initiate Discovery</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}
