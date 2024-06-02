import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { cookies } from 'next/headers';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import AppProvider from '@/app/context/app.context';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

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
        <div className="min-h-screen overflow-hidden">
          <ToastContainer></ToastContainer>
          <Header></Header>
          <AppProvider initToken={token?.value}>{children}</AppProvider>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
