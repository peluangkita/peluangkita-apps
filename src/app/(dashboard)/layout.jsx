import { Inter } from 'next/font/google';
import '../../styles/globals.css';
import { Providers } from '@/app/providers';
import DefaultLayout from '@/components/layout/DefaultLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PeluangKita.com',
  description: 'Endless Opportunity',
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
