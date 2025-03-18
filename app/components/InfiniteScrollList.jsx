"use client";

import { useState, useRef, useCallback } from "react";

export function InfiniteScrollList({ fetcher, render}) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const currentPage = page;
    const nextPage = currentPage + 1;
    const response = await fetcher({ page: nextPage });
    const { data, meta } = response;
    setItems((prev) => [...prev, ...data]);
    setPage(nextPage);
    if (nextPage > meta.totalPages) {
      setHasMore(false);
    }
    setLoading(false);
  }, [page, fetcher]);

  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchItems();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchItems]
  );

  return (
    <div>
      {items.map(render)}
      <div className="px-2">
        {loading ? (
          <p className="uppercase">Loading...</p>
        ) : (
          hasMore && <button ref={lastItemRef}>Load more</button>
        )}
      </div>
    </div>
  );
}
