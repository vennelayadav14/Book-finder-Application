export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  subject?: string[];
  isbn?: string[];
  cover_i?: number;
  publisher?: string[];
  language?: string[];
  number_of_pages_median?: number;
  ratings_average?: number;
  ratings_count?: number;
}

export interface SearchFilters {
  type: 'title' | 'author' | 'subject' | 'isbn';
  sortBy: 'relevance' | 'rating' | 'new' | 'old';
  limit: number;
}

export interface SearchHistoryItem {
  query: string;
  type: string;
  timestamp: number;
}