'use client';

import React from 'react';
import Image from 'next/image';
import { useWatchHistory, HistoryItem } from '@/hooks/useWatchHistory';

export const WatchHistory: React.FC = () => {
  const { history } = useWatchHistory();

  if (history.length === 0) return null;

  return (
    <section role="region" aria-labelledby="history-heading" className="py-4">
      <h2 id="history-heading" className="text-2xl font-semibold mb-4">
        Continue Watching
      </h2>
      <div className="flex overflow-x-auto gap-4">
        {history.map((item: HistoryItem) => (
          <div key={item.id} className="relative w-[160px] flex-shrink-0">
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={160}
              height={240}
              className="object-cover rounded"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300">
              <div
                className="h-full bg-blue-600"
                style={{ width: `${item.progress}%` }}
              />
            </div>
            <h3 className="mt-2 text-sm font-medium">{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
