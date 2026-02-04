import { Link } from 'react-router-dom';
import { Play, Plus, Check } from 'lucide-react';
import { Movie } from '@/data/movies';
import { useAuth } from '@/contexts/AuthContext';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const { isInMyList, addToMyList, removeFromMyList } = useAuth();
  const inList = isInMyList(movie.id);

  const handleListToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inList) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie.id);
    }
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative block aspect-[2/3] rounded-lg overflow-hidden bg-gray-900 transition-transform hover:scale-105"
    >
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white mb-2">{movie.title}</h3>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-500 text-xs">
              {Math.round(movie.rating * 10)}% Match
            </span>
            <span className="text-gray-400 text-xs">{movie.year}</span>
            <span className="text-gray-400 text-xs">{movie.duration}</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full bg-white hover:bg-gray-200 transition-colors">
              <Play className="w-4 h-4 text-black" fill="currentColor" />
            </button>
            
            <button
              onClick={handleListToggle}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              {inList ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <Plus className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
