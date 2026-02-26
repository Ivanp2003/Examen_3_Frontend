import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Login = () => {
  const [formulario, setFormulario] = useState({
    email: '',
    password: ''
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      const respuesta = await authService.login(formulario.email, formulario.password);
      
      if (respuesta.token) {
        // Limpiar campos del formulario al iniciar sesión exitosamente
        setFormulario({
          email: '',
          password: ''
        });
        navigate('/dashboard');
      } else {
        setError('No se pudo iniciar sesión');
      }
    } catch (err) {
      setError(err.mensaje || 'Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={styles.contenedor}>
      <div style={styles.tarjeta}>
        <h2 style={styles.titulo}>Sistema de Citas Médicas</h2>
        <h3 style={styles.subtitulo}>Iniciar Sesión</h3>
        
        <form onSubmit={handleSubmit} style={styles.formulario}>
          <div style={styles.campo}>
            <label style={styles.etiqueta}>Email:</label>
            <input
              type="email"
              name="email"
              value={formulario.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.campo}>
            <label style={styles.etiqueta}>Password:</label>
            <input
              type="password"
              name="password"
              value={formulario.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button 
            type="submit" 
            style={styles.boton}
            disabled={cargando}
          >
            {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  contenedor: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: '20px'
  },
  tarjeta: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  titulo: {
    textAlign: 'center',
    color: '#2563eb',
    marginBottom: '10px',
    fontSize: 'clamp(20px, 5vw, 24px)'
  },
  subtitulo: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
    fontSize: 'clamp(16px, 4vw, 18px)'
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
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
    padding: 'clamp(10px, 3vw, 12px)',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: 'clamp(14px, 3vw, 16px)',
    width: '100%',
    boxSizing: 'border-box'
  },
  boton: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: 'clamp(10px, 3vw, 12px)',
    border: 'none',
    borderRadius: '5px',
    fontSize: 'clamp(14px, 3vw, 16px)',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
    boxSizing: 'border-box'
  },
  error: {
    color: '#dc2626',
    backgroundColor: '#fee2e2',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
    fontSize: 'clamp(12px, 3vw, 14px)'
  }
};

export default Login;
