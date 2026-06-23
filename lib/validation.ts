import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const projectFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  description: z.string().min(10, 'Short description must be at least 10 characters'),
  content: z.string().min(20, 'Content details must be at least 20 characters'),
  client: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  year: z.string().optional().nullable(),
  url: z.string().url('Invalid URL format').or(z.string().length(0)).optional().nullable(),
  isFeatured: z.boolean().default(false),
  categoryId: z.string().uuid('Invalid category selected'),
  images: z.array(
    z.object({
      url: z.string().url(),
      key: z.string(),
      isCover: z.boolean().default(false),
    })
  ).min(1, 'Please upload at least one project image'),
});

export const serviceFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  benefits: z.array(z.string().min(2, 'Benefit item must be valid')).min(1, 'Add at least one benefit'),
  deliverables: z.array(z.string().min(2, 'Deliverable item must be valid')).min(1, 'Add at least one deliverable'),
  priceRange: z.string().optional().nullable(),
  icon: z.string().min(1, 'Lucide icon name is required'),
});

export const testimonialFormSchema = z.object({
  clientName: z.string().min(2, 'Client name must be at least 2 characters'),
  clientRole: z.string().min(2, 'Client role must be at least 2 characters'),
  clientCompany: z.string().optional().nullable(),
  clientAvatar: z.string().url('Invalid avatar URL').or(z.string().length(0)).optional().nullable(),
  testimonialText: z.string().min(10, 'Testimonial text must be at least 10 characters'),
  rating: z.number().min(1).max(5).default(5),
  isFeatured: z.boolean().default(false),
});
