import { Header } from '@/app/components/Header';
import { MovieCard } from '@/app/components/MovieCard';
import { movies } from '@/data/movies';

export function TrendingPage() {
  const trendingMovies = movies.filter(m => m.trending);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-28 px-8 pb-20">
        <h1 className="text-white text-4xl mb-4">Trending Now</h1>
        <p className="text-gray-400 mb-12">The most popular movies right now</p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {trendingMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
