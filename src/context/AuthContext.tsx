import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

// Create context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Mock user data for demonstration
const mockUsers = [
  {
    id: '1',
    email: 'alif@gmail.com',
    password: 'alif123',
    name: 'Regular User',
    role: 'user' as const,
  },
  {
    id: '2',
    email: 'vodka@gmail.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for saved user in localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('aliphoria_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // This is a mock authentication - in a real app, you would call an API
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    // Remove password before storing user
    const { password: _, ...userWithoutPassword } = foundUser;
    
    // Save to state and localStorage
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    localStorage.setItem('aliphoria_user', JSON.stringify(userWithoutPassword));
  };

  const register = async (name: string, email: string, password: string) => {
    // In a real app, you would call an API to register the user
    // This is a mock implementation
    const existingUser = mockUsers.find((u) => u.email === email);
    
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const newUser = {
      id: `${mockUsers.length + 1}`,
      email,
      name,
      role: 'user' as const,
    };

    // Update state and localStorage
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('aliphoria_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('aliphoria_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;