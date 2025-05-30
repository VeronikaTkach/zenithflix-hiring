'use client';
import React from 'react';
import { useWatchHistory, HistoryItem } from '@/hooks/useWatchHistory';
import { HistoryCard } from '@/components/HistoryCard';

export const WatchHistory: React.FC = () => {
  const { history } = useWatchHistory();

  return (
    <section role="region" aria-labelledby="history-heading" className="py-4">
      <h2 id="history-heading" className="text-2xl font-semibold mb-4">
        Continue Watching
      </h2>

      {history.length === 0 ? (
        <div className="flex overflow-x-auto gap-4 p-2">
          <div className="relative w-[160px] h-[260px] flex-shrink-0 box-border p-2 border-2 border-dashed border-gray-400 rounded flex items-center justify-center text-center text-sm text-gray-500">
            Start watching movies and they will appear here
          </div>
        </div>
      ) : (
        <div className="flex overflow-x-auto overflow-y-hidden gap-4 p-2">
          {history.map((item: HistoryItem) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};
