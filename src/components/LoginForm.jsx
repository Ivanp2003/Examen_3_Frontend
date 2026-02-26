import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, loading } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result.success) {
      alert('Login exitoso!');
    }
  };

  const styles = {
    container: {
      marginBottom: '24px'
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '16px',
      color: '#374151'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    input: {
      width: '100%',
      padding: '8px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      outline: 'none'
    },
    button: {
      width: '100%',
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
      border: 'none',
      opacity: loading ? 0.5 : 1
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
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
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
