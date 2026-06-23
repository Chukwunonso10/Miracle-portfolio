import { db } from './db';

// High-quality mock fallback data representing premium projects, services, and testimonials
export const MOCK_CATEGORIES = [
  { id: 'cat-photo', name: 'Photography', slug: 'photography' },
  { id: 'cat-graphic', name: 'Graphic Design', slug: 'graphic-design' },
  { id: 'cat-brand', name: 'Branding', slug: 'branding' },
  { id: 'cat-media', name: 'Media Production', slug: 'media-production' },
  { id: 'cat-content', name: 'Content Creation', slug: 'content-creation' },
  { id: 'cat-campaign', name: 'Social Media Campaigns', slug: 'social-media-campaigns' },
];

export const MOCK_SERVICES = [
  {
    id: 'srv-1',
    name: 'Commercial & Editorial Photography',
    slug: 'commercial-photography',
    description: 'High-end imagery designed to represent brands, products, and fashion editorials with cinematic depth and narrative focus.',
    benefits: [
      'Enhances brand image and perceived value',
      'Tailored styling aligned with brand style guides',
      'Professional color grading and flawless retouching'
    ],
    deliverables: [
      'High-resolution digital files (JPG, TIFF)',
      'Commercial usage rights license',
      'Online proofing and review gallery'
    ],
    priceRange: '$1,500 - $5,000',
    icon: 'Camera'
  },
  {
    id: 'srv-2',
    name: 'Brand Identity Design',
    slug: 'brand-identity-design',
    description: 'Strategic visual identity construction that communicates core values, establishes market trust, and resonates with target audiences.',
    benefits: [
      'Consistent, recognizable cross-channel representation',
      'Differentiates from industry competitors',
      'Scale-ready logo system and asset structures'
    ],
    deliverables: [
      'Primary, secondary, and submark logo files (SVG, PDF, PNG)',
      'Complete brand guidelines document (typography, color, rules)',
      'Stationery and business card layouts'
    ],
    priceRange: '$2,000 - $6,000',
    icon: 'Palette'
  },
  {
    id: 'srv-3',
    name: 'Social Media Management',
    slug: 'social-media-management',
    description: 'End-to-end management of social profiles including visual asset planning, copy curation, community management, and trend-focused campaign strategies.',
    benefits: [
      'Consistent engagement and profile growth',
      'Professional aesthetic alignment across platforms',
      'Time saved for core business operations'
    ],
    deliverables: [
      'Weekly content calendars & scheduling plan',
      'Custom reels, posts, and story templates',
      'Monthly analytics and conversion tracking logs'
    ],
    priceRange: '$1,200 - $3,500 / month',
    icon: 'Instagram'
  },
  {
    id: 'srv-4',
    name: 'Video Production & Direction',
    slug: 'video-production',
    description: 'Cinematic storytelling ranging from event coverage and promotional brand films to corporate interviews and narrative-driven reels.',
    benefits: [
      'Engaging video assets that convert viewers',
      'Fully directed and polished audio-visual narratives',
      'Adaptable files optimized for both desktop and mobile platforms'
    ],
    deliverables: [
      '1x Master Brand Film (2-3 minutes, 4K)',
      '3x Social Cutdowns (15-30 seconds, 9:16)',
      'Licensed background audio tracks'
    ],
    priceRange: '$3,000 - $10,000',
    icon: 'Video'
  }
];

export const MOCK_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Aura Premium Gin Branding',
    slug: 'aura-gin-branding',
    description: 'Sophisticated botanical-inspired packaging and complete visual identity for a boutique distillery.',
    content: '# The Aura Project\n\nWe set out to create a visual identity that felt ancient yet contemporary. Drawing inspiration from 19th-century botanical sketches and combining it with luxury minimalist layout geometries, the packaging tells the story of the gin\'s wild forest origin.\n\n### The Strategy\nWe designed a custom label featuring double-embossed gold foil accents and tactile paper structures to emphasize high craftsmanship.',
    client: 'Aura Distilleries',
    role: 'Lead Visual Designer & Photographer',
    year: '2025',
    url: 'https://aura-spirits.com',
    isFeatured: true,
    categoryId: 'cat-brand',
    category: MOCK_CATEGORIES.find(c => c.id === 'cat-brand')!,
    images: [
      {
        id: 'img-1a',
        url: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=800',
        key: 'mock-aura-cover',
        isCover: true,
      },
      {
        id: 'img-1b',
        url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800',
        key: 'mock-aura-detail-1',
        isCover: false,
      }
    ]
  },
  {
    id: 'proj-2',
    title: 'Ethereal Shadows Editorial',
    slug: 'ethereal-shadows-editorial',
    description: 'A black-and-white fashion editorial exploring high-contrast shapes, direct sunlight, and architectural lines.',
    content: '# Ethereal Shadows\n\nShot on location at the brutalist Concrete Pavilions, this series explores the collision of industrial lines and organic movements. Utilizing raw sunlight and heavy shadows, we highlighted the garments\' structured outlines.\n\n### Camera Setup\n- Leica M11 Monochrom\n- 50mm Summilux f/1.4 ASPH\n- Natural light bounce cards only',
    client: 'Vellum Magazine',
    role: 'Fashion Photographer & Director',
    year: '2025',
    url: null,
    isFeatured: true,
    categoryId: 'cat-photo',
    category: MOCK_CATEGORIES.find(c => c.id === 'cat-photo')!,
    images: [
      {
        id: 'img-2a',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800',
        key: 'mock-ethereal-cover',
        isCover: true,
      },
      {
        id: 'img-2b',
        url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800',
        key: 'mock-ethereal-detail-1',
        isCover: false,
      }
    ]
  },
  {
    id: 'proj-3',
    title: 'Zenith Tech Brand Launch',
    slug: 'zenith-brand-launch',
    description: 'Social-first content campaign introducing Zenith\'s smart home integration ecosystem to European markets.',
    content: '# Zenith Smart Home Launch\n\nAn extensive social media launch that combined slick CG product renders, interactive Instagram filters, and high-energy lifestyle reels. In 4 weeks, the campaign generated over 2.4M impressions.\n\n### Key Campaign Pillars\n1. **Simplifying Complexity**: Interactive micro-videos illustrating smart integrations.\n2. **Aesthetic Warmth**: Product photorealism aligned with home interiors, steering away from cold blue sci-fi styles.',
    client: 'Zenith Tech Group',
    role: 'Digital Content Creator',
    year: '2026',
    url: 'https://zenith-home.io',
    isFeatured: true,
    categoryId: 'cat-campaign',
    category: MOCK_CATEGORIES.find(c => c.id === 'cat-campaign')!,
    images: [
      {
        id: 'img-3a',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800',
        key: 'mock-zenith-cover',
        isCover: true,
      }
    ]
  },
  {
    id: 'proj-4',
    title: 'Monolith Architectural Monograph',
    slug: 'monolith-architectural-monograph',
    description: 'Graphic editorial design and custom imagery layout for Monolith Studio\'s decennial coffee table book.',
    content: '# Monolith Monograph Book\n\nWe designed a minimalist, linen-bound monograph utilizing generous grids, elegant sans-serif typography, and deep-grooved embossing. Each page provides architectural layouts next to high-exposure photography.',
    client: 'Monolith Architects',
    role: 'Editorial Graphic Designer',
    year: '2024',
    url: null,
    isFeatured: false,
    categoryId: 'cat-graphic',
    category: MOCK_CATEGORIES.find(c => c.id === 'cat-graphic')!,
    images: [
      {
        id: 'img-4a',
        url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800',
        key: 'mock-monolith-cover',
        isCover: true,
      }
    ]
  }
];

