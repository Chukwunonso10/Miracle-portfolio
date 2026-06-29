import React from 'react';
import { db } from '@/lib/db';
import ServiceManagerClient from '@/components/admin/ServiceManagerClient';
import { MOCK_SERVICES } from '@/lib/data';

async function getServicesData() {
  let services = MOCK_SERVICES;

  try {
    await db.$queryRaw`SELECT 1`;
    const dbServices = await db.service.findMany({
      orderBy: { name: 'asc' }
    });


    if (dbServices.length > 0) {
      services = dbServices.map((s: any) => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
        description: s.description,
        benefits: s.benefits,
        deliverables: s.deliverables,
        priceRange: s.priceRange,
        icon: s.icon,
      }));
    }

  } catch (error) {
    const errMessage = error instanceof Error ? error.message : String(error);
    console.warn('DB read failed for Services Manager, fallback triggered:', errMessage);
  }

  return services;
}

export const revalidate = 0; // Dynamic editor page

export default async function AdminServicesPage() {
  const services = await getServicesData();

  return (
    <div className="space-y-8 page-transition">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Service Listings</h1>
        <p className="text-sm text-muted-foreground font-light mt-1">
          Configure service titles, rates, benefit guidelines, and deliverables.
        </p>
      </div>

      <ServiceManagerClient initialServices={services as any} />
    </div>
  );
}
