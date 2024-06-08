import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { Toaster } from 'sonner';
import '@/styles/globals.css';
import AppProvider from '@/app/context/app.context';
import Sidebar from '@/app/components/admin/Sidebar';
import Header from '@/app/components/admin/Header';
import { Suspense } from 'react';
import Loading from '@/app/components/loading';

export const metadata: Metadata = {
  title: 'DevDocs - Admin',
  description: 'Manager your posts',
};

const inter = Inter({ subsets: ['latin'] });
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get('token');

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen h-screen">
          <Toaster position="top-right" richColors></Toaster>
          <AppProvider initToken={token?.value}>
            <Suspense fallback={<Loading></Loading>}>
              <div className="flex w-full min-h-full overflow-hidden overflow-y-auto">
                <Sidebar></Sidebar>
                <div className="w-full min-h-full bg-[#F1F5F9]">
                  <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
                    <div className="h-full">
                      <Header></Header>
                      {children}
                    </div>
                  </main>
                </div>
              </div>
            </Suspense>
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
