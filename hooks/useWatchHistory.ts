'use client';

import { useState, useEffect } from 'react';
import { ContentItem } from '@/types/types';
import { sampleTrending } from '@/data/sampleData';

export interface HistoryItem extends ContentItem {
  progress: number;
}

const STORAGE_KEY = 'zenithflix_watch_history';

type Stored = { id: number; progress: number }[];

export function useWatchHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Читаем из localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: Stored = raw ? JSON.parse(raw) : [];
      const items = parsed
        .map(h => {
          const item = sampleTrending.find(i => i.id === h.id);
          return item ? { ...item, progress: h.progress } : null;
        })
        .filter((x): x is HistoryItem => x !== null);
      setHistory(items);
    } catch {
      setHistory([]);
    }
  }, []);

  // Для примера — метод добавления (UI пока не использует)
  const addToHistory = (id: number, progress: number) => {
    const next: Stored = [...history.map(h => ({ id: h.id, progress: h.progress }))]
      .filter(h => h.id !== id)
      .concat({ id, progress });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    // Обновляем стейт
    setHistory(
      next
        .map(h => {
          const item = sampleTrending.find(i => i.id === h.id);
          return item ? { ...item, progress: h.progress } : null;
        })
        .filter((x): x is HistoryItem => x !== null)
    );
  };

  return { history, addToHistory };
}
