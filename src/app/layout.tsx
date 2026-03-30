import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Job Board SaaS - Find Your Dream Job in Europe',
  description: 'Modern job board platform with AI-powered features',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
