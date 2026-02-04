import { Header } from '@/app/components/Header';
import { MovieCard } from '@/app/components/MovieCard';
import { movies } from '@/data/movies';

export function GenresPage() {
  const genres = ['Action', 'Romance', 'Sci-Fi', 'Comedy', 'Thriller', 'Horror', 'Drama', 'Fantasy', 'Documentary', 'Crime'];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-28 px-8 pb-20">
        <h1 className="text-white text-4xl mb-12">Browse by Genre</h1>

        {genres.map(genre => {
          const genreMovies = movies.filter(m => m.genre.includes(genre));
          if (genreMovies.length === 0) return null;

          return (
            <section key={genre} className="mb-12">
              <h2 className="text-white text-2xl mb-4">{genre}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {genreMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
