'use client';

import { useState } from 'react';

interface StaticImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function StaticImage({
  src,
  alt,
  className = '',
  width,
  height
}: StaticImageProps) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fix the URL for Supabase images - replace render/image with object
  let fixedSrc = src;
  if (src.includes('supabase.co') && src.includes('render/image')) {
    fixedSrc = src.replace('render/image', 'object');
    console.log('Fixed Supabase URL:', fixedSrc);
  }

  const handleError = () => {
    console.error(`StaticImage: Failed to load: ${fixedSrc}`);
    setIsError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    console.log('StaticImage: Loaded successfully');
    setIsLoading(false);
  };

  if (isError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width: width || '100%', height: height || '100%' }}
      >
        <div className="text-center p-2">
          <p className="text-sm">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ width: width || '100%', height: height || '100%' }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-pulse h-4 w-4 bg-gray-300 rounded-full"></div>
        </div>
      )}
      <img
        src={fixedSrc}
        alt={alt}
        className={className}
        style={{ 
          opacity: isLoading ? 0 : 1, 
          transition: 'opacity 0.3s ease-in-out',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        onError={handleError}
        onLoad={handleLoad}
        loading="eager"
      />
    </div>
  );
} 