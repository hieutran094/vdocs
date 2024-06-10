import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { Toaster } from 'sonner';
import '@/styles/globals.css';
import AppProvider from '@/app/context/app.context';
import Sidebar from '@/app/components/admin/Sidebar';
import Header from '@/app/components/admin/Header';
import Loading from '@/app/components/Loading';

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
        <div className="min-h-screen h-full">
          <Toaster position="top-right" richColors></Toaster>
          <AppProvider initToken={token?.value}>
            <Loading />
            <div className="flex w-full h-full min-h-[inherit] overflow-hidden overflow-y-auto">
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
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
