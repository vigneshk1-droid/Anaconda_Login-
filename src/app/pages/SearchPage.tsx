import { useState } from 'react';
import { Search } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { MovieCard } from '@/app/components/MovieCard';
import { movies } from '@/data/movies';
import { Input } from '@/app/components/ui/input';

export function SearchPage() {
  const [query, setQuery] = useState('');

  const filteredMovies = movies.filter(
    movie =>
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.some(g => g.toLowerCase().includes(query.toLowerCase())) ||
      movie.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-28 px-8 pb-20">
        <h1 className="text-white text-4xl mb-8">Search</h1>

        <div className="relative max-w-2xl mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for movies, genres, or keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 h-14"
          />
        </div>

        {query && (
          <>
            <p className="text-gray-400 mb-8">
              {filteredMovies.length} {filteredMovies.length === 1 ? 'result' : 'results'} for "{query}"
            </p>

            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-20">
                <p className="text-xl">No results found</p>
                <p className="mt-2">Try searching for something else</p>
              </div>
            )}
          </>
        )}

        {!query && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl">Start typing to search</p>
            <p className="mt-2">Find movies by title, genre, or keyword</p>
          </div>
        )}
      </div>
    </div>
  );
}
