import { useState, useEffect, useMemo } from 'react';

interface UseLazyLoadingOptions {
  initialCount?: number;
  increment?: number;
  delay?: number;
}

export function useLazyLoading<T>(
  items: T[],
  options: UseLazyLoadingOptions = {}
) {
  const {
    initialCount = 6,
    increment = 4,
    delay = 300
  } = options;

  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);

  // Reset visible count when items change
  useEffect(() => {
    setVisibleCount(initialCount);
  }, [items.length, initialCount]);

  const visibleItems = useMemo(() => {
    return items.slice(0, visibleCount);
  }, [items, visibleCount]);

  const hasMore = visibleCount < items.length;

  const loadMore = () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + increment, items.length));
      setIsLoading(false);
    }, delay);
  };

  return {
    visibleItems,
    hasMore,
    isLoading,
    loadMore,
    visibleCount,
    totalCount: items.length
  };
}