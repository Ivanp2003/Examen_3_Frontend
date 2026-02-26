const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const authService = {
  // Login
  login: async (email, password) => {
    try {
      // Simulación de login para desarrollo
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === 'admin@test.com' && password === '123456') {
            resolve({
              success: true,
              token: 'mock-jwt-token-' + Date.now(),
              nombre: 'Admin',
              apellido: 'User',
              email: email
            });
          } else {
            reject(new Error('Credenciales incorrectas'));
          }
        }, 1000);
      });
    } catch (error) {
      throw error;
    }
  },

  // Registro
  registro: async (datosUsuario) => {
    try {
      // Simulación para desarrollo
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            mensaje: 'Usuario registrado exitosamente'
          });
        }, 1000);
      });
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("apellido");
    localStorage.removeItem("email");
  },

  // Verificar autenticación
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    return {
      nombre: localStorage.getItem("nombre") || 'Usuario',
      apellido: localStorage.getItem("apellido") || '',
      email: localStorage.getItem("email") || ''
    };
  },

  // Obtener usuario (alias para getCurrentUser)
  getUsuario: () => {
    return authService.getCurrentUser();
  }
};
