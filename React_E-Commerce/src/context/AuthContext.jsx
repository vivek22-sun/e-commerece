import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("auth_user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("auth_user", JSON.stringify(user));
    else localStorage.removeItem("auth_user");
  }, [user]);

  const login = async ({ email, password }) => {
    // Simple mock authentication: accept any non-empty email/password
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Simulate server response delay
    await new Promise((r) => setTimeout(r, 300));

    const profile = {
      email,
      name: email.split("@")[0],
    };
    setUser(profile);
    return profile;
  };

  const logout = () => {
    setUser(null);
  };

  const value = { user, login, logout, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
