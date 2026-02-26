import React, { createContext, useContext, useState } from 'react';

const NotificacionesContext = createContext();
// Hook personalizado para acceder al contexto de notificaciones
export const useNotificaciones = () => {
  const context = useContext(NotificacionesContext);
  if (!context) {
    throw new Error('useNotificaciones must be used within a NotificacionesProvider');
  }
  return context;
};

// Proveedor del contexto de notificaciones
export const NotificacionesProvider = ({ children }) => {
  const [notificaciones, setNotificaciones] = useState([]);

  const agregarNotificacion = (mensaje, tipo = 'info') => {
    const id = Date.now() + Math.random();
    const nuevaNotificacion = {
      id,
      mensaje,
      tipo, // 'success', 'error', 'warning', 'info'
      timestamp: new Date()
    };

    setNotificaciones(prev => [...prev, nuevaNotificacion]);

    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
      eliminarNotificacion(id);
    }, 5000);
  };

  const eliminarNotificacion = (id) => {
    setNotificaciones(prev => prev.filter(notif => notif.id !== id));
  };

  const mostrarExito = (mensaje) => {
    agregarNotificacion(mensaje, 'success');
  };

  const mostrarError = (mensaje) => {
    agregarNotificacion(mensaje, 'error');
  };

  const mostrarAdvertencia = (mensaje) => {
    agregarNotificacion(mensaje, 'warning');
  };

  const mostrarInfo = (mensaje) => {
    agregarNotificacion(mensaje, 'info');
  };

  const limpiarTodas = () => {
    setNotificaciones([]);
  };

  const value = {
    notificaciones,
    agregarNotificacion,
    eliminarNotificacion,
    mostrarExito,
    mostrarError,
    mostrarAdvertencia,
    mostrarInfo,
    limpiarTodas
  };

  return (
    <NotificacionesContext.Provider value={value}>
      {children}
    </NotificacionesContext.Provider>
  );
};

export { NotificacionesContext };
export default NotificacionesContext;
