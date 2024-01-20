import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticatedState] = useState(() => {
    const storedValue = sessionStorage.getItem('isAuthenticated');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticatedState(value);
    sessionStorage.setItem('isAuthenticated', JSON.stringify(value));
  };

  useEffect(() => {
    return () => {
      // No need to clear sessionStorage in cleanup for persistent state
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
