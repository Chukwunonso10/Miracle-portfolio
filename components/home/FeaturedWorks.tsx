'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Grid } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  client: string | null;
  year: string | null;
  category: { name: string };
  images: { url: string; isCover: boolean }[];
}

export default function FeaturedWorks({ projects }: { projects: Project[] }) {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Title row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Selected Works</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-none">
              Creative Portfolios
            </h3>
          </div>
          <Link
            href="/portfolio"
            className="group flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-primary hover:text-accent transition-colors"
          >
            <Grid size={14} />
            <span>View All Works</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Portfolio Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => {
            const coverImage = project.images.find(img => img.isCover)?.url || 
                              project.images[0]?.url || 
                              'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800';
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group relative flex flex-col space-y-4"
              >
                {/* Image card wrapper */}
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-border shadow-lg block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
                </Link>

                {/* Text summary info */}
                <div className="flex justify-between items-start pt-2">
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-primary">
                      {project.category.name}
                    </p>
                    <Link href={`/portfolio/${project.slug}`} className="block">
                      <h4 className="text-xl font-bold text-foreground hover:text-primary transition-colors flex items-center group/title">
                        <span>{project.title}</span>
                        <ArrowUpRight size={16} className="opacity-0 group-hover/title:opacity-100 ml-1.5 translate-y-1 group-hover/title:translate-y-0 transition-all duration-300" />
                      </h4>
                    </Link>
                    <p className="text-xs text-muted-foreground font-light max-w-md line-clamp-1">
                      {project.description}
                    </p>
                  </div>
                  {project.year && (
                    <span className="text-xs font-mono text-muted-foreground/60 mt-1">
                      [{project.year}]
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
