import { Header } from '@/app/components/Header';
import { MovieCard } from '@/app/components/MovieCard';
import { movies } from '@/data/movies';
import { useAuth } from '@/contexts/AuthContext';

export function MyListPage() {
  const { myList } = useAuth();
  const myMovies = movies.filter(m => myList.includes(m.id));

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-28 px-8 pb-20">
        <h1 className="text-white text-4xl mb-4">My List</h1>
        <p className="text-gray-400 mb-12">
          {myMovies.length === 0
            ? 'No movies in your list yet. Start adding some!'
            : `You have ${myMovies.length} ${myMovies.length === 1 ? 'movie' : 'movies'} in your list`}
        </p>

        {myMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {myMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl">Your list is empty</p>
            <p className="mt-2">Browse movies and add them to your list!</p>
          </div>
        )}
      </div>
    </div>
  );
}
