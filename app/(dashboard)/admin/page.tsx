import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { 
  Briefcase, 
  Settings, 
  Star, 
  MessageSquare, 
  ArrowRight,
  Clock,
  CheckCircle,
  EyeOff,
  Mail
} from 'lucide-react';
import { MOCK_PROJECTS, MOCK_SERVICES, MOCK_TESTIMONIALS } from '@/lib/data';

// Helper to fetch statistics with mock fallback
async function getDashboardStats() {
  let projectsCount = MOCK_PROJECTS.length;
  let servicesCount = MOCK_SERVICES.length;
  let testimonialsCount = MOCK_TESTIMONIALS.length;
  let unreadMessagesCount = 2; // Default mock unread messages
  let subscribersCount = 3; // Default mock subscribers
  let recentMessages = [
    {
      id: 'mock-msg-1',
      name: 'Sarah Connor',
      email: 'sarah@cyberdyne.com',
      subject: 'Commercial Video Inquiry',
      message: 'Looking to shoot a promotional film for our new manufacturing plant. Need high-resolution coverage.',
      isRead: false,
      createdAt: new Date(Date.now() - 3600000), // 1 hr ago
    },
    {
      id: 'mock-msg-2',
      name: 'Bruce Wayne',
      email: 'bruce@waynecorp.com',
      subject: 'Brand Identity Redesign',
      message: 'We need to refresh our conglomerate visual identity to look more modern, yet retain trust. Send package rates.',
      isRead: false,
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
    }
  ];

  try {
    // Attempt database check
    await db.$queryRaw`SELECT 1`;
    
    // DB is connected, fetch real stats
    projectsCount = await db.portfolioProject.count();
    servicesCount = await db.service.count();
    testimonialsCount = await db.testimonial.count();
    unreadMessagesCount = await db.contactMessage.count({ where: { isRead: false } });
    subscribersCount = await db.newsletterSubscription.count();
    recentMessages = await db.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : String(error);
    console.warn('Dashboard stats loader using fallback mock dataset (DB Offline):', errMessage);
  }

  return {
    projectsCount,
    servicesCount,
    testimonialsCount,
    unreadMessagesCount,
    subscribersCount,
    recentMessages,
  };
}

export const revalidate = 0; // Force dynamic rendering on dashboard page

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    { name: 'Total Projects', value: stats.projectsCount, icon: Briefcase, color: 'text-primary' },
    { name: 'Active Services', value: stats.servicesCount, icon: Settings, color: 'text-zinc-400' },
    { name: 'Testimonials', value: stats.testimonialsCount, icon: Star, color: 'text-accent' },
    { name: 'Unread Messages', value: stats.unreadMessagesCount, icon: MessageSquare, color: 'text-red-400' },
    { name: 'Subscribers', value: stats.subscribersCount, icon: Mail, color: 'text-primary' },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Overview</h1>
        <p className="text-sm text-muted-foreground font-light mt-1">
          Real-time summary of your creative portfolio content and incoming business enquiries.
        </p>
      </div>

      {/* Grid Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.name} 
              className="p-6 rounded-xl border border-border bg-card flex items-center space-x-5"
            >
              <div className={`p-4 rounded-lg bg-background border border-border ${card.color}`}>
                <Icon size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">{card.name}</p>
                <p className="text-2xl font-black text-foreground">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Contact Messages */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">Recent Enquiries</h2>
            <p className="text-xs text-muted-foreground font-light">Last 5 incoming client communications.</p>
          </div>
          <Link
            href="/admin/contact-messages"
            className="group flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors"
          >
            <span>View All</span>
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Message listings container */}
        {stats.recentMessages.length > 0 ? (
          <div className="border border-border rounded-xl overflow-hidden divide-y divide-border bg-card">
            {stats.recentMessages.map((msg) => (
              <div key={msg.id} className="p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{msg.name}</span>
                    <span className="text-xs text-muted-foreground font-mono">({msg.email})</span>
                    {!msg.isRead && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-destructive/15 text-destructive-foreground border border-destructive/25">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wide">
                    {msg.subject}
                  </p>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-3xl line-clamp-2">
                    {msg.message}
                  </p>
                </div>
                
                {/* Meta details and date */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                  <span className="text-xs text-muted-foreground font-light flex items-center space-x-1">
                    <Clock size={12} />
                    <span>
                      {new Date(msg.createdAt).toLocaleDateString(undefined, { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-border rounded-xl bg-card">
            <p className="text-muted-foreground text-sm font-light">Your mail inbox is empty. No messages yet!</p>
          </div>
        )}
      </div>

    </div>
  );
}
