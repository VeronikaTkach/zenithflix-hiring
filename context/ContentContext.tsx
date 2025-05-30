'use client';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { ContentItem } from '@/types/types';
import { sampleTrending } from '@/data/sampleData';

interface ContentState {
  data: ContentItem[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const ContentContext = createContext<ContentState | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(sampleTrending);
    } catch {
      setError('Failed to load trending content.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ContentContext.Provider value={{ data, loading, error, refresh: fetchData }}>
      {children}
    </ContentContext.Provider>
  );
};

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
}