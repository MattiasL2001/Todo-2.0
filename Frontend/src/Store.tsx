import React, { useState, createContext, ReactNode } from "react";

interface Auth {
  isAuthenticated: boolean;
}

interface User {
  name: string;
  id: number;
}

interface StoreContextProps {
  children: ReactNode;
}

const initialAuth: Auth = {
  isAuthenticated: false,
};

const initialUser: User = {
  name: "",
  id: 0,
};

export const Context = createContext<any>(null);

const Store: React.FC<StoreContextProps> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState<Auth>(initialAuth);
  const [user, setUserDetails] = useState<User>(initialUser);

  const contextValue = [isAuthenticated, setAuthenticated, user, setUserDetails];

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default Store;
