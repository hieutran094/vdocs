import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { cookies } from 'next/headers';
import '@/styles/globals.css';
import AppProvider from '@/app/context/app.context';
import Loading from '@/app/components/loading';

export const metadata: Metadata = {
  title: 'DevDocs - Authentication',
  description: 'Login to manager your posts',
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
        <div className="min-h-screen overflow-hidden">
          <Toaster position="top-right" richColors></Toaster>
          <AppProvider initToken={token?.value}>
            <Loading />
            <div className="flex flex-col mt-12 md:mt-24 items-center justify-center px-6 py-8 mx-auto lg:py-0">
              <div className="flex">
                <h1 className="-mt-15 mb-5 text-4xl font-extrabold tracking-tight font-display sm:text-3xl md:text-4xl xl:text-5xl">
                  <span className="block xl:inline">
                    Dev<span className="text-cool-indigo-600">Docs</span>
                  </span>
                </h1>
              </div>
              {children}
            </div>
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
