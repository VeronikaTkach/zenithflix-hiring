'use client';
import React, { useCallback, useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { ContentCard } from '@/components/ContentCard';
import { Modal } from '@/components/Modal';
import { ContentDetail } from '@/components/ContentDetail';
import { ContentItem } from '@/types/types';
import { ContentRowInfinite } from './ContentRowInfinite';

export const TrendingNow: React.FC = () => {
  const { data, loading, error, refresh } = useContent();
  const [selected, setSelected] = useState<ContentItem | null>(null);

  const handleSelect = useCallback((item: ContentItem) => {
    setSelected(item);
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <>
      {error && (
        <div role="alert" className="text-red-600 mt-4">
          {error}{' '}
          <button onClick={refresh} className="underline">
            Retry
          </button>
        </div>
      )}
      <ContentRowInfinite
        title="Trending Now"
        loading={loading}
        items={data}
        renderItem={item => (
          <ContentCard
            key={item.id}
            item={item}
            onSelect={handleSelect}
            isSelected={selected?.id === item.id}
          />
        )}
        itemWidth={160}
        gap={16}
      />

      <Modal isOpen={!!selected} onClose={handleClose}>
        {selected && <ContentDetail item={selected} />}
      </Modal>
    </>
  );
};
