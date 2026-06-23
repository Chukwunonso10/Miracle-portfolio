'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, AlertCircle } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  client: string | null;
  role: string | null;
  year: string | null;
  url: string | null;
  isFeatured: boolean;
  categoryId: string;
  category?: { name: string };
  images: { id?: string; url: string; isCover: boolean }[];
}

interface Category {
  id: string;
  name: string;
}

interface ProjectManagerProps {
  initialProjects: Project[];
  categories: Category[];
}

export default function ProjectManagerClient({ initialProjects, categories }: ProjectManagerProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  // Form fields state
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    client: '',
    role: '',
    year: '',
    url: '',
    isFeatured: false,
    categoryId: categories[0]?.id || '',
    imageUrl: '',
  });

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      slug: project.slug,
      description: project.description,
      content: project.content,
      client: project.client || '',
      role: project.role || '',
      year: project.year || '',
      url: project.url || '',
      isFeatured: project.isFeatured,
      categoryId: project.categoryId,
      imageUrl: project.images[0]?.url || '',
    });
    setIsEditing(true);
  };

  const handleNew = () => {
    setEditingProject(null);
    setForm({
      title: '',
      slug: '',
      description: '',
      content: '',
      client: '',
      role: '',
      year: new Date().getFullYear().toString(),
      url: '',
      isFeatured: false,
      categoryId: categories[0]?.id || '',
      imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800', // Default premium image placeholder
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    // Optimistic delete
    setProjects(projects.filter(p => p.id !== id));

    try {
      await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Failed to delete project', e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      images: [{ url: form.imageUrl, isCover: true, key: 'uploaded' }]
    };

    if (editingProject) {
      // Edit mode
      const updatedProjects = projects.map(p => {
        if (p.id === editingProject.id) {
          return {
            ...p,
            ...payload,
            category: { name: categories.find(c => c.id === form.categoryId)?.name || '' }
          };
        }
        return p;
      });
      setProjects(updatedProjects as any);

      try {
        await fetch('/api/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProject.id, ...payload }),
        });
      } catch (e) {
        console.error('Failed to update project', e);
      }
    } else {
      // Create mode
      const newProj = {
        id: Math.random().toString(),
        ...payload,
        category: { name: categories.find(c => c.id === form.categoryId)?.name || '' }
      };
      setProjects([newProj as any, ...projects]);

      try {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (e) {
        console.error('Failed to create project', e);
      }
    }

    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top action row */}
      {!isEditing && (
        <div className="flex justify-end">
          <button
            onClick={handleNew}
            className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-gold-gradient text-zinc-950 hover:opacity-90 active:scale-95 transition-all flex items-center space-x-1.5"
          >
            <Plus size={14} />
            <span>New Project</span>
          </button>
        </div>
      )}

      {/* Interactive Form Panel */}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-xl font-bold text-foreground">
              {editingProject ? 'Modify Project' : 'Register New Project'}
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
            
            {/* Title */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Project Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">URL Slug</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleInputChange}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
                placeholder="e.g. aura-gin-branding"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Category</label>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleInputChange}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Cover Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleInputChange}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Client */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Client Name</label>
              <input
                type="text"
                name="client"
                value={form.client}
                onChange={handleInputChange}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Creative Role</label>
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleInputChange}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
                placeholder="e.g. Lead Photographer"
              />
            </div>

            {/* Year */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Year</label>
              <input
                type="text"
                name="year"
                value={form.year}
                onChange={handleInputChange}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
              />
            </div>

            {/* Live Link URL */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Live Project URL</label>
              <input
                type="text"
                name="url"
                value={form.url}
                onChange={handleInputChange}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
                placeholder="e.g. https://clientwebsite.com"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Short Summary Description</label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Markdown content */}
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Detailed Narrative (Markdown)</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleInputChange}
                rows={8}
                className="w-full bg-background border border-border focus:border-primary px-4 py-3 rounded-lg text-sm text-foreground focus:outline-none resize-none transition-colors"
                placeholder="# Detailed header \n\nAdd process and details..."
                required
              />
            </div>

            {/* Featured Checkbox */}
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
                Highlight this project as Featured on the Home Page
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
              Save Project
            </button>
          </div>
        </form>
      ) : (
        /* Project listings grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const coverImage = project.images[0]?.url || 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800';
            return (
              <div 
                key={project.id} 
                className="border border-border rounded-xl overflow-hidden bg-card flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] w-full border-b border-border/80">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale"
                  />
                  {project.isFeatured && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[8px] font-bold uppercase bg-primary text-zinc-950 tracking-wider">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">
                      {project.category?.name || 'Category'}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mt-0.5">{project.title}</h3>
                    <p className="text-xs text-muted-foreground font-light mt-1 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border/45">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary transition-colors flex items-center justify-center"
                      title="Edit Project"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 rounded-full border border-border text-muted-foreground hover:text-red-500 transition-colors flex items-center justify-center"
                      title="Delete Project"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
