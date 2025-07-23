import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

interface UseLazyLoadingOptions {
  initialCount?: number;
  increment?: number;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}

export function useLazyLoading<T>(
  items: T[],
  options: UseLazyLoadingOptions = {}
) {
  const {
    initialCount = 6,
    increment = 4,
    delay = 300,
    threshold = 0.1,
    rootMargin = '100px'
  } = options;

  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Reset visible count when items change
  useEffect(() => {
    setVisibleCount(initialCount);
  }, [items.length, initialCount]);

  const visibleItems = useMemo(() => {
    const visible = items.slice(0, visibleCount);
    console.log(`📱 LazyLoading: ${items.length} total items -> ${visibleCount} visible items`);
    return visible;
  }, [items, visibleCount]);

  const hasMore = visibleCount < items.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + increment, items.length));
      setIsLoading(false);
    }, delay);
  }, [isLoading, hasMore, increment, items.length, delay]);

  // Intersection Observer for automatic loading
  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoading) {
            loadMore();
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(loadMoreRef.current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, loadMore, threshold, rootMargin]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    visibleItems,
    hasMore,
    isLoading,
    loadMore,
    visibleCount,
    totalCount: items.length,
    loadMoreRef
  };
}