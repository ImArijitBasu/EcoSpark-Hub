import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${apiUrl}/ideas/${params.id}`, { cache: 'no-store' });
    const data = await res.json();
    
    if (!data.data) {
      return { title: 'Idea Not Found' };
    }

    const idea = data.data;
    const strippedDesc = idea.description.substring(0, 160) + (idea.description.length > 160 ? '...' : '');
    const imageUrl = idea.images?.[0] || 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?q=80&w=1200&h=630&fit=crop';

    return {
      title: idea.title,
      description: strippedDesc,
      openGraph: {
        title: idea.title,
        description: strippedDesc,
        type: "article",
        url: `/ideas/${params.id}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: idea.title,
          }
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: idea.title,
        description: strippedDesc,
        images: [imageUrl],
      }
    };
  } catch (error) {
    return {
      title: 'EcoSpark Hub Idea',
      description: 'View this sustainable idea on EcoSpark Hub'
    };
  }
}

export default function IdeaDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
