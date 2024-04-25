'use client'

import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextType {
    login: () => void;
    logout: () => void;
    isLoggedIn: boolean;
    username: string;
    setUsername: (name: string) => void;
    id: string;
    setUserId: (id: string) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
    login: () => {},
    logout: () => {},
    isLoggedIn: false,
    username: '',
    setUsername: (name: string) => {},
    id: '',
    setUserId: (id: string) => {}
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [username, setName] = useState<string>('');
    const [id, setId] = useState<string>('');

    const login = () => setIsLoggedIn(true);
    const logout = () => {
        setIsLoggedIn(false);
        setId('');
        setUsername('');
    }
    const setUsername = (name: string) => setName(name);
    const setUserId = (id: string) => setId(id);

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, setUsername, username, setUserId, id}}>
            {children}
        </AuthContext.Provider>
    )
} 

export const useAuth = () => useContext(AuthContext);