'use client';

import React, { useState } from 'react';
import { Mail, Trash2, Search, Download, Clock } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

export default function NewsletterManagerClient({ initialSubscribers }: { initialSubscribers: Subscriber[] }) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);
  const [search, setSearch] = useState('');
  const [exporting, setExporting] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscription?')) return;

    // Optimistic UI update
    setSubscribers((prev) => prev.filter((sub) => sub.id !== id));

    try {
      await fetch(`/api/admin/newsletter/${id}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.error('Failed to delete subscriber', e);
    }
  };

  const handleExportCSV = () => {
    try {
      setExporting(true);
      const headers = ['ID', 'Email', 'Subscription Date'];
      const rows = subscribers.map((sub) => [
        sub.id,
        sub.email,
        new Date(sub.createdAt).toLocaleString()
      ]);

      const csvContent = 
        'data:text/csv;charset=utf-8,' + 
        [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `miracle_subscribers_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('CSV export failed:', err);
    } finally {
      setExporting(false);
    }
  };

  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold text-foreground">
          Newsletter Audience ({subscribers.length} Total)
        </h2>
        
        {subscribers.length > 0 && (
          <button
            onClick={handleExportCSV}
            disabled={exporting}
            className="flex items-center justify-center space-x-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-gold-gradient text-zinc-950 rounded-full hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
          >
            <Download size={14} />
            <span>{exporting ? 'Exporting...' : 'Export List (CSV)'}</span>
          </button>
        )}
      </div>

      {/* Filters Bar */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted-foreground pointer-events-none">
          <Search size={16} />
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter subscribers by email address..."
          className="w-full bg-card border border-border focus:border-primary pl-10 pr-4 py-3 rounded-xl text-sm placeholder:text-muted-foreground/45 focus:outline-none transition-all duration-300"
        />
      </div>

      {filteredSubscribers.length > 0 ? (
        <div className="border border-border rounded-xl overflow-hidden divide-y divide-border bg-card">
          {filteredSubscribers.map((sub) => (
            <div
              key={sub.id}
              className="p-5 flex items-center justify-between hover:bg-secondary/20 transition-colors"
            >
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="p-2.5 rounded-lg border border-border bg-background/50 text-primary shrink-0">
                  <Mail size={16} />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <p className="text-sm font-semibold text-foreground truncate">{sub.email}</p>
                  <div className="flex items-center space-x-1.5 text-xs text-muted-foreground/80 font-light">
                    <Clock size={12} />
                    <span>
                      Subscribed on {new Date(sub.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDelete(sub.id)}
                className="p-2.5 rounded-full border border-border text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors shrink-0"
                aria-label="Remove Subscriber"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-border rounded-xl bg-card">
          <p className="text-muted-foreground text-sm font-light">
            {search ? 'No matching subscribers found.' : 'Your newsletter subscriber list is empty.'}
          </p>
        </div>
      )}
    </div>
  );
}
