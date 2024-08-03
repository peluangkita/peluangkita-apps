'use client'
import { useEffect,useState } from 'react';
import { Hind } from 'next/font/google';
import '@/styles/globals.css';
import Head from './head';
import { Providers } from '@/lib/providers';
import RootLoading from './loading';
import HeaderLanding from '@/components/landing/Header';
import FooterLanding from '@/components/landing/Footer';
import CategoryMenu from '@/components/landing/CategoryMenu';

const hind = Hind({ 
  weight: ['300','400','500','600', '700'],
  subsets: ['latin'] 
});

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

 return (
    <html lang="en">
      <Head/>
      <body className={hind.className}>
        {loading ? <RootLoading/> : (
          <Providers>
            <HeaderLanding/>
            <CategoryMenu/>
            {children}
            <FooterLanding/>
          </Providers>
        )}
      </body>
    </html>
  )
}
