/**
 * Sanitizes Supabase image URLs to ensure they work correctly with Next.js Image component
 * Handles issues with special characters and encoding
 */
export function sanitizeSupabaseUrl(url: string): string {
  if (!url) return '';
  
  // Check if it's a Supabase URL
  if (!url.includes('supabase.co')) return url;

  try {
    // Handle the specific case we're seeing in the console
    let processedUrl = url;
    
    // Fix double slashes in the URL path (but not in the protocol)
    if (url.includes('/public//')) {
      processedUrl = url.replace('/public//', '/public/');
    }
    
    // Ensure spaces and special characters are properly encoded
    // First decode to avoid double-encoding, then encode properly
    processedUrl = encodeURI(decodeURI(processedUrl));
    
    // Try to validate the URL
    try {
      new URL(processedUrl);
    } catch (e) {
      console.error('Invalid URL format:', processedUrl);
      return url; // Return the original URL if parsing fails
    }

    // Use our proxy API endpoint for Supabase URLs
    return `/api/image-proxy?url=${encodeURIComponent(processedUrl)}`;
  } catch (error) {
    console.error('Error in sanitizeSupabaseUrl:', error);
    return url; // Return the original URL if any error occurs
  }
} 