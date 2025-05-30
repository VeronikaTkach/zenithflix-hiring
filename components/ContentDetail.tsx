'use client';

import React from "react";
import Image from "next/image";
import { ContentItem } from "@/types/types";
import { useWatchHistory } from "@/hooks/useWatchHistory";

interface ContentDetailProps {
  item: ContentItem;
}

export const ContentDetail: React.FC<ContentDetailProps> = ({ item }) => {
  const { addToHistory } = useWatchHistory();

  const handleWatchNow = () => {
    addToHistory(item.id, item.watchProgress);
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      <Image
        src={item.thumbnail}
        alt={item.title}
        width={400}
        height={225}
        className="w-full h-auto object-cover rounded"
        loading="lazy"
      />

      <h3 className="text-2xl font-bold">{item.title}</h3>
      <p className="text-sm text-gray-600">
        {item.year} • {item.duration} min • {item.genre}
      </p>
      <p className="text-sm font-medium">Rating: {item.rating}/10</p>
      <p className="text-base">{item.description}</p>

      {item.cast?.length > 0 && (
        <>
          <h4 className="mt-4 font-semibold">Cast</h4>
          <ul className="list-disc pl-5 space-y-1">
            {item.cast.map((actor) => (
              <li key={actor} className="text-sm">
                {actor}
              </li>
            ))}
          </ul>
        </>
      )}

      <button
        onClick={handleWatchNow}
        className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring"
      >
        Watch Now
      </button>
    </div>
  );
};
ContentDetail.displayName = "ContentDetail";
