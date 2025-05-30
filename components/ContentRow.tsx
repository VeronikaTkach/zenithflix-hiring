'use client';
import React from 'react';
import { Skeleton } from './Skeleton';

interface ContentRowProps<T> {
  title: string;
  items: T[];
  loading?: boolean;
  skeletonCount?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function ContentRow<T>({
  title,
  items,
  loading = false,
  skeletonCount = 5,
  renderItem,
}: ContentRowProps<T>) {
  const headingId = title.toLowerCase().replace(/\s+/g, '-') + '-heading';

  return (
    <section role="region" aria-labelledby={headingId} className="py-4">
      <h2 id={headingId} className="text-2xl font-semibold mb-4">
        {title}
      </h2>
      <div className="flex overflow-x-auto overflow-y-hidden gap-4 p-2">
        {loading
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <div key={i} className="w-[160px]">
                <Skeleton key={i} width="160px" height="260px" />
              </div>
            ))
          : items.map((item, idx) => renderItem(item, idx))}
      </div>
    </section>
  );
}
ContentRow.displayName = 'ContentRow';

