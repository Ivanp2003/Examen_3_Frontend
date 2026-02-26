import React, { createContext, useContext, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();
// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Inicializar usuario desde localStorage al cargar
  React.useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser.nombre) {
      setUser(currentUser);
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    try {
      const result = await authService.login(email, password);
      
      if (result.success && result.token) {
        // Guardar en localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('nombre', result.nombre || 'Usuario');
        localStorage.setItem('apellido', result.apellido || '');
        localStorage.setItem('email', result.email || email);
        
        // Actualizar estado
        const userData = {
          nombre: result.nombre || 'Usuario',
          apellido: result.apellido || '',
          email: result.email || email
        };
        setUser(userData);
        
        return { success: true };
      } else {
        return { success: false, error: 'Credenciales incorrectas' };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: error.message || 'Error al iniciar sesión' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const getUsuario = () => {
    return user || authService.getCurrentUser();
  };

  const isAuthenticated = () => {
    return !!user && authService.isAuthenticated();
  };

  const value = {
    user,
    login,
    logout,
    loading,
    getUsuario,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
