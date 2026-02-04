import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

export function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    let success = false;
    if (isSignup) {
      success = signup(email, password, name);
      if (!success) {
        setError('Please fill in all fields. Password must be at least 6 characters.');
        return;
      }
    } else {
      success = login(email, password);
      if (!success) {
        setError('Invalid credentials. Password must be at least 6 characters.');
        return;
      }
    }

    if (success) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1574267432644-f610fd5e1dc4?w=1920&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
      </div>

      {/* Logo */}
      <div className="absolute top-8 left-8">
        <div className="text-red-600 text-3xl tracking-tight">
          <span className="font-black">STREAMFLIX</span>
        </div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 bg-black/75 p-16 rounded-lg w-full max-w-md">
        <h1 className="text-white text-3xl mb-8">
          {isSignup ? 'Sign Up' : 'Sign In'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
          )}
          
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
          />
          
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
          />

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-4 text-gray-400 text-sm">
          {isSignup ? 'Already have an account?' : 'New to StreamFlix?'}{' '}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-white hover:underline"
          >
            {isSignup ? 'Sign in now' : 'Sign up now'}
          </button>
        </div>

        <div className="mt-8 text-gray-500 text-xs">
          <p>Demo: Use any email and password (min 6 chars)</p>
        </div>
      </div>
    </div>
  );
}
