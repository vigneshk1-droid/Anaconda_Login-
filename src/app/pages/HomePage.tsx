import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/app/components/Header';
import { MovieCard } from '@/app/components/MovieCard';
import { movies } from '@/data/movies';
import { Button } from '@/app/components/ui/button';

export function HomePage() {
  const featuredMovie = movies.find(m => m.featured);
  const trendingMovies = movies.filter(m => m.trending);
  const newReleases = movies.filter(m => m.newRelease);
  const actionMovies = movies.filter(m => m.genre.includes('Action'));

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      {featuredMovie && (
        <div className="relative h-[80vh] pt-20">
          <div className="absolute inset-0">
            <img
              src={featuredMovie.image}
              alt={featuredMovie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          <div className="relative z-10 h-full flex items-center px-8 max-w-4xl">
            <div>
              <h1 className="text-white text-6xl mb-4">{featuredMovie.title}</h1>
              <div className="flex items-center gap-4 mb-6 text-white">
                <span className="text-green-500">{Math.round(featuredMovie.rating * 10)}% Match</span>
                <span>{featuredMovie.year}</span>
                <span>{featuredMovie.duration}</span>
                <span className="px-2 py-1 border border-gray-400 text-sm">HD</span>
              </div>
              <p className="text-white text-lg mb-8 max-w-xl">
                {featuredMovie.description}
              </p>
              <div className="flex gap-4">
                <Button className="bg-white hover:bg-gray-200 text-black px-8">
                  <Play className="w-5 h-5 mr-2" fill="currentColor" />
                  Play
                </Button>
                <Link to={`/movie/${featuredMovie.id}`}>
                  <Button className="bg-gray-600/70 hover:bg-gray-600 text-white px-8">
                    <Info className="w-5 h-5 mr-2" />
                    More Info
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Sections */}
      <div className="relative z-20 -mt-32 pb-20">
        {/* Trending Now */}
        <section className="mb-12 px-8">
          <h2 className="text-white text-2xl mb-4">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {trendingMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* New Releases */}
        <section className="mb-12 px-8">
          <h2 className="text-white text-2xl mb-4">New Releases</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {newReleases.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Action */}
        <section className="mb-12 px-8">
          <h2 className="text-white text-2xl mb-4">Action Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {actionMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
