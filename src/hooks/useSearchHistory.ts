import { useState, useEffect } from 'react';
import { SearchHistoryItem } from '../types/book';

const SEARCH_HISTORY_KEY = 'bookfinder-search-history';
const MAX_HISTORY_ITEMS = 10;

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  // Load search history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  }, [searchHistory]);

  const addToHistory = (query: string, type: string) => {
    const newItem: SearchHistoryItem = {
      query: query.trim(),
      type,
      timestamp: Date.now(),
    };

    setSearchHistory(prev => {
      // Remove any existing entry with the same query and type
      const filtered = prev.filter(
        item => !(item.query.toLowerCase() === query.toLowerCase() && item.type === type)
      );
      
      // Add the new item at the beginning and limit the total count
      return [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return {
    searchHistory,
    addToHistory,
    clearHistory,
  };
}