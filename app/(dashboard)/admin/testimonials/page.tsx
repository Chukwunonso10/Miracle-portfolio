import React from 'react';
import { db } from '@/lib/db';
import TestimonialManagerClient from '@/components/admin/TestimonialManagerClient';
import { MOCK_TESTIMONIALS } from '@/lib/data';

async function getTestimonialsData() {
  let testimonials = MOCK_TESTIMONIALS;

  try {
    await db.$queryRaw`SELECT 1`;
    const dbTestimonials = await db.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    });
    if (dbTestimonials.length > 0) {
      testimonials = dbTestimonials.map((t: any) => ({
        id: t.id,
        clientName: t.clientName,
        clientRole: t.clientRole,
        clientCompany: t.clientCompany,
        clientAvatar: t.clientAvatar,
        testimonialText: t.testimonialText,
        rating: t.rating,
        isFeatured: t.isFeatured,
      }));
    }
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : String(error);
    console.warn('DB read failed for Testimonial Manager, fallback triggered:', errMessage);
  }

  return testimonials;
}

export const revalidate = 0; // Dynamic editor page

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonialsData();

  return (
    <div className="space-y-8 page-transition">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Endorsements</h1>
        <p className="text-sm text-muted-foreground font-light mt-1">
          Review and showcase testimonials from corporate and luxury branding clients.
        </p>
      </div>

      <TestimonialManagerClient initialTestimonials={testimonials as any} />
    </div>
  );
}
