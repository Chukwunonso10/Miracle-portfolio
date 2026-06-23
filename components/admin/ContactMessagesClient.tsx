'use client';

import React, { useState } from 'react';
import { Mail, Trash2, CheckCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date | string;
}

export default function ContactMessagesClient({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const markAsRead = async (id: string) => {
    // Optimistic UI update
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
    );

    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });
    } catch (e) {
      console.error('Failed to mark message as read', e);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    // Optimistic UI update
    setMessages((prev) => prev.filter((msg) => msg.id !== id));

    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.error('Failed to delete message', e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">
          Messages Inbox ({messages.filter((m) => !m.isRead).length} Unread)
        </h2>
      </div>

      {messages.length > 0 ? (
        <div className="border border-border rounded-xl overflow-hidden divide-y divide-border bg-card">
          {messages.map((msg) => {
            const isExpanded = expandedId === msg.id;
            return (
              <div
                key={msg.id}
                className={`p-6 transition-colors duration-200 ${
                  !msg.isRead ? 'bg-secondary/40' : 'bg-transparent'
                }`}
              >
                {/* Header summaries */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
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
                  </div>
                  
                  {/* Meta items */}
                  <div className="flex items-center space-x-3 shrink-0">
                    <span className="text-xs text-muted-foreground/80 font-light flex items-center space-x-1">
                      <Clock size={12} />
                      <span>
                        {new Date(msg.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </span>
                    <button
                      onClick={() => toggleExpand(msg.id)}
                      className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Expand Message"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Expanded content view */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-border/60 space-y-4 animate-fade-in">
                    <p className="text-muted-foreground text-sm font-light leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </p>
                    
                    {/* Action buttons */}
                    <div className="flex items-center space-x-4 pt-2">
                      {!msg.isRead && (
                        <button
                          onClick={() => markAsRead(msg.id)}
                          className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-accent transition-colors"
                        >
                          <CheckCircle size={14} />
                          <span>Mark Read</span>
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                        <span>Delete Message</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-border rounded-xl bg-card">
          <p className="text-muted-foreground text-sm font-light">Inbox is clear. No messages received yet!</p>
        </div>
      )}
    </div>
  );
}
