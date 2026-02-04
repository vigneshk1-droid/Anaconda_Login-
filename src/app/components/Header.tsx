import { Link, useLocation } from 'react-router-dom';
import { Search, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/home', label: 'Home' },
    { path: '/genres', label: 'Genres' },
    { path: '/moods', label: 'Moods' },
    { path: '/trending', label: 'Trending' },
    { path: '/new-releases', label: 'New' },
    { path: '/my-list', label: 'My List' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="text-red-600 text-3xl tracking-tight">
            <span className="font-black">STREAMFLIX</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm transition-colors hover:text-white ${
                  location.pathname === item.path ? 'text-white' : 'text-gray-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/search"
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Search className="w-5 h-5 text-white" />
            </Link>
            
            <Link
              to="/profile"
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <User className="w-5 h-5 text-white" />
            </Link>

            <button
              onClick={logout}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>

            <div className="text-sm text-white">
              {user?.name}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
