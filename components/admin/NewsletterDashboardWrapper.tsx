'use client';
import React, { useEffect, useState } from 'react';
import NewsletterManagerClient from '@/components/admin/NewsletterManagerClient';

interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

// Wrapper that fetches subscriber data and listens for updates
export default function NewsletterDashboardWrapper({ initialSubscribers = [] }: { initialSubscribers?: Subscriber[] }) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch('/api/subscribe', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch subscribers');
      const data = await res.json();
      setSubscribers(data.subscriptions || []);
    } catch (e) {
      console.error('Error fetching newsletter subscribers:', e);
    }
  };

  useEffect(() => {
    fetchSubscribers();
    const handler = () => fetchSubscribers();
    window.addEventListener('newsletter-updated', handler);
    return () => window.removeEventListener('newsletter-updated', handler);
  }, []);

  return <NewsletterManagerClient initialSubscribers={subscribers} />;
}
