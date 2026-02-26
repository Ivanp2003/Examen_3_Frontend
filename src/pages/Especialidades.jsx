import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { especialidadService } from '../services/especialidadService';

const Especialidades = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState('');
  const [formulario, setFormulario] = useState({
    codigo: '',
    nombre: '',
    descripcion: ''
  });

  useEffect(() => {
    cargarEspecialidades();
  }, []);

  const cargarEspecialidades = async () => {
    setCargando(true);
    try {
      const datos = await especialidadService.obtenerTodas();
      setEspecialidades(datos);
    } catch (err) {
      setError(err.mensaje || 'Error al cargar especialidades');
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      if (editando) {
        await especialidadService.actualizar(editando.id, formulario);
      } else {
        await especialidadService.crear(formulario);
      }
      
      await cargarEspecialidades();
      resetearFormulario();
    } catch (err) {
      setError(err.mensaje || 'Error al guardar especialidad');
    } finally {
      setCargando(false);
    }
  };

  const editarEspecialidad = (especialidad) => {
    setEditando(especialidad);
    setFormulario({
      codigo: especialidad.codigo,
      nombre: especialidad.nombre,
      descripcion: especialidad.descripcion
    });
    setMostrarFormulario(true);
  };

  const eliminarEspecialidad = async (id) => {
    if (!window.confirm('¿Está seguro de que desea eliminar esta especialidad?')) {
      return;
    }

    setCargando(true);
    try {
      await especialidadService.eliminar(id);
      await cargarEspecialidades();
    } catch (err) {
      setError(err.mensaje || 'Error al eliminar especialidad');
    } finally {
      setCargando(false);
    }
  };

  const resetearFormulario = () => {
    setFormulario({
      codigo: '',
      nombre: '',
      descripcion: ''
    });
    setEditando(null);
    setMostrarFormulario(false);
  };

  return (
    <div>
      <Navbar />
      <div style={styles.contenedor}>
        <div style={styles.encabezado}>
          <h1 style={styles.titulo}>Gestión de Especialidades</h1>
          <button 
            onClick={() => setMostrarFormulario(true)}
            style={styles.botonAgregar}
          >
            + Nueva Especialidad
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {mostrarFormulario && (
          <div style={styles.modal}>
            <div style={styles.modalContenido}>
              <h3 style={styles.modalTitulo}>
                {editando ? 'Editar Especialidad' : 'Nueva Especialidad'}
              </h3>
              
              <form onSubmit={handleSubmit} style={styles.formulario}>
                <div style={styles.campo}>
                  <label style={styles.etiqueta}>Código:</label>
                  <input
                    type="text"
                    name="codigo"
                    value={formulario.codigo}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.campo}>
                  <label style={styles.etiqueta}>Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.campo}>
                  <label style={styles.etiqueta}>Descripción:</label>
                  <textarea
                    name="descripcion"
                    value={formulario.descripcion}
                    onChange={handleChange}
                    style={styles.textarea}
                    rows="3"
                  />
                </div>

                <div style={styles.botones}>
                  <button 
                    type="submit" 
                    style={styles.botonGuardar}
                    disabled={cargando}
                  >
                    {cargando ? 'Guardando...' : 'Guardar'}
                  </button>
                  <button 
                    type="button" 
                    onClick={resetearFormulario}
                    style={styles.botonCancelar}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {cargando && !mostrarFormulario ? (
          <div style={styles.cargando}>Cargando...</div>
        ) : (
          <div style={styles.tablaContenedor}>
            <table style={styles.tabla}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Código</th>
                  <th style={styles.th}>Nombre</th>
                  <th style={styles.th}>Descripción</th>
                  <th style={styles.th}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {especialidades.map((especialidad) => (
                  <tr key={especialidad.id}>
                    <td style={styles.td}>{especialidad.id}</td>
                    <td style={styles.td}>{especialidad.codigo}</td>
                    <td style={styles.td}>{especialidad.nombre}</td>
                    <td style={styles.td}>{especialidad.descripcion || '-'}</td>
                    <td style={styles.td}>
                      <button 
                        onClick={() => editarEspecialidad(especialidad)}
                        style={styles.botonEditar}
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => eliminarEspecialidad(especialidad.id)}
                        style={styles.botonEliminar}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {especialidades.length === 0 && (
              <div style={styles.vacio}>
                No hay especialidades registradas
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  contenedor: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'clamp(15px, 4vw, 20px)'
  },
  encabezado: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'clamp(20px, 5vw, 30px)',
    flexDirection: 'row',
    gap: '15px'
  },
  titulo: {
    color: '#2563eb',
    fontSize: 'clamp(20px, 5vw, 28px)',
    margin: 0
  },
  botonAgregar: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    padding: 'clamp(8px, 2vw, 10px) clamp(15px, 3vw, 20px)',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: 'clamp(14px, 3vw, 16px)',
    whiteSpace: 'nowrap'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modalContenido: {
    backgroundColor: 'white',
    padding: 'clamp(20px, 5vw, 30px)',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  modalTitulo: {
    color: '#2563eb',
    marginBottom: 'clamp(15px, 4vw, 20px)',
    marginTop: 0,
    fontSize: 'clamp(18px, 4vw, 22px)'
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(10px, 3vw, 15px)'
  },
  campo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  etiqueta: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 'clamp(14px, 3vw, 16px)'
  },
  input: {
    padding: 'clamp(8px, 2vw, 10px)',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: 'clamp(14px, 3vw, 16px)',
    width: '100%',
    boxSizing: 'border-box'
  },
  textarea: {
    padding: 'clamp(8px, 2vw, 10px)',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: 'clamp(14px, 3vw, 16px)',
    resize: 'vertical',
    width: '100%',
    boxSizing: 'border-box'
  },
  botones: {
    display: 'flex',
    gap: 'clamp(8px, 2vw, 10px)',
    justifyContent: 'flex-end',
    marginTop: 'clamp(8px, 2vw, 10px)',
    flexWrap: 'wrap'
  },
  botonGuardar: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    padding: 'clamp(8px, 2vw, 10px) clamp(15px, 3vw, 20px)',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: 'clamp(14px, 3vw, 16px)'
  },
  botonCancelar: {
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    padding: 'clamp(8px, 2vw, 10px) clamp(15px, 3vw, 20px)',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: 'clamp(14px, 3vw, 16px)'
  },
  tablaContenedor: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    overflowX: 'auto'
  },
  tabla: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '500px'
  },
  th: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: 'clamp(8px, 2vw, 12px)',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 'clamp(12px, 3vw, 14px)',
    whiteSpace: 'nowrap'
  },
  td: {
    padding: 'clamp(8px, 2vw, 12px)',
    borderBottom: '1px solid #eee',
    fontSize: 'clamp(12px, 3vw, 14px)'
  },
  botonEditar: {
    backgroundColor: '#f59e0b',
    color: 'white',
    border: 'none',
    padding: 'clamp(4px, 1vw, 5px) clamp(8px, 2vw, 10px)',
    borderRadius: '3px',
    cursor: 'pointer',
    marginRight: '5px',
    fontSize: 'clamp(11px, 2.5vw, 12px)'
  },
  botonEliminar: {
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    padding: 'clamp(4px, 1vw, 5px) clamp(8px, 2vw, 10px)',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: 'clamp(11px, 2.5vw, 12px)'
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: 'clamp(8px, 2vw, 10px)',
    borderRadius: '5px',
    marginBottom: 'clamp(15px, 4vw, 20px)',
    fontSize: 'clamp(12px, 3vw, 14px)'
  },
  cargando: {
    textAlign: 'center',
    padding: 'clamp(30px, 8vw, 40px)',
    fontSize: 'clamp(16px, 4vw, 18px)',
    color: '#666'
  },
  vacio: {
    textAlign: 'center',
    padding: 'clamp(30px, 8vw, 40px)',
    color: '#666',
    fontSize: 'clamp(14px, 3vw, 16px)'
  }
};

export default Especialidades;
