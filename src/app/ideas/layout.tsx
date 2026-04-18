import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Ideas | EcoSpark Hub',
  description: 'Browse, upvote, and discuss hundreds of innovative sustainability ideas aimed at protecting the environment and slowing climate change.',
  keywords: ["sustainability ideas", "green tech innovations", "climate change solutions", "community environmental projects"],
  openGraph: {
    title: 'Explore Ideas | EcoSpark Hub',
    description: 'Browse, upvote, and discuss hundreds of innovative sustainability ideas aimed at protecting the environment.',
    images: [{ url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&h=630&fit=crop' }]
  }
};

export default function IdeasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
