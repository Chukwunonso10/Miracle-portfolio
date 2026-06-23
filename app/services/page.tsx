import React from 'react';
import Link from 'next/link';
import { getServices } from '@/lib/data';
import { Camera, Palette, Instagram, Video, CheckCircle2, ArrowRight } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Camera: Camera,
  Palette: Palette,
  Instagram: Instagram,
  Video: Video,
};

export const revalidate = 3600; // Cache for 1 hour

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="bg-background py-16 sm:py-24 px-6 page-transition">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-widest text-primary font-bold">Solutions Catalog</p>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight leading-tight">
            Tailored Creative <br />
            <span className="text-gold-gradient">Visual Services</span>
          </h1>
          <p className="text-muted-foreground font-light text-sm sm:text-base leading-relaxed">
            From establishing premium corporate brand identities to shooting high-fidelity commercial imagery and digital campaigns, we provide visual products that align with your strategic targets.
          </p>
        </div>

        {/* Detailed Services list */}
        <div className="space-y-12">
          {services.map((service: any, i: number) => {
            const Icon = ICON_MAP[service.icon] || Camera;
            
            return (
              <div
                key={service.id}
                id={service.slug}
                className="p-8 sm:p-12 rounded-2xl border border-border bg-card relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 scroll-mt-24 group"
              >
                {/* Decorative gold background tint */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/2 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/4 transition-colors" />

                {/* Left block (Metadata & Info) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 rounded-xl bg-background border border-border text-primary w-fit">
                      <Icon size={24} />
                    </div>
                    <span className="text-sm font-mono text-muted-foreground/80">
                      [Service 0{i + 1}]
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors">
                      {service.name}
                    </h2>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {service.priceRange && (
                    <div className="p-4 rounded-xl bg-background border border-border w-fit">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Inquiry Range</p>
                      <p className="text-lg font-bold text-primary">{service.priceRange}</p>
                    </div>
                  )}
                </div>

                {/* Right block (Benefits & Deliverables lists) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 lg:pt-0 lg:border-l lg:border-border lg:pl-12">
                  
                  {/* Benefits */}
                  <div className="space-y-4">
                    <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Key Benefits</h3>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit: any, idx: number) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground font-light">
                          <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-4">
                    <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Project Deliverables</h3>
                    <ul className="space-y-3">
                      {service.deliverables.map((del: any, idx: number) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground font-light">
                          <CheckCircle2 size={16} className="text-muted-foreground/60 shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing inquiriesCTA */}
                  <div className="sm:col-span-2 pt-6">
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.name)}`}
                      className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors"
                    >
                      <span>Inquire about this service</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
