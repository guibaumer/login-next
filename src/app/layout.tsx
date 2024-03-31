import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Login',
  description: 'A login page developed with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        {children}
        <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
