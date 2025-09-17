import { Book, SearchFilters } from '../types/book';

const BASE_URL = 'https://openlibrary.org';

/**
 * Search for books using the Open Library API
 * @param query - The search query
 * @param filters - Search filters and options
 * @returns Promise<Book[]> - Array of book results
 */
export async function searchBooks(query: string, filters: SearchFilters): Promise<Book[]> {
  try {
    // Construct the search URL based on filter type
    const searchParam = getSearchParam(filters.type, query);
    const url = `${BASE_URL}/search.json?${searchParam}&limit=${filters.limit}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.docs) {
      return [];
    }

    // Transform and sort the results
    let books = data.docs.map(transformBookData);
    books = sortBooks(books, filters.sortBy);
    
    return books;
  } catch (error) {
    console.error('Error searching books:', error);
    throw new Error('Failed to search books');
  }
}

/**
 * Get the appropriate search parameter based on filter type
 */
function getSearchParam(type: string, query: string): string {
  const encodedQuery = encodeURIComponent(query);
  
  switch (type) {
    case 'author':
      return `author=${encodedQuery}`;
    case 'subject':
      return `subject=${encodedQuery}`;
    case 'isbn':
      return `isbn=${encodedQuery}`;
    case 'title':
    default:
      return `title=${encodedQuery}`;
  }
}

/**
 * Transform raw API data to our Book interface
 */
function transformBookData(doc: any): Book {
  return {
    key: doc.key,
    title: doc.title,
    author_name: doc.author_name,
    first_publish_year: doc.first_publish_year,
    subject: doc.subject?.slice(0, 5), // Limit subjects to 5
    isbn: doc.isbn,
    cover_i: doc.cover_i,
    publisher: doc.publisher,
    language: doc.language,
    number_of_pages_median: doc.number_of_pages_median,
    ratings_average: doc.ratings_average,
    ratings_count: doc.ratings_count,
  };
}

/**
 * Sort books based on the selected criteria
 */
function sortBooks(books: Book[], sortBy: string): Book[] {
  return [...books].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.ratings_average || 0) - (a.ratings_average || 0);
      case 'new':
        return (b.first_publish_year || 0) - (a.first_publish_year || 0);
      case 'old':
        return (a.first_publish_year || 0) - (b.first_publish_year || 0);
      case 'relevance':
      default:
        return 0; // Keep original order for relevance
    }
  });
}

/**
 * Get the cover image URL for a book
 * @param coverId - The cover ID from the book data
 * @param size - The size of the cover image (S, M, L)
 * @returns string - The cover image URL
 */
export function getCoverImageUrl(coverId: number, size: 'S' | 'M' | 'L' = 'L'): string {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}