import api from './api';

export const especialidadService = {
  // Obtener todas las especialidades
  obtenerTodas: async () => {
    try {
      const response = await api.get('/especialidades');
      return response.data;
    } catch (error) {
      console.error('Error al obtener especialidades:', error);
      // Simulación de datos para desarrollo
      return [
        {
          id: 1,
          codigo: 'E001',
          nombre: 'Medicina General',
          descripcion: 'Atención médica general y consultas de rutina'
        },
        {
          id: 2,
          codigo: 'E002',
          nombre: 'Cardiología',
          descripcion: 'Especialidad en enfermedades del corazón y sistema circulatorio'
        },
        {
          id: 3,
          codigo: 'E003',
          nombre: 'Pediatría',
          descripción: 'Atención médica especializada para niños y adolescentes'
        },
        {
          id: 4,
          codigo: 'E004',
          nombre: 'Ginecología',
          descripcion: 'Especialidad en salud reproductiva femenina'
        },
        {
          id: 5,
          codigo: 'E005',
          nombre: 'Dermatología',
          descripcion: 'Especialidad en enfermedades de la piel'
        }
      ];
    }
  },

  // Crear nueva especialidad
  crear: async (datosEspecialidad) => {
    try {
      const response = await api.post('/especialidades', datosEspecialidad);
      return response.data;
    } catch (error) {
      console.error('Error al crear especialidad:', error);
      // Simulación para desarrollo
      return { 
        id: Date.now(), 
        ...datosEspecialidad,
        mensaje: 'Especialidad creada exitosamente'
      };
    }
  },

  // Actualizar especialidad
  actualizar: async (id, datosEspecialidad) => {
    try {
      const response = await api.put(`/especialidades/${id}`, datosEspecialidad);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar especialidad:', error);
      // Simulación para desarrollo
      return { 
        id, 
        ...datosEspecialidad,
        mensaje: 'Especialidad actualizada exitosamente'
      };
    }
  },

  // Eliminar especialidad
  eliminar: async (id) => {
    try {
      const response = await api.delete(`/especialidades/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar especialidad:', error);
      // Simulación para desarrollo
      return { mensaje: 'Especialidad eliminada exitosamente' };
    }
  },

  // Obtener especialidad por ID
  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`/especialidades/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener especialidad:', error);
      return null;
    }
  },

  // Buscar especialidades por término
  buscar: async (termino) => {
    try {
      const response = await api.get(`/especialidades/buscar?q=${termino}`);
      return response.data;
    } catch (error) {
      console.error('Error al buscar especialidades:', error);
      return [];
    }
  }
};
