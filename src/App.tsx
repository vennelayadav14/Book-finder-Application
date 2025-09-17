// src/App.tsx
import React, { useState } from 'react';
import { SearchHeader } from './components/SearchHeader';
import { BookGrid } from './components/BookGrid';
import { BookModal } from './components/BookModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { EmptyState } from './components/EmptyState';
import { searchBooks } from './services/bookService';
import { Book, SearchFilters } from './types/book';
import { useFavorites } from './hooks/useFavorites';
import { useSearchHistory } from './hooks/useSearchHistory';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const { favorites, toggleFavorite } = useFavorites();
  const { searchHistory, addToHistory } = useSearchHistory();

  const handleSearch = async (query: string, filters: SearchFilters) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const results = await searchBooks(query, filters);
      setBooks(results);
      addToHistory(query, filters.type);
    } catch (err) {
      setError('Failed to search books. Please try again.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <SearchHeader
          onSearch={handleSearch}
          searchHistory={searchHistory}
          isLoading={loading}
        />

        <main className="mt-8">
          {loading && <LoadingSpinner />}

          {error && (
            <ErrorMessage
              message={error}
              onRetry={() => setError(null)}
            />
          )}

          {!loading && !error && books.length > 0 && (
            <BookGrid
              books={books}
              favorites={favorites}
              onBookClick={handleBookClick}
              onToggleFavorite={toggleFavorite}
            />
          )}

          {!loading && !error && hasSearched && books.length === 0 && (
            <EmptyState />
          )}

          {/* ✅ Updated visible homepage description */}
          {!hasSearched && !loading && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-teal-400 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">📚</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Welcome to BookFinder
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Discover your next favorite book! Search by title, author, subject. 
                  Save your favorites and explore millions of books. Happy reading!!
                </p>
              </div>
            </div>
          )}
        </main>

        {selectedBook && (
          <BookModal
            book={selectedBook}
            isFavorite={favorites.includes(selectedBook.key)}
            onClose={handleCloseModal}
            onToggleFavorite={() => toggleFavorite(selectedBook.key)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
