import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    
    // Simulación de login
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'admin@test.com' && password === '123456') {
          setUser({ email, name: 'Admin User' });
          resolve({ success: true });
        } else {
          resolve({ success: false, error: 'Credenciales incorrectas' });
        }
        setLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
