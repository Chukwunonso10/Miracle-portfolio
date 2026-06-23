'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  client: string | null;
  year: string | null;
  categoryId: string;
  category: { name: string; slug: string };
  images: { url: string; isCover: boolean }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface PortfolioClientProps {
  projects: Project[];
  categories: Category[];
}

export default function PortfolioClient({ projects, categories }: PortfolioClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.category.slug === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.client && project.client.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Search and Filters toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 order-2 md:order-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all relative ${
              selectedCategory === 'all'
                ? 'text-zinc-950'
                : 'text-muted-foreground hover:text-foreground bg-card border border-border'
            }`}
          >
            {selectedCategory === 'all' && (
              <motion.span
                layoutId="activeFilterBg"
                className="absolute inset-0 bg-primary rounded-full -z-10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            All
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all relative ${
                selectedCategory === category.slug
                  ? 'text-zinc-950'
                  : 'text-muted-foreground hover:text-foreground bg-card border border-border'
              }`}
            >
              {selectedCategory === category.slug && (
                <motion.span
                  layoutId="activeFilterBg"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {category.name}
            </button>
          ))}
        </div>

        {/* Search Input bar */}
        <div className="relative w-full md:w-80 order-1 md:order-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-card border border-border focus:border-primary px-10 py-3 rounded-full text-xs placeholder:text-muted-foreground/60 text-foreground focus:outline-none transition-colors duration-300"
          />
        </div>

      </div>

      {/* Projects Gallery Grid */}
      {filteredProjects.length > 0 ? (
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const coverImage =
                project.images.find((img) => img.isCover)?.url ||
                project.images[0]?.url ||
                'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800';

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="break-inside-avoid bg-card border border-border rounded-xl overflow-hidden shadow-lg group relative flex flex-col justify-end"
                >
                  <Link href={`/portfolio/${project.slug}`} className="block relative overflow-hidden aspect-[4/3] sm:aspect-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-103 transition-all duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors" />
                  </Link>

                  <div className="p-6 space-y-3 relative z-10 bg-card">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-primary font-bold">
                          {project.category.name}
                        </p>
                        <Link href={`/portfolio/${project.slug}`}>
                          <h3 className="text-lg font-bold text-foreground hover:text-primary transition-colors flex items-center mt-1">
                            <span>{project.title}</span>
                            <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 translate-y-0.5 group-hover:translate-y-0 transition-all" />
                          </h3>
                        </Link>
                      </div>
                      {project.year && (
                        <span className="text-[10px] font-mono text-muted-foreground mt-1">[{project.year}]</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground font-light line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-20 border border-dashed border-border rounded-2xl">
          <p className="text-muted-foreground text-sm font-light">No works found matching your selection.</p>
        </div>
      )}
    </div>
  );
}
