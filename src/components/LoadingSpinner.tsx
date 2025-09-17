import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 animate-pulse">
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Searching books...</h3>
      <p className="text-gray-600 text-center">
        We're exploring millions of books to find the perfect matches for you.
      </p>
    </div>
  );
}