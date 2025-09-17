import React from 'react';
import { BookCard } from './BookCard';
import { Book } from '../types/book';

interface BookGridProps {
  books: Book[];
  favorites: string[];
  onBookClick: (book: Book) => void;
  onToggleFavorite: (bookKey: string) => void;
}

export function BookGrid({ books, favorites, onBookClick, onToggleFavorite }: BookGridProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Found {books.length} book{books.length !== 1 ? 's' : ''}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            isFavorite={favorites.includes(book.key)}
            onClick={() => onBookClick(book)}
            onToggleFavorite={() => onToggleFavorite(book.key)}
          />
        ))}
      </div>
    </div>
  );
}