'use client';

import React from 'react';
import Image from 'next/image';
import { HistoryItem } from '@/hooks/useWatchHistory';

interface Props {
  item: HistoryItem;
}

export const HistoryCard: React.FC<Props> = ({ item }) => (
  <div
    role="button"
    tabIndex={0}
    className="relative w-[160px] flex-shrink-0 p-2 group focus:outline-none focus:ring focus:ring-blue-500"
  >
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
    <h3 className="mt-2 text-sm font-medium truncate">{item.title}</h3>
    <div
      className="
        absolute inset-0
        bg-black bg-opacity-50
        flex items-center justify-center
        opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200
      "
    >
      <button
        onClick={() => alert('Continue Watching')}
        className="bg-white text-black py-1 px-2 rounded focus:outline-none focus:ring"
      >
        Continue Watching
      </button>
    </div>
  </div>
);

HistoryCard.displayName = 'HistoryCard';
