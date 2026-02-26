import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componente de login
const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
// Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      alert(result.error || 'Error al iniciar sesión');
    }
  };

  const styles = {
    container: {
      marginBottom: '1.5rem'
    },
    title: {
      fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#374151'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    button: {
      width: '100%',
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      cursor: 'pointer',
      border: 'none',
      opacity: loading ? 0.5 : 1,
      transition: 'all 0.2s',
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Iniciar Sesión</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          style={styles.button}
        >
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
