import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'bookfinder-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  const toggleFavorite = (bookKey: string) => {
    setFavorites(prev => {
      const index = prev.indexOf(bookKey);
      if (index > -1) {
        // Remove from favorites
        return prev.filter(key => key !== bookKey);
      } else {
        // Add to favorites
        return [...prev, bookKey];
      }
    });
  };

  const isFavorite = (bookKey: string) => {
    return favorites.includes(bookKey);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}