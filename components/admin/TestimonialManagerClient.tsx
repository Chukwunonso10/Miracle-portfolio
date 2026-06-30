'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string | null;
  clientAvatar: string | null;
  testimonialText: string;
  rating: number;
  isFeatured: boolean;
}

export default function TestimonialManagerClient({
  initialTestimonials,
}: {
  initialTestimonials: Testimonial[];
}) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const [form, setForm] = useState({
    clientName: '',
    clientRole: '',
    clientCompany: '',
    clientAvatar: '',
    testimonialText: '',
    rating: 5,
    isFeatured: false,
  });

  const handleEdit = (test: Testimonial) => {
    setEditingTestimonial(test);
    setForm({
      clientName: test.clientName,
      clientRole: test.clientRole,
      clientCompany: test.clientCompany || '',
      clientAvatar: test.clientAvatar || '',
      testimonialText: test.testimonialText,
      rating: test.rating,
      isFeatured: test.isFeatured,
    });
    setIsEditing(true);
  };

  const handleNew = () => {
    setEditingTestimonial(null);
    setForm({
      clientName: '',
      clientRole: '',
      clientCompany: '',
      clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
      testimonialText: '',
      rating: 5,
      isFeatured: false,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    setTestimonials(testimonials.filter((t) => t.id !== id));
    try {
      await fetch(`/api/testimonials?id=${id}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.error('Failed to delete testimonial', e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      clientName: form.clientName,
      clientRole: form.clientRole,
      clientCompany: form.clientCompany || null,
      clientAvatar: form.clientAvatar || null,
      testimonialText: form.testimonialText,
      rating: form.rating,
      isFeatured: form.isFeatured,
    };

    try {
      if (editingTestimonial) {
        setTestimonials(
          testimonials.map((t) => (t.id === editingTestimonial.id ? { ...t, ...payload } : t))
        );

        await fetch('/api/testimonials', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingTestimonial.id, ...payload }),
        });
      } else {
        const tempId = Math.random().toString();
        setTestimonials([
          { id: tempId, ...payload },
          ...testimonials,
        ]);

        const res = await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const newTestimonial = await res.json();
          setTestimonials((prev) =>
            prev.map((t) => (t.id === tempId ? newTestimonial : t))
          );
        }
      }
    } catch (err) {
      console.error('Failed to save testimonial', err);
    }

    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {!isEditing && (
        <div className="flex justify-end">
          <button
            onClick={handleNew}
            className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-gold-gradient text-zinc-950 hover:opacity-90 transition-all flex items-center space-x-1.5"
          >
            <Plus size={14} />
            <span>Add Testimonial</span>
          </button>
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-xl font-bold text-foreground">
              {editingTestimonial ? 'Modify Testimonial' : 'Register Testimonial'}
            </h2>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="p-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Client Name</label>
              <input
                type="text"
                name="clientName"
                value={form.clientName}
                onChange={handleInputChange}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Client Role</label>
              <input
                type="text"
                name="clientRole"
                value={form.clientRole}
                onChange={handleInputChange}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
                placeholder="e.g. Founder, CEO"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Company Name</label>
              <input
                type="text"
                name="clientCompany"
                value={form.clientCompany}
                onChange={handleInputChange}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
                placeholder="e.g. Aura Distilleries"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Avatar Image URL</label>
              <input
                type="text"
                name="clientAvatar"
                value={form.clientAvatar}
                onChange={handleInputChange}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Star Rating</label>
              <select
                name="rating"
                value={form.rating}
                onChange={handleNumberChange}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Stars
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Testimonial Text</label>
              <textarea
                name="testimonialText"
                value={form.testimonialText}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none resize-none transition-colors"
                required
              />
            </div>

            <div className="sm:col-span-2 flex items-center space-x-3">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleCheckboxChange}
                className="h-4 w-4 bg-background border-border rounded accent-primary"
              />
              <label htmlFor="isFeatured" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground select-none cursor-pointer">
                Highlight this endorsement on the Home Page
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 border-t border-border pt-6">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest bg-gold-gradient text-zinc-950 hover:opacity-90 transition-all"
            >
              Save Endorsement
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="border border-border rounded-xl p-6 bg-card flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-accent">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} size={12} className="fill-accent" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground font-light italic leading-relaxed">
                  "{t.testimonialText}"
                </p>
                <div className="flex items-center space-x-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.clientAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200'}
                    alt={t.clientName}
                    className="w-8 h-8 rounded-full object-cover border border-border"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{t.clientName}</h4>
                    <p className="text-[9px] uppercase text-muted-foreground tracking-wider">
                      {t.clientRole} {t.clientCompany ? `@ ${t.clientCompany}` : ''}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 mt-4 border-t border-border/40">
                <button
                  onClick={() => handleEdit(t)}
                  className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary transition-colors flex items-center justify-center"
                  title="Edit Testimonial"
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-2 rounded-full border border-border text-muted-foreground hover:text-red-500 transition-colors flex items-center justify-center"
                  title="Delete Testimonial"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
