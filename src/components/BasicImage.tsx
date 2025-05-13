'use client';

import { useState } from 'react';

interface BasicImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function BasicImage({ src, alt, className = '' }: BasicImageProps) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // The issue might be with the date format in the URL
  // The URL contains "202025-05-12" which looks like an invalid date
  // Let's try to fix this specifically for this problematic URL
  let fixedSrc = src;
  if (src.includes('Screenshot%20202025-05-12')) {
    // This looks like a typo in the date - likely should be 2025-05-12 or 2023-05-12
    console.log('Detected problematic date format in URL, attempting to fix');
    fixedSrc = src.replace('Screenshot%20202025-05-12', 'Screenshot%202025-05-12');
  }

  const handleError = () => {
    console.error(`BasicImage: Failed to load: ${fixedSrc}`);
    setIsError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    console.log('BasicImage: Loaded successfully');
    setIsLoading(false);
  };

  if (isError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-center p-2">
          <p className="text-sm">Image unavailable</p>
          <p className="text-xs overflow-hidden text-ellipsis">{src}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-pulse h-4 w-4 bg-gray-300 rounded-full"></div>
        </div>
      )}
      <img
        src={fixedSrc}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
} 