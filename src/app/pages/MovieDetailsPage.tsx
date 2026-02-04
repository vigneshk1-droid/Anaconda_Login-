import { useParams, Link } from 'react-router-dom';
import { Play, Plus, Check, ArrowLeft } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { MovieCard } from '@/app/components/MovieCard';
import { movies } from '@/data/movies';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/app/components/ui/button';

export function MovieDetailsPage() {
  const { id } = useParams();
  const { isInMyList, addToMyList, removeFromMyList } = useAuth();
  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl mb-4">Movie not found</h1>
          <Link to="/home" className="text-red-600 hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const inList = isInMyList(movie.id);
  const similarMovies = movies
    .filter(m => m.id !== movie.id && m.genre.some(g => movie.genre.includes(g)))
    .slice(0, 6);

  const handleListToggle = () => {
    if (inList) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie.id);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] pt-20">
        <div className="absolute inset-0">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-end px-8 pb-12">
          <div className="max-w-3xl">
            <Link to="/home" className="inline-flex items-center gap-2 text-white mb-4 hover:underline">
              <ArrowLeft className="w-5 h-5" />
              Back
            </Link>
            
            <h1 className="text-white text-6xl mb-4">{movie.title}</h1>
            
            <div className="flex items-center gap-4 mb-6 text-white">
              <span className="text-green-500">{Math.round(movie.rating * 10)}% Match</span>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
              <span className="px-2 py-1 border border-gray-400 text-sm">HD</span>
            </div>

            <div className="flex gap-4">
              <Button className="bg-white hover:bg-gray-200 text-black px-8">
                <Play className="w-5 h-5 mr-2" fill="currentColor" />
                Play
              </Button>
              
              <Button
                onClick={handleListToggle}
                className="bg-gray-600/70 hover:bg-gray-600 text-white px-8"
              >
                {inList ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    In My List
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Add to List
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="relative z-20 px-8 py-12">
        <div className="max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-white text-2xl mb-4">About</h2>
              <p className="text-gray-300 text-lg mb-6">{movie.description}</p>
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-gray-400 text-sm mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genre.map(genre => (
                    <span key={genre} className="px-3 py-1 bg-gray-800 text-white text-sm rounded">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm mb-2">Moods</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.mood.map(mood => (
                    <span key={mood} className="px-3 py-1 bg-gray-800 text-white text-sm rounded">
                      {mood}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <section className="mt-16">
            <h2 className="text-white text-2xl mb-4">More Like This</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {similarMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