export const MOCK_TESTIMONIALS = [
  {
    id: 'test-1',
    clientName: 'Elena Rostova',
    clientRole: 'Creative Director',
    clientCompany: 'Aura Distilleries',
    clientAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200',
    testimonialText: 'The visual styling and brand guidelines exceeded our expectations. Our products stand out instantly on retail shelves and social feeds alike. A brilliant and meticulous creative partner.',
    rating: 5,
    isFeatured: true,
  },
  {
    id: 'test-2',
    clientName: 'Julian Hayes',
    clientRole: 'Founder',
    clientCompany: 'Zenith Tech Group',
    clientAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200',
    testimonialText: 'Our launch campaign was an absolute triumph. The digital assets created were beautiful, optimized, and drove immediate engagement. Professionalism and artistry combined.',
    rating: 5,
    isFeatured: true,
  },
  {
    id: 'test-3',
    clientName: 'Marcus Vane',
    clientRole: 'Managing Partner',
    clientCompany: 'Monolith Studio',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
    testimonialText: 'A design partner that understands typography, tactile details, and minimal layout. The Monolith Monograph is a physical masterpiece. Highly recommended for corporate and luxury clients.',
    rating: 5,
    isFeatured: false,
  }
];

// Resilient helper to check if PostgreSQL connection is operational
async function isDbConnected(): Promise<boolean> {
  try {
    await db.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    return false;
  }
}

export async function getCategories() {
  if (await isDbConnected()) {
    try {
      return await db.category.findMany({
        orderBy: { name: 'asc' }
      });
    } catch (e) {
      console.warn('DB read failed, using fallback categories', e);
    }
  }
  return MOCK_CATEGORIES;
}

export async function getServices() {
  if (await isDbConnected()) {
    try {
      return await db.service.findMany({
        orderBy: { name: 'asc' }
      });
    } catch (e) {
      console.warn('DB read failed, using fallback services', e);
    }
  }
  return MOCK_SERVICES;
}

export async function getProjects() {
  if (await isDbConnected()) {
    try {
      return await db.portfolioProject.findMany({
        include: {
          category: true,
          images: true
        },
        orderBy: { createdAt: 'desc' }
      });
    } catch (e) {
      console.warn('DB read failed, using fallback projects', e);
    }
  }
  return MOCK_PROJECTS;
}

export async function getFeaturedProjects() {
  if (await isDbConnected()) {
    try {
      return await db.portfolioProject.findMany({
        where: { isFeatured: true },
        include: {
          category: true,
          images: true
        },
        orderBy: { createdAt: 'desc' }
      });
    } catch (e) {
      console.warn('DB read failed, using fallback featured projects', e);
    }
  }
  return MOCK_PROJECTS.filter(p => p.isFeatured);
}

export async function getProjectBySlug(slug: string) {
  if (await isDbConnected()) {
    try {
      const proj = await db.portfolioProject.findUnique({
        where: { slug },
        include: {
          category: true,
          images: true
        }
      });
      if (proj) return proj;
    } catch (e) {
      console.warn('DB read failed, using fallback project', e);
    }
  }
  return MOCK_PROJECTS.find(p => p.slug === slug) || null;
}

export async function getTestimonials() {
  if (await isDbConnected()) {
    try {
      return await db.testimonial.findMany({
        orderBy: { createdAt: 'desc' }
      });
    } catch (e) {
      console.warn('DB read failed, using fallback testimonials', e);
    }
  }
  return MOCK_TESTIMONIALS;
}

export async function getFeaturedTestimonials() {
  if (await isDbConnected()) {
    try {
      return await db.testimonial.findMany({
        where: { isFeatured: true }
      });
    } catch (e) {
      console.warn('DB read failed, using fallback featured testimonials', e);
    }
  }
  return MOCK_TESTIMONIALS.filter(t => t.isFeatured);
}
