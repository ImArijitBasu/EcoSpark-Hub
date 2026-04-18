import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join the Community',
  description: 'Create an EcoSpark Hub account to join the mission for a sustainable future.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
