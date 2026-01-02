import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Plexura - Web Development & IT Services',
  description: 'Full stack web development agency building scalable, custom-coded applications. No templates. No shortcuts. Just enterprise-quality code.',
  keywords: ['web development', 'IT services', 'digital agency', 'Las Vegas', 'MERN stack', 'React', 'Node.js'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
