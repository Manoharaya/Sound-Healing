import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sound Therapy | Heart Strong",
  description: "Experience profound emotional restoration through acoustic sound therapy, crystal bowls, and gongs.",
};

export default function SoundHealingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
