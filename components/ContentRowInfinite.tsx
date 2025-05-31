'use client';

import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  KeyboardEvent,
  WheelEvent,
} from 'react';
import { Skeleton } from '@/components/Skeleton';

interface ContentRowInfiniteProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemWidth: number;
  gap: number;
  loading?: boolean;
  skeletonCount?: number;
}

export function ContentRowInfinite<T>({
  title,
  items,
  renderItem,
  itemWidth,
  gap,
  loading = false,
  skeletonCount = 5,
}: ContentRowInfiniteProps<T>) {
  const headingId = `${title.toLowerCase().replace(/\s+/g, '-')}-heading`;
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState<number>(0);

  useEffect(() => {
    function calculateVisible() {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const perScreen = Math.ceil(width / (itemWidth + gap));
      setVisibleCount(perScreen);
    }
    calculateVisible();
    window.addEventListener('resize', calculateVisible);
    return () => window.removeEventListener('resize', calculateVisible);
  }, [itemWidth, gap]);

  useEffect(() => {
    if (loading) return;
    const container = containerRef.current;
    const sentinel = sentinelRef.current;
    if (!container || !sentinel) return;

    const perScreen = Math.ceil(container.clientWidth / (itemWidth + gap));

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisibleCount(vc => Math.min(vc + perScreen, items.length));
        }
      },
      {
        root: container,
        rootMargin: '0px',
        threshold: 1.0,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [items.length, itemWidth, gap, loading]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      if (containerRef.current) {
        const perScreen = Math.ceil(
          containerRef.current.clientWidth / (itemWidth + gap)
        );
        setVisibleCount(vc => Math.min(vc + perScreen, items.length));
      }
    }
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    if (e.deltaY !== 0) {
      e.preventDefault();
      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <section role="region" aria-labelledby={headingId} className="py-4">
      <h2 id={headingId} className="text-2xl font-semibold mb-4">
        {title}
      </h2>

      <div
        ref={containerRef}
        className="flex overflow-x-auto overflow-y-hidden gap-4 p-2 focus:outline-none"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
      >
        {loading
          ?
            Array.from({ length: skeletonCount }).map((_, i) => (
              <div key={i} style={{ width: itemWidth }} className="flex-shrink-0">
                <Skeleton width="100%" height="240px" />
              </div>
            ))
          :
            items.slice(0, visibleCount).map((item, idx) => renderItem(item, idx))}

        {!loading && visibleCount < items.length && (
          <div
            ref={sentinelRef}
            style={{ width: '1px', height: '100%' }}
          />
        )}
      </div>
    </section>
  );
}
ContentRowInfinite.displayName = 'ContentRowInfinite';
