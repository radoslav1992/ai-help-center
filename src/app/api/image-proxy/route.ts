import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get the URL from the query parameter
  const url = request.nextUrl.searchParams.get('url');
  
  if (!url) {
    console.error('Missing URL parameter in image proxy');
    return NextResponse.json(
      { error: 'Missing URL parameter' },
      { status: 400 }
    );
  }
  
  try {
    // Decode the URL if it's encoded
    const decodedUrl = decodeURIComponent(url);
    console.log('Image proxy processing URL:', decodedUrl);
    
    // Handle special case of double slashes in Supabase URLs
    let processedUrl = decodedUrl;
    if (decodedUrl.includes('/public//')) {
      processedUrl = decodedUrl.replace('/public//', '/public/');
      console.log('Fixed double slashes in URL:', processedUrl);
    }
    
    // Ensure spaces and special characters are properly encoded
    // First decode to avoid double-encoding, then encode properly
    processedUrl = encodeURI(decodeURI(processedUrl));
    console.log('URL after encoding:', processedUrl);
    
    // Ensure the URL is properly formatted
    try {
      new URL(processedUrl);
    } catch (e) {
      console.error('Invalid URL format:', processedUrl);
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }
    
    console.log('Fetching image from URL:', processedUrl);
    
    // Fetch the image from Supabase with proper headers
    const response = await fetch(processedUrl, {
      headers: {
        'Accept': 'image/*',
        'Cache-Control': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      cache: 'no-store',
      next: { revalidate: 0 },
    });
    
    if (!response.ok) {
      console.error(`Error fetching image: ${response.status} ${response.statusText}`);
      console.error(`URL was: ${processedUrl}`);
      
      // Log response headers for debugging
      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });
      console.error('Response headers:', headers);
      
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }
    
    // Log successful response
    console.log(`Image fetched successfully: ${response.status} ${response.statusText}`);
    
    // Get the image data as an array buffer
    const imageBuffer = await response.arrayBuffer();
    
    if (!imageBuffer || imageBuffer.byteLength === 0) {
      console.error('Received empty image buffer');
      return NextResponse.json(
        { error: 'Empty image data received' },
        { status: 500 }
      );
    }
    
    console.log(`Image buffer size: ${imageBuffer.byteLength} bytes`);
    
    // Get the content type from the response
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    console.log('Image proxy returning content type:', contentType);
    
    // Return the image with the correct content type
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  } catch (error: any) {
    console.error('Error in image proxy:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image', details: error.message },
      { status: 500 }
    );
  }
} 