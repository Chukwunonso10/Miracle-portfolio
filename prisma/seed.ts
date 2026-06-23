import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing database...');
  await prisma.testimonial.deleteMany({});
  await prisma.contactMessage.deleteMany({});
  await prisma.projectImage.deleteMany({});
  await prisma.portfolioProject.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.socialLink.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Seeding categories...');
  const photography = await prisma.category.create({
    data: { name: 'Photography', slug: 'photography' },
  });
  const graphicDesign = await prisma.category.create({
    data: { name: 'Graphic Design', slug: 'graphic-design' },
  });
  const branding = await prisma.category.create({
    data: { name: 'Branding', slug: 'branding' },
  });
  const mediaProduction = await prisma.category.create({
    data: { name: 'Media Production', slug: 'media-production' },
  });
  const contentCreation = await prisma.category.create({
    data: { name: 'Content Creation', slug: 'content-creation' },
  });
  const socialCampaigns = await prisma.category.create({
    data: { name: 'Social Media Campaigns', slug: 'social-media-campaigns' },
  });

  console.log('Seeding services...');
  await prisma.service.createMany({
    data: [
      {
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
    ]
  });

  console.log('Seeding portfolio projects...');
  const proj1 = await prisma.portfolioProject.create({
    data: {
      title: 'Aura Premium Gin Branding',
      slug: 'aura-gin-branding',
      description: 'Sophisticated botanical-inspired packaging and complete visual identity for a boutique distillery.',
      content: '# The Aura Project\n\nWe set out to create a visual identity that felt ancient yet contemporary. Drawing inspiration from 19th-century botanical sketches and combining it with luxury minimalist layout geometries, the packaging tells the story of the gin\'s wild forest origin.\n\n### The Strategy\nWe designed a custom label featuring double-embossed gold foil accents and tactile paper structures to emphasize high craftsmanship.',
      client: 'Aura Distilleries',
      role: 'Lead Visual Designer & Photographer',
      year: '2025',
      url: 'https://aura-spirits.com',
      isFeatured: true,
      categoryId: branding.id,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=800',
            key: 'mock-aura-cover',
            isCover: true,
          },
          {
            url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800',
            key: 'mock-aura-detail-1',
            isCover: false,
          }
        ]
      }
    }
  });

  const proj2 = await prisma.portfolioProject.create({
    data: {
      title: 'Ethereal Shadows Editorial',
      slug: 'ethereal-shadows-editorial',
      description: 'A black-and-white fashion editorial exploring high-contrast shapes, direct sunlight, and architectural lines.',
      content: '# Ethereal Shadows\n\nShot on location at the brutalist Concrete Pavilions, this series explores the collision of industrial lines and organic movements. Utilizing raw sunlight and heavy shadows, we highlighted the garments\' structured outlines.\n\n### Camera Setup\n- Leica M11 Monochrom\n- 50mm Summilux f/1.4 ASPH\n- Natural light bounce cards only',
      client: 'Vellum Magazine',
      role: 'Fashion Photographer & Director',
      year: '2025',
      url: null,
      isFeatured: true,
      categoryId: photography.id,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800',
            key: 'mock-ethereal-cover',
            isCover: true,
          },
          {
            url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800',
            key: 'mock-ethereal-detail-1',
            isCover: false,
          }
        ]
      }
    }
  });

  const proj3 = await prisma.portfolioProject.create({
    data: {
      title: 'Zenith Tech Brand Launch',
      slug: 'zenith-brand-launch',
      description: 'Social-first content campaign introducing Zenith\'s smart home integration ecosystem to European markets.',
      content: '# Zenith Smart Home Launch\n\nAn extensive social media launch that combined slick CG product renders, interactive Instagram filters, and high-energy lifestyle reels. In 4 weeks, the campaign generated over 2.4M organic impressions.\n\n### Key Campaign Pillars\n1. **Simplifying Complexity**: Interactive micro-videos illustrating smart integrations.\n2. **Aesthetic Warmth**: Product photorealism aligned with home interiors, steering away from cold blue sci-fi styles.',
      client: 'Zenith Tech Group',
      role: 'Digital Content Creator',
      year: '2026',
      url: 'https://zenith-home.io',
      isFeatured: true,
      categoryId: socialCampaigns.id,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800',
            key: 'mock-zenith-cover',
            isCover: true,
          }
        ]
      }
    }
  });

  const proj4 = await prisma.portfolioProject.create({
    data: {
      title: 'Monolith Architectural Monograph',
      slug: 'monolith-architectural-monograph',
      description: 'Graphic editorial design and custom imagery layout for Monolith Studio\'s decennial coffee table book.',
      content: '# Monolith Monograph Book\n\nWe designed a minimalist, linen-bound monograph utilizing generous grids, elegant sans-serif typography, and deep-grooved embossing. Each page provides architectural layouts next to high-exposure photography.',
      client: 'Monolith Architects',
      role: 'Editorial Graphic Designer',
      year: '2024',
      url: null,
      isFeatured: false,
      categoryId: graphicDesign.id,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800',
            key: 'mock-monolith-cover',
            isCover: true,
          }
        ]
      }
    }
  });

  console.log('Seeding testimonials...');
  await prisma.testimonial.createMany({
    data: [
      {
        clientName: 'Elena Rostova',
        clientRole: 'Creative Director',
        clientCompany: 'Aura Distilleries',
        clientAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200',
        testimonialText: 'The visual styling and brand guidelines exceeded our expectations. Our products stand out instantly on retail shelves and social feeds alike. A brilliant and meticulous creative partner.',
        rating: 5,
        isFeatured: true,
      },
      {
        clientName: 'Julian Hayes',
        clientRole: 'Founder',
        clientCompany: 'Zenith Tech Group',
        clientAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200',
        testimonialText: 'Our launch campaign was an absolute triumph. The digital assets created were beautiful, optimized, and drove immediate engagement. Professionalism and artistry combined.',
        rating: 5,
        isFeatured: true,
      },
      {
        clientName: 'Marcus Vane',
        clientRole: 'Managing Partner',
        clientCompany: 'Monolith Studio',
        clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
        testimonialText: 'A design partner that understands typography, tactile details, and minimal layout. The Monolith Monograph is a physical masterpiece. Highly recommended for corporate and luxury clients.',
        rating: 5,
        isFeatured: false,
      }
    ]
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
