'use client';

import HeroBanner from '@/components/home/HeroBanner';
import HowItWorks from '@/components/home/HowItWorks';
import CategoriesShowcase from '@/components/home/CategoriesShowcase';
import FeaturedIdeas from '@/components/home/FeaturedIdeas';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <HowItWorks />
      <CategoriesShowcase />
      <FeaturedIdeas />
      <Testimonials />
      <CallToAction />
      <Newsletter />
    </>
  );
}
