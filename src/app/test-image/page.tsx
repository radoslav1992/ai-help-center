'use client';

import { useState } from 'react';
import BasicImage from '@/components/BasicImage';
import FallbackImage from '@/components/FallbackImage';

export default function TestImagePage() {
  const [imageUrl, setImageUrl] = useState('https://qexptgmfgdcehirzfflo.supabase.co/storage/v1/object/public/portfolio-websites/Screenshot%20202025-05-12%20at%202023.24.56.png');
  
  // Possible fixed URLs to try
  const possibleFixes = [
    { 
      label: 'Original URL', 
      url: 'https://qexptgmfgdcehirzfflo.supabase.co/storage/v1/object/public/portfolio-websites/Screenshot%20202025-05-12%20at%202023.24.56.png' 
    },
    { 
      label: 'Fix date typo (2023)', 
      url: 'https://qexptgmfgdcehirzfflo.supabase.co/storage/v1/object/public/portfolio-websites/Screenshot%202023-05-12%20at%202023.24.56.png' 
    },
    { 
      label: 'Fix date typo (2025)', 
      url: 'https://qexptgmfgdcehirzfflo.supabase.co/storage/v1/object/public/portfolio-websites/Screenshot%202025-05-12%20at%202023.24.56.png' 
    },
    { 
      label: 'Via proxy API', 
      url: `/api/image-proxy?url=${encodeURIComponent('https://qexptgmfgdcehirzfflo.supabase.co/storage/v1/object/public/portfolio-websites/Screenshot%20202025-05-12%20at%202023.24.56.png')}` 
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Loading Test</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Current URL</h2>
        <div className="bg-gray-100 p-2 rounded mb-4 break-all">
          <code>{imageUrl}</code>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {possibleFixes.map((fix, index) => (
            <button
              key={index}
              onClick={() => setImageUrl(fix.url)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Try: {fix.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Basic Image Component</h2>
          <div className="h-64 w-full bg-gray-50">
            <BasicImage 
              src={imageUrl} 
              alt="Test image" 
              className="w-full h-full object-contain" 
            />
          </div>
        </div>
        
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Fallback Image Component</h2>
          <div className="h-64 w-full bg-gray-50">
            <FallbackImage 
              src={imageUrl} 
              alt="Test image" 
              className="object-contain" 
              width={400}
              height={300}
            />
          </div>
        </div>
        
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Native HTML img tag</h2>
          <div className="h-64 w-full bg-gray-50 flex items-center justify-center">
            <img 
              src={imageUrl} 
              alt="Test image" 
              className="max-w-full max-h-full object-contain" 
              onError={(e) => console.error('Native img error')}
              onLoad={() => console.log('Native img loaded')}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 