"use client";

import { useState, useEffect } from 'react';

export function useGoogleMaps() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // If it's already loaded, set true immediately
    if (typeof window !== 'undefined' && window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    // Otherwise, poll until it's loaded
    const checkGoogle = setInterval(() => {
      if (typeof window !== 'undefined' && window.google && window.google.maps) {
        setIsLoaded(true);
        clearInterval(checkGoogle);
      }
    }, 100);

    // Cleanup interval on unmount
    return () => clearInterval(checkGoogle);
  }, []);

  return { isLoaded };
}
