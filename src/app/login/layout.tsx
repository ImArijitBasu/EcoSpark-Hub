import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Access your EcoSpark Hub account to vote and share sustainability ideas.',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
