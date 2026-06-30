import React from 'react';
import NewsletterDashboardWrapper from '@/components/admin/NewsletterDashboardWrapper';
import { db } from '@/lib/db';

async function getNewsletterSubscribers() {
  try {
    const subs = await db.newsletterSubscription.findMany({
      select: { id: true, email: true, createdAt: true },
      orderBy: { createdAt: 'desc' }
    });
    return subs.map((sub: { id: string; email: string; createdAt: Date }) => ({
      ...sub,
      createdAt: sub.createdAt.toISOString()
    }));
  } catch (error) {
    console.error('Failed to query newsletter subscriptions:', error);
    return [];
  }
}

export const revalidate = 0; // Dynamic route

export default async function AdminNewsletterPage() {
  const subscribers = await getNewsletterSubscribers();

  return (
    <div className="space-y-8 page-transition">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Newsletter Subscriptions</h1>
        <p className="text-sm text-muted-foreground font-light mt-1">
          Monitor your newsletter audience list, clean stale entries, and export contacts for marketing campaigns.
        </p>
      </div>

      <NewsletterDashboardWrapper initialSubscribers={subscribers} />
    </div>
  );
}
