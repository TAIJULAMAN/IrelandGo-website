"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    name: string;
    email: string;
    phone: string;
    role: "user" | "agent";
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => boolean;
    signup: (userData: User & { password: string }) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const signup = (userData: User & { password: string }) => {
        const { password, ...userWithoutPassword } = userData;

        // Store user credentials
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        users.push({ email: userData.email, password, role: userData.role });
        localStorage.setItem("users", JSON.stringify(users));

        // Set current user
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);

        // Redirect to appropriate dashboard
        if (userData.role === "agent") {
            router.push("/dashboard/agent");
        } else {
            router.push("/dashboard/user");
        }
    };

    const login = (email: string, password: string): boolean => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUser = users.find(
            (u: any) => u.email === email && u.password === password
        );

        if (foundUser) {
            const userData: User = {
                name: email.split("@")[0], // Simple name extraction
                email: foundUser.email,
                phone: "", // You might want to store this during signup
                role: foundUser.role,
            };

            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);

            // Redirect to appropriate dashboard
            if (foundUser.role === "agent") {
                router.push("/dashboard/agent");
            } else {
                router.push("/dashboard/user");
            }

            return true;
        }

        return false;
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        router.push("/auth/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                signup,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
