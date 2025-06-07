import { useState, useCallback } from 'react';

export function useToggleItems(items, start = 0) {
  const [index, setIndex] = useState(start);
  const toggle = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);
  return [items[index], toggle];
}
