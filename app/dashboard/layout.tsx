import React from 'react';
import { getServerSession } from 'next-auth';
import Sidebar from '@/app/components/ui/sidebar';
import Header from '@/app/components/ui/header';

export default async function DefaultLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header />

        <main className="grow [&>*:first-child]:scroll-mt-16">{children}</main>
      </div>
    </div>
  );
}
