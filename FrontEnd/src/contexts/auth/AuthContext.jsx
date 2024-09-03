import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();
function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem('isLoggedIn')) ?? false
  );
  const [token, setToken] = useState(localStorage.getItem('token') ?? false);
  const [user, setUser] = useState(localStorage.getItem('user') ?? false);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') ?? false);

  useEffect(() => {
    localStorage.setItem('user', user);
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin',isAdmin);
  }, [user, token, isLoggedIn, isAdmin]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        isAdmin,
        setIsAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const Authentication = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
