import { Header } from '@/app/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Film } from 'lucide-react';
import { movies } from '@/data/movies';

export function ProfilePage() {
  const { user, myList } = useAuth();
  const myMovies = movies.filter(m => myList.includes(m.id));

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-28 px-8 pb-20 max-w-4xl mx-auto">
        <h1 className="text-white text-4xl mb-12">Profile Settings</h1>

        <div className="bg-gray-900 rounded-lg p-8 mb-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-white text-2xl mb-2">{user?.name}</h2>
              <p className="text-gray-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {user?.email}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <h3 className="text-white text-xl mb-4">Account Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Name</label>
                <p className="text-white text-lg">{user?.name}</p>
              </div>
              
              <div>
                <label className="text-gray-400 text-sm">Email</label>
                <p className="text-white text-lg">{user?.email}</p>
              </div>
              
              <div>
                <label className="text-gray-400 text-sm">Member Since</label>
                <p className="text-white text-lg">January 2026</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-8">
          <h3 className="text-white text-xl mb-4 flex items-center gap-2">
            <Film className="w-5 h-5" />
            My Statistics
          </h3>
          
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="text-gray-400 text-sm mb-1">Movies in List</p>
              <p className="text-white text-3xl">{myMovies.length}</p>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm mb-1">Favorite Genre</p>
              <p className="text-white text-3xl">
                {myMovies.length > 0 ? 'Action' : '-'}
              </p>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm mb-1">Watched</p>
              <p className="text-white text-3xl">{Math.floor(myMovies.length * 1.5)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
