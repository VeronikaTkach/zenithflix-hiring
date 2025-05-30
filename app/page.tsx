'use client';
import React from 'react';
import { ContentProvider } from '@/context/ContentContext';
import { WatchHistory } from '@/components/WatchHistory';
import { TrendingNow } from '@/components/TrendingNow';

export default function HomePage() {
  return (
    <ContentProvider>
      <main className="p-6 space-y-8">
        <WatchHistory />
        <TrendingNow />
      </main>
    </ContentProvider>
  );
}