import { useEffect, useRef } from 'react';

export function useAutoScroll(dependencies) {
  const containerRef = useRef(null);
  useEffect(() => {
    const containerElement = containerRef.current;
    if (containerElement) {
      containerElement.scrollTop = containerElement.scrollHeight;
    }
  }, [dependencies]);

  return containerRef;
}
