'use client'

import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextType {
    login: () => void;
    logout: () => void;
    isLoggedIn: boolean;
    username: string;
    setName: (name: string) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
    login: () => {},
    logout: () => {},
    isLoggedIn: false,
    username: '',
    setName: (name: string) => {}
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
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