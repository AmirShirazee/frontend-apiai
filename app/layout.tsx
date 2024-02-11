import '@/public/css/style.css';
import { Inter } from 'next/font/google';
import Theme from './theme-provider';
import AppProvider from './app-provider';
import React from 'react';
import { getServerSession } from 'next-auth';
import AuthProvider from '@/app/components/Providers';
import ReduxProvider from '@/app/components/ReduxProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'ApiAi',
  description: 'Automated integration test generator',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-inter antialiased bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400`}
      >
        <AppProvider>
          <AuthProvider session={session} refetchInterval={5 * 60} refetchOnWindowFocus={true}>
            <ReduxProvider>
              <Theme>{children}</Theme>
            </ReduxProvider>
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
