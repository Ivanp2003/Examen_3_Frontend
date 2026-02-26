import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';
// Componente de ruta protegida
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
// Verificar si el usuario está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  // Si el usuario está autenticado, renderizar los children
  return children;
};

export default ProtectedRoute;
