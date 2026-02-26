import React from 'react';
import { Toaster } from 'react-hot-toast';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    card: {
      backgroundColor: 'white',
      padding: '32px',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '448px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '24px',
      color: '#1f2937'
    }
  };

  return (
    <div style={styles.container}>
      <Toaster position="top-right" />
      <div style={styles.card}>
        <h2 style={styles.title}>
          Sistema de Matrículas
        </h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
