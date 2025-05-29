'use client';
import React, { useCallback, useState } from "react";
import { useTrendingContent } from "@/hooks/useTrendingContent";
import { ContentCard } from "@/components/ContentCard";
import { Skeleton } from "@/components/Skeleton";
import { Modal } from "@/components/Modal";
import { ContentItem } from "@/types/types";

export const TrendingNow: React.FC = () => {
  const { data, loading, error } = useTrendingContent();
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
        <div className="flex overflow-x-auto gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} width="160px" height="260px" />
          ))}
        </div>
      )}

      {error && (
        <div role="alert" className="text-red-600 mt-4">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="flex overflow-x-auto overflow-y-hidden gap-4 h-[380px] p-2">
          {data.map((item) => (
            <ContentCard key={item.id} item={item} onSelect={handleSelect} />
          ))}
        </div>
      )}

      <Modal isOpen={!!selected} onClose={handleClose}>
        {selected && (
          <div>
            <h3 className="text-xl font-bold">{selected.title}</h3>
            <p>{selected.year} • {selected.rating}/10</p>
          </div>
        )}
      </Modal>
    </section>
  );
};
