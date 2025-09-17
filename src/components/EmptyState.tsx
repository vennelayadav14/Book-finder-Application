import React from 'react';
import { Search } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
      <p className="text-gray-600 text-center max-w-md">
        We couldn't find any books matching your search criteria. 
        Try adjusting your search terms or filters.
      </p>
    </div>
  );
}