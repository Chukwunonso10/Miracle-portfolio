import Hero from '@/components/home/Hero';
import Intro from '@/components/home/Intro';
import FeaturedWorks from '@/components/home/FeaturedWorks';
import ServicesSummary from '@/components/home/ServicesSummary';
import Stats from '@/components/home/Stats';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';
import { getFeaturedProjects, getServices, getFeaturedTestimonials } from '@/lib/data';

export const revalidate = 1800; // Revalidate cache every 30 minutes

export default async function Home() {
  // Fetch data in parallel on the server
  const [featuredProjects, services, testimonials] = await Promise.all([
    getFeaturedProjects(),
    getServices(),
    getFeaturedTestimonials(),
  ]);

  return (
    <div className="space-y-0 page-transition">
      <Hero />
      <Intro />
      <FeaturedWorks projects={featuredProjects} />
      <ServicesSummary services={services} />
      <Stats />
      <Testimonials testimonials={testimonials} />
      <CTA />
    </div>
  );
}
