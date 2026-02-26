import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import { pacienteService } from '../services/pacienteService';
import { NotificacionesContext } from '../context/NotificacionesContext';

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState('');
  const { mostrarExito, mostrarError } = useContext(NotificacionesContext);
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    fechaNacimiento: '',
    genero: '',
    ciudad: '',
    direccion: '',
    telefono: '',
    email: ''
  });

  useEffect(() => {
    cargarPacientes();
  }, []);

  const cargarPacientes = async () => {
    setCargando(true);
    try {
      const datos = await pacienteService.obtenerTodos();
      setPacientes(datos);
    } catch (err) {
      setError(err.mensaje || 'Error al cargar pacientes');
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
        await pacienteService.actualizar(editando.id, formulario);
        mostrarExito('Paciente actualizado correctamente');
      } else {
        await pacienteService.crear(formulario);
        mostrarExito('Paciente creado correctamente');
      }
      
      await cargarPacientes();
      resetearFormulario();
    } catch (err) {
      mostrarError(err.mensaje || 'Error al guardar paciente');
    } finally {
      setCargando(false);
    }
  };

  const editarPaciente = (paciente) => {
    setEditando(paciente);
    setFormulario({
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      cedula: paciente.cedula,
      fechaNacimiento: paciente.fechaNacimiento ? paciente.fechaNacimiento.split('T')[0] : '',
      genero: paciente.genero,
      ciudad: paciente.ciudad,
      direccion: paciente.direccion,
      telefono: paciente.telefono,
      email: paciente.email
    });
    setMostrarFormulario(true);
  };

  const eliminarPaciente = async (id) => {
    // En lugar de window.confirm, podríamos usar un modal personalizado
    // Por ahora, mantendremos el confirm pero mostraremos notificaciones para el resultado
    if (!window.confirm('¿Está seguro de que desea eliminar este paciente?')) {
      return;
    }

    setCargando(true);
    try {
      await pacienteService.eliminar(id);
      await cargarPacientes();
      mostrarExito('Paciente eliminado correctamente');
    } catch (err) {
      mostrarError(err.mensaje || 'Error al eliminar paciente');
    } finally {
      setCargando(false);
    }
  };

  const resetearFormulario = () => {
    setFormulario({
      nombre: '',
      apellido: '',
      cedula: '',
      fechaNacimiento: '',
      genero: '',
      ciudad: '',
      direccion: '',
      telefono: '',
      email: ''
    });
    setEditando(null);
    setMostrarFormulario(false);
  };

  return (
    <div>
      <Navbar />
      <div style={styles.contenedor}>
        <div style={styles.encabezado}>
          <h1 style={styles.titulo}>Gestión de Pacientes</h1>
          <button 
            onClick={() => setMostrarFormulario(true)}
            style={styles.botonAgregar}
          >
            + Nuevo Paciente
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {mostrarFormulario && (
          <div style={styles.modal}>
            <div style={styles.modalContenido}>
              <h3 style={styles.modalTitulo}>
                {editando ? 'Editar Paciente' : 'Nuevo Paciente'}
              </h3>
              
              <form onSubmit={handleSubmit} style={styles.formulario} autoComplete="off" noValidate>
                <div style={styles.fila}>
                  <div style={styles.campo}>
                    <label style={styles.etiqueta}>Nombre:</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formulario.nombre}
                      onChange={handleChange}
                      style={styles.input}
                      required
                      autoComplete="off"
                    />
                  </div>

                  <div style={styles.campo}>
                    <label style={styles.etiqueta}>Apellido:</label>
                    <input
                      type="text"
                      name="apellido"
                      value={formulario.apellido}
                      onChange={handleChange}
                      style={styles.input}
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div style={styles.fila}>
                  <div style={styles.campo}>
                    <label style={styles.etiqueta}>Cédula:</label>
                    <input
                      type="text"
                      name="cedula"
                      value={formulario.cedula}
                      onChange={handleChange}
                      style={styles.input}
                      required
                      autoComplete="off"
                    />
                  </div>

                  <div style={styles.campo}>
                    <label style={styles.etiqueta}>Fecha Nacimiento:</label>
                    <input
                      type="date"
                      name="fechaNacimiento"
                      value={formulario.fechaNacimiento}
                      onChange={handleChange}
                      style={styles.input}
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div style={styles.fila}>
                  <div style={styles.campo}>
                    <label style={styles.etiqueta}>Género:</label>
                    <select
                      name="genero"
                      value={formulario.genero}
                      onChange={handleChange}
                      style={styles.input}
                      autoComplete="off"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  <div style={styles.campo}>
                    <label style={styles.etiqueta}>Ciudad:</label>
                    <input
                      type="text"
                      name="ciudad"
                      value={formulario.ciudad}
                      onChange={handleChange}
                      style={styles.input}
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div style={styles.campo}>
                  <label style={styles.etiqueta}>Dirección:</label>
                  <input
                    type="text"
                    name="direccion"
                    value={formulario.direccion}
                    onChange={handleChange}
                    style={styles.input}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                </div>

                <div style={styles.fila}>
                  <div style={styles.campo}>
                    <label style={styles.etiqueta}>Teléfono:</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formulario.telefono}
                      onChange={handleChange}
                      style={styles.input}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                    />
                  </div>

                  <div style={styles.campo}>
                    <label style={styles.etiqueta}>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formulario.email}
                      onChange={handleChange}
                      style={styles.input}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                  </div>
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
                  <th style={styles.th}>Nombre</th>
                  <th style={styles.th}>Apellido</th>
                  <th style={styles.th}>Cédula</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Teléfono</th>
                  <th style={styles.th}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.map((paciente) => (
                  <tr key={paciente.id}>
                    <td style={styles.td}>{paciente.nombre}</td>
                    <td style={styles.td}>{paciente.apellido}</td>
                    <td style={styles.td}>{paciente.cedula}</td>
                    <td style={styles.td}>{paciente.email || '-'}</td>
                    <td style={styles.td}>{paciente.telefono || '-'}</td>
                    <td style={styles.td}>
                      <button 
                        onClick={() => editarPaciente(paciente)}
                        style={styles.botonEditar}
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => eliminarPaciente(paciente.id)}
                        style={styles.botonEliminar}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {pacientes.length === 0 && (
              <div style={styles.vacio}>
                No hay pacientes registrados
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
    maxWidth: '800px',
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
  fila: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
    minWidth: '800px'
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

export default Pacientes;
