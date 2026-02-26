import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
// Componente de navbar
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = authService.getUsuario();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleLinkClick = () => {
    setMenuAbierto(false);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getResponsiveStyles = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const isTablet = typeof window !== 'undefined' && window.innerWidth > 768 && window.innerWidth <= 1024;
    
    return {
      contenedor: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem',
        height: '60px',
        flexWrap: 'wrap',
        position: 'relative'
      },
      menuToggle: {
        display: isMobile ? 'flex' : 'none',
        flexDirection: 'column',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        gap: '4px',
        borderRadius: '4px',
        transition: 'background-color 0.2s'
      },
      enlaces: {
        display: isMobile ? (menuAbierto ? 'flex' : 'none') : 'flex',
        position: isMobile ? 'absolute' : 'static',
        top: isMobile ? '60px' : 'auto',
        left: isMobile ? '0' : 'auto',
        right: isMobile ? '0' : 'auto',
        backgroundColor: isMobile ? '#2563eb' : 'transparent',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '0' : isTablet ? '1rem' : '2rem',
        padding: isMobile ? '1.25rem' : '0',
        width: isMobile ? '100%' : 'auto',
        boxShadow: isMobile ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
        zIndex: 1000,
        alignItems: 'center'
      },
      enlace: {
        color: 'white',
        textDecoration: 'none',
        padding: isMobile ? '1rem' : '0.5rem 1rem',
        borderRadius: '0.375rem',
        transition: 'all 0.2s',
        fontSize: isMobile ? '1rem' : '0.875rem',
        fontWeight: '500',
        borderBottom: isMobile ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
      },
      usuario: {
        display: isMobile ? (menuAbierto ? 'flex' : 'none') : 'flex',
        position: isMobile ? 'absolute' : 'static',
        top: isMobile ? 'auto' : '60px',
        left: isMobile ? '0' : 'auto',
        right: isMobile ? '0' : 'auto',
        backgroundColor: isMobile ? '#2563eb' : 'transparent',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '1rem' : '1rem',
        padding: isMobile ? '1.25rem' : '0',
        width: isMobile ? '100%' : 'auto',
        boxShadow: isMobile ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
        zIndex: 999,
        alignItems: isMobile ? 'center' : 'center'
      },
      usuarioTexto: {
        fontSize: isMobile ? '0.875rem' : '0.875rem',
        color: 'white',
        textAlign: isMobile ? 'center' : 'left'
      },
      botonLogout: {
        backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        padding: isMobile ? '0.75rem 1rem' : '0.5rem 0.75rem',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        fontSize: isMobile ? '0.875rem' : '0.875rem',
        transition: 'all 0.2s',
        width: isMobile ? '100%' : 'auto'
      }
    };
  };

  const responsiveStyles = getResponsiveStyles();

  const styles = {
    navbar: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '0',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      position: 'relative'
    },
    contenedor: responsiveStyles.contenedor || {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      height: '60px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center'
    },
    logoTexto: {
      color: 'white',
      margin: 0,
      fontSize: '20px'
    },
    enlaces: responsiveStyles.enlaces || {
      display: 'flex',
      gap: '30px',
      alignItems: 'center'
    },
    enlace: responsiveStyles.enlace || {
      color: 'white',
      textDecoration: 'none',
      padding: '8px 16px',
      borderRadius: '5px',
      transition: 'background-color 0.3s',
      fontSize: '16px'
    },
    enlaceActivo: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    usuario: responsiveStyles.usuario || {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    usuarioTexto: responsiveStyles.usuarioTexto || {
      fontSize: '14px',
      color: 'white'
    },
    botonLogout: responsiveStyles.botonLogout || {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      padding: '6px 12px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.3s'
    },
    menuToggle: responsiveStyles.menuToggle || {
      display: 'none',
      flexDirection: 'column',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '5px',
      gap: '4px'
    },
    menuIcon: {
      width: '25px',
      height: '3px',
      backgroundColor: 'white',
      transition: 'all 0.3s ease',
      transformOrigin: 'center'
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.contenedor}>
        <div style={styles.logo}>
          <h3 style={styles.logoTexto}>Citas Médicas</h3>
        </div>
        
        <button 
          style={styles.menuToggle}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          <span style={{...styles.menuIcon, ...(menuAbierto ? {transform: 'rotate(45deg) translate(5px, 5px)'} : {})}}></span>
          <span style={{...styles.menuIcon, ...(menuAbierto ? {opacity: 0} : {})}}></span>
          <span style={{...styles.menuIcon, ...(menuAbierto ? {transform: 'rotate(-45deg) translate(7px, -6px)'} : {})}}></span>
        </button>
        
        <div style={styles.enlaces}>
          <Link 
            to="/dashboard" 
            style={{
              ...styles.enlace,
              ...(isActive('/dashboard') ? styles.enlaceActivo : {})
            }}
            onClick={handleLinkClick}
          >
            Dashboard
          </Link>
          <Link 
            to="/especialidades" 
            style={{
              ...styles.enlace,
              ...(isActive('/especialidades') ? styles.enlaceActivo : {})
            }}
            onClick={handleLinkClick}
          >
            Especialidades
          </Link>
          <Link 
            to="/pacientes" 
            style={{
              ...styles.enlace,
              ...(isActive('/pacientes') ? styles.enlaceActivo : {})
            }}
            onClick={handleLinkClick}
          >
            Pacientes
          </Link>
          <Link 
            to="/citas" 
            style={{
              ...styles.enlace,
              ...(isActive('/citas') ? styles.enlaceActivo : {})
            }}
            onClick={handleLinkClick}
          >
            Citas
          </Link>
        </div>

        <div style={styles.usuario}>
          <span style={styles.usuarioTexto}>
            Bienvenido, {usuario.nombre} {usuario.apellido}
          </span>
          <button 
            onClick={handleLogout}
            style={styles.botonLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
