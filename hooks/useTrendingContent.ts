'use client';
import { useState, useEffect } from "react";
import { ContentItem } from "@/types/types";
import { sampleTrending } from "@/data/sampleData";

export function useTrendingContent() {
  const [data, setData] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate fetch
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(sampleTrending);
      } catch {
        setError("Failed to load trending content.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
