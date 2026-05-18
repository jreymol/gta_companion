import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

const VALID_CREDENTIALS = { username: 'cj', password: 'grovestreet' };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(username, password) {
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
      setUser({ username });
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
