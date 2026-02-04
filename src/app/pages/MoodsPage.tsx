import { Header } from '@/app/components/Header';
import { MovieCard } from '@/app/components/MovieCard';
import { movies } from '@/data/movies';

export function MoodsPage() {
  const moods = [
    'Intense',
    'Heartwarming',
    'Suspenseful',
    'Feel-Good',
    'Dark',
    'Exciting',
    'Hilarious',
    'Epic',
    'Emotional',
    'Mind-Bending',
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-28 px-8 pb-20">
        <h1 className="text-white text-4xl mb-12">Browse by Mood</h1>

        {moods.map(mood => {
          const moodMovies = movies.filter(m => m.mood.includes(mood));
          if (moodMovies.length === 0) return null;

          return (
            <section key={mood} className="mb-12">
              <h2 className="text-white text-2xl mb-4">{mood}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {moodMovies.map(movie => (
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
