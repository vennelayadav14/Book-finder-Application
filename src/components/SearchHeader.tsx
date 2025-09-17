import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, Clock, BookOpen } from 'lucide-react';
import { SearchFilters, SearchHistoryItem } from '../types/book';

interface SearchHeaderProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  searchHistory: SearchHistoryItem[];
  isLoading: boolean;
}

export function SearchHeader({ onSearch, searchHistory, isLoading }: SearchHeaderProps) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    type: 'title',
    sortBy: 'relevance',
    limit: 20,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), filters);
      setShowHistory(false);
    }
  };

  const handleHistoryClick = (historyItem: SearchHistoryItem) => {
    setQuery(historyItem.query);
    setFilters(prev => ({ ...prev, type: historyItem.type as any }));
    setShowHistory(false);
    onSearch(historyItem.query, { ...filters, type: historyItem.type as any });
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
          <BookOpen className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            BookFinder
          </h1>
          <p className="text-gray-600 text-sm">Discover your next favorite book</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative" ref={inputRef}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowHistory(searchHistory.length > 0)}
              placeholder={`Search by ${filters.type}...`}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none text-lg"
              disabled={isLoading}
            />
          </div>

          {/* Search History Dropdown */}
          {showHistory && searchHistory.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10 max-h-60 overflow-y-auto">
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Clock className="h-4 w-4" />
                  Recent Searches
                </div>
              </div>
              {searchHistory.slice(0, 5).map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleHistoryClick(item)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between group"
                >
                  <span className="text-gray-800">{item.query}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full group-hover:bg-gray-200 transition-colors">
                    {item.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200"
          >
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>

          <div className="flex gap-2">
            {(['title', 'author', 'subject', 'isbn'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilters(prev => ({ ...prev, type }))}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filters.type === type
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-xl"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-gray-50 rounded-xl p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Rating</option>
                  <option value="new">Newest First</option>
                  <option value="old">Oldest First</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Results per page
                </label>
                <select
                  value={filters.limit}
                  onChange={(e) => setFilters(prev => ({ ...prev, limit: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </form>
    </header>
  );
}