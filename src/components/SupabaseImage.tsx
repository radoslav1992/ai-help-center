'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { sanitizeSupabaseUrl } from '@/lib/imageUtils';

interface SupabaseImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  onError?: () => void;
}

export default function SupabaseImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  onError,
}: SupabaseImageProps) {
  const [isError, setIsError] = useState(false);
  const [isProxyError, setIsProxyError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Reset states when src changes
    setIsError(false);
    setIsProxyError(false);
    setIsLoading(true);
    
    // Sanitize the URL
    const sanitized = sanitizeSupabaseUrl(src);
    console.log('Original URL:', src);
    console.log('Sanitized URL:', sanitized);
    setImageSrc(sanitized);
  }, [src]);

  // Handle image load error
  const handleError = () => {
    console.error(`Failed to load image: ${imageSrc}`);
    console.error(`Original URL was: ${src}`);
    
    // If we're already using the original URL or we've already tried the proxy and it failed
    if (isProxyError || !imageSrc.startsWith('/api/image-proxy')) {
      setIsError(true);
      setIsLoading(false);
      // Call the external onError handler if provided
      if (onError) {
        onError();
      }
    } else {
      // Try the original URL directly if the proxy fails
      console.log('Proxy failed, trying original URL directly:', src);
      setIsProxyError(true);
      setImageSrc(src);
    }
  };

  // Handle image load success
  const handleLoad = () => {
    console.log('Image loaded successfully:', imageSrc);
    setIsLoading(false);
  };

  // Show placeholder on error
  if (isError) {
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
        style={!fill ? { width: width || 100, height: height || 100 } : undefined}
      >
        <span className="text-gray-400 dark:text-gray-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div 
        className={`bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${className}`}
        style={!fill ? { width: width || 100, height: height || 100 } : undefined}
      >
        <div className="animate-pulse h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>
    );
  }

  // Check if it's a Supabase URL
  const isSupabaseUrl = imageSrc.includes('supabase.co');

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
      unoptimized={true} // Skip Next.js image optimization for all images
    />
  );
} 