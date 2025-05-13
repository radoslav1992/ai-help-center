'use client';

import { useState } from 'react';

interface DirectImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function DirectImage({
  src,
  alt,
  className = '',
  style = {},
}: DirectImageProps) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    console.error(`Failed to load direct image: ${src}`);
    setIsError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    console.log('Direct image loaded successfully:', src);
    setIsLoading(false);
  };

  if (isError) {
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
        style={style}
      >
        <span className="text-gray-400 dark:text-gray-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div 
          className={`absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}
        >
          <div className="animate-pulse h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        onError={handleError}
        onLoad={handleLoad}
      />
    </>
  );
} 