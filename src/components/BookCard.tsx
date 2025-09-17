import React from 'react';
import { Heart, Calendar, User, Star, BookOpen } from 'lucide-react';
import { Book } from '../types/book';
import { getCoverImageUrl } from '../services/bookService';

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  onClick: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

export function BookCard({ book, isFavorite, onClick, onToggleFavorite }: BookCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(e);
  };

  const coverUrl = book.cover_i ? getCoverImageUrl(book.cover_i, 'M') : null;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1"
    >
      <div className="relative overflow-hidden rounded-t-xl">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-gray-400" />
          </div>
        )}
        
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-lg"
        >
          <Heart 
            className={`h-5 w-5 transition-colors duration-200 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
            }`} 
          />
        </button>

        {book.ratings_average && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-lg">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-800">
              {book.ratings_average.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-gray-900 line-clamp-2 text-lg leading-tight">
          {book.title}
        </h3>

        {book.author_name && book.author_name.length > 0 && (
          <div className="flex items-center gap-2 text-gray-600">
            <User className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm line-clamp-1">
              {book.author_name.slice(0, 2).join(', ')}
              {book.author_name.length > 2 && ` +${book.author_name.length - 2} more`}
            </span>
          </div>
        )}

        {book.first_publish_year && (
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm">{book.first_publish_year}</span>
          </div>
        )}

        {book.subject && book.subject.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {book.subject.slice(0, 3).map((subject, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
              >
                {subject}
              </span>
            ))}
            {book.subject.length > 3 && (
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{book.subject.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="pt-2 border-t border-gray-100">
          <button className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}