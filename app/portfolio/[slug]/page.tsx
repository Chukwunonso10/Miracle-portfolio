import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/data';
import { ArrowLeft, ExternalLink, Calendar, User, Briefcase, Globe } from 'lucide-react';

export const revalidate = 1800; // Cache for 30 minutes

interface PageProps {
  params: Promise<{ slug: string }>;
}

function renderContent(content: string) {
  const blocks = content.split('\n\n');
  return blocks.map((block, index) => {
    if (block.startsWith('# ')) {
      return (
        <h2 key={index} className="text-2xl sm:text-3xl font-extrabold text-foreground mt-8 mb-4 border-b border-border pb-2">
          {block.replace('# ', '')}
        </h2>
      );
    }
    if (block.startsWith('### ')) {
      return (
        <h3 key={index} className="text-lg font-bold text-foreground mt-6 mb-3">
          {block.replace('### ', '')}
        </h3>
      );
    }
    if (block.startsWith('- ') || block.startsWith('1. ')) {
      const items = block.split('\n').map(item => item.replace(/^(1\.\s*|-\s*)/, ''));
      return (
        <ul key={index} className="list-disc pl-5 space-y-2 text-muted-foreground font-light text-sm sm:text-base my-4">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={index} className="text-muted-foreground font-light text-sm sm:text-base leading-relaxed my-4">
        {block}
      </p>
    );
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const coverImage = project.images.find((img: any) => img.isCover)?.url || project.images[0]?.url;
  const secondaryImages = project.images.filter((img: any) => img.url !== coverImage);

  return (
    <div className="bg-background py-12 sm:py-20 px-6 page-transition">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Portfolio</span>
        </Link>

        {/* Project Header */}
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-widest text-primary font-bold">
            {project.category.name}
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="text-muted-foreground font-light text-sm sm:text-base max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Large Cover Photo */}
        {coverImage && (
          <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden border border-border shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImage}
              alt={project.title}
              className="w-full h-full object-cover grayscale brightness-95"
            />
          </div>
        )}

        {/* Details Grid & Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Metadata Block */}
          <div className="lg:col-span-4 space-y-6 bg-card border border-border rounded-xl p-6 h-fit">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground border-b border-border pb-3">
              Project Parameters
            </h3>
            <ul className="space-y-4 text-sm">
              {project.client && (
                <li className="flex items-start space-x-3 text-muted-foreground">
                  <Briefcase size={16} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground/80">Client</p>
                    <p className="font-semibold text-foreground mt-0.5">{project.client}</p>
                  </div>
                </li>
              )}
              {project.role && (
                <li className="flex items-start space-x-3 text-muted-foreground">
                  <User size={16} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground/80">Role</p>
                    <p className="font-semibold text-foreground mt-0.5">{project.role}</p>
                  </div>
                </li>
              )}
              {project.year && (
                <li className="flex items-start space-x-3 text-muted-foreground">
                  <Calendar size={16} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground/80">Timeline</p>
                    <p className="font-semibold text-foreground mt-0.5">{project.year}</p>
                  </div>
                </li>
              )}
              {project.url && (
                <li className="flex items-start space-x-3 text-muted-foreground">
                  <Globe size={16} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground/80">Live Project</p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-primary hover:text-accent transition-colors flex items-center space-x-1 mt-0.5 group"
                    >
                      <span>Visit Site</span>
                      <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Right Narrative block */}
          <div className="lg:col-span-8 space-y-6">
            <div className="prose prose-invert max-w-none">
              {renderContent(project.content)}
            </div>
            
            {/* Secondary project images (Mock showcase gallery) */}
            {secondaryImages.length > 0 && (
              <div className="pt-8 space-y-6 border-t border-border">
                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Gallery & Process</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {secondaryImages.map((img: any, idx: number) => (
                    <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.url}
                        alt={`${project.title} detail ${idx + 1}`}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
