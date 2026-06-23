import React from 'react';
import PortfolioClient from '@/components/PortfolioClient';
import { getProjects, getCategories } from '@/lib/data';

export const revalidate = 1800; // Cache for 30 minutes

export default async function PortfolioPage() {
  const [projects, categories] = await Promise.all([
    getProjects(),
    getCategories(),
  ]);

  return (
    <div className="bg-background py-16 sm:py-24 px-6 page-transition">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-widest text-primary font-bold">Showcase</p>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight leading-tight">
            Selected <span className="text-gold-gradient">Creative Works</span>
          </h1>
          <p className="text-muted-foreground font-light text-sm sm:text-base leading-relaxed">
            Explore a curated selection of our photography, brand identity designs, media productions, and digital content campaigns created for premium corporate and startup clients.
          </p>
        </div>

        {/* Client side portfolio filter system */}
        <PortfolioClient projects={projects as any} categories={categories as any} />
        
      </div>
    </div>
  );
}
