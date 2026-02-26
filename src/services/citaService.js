import api from './api';

export const citaService = {
  // Obtener todas las citas
  obtenerTodas: async () => {
    try {
      const response = await api.get('/citas');
      return response.data;
    } catch (error) {
      console.error('Error al obtener citas:', error);
      // Simulación de datos para desarrollo
      return [
        {
          id: 1,
          codigo: 'C001',
          descripcion: 'Consulta general',
          pacienteId: 1,
          especialidadId: 1,
          pacienteNombre: 'Juan',
          pacienteApellido: 'Pérez',
          especialidadNombre: 'Medicina General'
        },
        {
          id: 2,
          codigo: 'C002',
          descripcion: 'Revisión cardíaca',
          pacienteId: 2,
          especialidadId: 2,
          pacienteNombre: 'María',
          pacienteApellido: 'González',
          especialidadNombre: 'Cardiología'
        }
      ];
    }
  },

  // Crear nueva cita
  crear: async (datosCita) => {
    try {
      const response = await api.post('/citas', datosCita);
      return response.data;
    } catch (error) {
      console.error('Error al crear cita:', error);
      // Simulación para desarrollo
      return { 
        id: Date.now(), 
        ...datosCita,
        mensaje: 'Cita creada exitosamente'
      };
    }
  },

  // Actualizar cita
  actualizar: async (id, datosCita) => {
    try {
      const response = await api.put(`/citas/${id}`, datosCita);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar cita:', error);
      // Simulación para desarrollo
      return { 
        id, 
        ...datosCita,
        mensaje: 'Cita actualizada exitosamente'
      };
    }
  },

  // Eliminar cita
  eliminar: async (id) => {
    try {
      const response = await api.delete(`/citas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar cita:', error);
      // Simulación para desarrollo
      return { mensaje: 'Cita eliminada exitosamente' };
    }
  },

  // Obtener cita por ID
  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`/citas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener cita:', error);
      return null;
    }
  }
};
