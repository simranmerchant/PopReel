// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import AuthProvider from './providers/AuthProvider';
import SideNav from './layouts/SideNav'; // You'll need to create this component

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PopReel',
  description: 'A TikTok-like app built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex">
            <SideNav />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
