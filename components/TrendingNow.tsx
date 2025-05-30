'use client';
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useContent } from '@/context/ContentContext';
import { ContentCard } from "@/components/ContentCard";
import { Skeleton } from "@/components/Skeleton";
import { Modal } from "@/components/Modal";
import { ContentItem } from "@/types/types";

export const TrendingNow: React.FC = () => {
  const { data, loading, error, refresh } = useContent();
  const [selected, setSelected] = useState<ContentItem | null>(null);

  const handleSelect = useCallback((item: ContentItem) => {
    setSelected(item);
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <section role="region" aria-labelledby="trending-heading" className="py-4">
      <h2 id="trending-heading" className="text-2xl font-semibold mb-4">
        Trending Now
      </h2>

      {loading && (
        <div className="flex overflow-x-auto overflow-y-hidden gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} width="160px" height="260px" />
          ))}
        </div>
      )}

      {error && (
        <div role="alert" className="text-red-600 mt-4">
          {error}{" "}
          <button onClick={refresh} className="underline">
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="flex overflow-x-auto overflow-y-hidden gap-4 h-[380px] p-2">
          {data.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onSelect={handleSelect}
              isSelected={selected?.id === item.id}
            />
          ))}
        </div>
      )}

      <Modal isOpen={!!selected} onClose={handleClose}>
        {selected && (
          <div className="space-y-4">
            <Image
              src={selected.thumbnail}
              alt={selected.title}
              width={400}
              height={225}
              className="w-full h-auto object-cover rounded"
              loading="lazy"
            />
            <h3 className="text-2xl font-bold">{selected.title}</h3>
            <p className="text-sm text-gray-600">
              {selected.year} • {selected.duration} min • {selected.genre}
            </p>
            <p className="text-sm font-medium">Rating: {selected.rating}/10</p>
            <p className="text-base">{selected.description}</p>
            {selected.cast?.length > 0 && (
              <>
                <h4 className="mt-4 font-semibold">Cast</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {selected.cast.map((actor) => (
                    <li key={actor} className="text-sm">
                      {actor}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};
