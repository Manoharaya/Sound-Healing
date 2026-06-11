import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sound Therapy | Lemuria",
  description: "Experience the calming effects of therapeutic sound in a safe and supportive environment.",
};

export default function SoundHealingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
