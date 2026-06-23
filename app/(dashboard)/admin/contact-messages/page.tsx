import React from 'react';
import { db } from '@/lib/db';
import ContactMessagesClient from '@/components/admin/ContactMessagesClient';

async function getContactMessages() {
  // Mock fallback
  let messages = [
    {
      id: 'mock-msg-1',
      name: 'Sarah Connor',
      email: 'sarah@cyberdyne.com',
      subject: 'Commercial Video Inquiry',
      message: 'Looking to shoot a promotional film for our new manufacturing plant. Need high-resolution coverage and aerial cinematography tags.',
      isRead: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'mock-msg-2',
      name: 'Bruce Wayne',
      email: 'bruce@waynecorp.com',
      subject: 'Brand Identity Redesign',
      message: 'We need to refresh our conglomerate visual identity to look more modern, yet retain trust. Send package rates.',
      isRead: false,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    }
  ];

  try {
    await db.$queryRaw`SELECT 1`;
    const dbMessages = await db.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    // Serialize Dates
    messages = dbMessages.map((m: any) => ({
      ...m,
      createdAt: m.createdAt.toISOString()
    }));
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : String(error);
    console.warn('DB read failed for contact-messages, using fallback:', errMessage);
  }

  return messages;
}

export const revalidate = 0; // Dynamic page

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div className="space-y-8 page-transition">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Enquiries Inbox</h1>
        <p className="text-sm text-muted-foreground font-light mt-1">
          Review and coordinate client messages and pricing inquiries.
        </p>
      </div>

      <ContactMessagesClient initialMessages={messages as any} />
    </div>
  );
}
