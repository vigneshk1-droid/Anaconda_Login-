import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LoginPage } from '@/app/pages/LoginPage';
import { HomePage } from '@/app/pages/HomePage';
import { GenresPage } from '@/app/pages/GenresPage';
import { MoodsPage } from '@/app/pages/MoodsPage';
import { TrendingPage } from '@/app/pages/TrendingPage';
import { NewReleasesPage } from '@/app/pages/NewReleasesPage';
import { MyListPage } from '@/app/pages/MyListPage';
import { SearchPage } from '@/app/pages/SearchPage';
import { MovieDetailsPage } from '@/app/pages/MovieDetailsPage';
import { ProfilePage } from '@/app/pages/ProfilePage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/" replace />;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/home" replace /> : <LoginPage />} />
      
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/genres"
        element={
          <ProtectedRoute>
            <GenresPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/moods"
        element={
          <ProtectedRoute>
            <MoodsPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/trending"
        element={
          <ProtectedRoute>
            <TrendingPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/new-releases"
        element={
          <ProtectedRoute>
            <NewReleasesPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/my-list"
        element={
          <ProtectedRoute>
            <MyListPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/movie/:id"
        element={
          <ProtectedRoute>
            <MovieDetailsPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
