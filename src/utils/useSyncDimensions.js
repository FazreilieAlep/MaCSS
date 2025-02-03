import { useEffect, useState, useCallback } from "react";

const useSyncDimensions = (refs) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = useCallback(() => {
    const sizes = refs.map(ref => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      }
      return { width: 0, height: 0 };
    });

    const maxWidth = Math.max(...sizes.map(size => size.width));
    const maxHeight = Math.max(...sizes.map(size => size.height));

    setDimensions({ width: maxWidth, height: maxHeight });
    // console.log(dimensions);
  }, [refs]);

  useEffect(() => {
    updateDimensions();

    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return dimensions;
};

export default useSyncDimensions;
