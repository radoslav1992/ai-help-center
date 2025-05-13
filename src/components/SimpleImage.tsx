'use client';

import { useState, useEffect } from 'react';

interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SimpleImage({
  src,
  alt,
  className = '',
  style = {},
}: SimpleImageProps) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Clean up the URL if needed
    let cleanSrc = src;
    
    // Fix double slashes in the path (but not in the protocol)
    if (src.includes('/public//')) {
      cleanSrc = src.replace('/public//', '/public/');
    }
    
    console.log('Original image URL:', src);
    console.log('Cleaned image URL:', cleanSrc);
    
    setImageSrc(cleanSrc);
  }, [src]);

  const handleError = () => {
    console.error(`Failed to load image: ${imageSrc}`);
    console.error('Error details: The image could not be loaded, possibly due to CORS or network issues');
    setIsError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    console.log('Image loaded successfully:', imageSrc);
    setIsLoading(false);
  };

  // Show placeholder on error
  if (isError) {
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
        style={style}
      >
        <div className="text-center p-4">
          <span className="text-gray-400 dark:text-gray-500 text-sm block mb-2">Image unavailable</span>
          <span className="text-gray-400 dark:text-gray-500 text-xs block">{imageSrc}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={style}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="animate-pulse h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={className}
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
        onError={handleError}
        onLoad={handleLoad}
        crossOrigin="anonymous"
      />
    </div>
  );
} 