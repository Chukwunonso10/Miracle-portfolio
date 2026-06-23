'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, AlertCircle } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  benefits: string[];
  deliverables: string[];
  priceRange: string | null;
  icon: string;
}

export default function ServiceManagerClient({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    benefitsText: '',
    deliverablesText: '',
    priceRange: '',
    icon: 'Camera',
  });

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setForm({
      name: service.name,
      slug: service.slug,
      description: service.description,
      benefitsText: service.benefits.join('\n'),
      deliverablesText: service.deliverables.join('\n'),
      priceRange: service.priceRange || '',
      icon: service.icon,
    });
    setIsEditing(true);
  };

  const handleNew = () => {
    setEditingService(null);
    setForm({
      name: '',
      slug: '',
      description: '',
      benefitsText: '',
      deliverablesText: '',
      priceRange: '',
      icon: 'Camera',
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    setServices(services.filter((s) => s.id !== id));
    // Simulated delete endpoint call
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      benefits: form.benefitsText.split('\n').filter((item) => item.trim() !== ''),
      deliverables: form.deliverablesText.split('\n').filter((item) => item.trim() !== ''),
      priceRange: form.priceRange || null,
      icon: form.icon,
    };

    if (editingService) {
      setServices(
        services.map((s) => (s.id === editingService.id ? { ...s, ...payload } : s))
      );
    } else {
      setServices([
        { id: Math.random().toString(), ...payload },
        ...services,
      ]);
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
            <span>New Service</span>
          </button>
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-xl font-bold text-foreground">
              {editingService ? 'Modify Service Details' : 'Register New Service'}
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
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Service Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">URL Slug</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleInputChange}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
                placeholder="e.g. brand-strategy"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Lucide Icon Key</label>
              <input
                type="text"
                name="icon"
                value={form.icon}
                onChange={handleInputChange}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
                placeholder="e.g. Camera, Palette, Video, Instagram"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Estimate Price Range</label>
              <input
                type="text"
                name="priceRange"
                value={form.priceRange}
                onChange={handleInputChange}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
                placeholder="e.g. $1,200 - $3,000"
              />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none resize-none transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Key Benefits (One per line)</label>
              <textarea
                name="benefitsText"
                value={form.benefitsText}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none resize-none transition-colors"
                placeholder="Adds brand visual consistency..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Deliverables List (One per line)</label>
              <textarea
                name="deliverablesText"
                value={form.deliverablesText}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none resize-none transition-colors"
                placeholder="1x Logo guideline PDF..."
                required
              />
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
              Save Service
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="border border-border rounded-xl p-6 bg-card flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-foreground">{service.name}</h3>
                  <span className="text-[10px] font-mono text-muted-foreground">[{service.icon}]</span>
                </div>
                <p className="text-xs text-muted-foreground font-light line-clamp-2 leading-relaxed">
                  {service.description}
                </p>
                {service.priceRange && (
                  <p className="text-xs font-semibold text-primary">Price: {service.priceRange}</p>
                )}
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 mt-4 border-t border-border/40">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary transition-colors flex items-center justify-center"
                  title="Edit Service"
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 rounded-full border border-border text-muted-foreground hover:text-red-500 transition-colors flex items-center justify-center"
                  title="Delete Service"
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
