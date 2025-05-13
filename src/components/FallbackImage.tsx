'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface FallbackImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

export default function FallbackImage({
  src,
  alt,
  className = '',
  style = {},
  width = 400,
  height = 300,
}: FallbackImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Different approaches to try loading the image
  const generateFallbacks = (originalSrc: string) => {
    // First, properly encode the URL to handle spaces and special characters
    const encodedSrc = encodeURI(decodeURI(originalSrc));
    
    // Clean the URL by fixing double slashes
    const cleanSrc = encodedSrc.includes('/public//') 
      ? encodedSrc.replace('/public//', '/public/')
      : encodedSrc;
      
    // Create different variations to try
    return [
      encodedSrc, // Encoded original URL
      cleanSrc, // Cleaned URL
      `/api/image-proxy?url=${encodeURIComponent(originalSrc)}`, // Proxy approach
      encodedSrc.replace('https://', 'http://'), // Try HTTP instead of HTTPS
    ];
  };

  const fallbacks = generateFallbacks(src);

  useEffect(() => {
    // Reset state when src changes
    setCurrentSrc(fallbacks[0]); // Use the encoded URL right away
    setFallbackIndex(0);
    setIsError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    console.error(`Failed to load image (attempt ${fallbackIndex + 1}/${fallbacks.length}):`, currentSrc);
    
    // Try next fallback if available
    if (fallbackIndex < fallbacks.length - 1) {
      const nextIndex = fallbackIndex + 1;
      console.log(`Trying fallback ${nextIndex + 1}/${fallbacks.length}:`, fallbacks[nextIndex]);
      setFallbackIndex(nextIndex);
      setCurrentSrc(fallbacks[nextIndex]);
    } else {
      // All fallbacks failed
      console.error('All image loading approaches failed');
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    console.log(`Image loaded successfully (attempt ${fallbackIndex + 1}):`, currentSrc);
    setIsLoading(false);
  };

  // Show placeholder on error
  if (isError) {
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
        style={{ ...style, width, height }}
      >
        <div className="text-center p-4">
          <span className="text-gray-400 dark:text-gray-500 text-sm block mb-2">Image unavailable</span>
          <span className="text-gray-400 dark:text-gray-500 text-xs block overflow-hidden text-ellipsis max-w-full">
            {src}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ ...style, width, height }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="animate-pulse h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={`${className} w-full h-full`}
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
        onError={handleError}
        onLoad={handleLoad}
        crossOrigin="anonymous"
      />
    </div>
  );
} 