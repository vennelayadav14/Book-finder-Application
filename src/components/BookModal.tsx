import React from 'react';
import { X, Heart, User, Calendar, Globe, BookOpen, Star, Hash } from 'lucide-react';
import { Book } from '../types/book';
import { getCoverImageUrl } from '../services/bookService';

interface BookModalProps {
  book: Book;
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: () => void;
}

export function BookModal({ book, isFavorite, onClose, onToggleFavorite }: BookModalProps) {
  const coverUrl = book.cover_i ? getCoverImageUrl(book.cover_i, 'L') : null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 line-clamp-1">Book Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Book Cover */}
              <div className="lg:col-span-1">
                <div className="sticky top-6">
                  {coverUrl ? (
                    <img
                      src={coverUrl}
                      alt={`Cover of ${book.title}`}
                      className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                    />
                  ) : (
                    <div className="w-full max-w-sm mx-auto h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  
                  <button
                    onClick={onToggleFavorite}
                    className={`w-full mt-4 px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                      isFavorite
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                </div>
              </div>

              {/* Book Information */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h1>
                  
                  {book.ratings_average && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-lg">{book.ratings_average.toFixed(1)}</span>
                      </div>
                      {book.ratings_count && (
                        <span className="text-gray-600">({book.ratings_count.toLocaleString()} ratings)</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {book.author_name && book.author_name.length > 0 && (
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Authors</h3>
                        <p className="text-gray-700">
                          {book.author_name.join(', ')}
                        </p>
                      </div>
                    </div>
                  )}

                  {book.first_publish_year && (
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">First Published</h3>
                        <p className="text-gray-700">{book.first_publish_year}</p>
                      </div>
                    </div>
                  )}

                  {book.number_of_pages_median && (
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Pages</h3>
                        <p className="text-gray-700">{book.number_of_pages_median}</p>
                      </div>
                    </div>
                  )}

                  {book.language && book.language.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Languages</h3>
                        <p className="text-gray-700">
                          {book.language.slice(0, 5).join(', ')}
                          {book.language.length > 5 && ` +${book.language.length - 5} more`}
                        </p>
                      </div>
                    </div>
                  )}

                  {book.publisher && book.publisher.length > 0 && (
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Publishers</h3>
                        <p className="text-gray-700">
                          {book.publisher.slice(0, 3).join(', ')}
                          {book.publisher.length > 3 && ` +${book.publisher.length - 3} more`}
                        </p>
                      </div>
                    </div>
                  )}

                  {book.isbn && book.isbn.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Hash className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">ISBN</h3>
                        <p className="text-gray-700 font-mono text-sm">
                          {book.isbn[0]}
                          {book.isbn.length > 1 && ` +${book.isbn.length - 1} more`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {book.subject && book.subject.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Subjects</h3>
                    <div className="flex flex-wrap gap-2">
                      {book.subject.map((subject, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}