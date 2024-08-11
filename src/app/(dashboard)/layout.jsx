import { Inter } from 'next/font/google';
import '../../styles/globals.css';
import { Providers } from '@/app/providers';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PeluangKita.com',
  description: 'Endless Opportunity',
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster/>
        <Providers>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
