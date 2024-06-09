import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { cookies } from 'next/headers';
import '@/styles/globals.css';
import AppProvider from '@/app/context/app.context';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';;

export const metadata: Metadata = {
  title: 'DevDocs',
  description: 'Blog for developers',
};

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get('token');

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
          <Toaster position="top-right" richColors></Toaster>
          <Header></Header>
          <AppProvider initToken={token?.value}>
              <div className="w-full">{children}</div>
          </AppProvider>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
