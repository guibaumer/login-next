'use client'

import { createContext, useContext, useState } from "react";

interface AuthContextType {
    login: () => void;
    logout: () => void;
    isLoggedIn: boolean;
    username: string;
    setName: (name: string) => void;
  }

const AuthContext = createContext<AuthContextType>({
    login: () => {},
    logout: () => {},
    isLoggedIn: false,
    username: '',
    setName: (name: string) => {}
});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);
    const setName = (name: string) => setUsername(name);

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, setName, username}}>
            {children}
        </AuthContext.Provider>
    )
} 

export const useAuth = () => useContext(AuthContext);