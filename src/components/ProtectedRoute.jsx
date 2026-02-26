import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';
// Componente de ruta protegida
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute - token en localStorage:', localStorage.getItem('token'));
  
  // Verificar si el usuario está autenticado
  if (!isAuthenticated) {
    console.log('Usuario no autenticado, redirigiendo a login');
    return <Navigate to="/login" replace />;
  }
  
  // Si el usuario está autenticado, renderizar los children
  console.log('Usuario autenticado, renderizando children');
  return children;
};

export default ProtectedRoute;
