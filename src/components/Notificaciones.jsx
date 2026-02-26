import React, { useEffect } from 'react';
import { useNotificaciones } from '../context/NotificacionesContext';
// Componente de notificaciones
const Notificaciones = () => {
  const { notificaciones, eliminarNotificacion } = useNotificaciones();
  useEffect(() => {
    // Auto-eliminar notificaciones después de 5 segundos
    const timers = notificaciones.map(notificacion => 
      setTimeout(() => eliminarNotificacion(notificacion.id), 5000)
    );
// Limpiar timers cuando el componente desaparece
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [notificaciones, eliminarNotificacion]);

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: '9999',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {notificaciones.map(notificacion => (
        <div
          key={notificacion.id}
          style={{
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            minWidth: '300px',
            maxWidth: '400px',
            backgroundColor: notificacion.tipo === 'error' ? '#ef4444' : 
                           notificacion.tipo === 'warning' ? '#f59e0b' : 
                           notificacion.tipo === 'success' ? '#10b981' : '#3b82f6',
            animation: 'slideIn 0.3s ease-out',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{notificacion.mensaje}</span>
            <button
              onClick={() => eliminarNotificacion(notificacion.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '0',
                marginLeft: '10px',
                lineHeight: '1'
              }}
            >
              ×
            </button>
          </div>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Notificaciones;
