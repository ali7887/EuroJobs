import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Board SaaS",
  description: "Find your dream job",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              JobBoard
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Jobs
              </Link>
              <Link href="/jobs/new" className="text-gray-700 hover:text-blue-600">
                Post Job
              </Link>
              <Link href="/applications" className="text-gray-700 hover:text-blue-600">
                My Applications
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
