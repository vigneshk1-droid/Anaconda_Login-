import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  myList: string[];
  addToMyList: (movieId: string) => void;
  removeFromMyList: (movieId: string) => void;
  isInMyList: (movieId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [myList, setMyList] = useState<string[]>(() => {
    const savedList = localStorage.getItem('myList');
    return savedList ? JSON.parse(savedList) : [];
  });

  const login = (email: string, password: string) => {
    // Mock authentication
    if (email && password.length >= 6) {
      const newUser = { email, name: email.split('@')[0] };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const signup = (email: string, password: string, name: string) => {
    // Mock signup
    if (email && password.length >= 6 && name) {
      const newUser = { email, name };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addToMyList = (movieId: string) => {
    const newList = [...myList, movieId];
    setMyList(newList);
    localStorage.setItem('myList', JSON.stringify(newList));
  };

  const removeFromMyList = (movieId: string) => {
    const newList = myList.filter(id => id !== movieId);
    setMyList(newList);
    localStorage.setItem('myList', JSON.stringify(newList));
  };

  const isInMyList = (movieId: string) => {
    return myList.includes(movieId);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, myList, addToMyList, removeFromMyList, isInMyList }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
