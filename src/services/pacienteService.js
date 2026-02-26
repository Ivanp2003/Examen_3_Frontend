import api from './api';

export const pacienteService = {
  // Obtener todos los pacientes
  obtenerTodos: async () => {
    try {
      const response = await api.get('/pacientes');
      return response.data;
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
      // Simulación de datos para desarrollo
      return [
        {
          id: 1,
          nombre: 'Juan',
          apellido: 'Pérez',
          cedula: '123456789',
          fechaNacimiento: '1990-05-15',
          genero: 'Masculino',
          ciudad: 'Quito',
          direccion: 'Av. Principal 123',
          telefono: '0987654321',
          email: 'juan.perez@email.com'
        },
        {
          id: 2,
          nombre: 'María',
          apellido: 'González',
          cedula: '987654321',
          fechaNacimiento: '1985-08-22',
          genero: 'Femenino',
          ciudad: 'Guayaquil',
          direccion: 'Calle Secundaria 456',
          telefono: '0912345678',
          email: 'maria.gonzalez@email.com'
        }
      ];
    }
  },

  // Crear nuevo paciente
  crear: async (datosPaciente) => {
    try {
      const response = await api.post('/pacientes', datosPaciente);
      return response.data;
    } catch (error) {
      console.error('Error al crear paciente:', error);
      // Simulación para desarrollo
      return { 
        id: Date.now(), 
        ...datosPaciente,
        mensaje: 'Paciente creado exitosamente'
      };
    }
  },

  // Actualizar paciente
  actualizar: async (id, datosPaciente) => {
    try {
      const response = await api.put(`/pacientes/${id}`, datosPaciente);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar paciente:', error);
      // Simulación para desarrollo
      return { 
        id, 
        ...datosPaciente,
        mensaje: 'Paciente actualizado exitosamente'
      };
    }
  },

  // Eliminar paciente
  eliminar: async (id) => {
    try {
      const response = await api.delete(`/pacientes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar paciente:', error);
      // Simulación para desarrollo
      return { mensaje: 'Paciente eliminado exitosamente' };
    }
  },

  // Obtener paciente por ID
  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`/pacientes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener paciente:', error);
      return null;
    }
  },

  // Buscar pacientes por término
  buscar: async (termino) => {
    try {
      const response = await api.get(`/pacientes/buscar?q=${termino}`);
      return response.data;
    } catch (error) {
      console.error('Error al buscar pacientes:', error);
      return [];
    }
  }
};
