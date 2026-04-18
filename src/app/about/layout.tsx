import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | EcoSpark Hub',
  description: 'Meet the team behind EcoSpark Hub. We empower communities worldwide to take actionable steps toward sustainability.',
  openGraph: {
    title: 'About Us | EcoSpark Hub',
    description: 'Meet the team behind EcoSpark Hub. We empower communities worldwide to take actionable steps toward sustainability.',
    images: [{ url: 'https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?q=80&w=1200&h=630&fit=crop' }]
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
