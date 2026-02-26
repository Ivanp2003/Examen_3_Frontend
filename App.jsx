import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './src/context/AuthContext';
import { NotificacionesProvider } from './src/context/NotificacionesContext';
import LoginSimple from './src/pages/LoginSimple';
import Login from './src/pages/Login';
import Dashboard from './src/pages/Dashboard';
import Citas from './src/pages/Citas';
import Pacientes from './src/pages/Pacientes';
import Especialidades from './src/pages/Especialidades';
import ProtectedRoute from './src/components/ProtectedRoute';
import Notificaciones from './src/components/Notificaciones';

function App() {
  return (
    <AuthProvider>
      <NotificacionesProvider>
        <Router>
          <Notificaciones />
          <Routes>
            {/* Ruta pública - Login */}
            <Route path="/login" element={<Login />} />
            
            {/* Rutas protegidas */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/citas" element={
              <ProtectedRoute>
                <Citas />
              </ProtectedRoute>
            } />
            
            <Route path="/pacientes" element={
              <ProtectedRoute>
                <Pacientes />
              </ProtectedRoute>
            } />
            
            <Route path="/especialidades" element={
              <ProtectedRoute>
                <Especialidades />
              </ProtectedRoute>
            } />
            
            {/* Ruta por defecto - mostrar login simple */}
            <Route path="/" element={<LoginSimple />} />
            
            {/* Ruta no encontrada - redirigir a login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </NotificacionesProvider>
    </AuthProvider>
  );
}

export default App;