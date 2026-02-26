import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { especialidadService } from '../services/especialidadService';
import { pacienteService } from '../services/pacienteService';
import { citaService } from '../services/citaService';
import Navbar from '../components/Navbar';
import { NotificacionesContext } from '../context/NotificacionesContext';
// Componente principal del dashboard
const Dashboard = () => {
  const usuario = authService.getUsuario();
  const { mostrarError } = useContext(NotificacionesContext);
  const [estadisticas, setEstadisticas] = useState({
    totalEspecialidades: 0,
    totalPacientes: 0,
    totalCitas: 0,
    cargando: true
  });

  const cargarEstadisticas = async () => {
    try {
      const [especialidades, pacientes, citas] = await Promise.all([
        especialidadService.obtenerTodas(),
        pacienteService.obtenerTodos(),
        citaService.obtenerTodas()
      ]);

      setEstadisticas({
        totalEspecialidades: especialidades.length,
        totalPacientes: pacientes.length,
        totalCitas: citas.length,
        cargando: false
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
      mostrarError('Error al cargar las estadísticas');
      setEstadisticas(prev => ({ ...prev, cargando: false }));
    }
  };

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const tarjetas = [
    {
      titulo: 'Especialidades',
      descripcion: 'Gestionar especialidades médicas',
      enlace: '/especialidades',
      color: '#3b82f6'
    },
    {
      titulo: 'Pacientes',
      descripcion: 'Administrar información de pacientes',
      enlace: '/pacientes',
      color: '#10b981'
    },
    {
      titulo: 'Citas',
      descripcion: 'Gestionar citas médicas',
      enlace: '/citas',
      color: '#f59e0b'
    }
  ];

  return (
    <div>
      <Navbar />
      <div style={styles.contenedor}>
        <div style={styles.encabezado}>
          <h1 style={styles.titulo}>Dashboard</h1>
          <p style={styles.bienvenida}>
            Bienvenido, <strong>{usuario.nombre} {usuario.apellido}</strong>
          </p>
        </div>

        <div style={styles.tarjetasContenedor}>
          {tarjetas.map((tarjeta, index) => (
            <Link 
              key={index} 
              to={tarjeta.enlace}
              style={styles.tarjetaEnlace}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector('div').style.transform = 'translateY(-5px)';
                e.currentTarget.querySelector('div').style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('div').style.transform = 'translateY(0)';
                e.currentTarget.querySelector('div').style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div 
                style={{
                  ...styles.tarjeta,
                  backgroundColor: tarjeta.color
                }}
              >
                <h3 style={styles.tarjetaTitulo}>{tarjeta.titulo}</h3>
                <p style={styles.tarjetaDescripcion}>{tarjeta.descripcion}</p>
                <div style={styles.tarjetaIcono}>
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={styles.estadisticas}>
          <h2 style={styles.estadisticasTitulo}>Resumen Rápido</h2>
          <div style={styles.estadisticasGrid}>
            <div 
              style={styles.estadisticaCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
            >
              <h4 style={styles.estadisticaNumero}>
                {estadisticas.cargando ? '...' : estadisticas.totalEspecialidades}
              </h4>
              <p style={styles.estadisticaTexto}>Total Especialidades</p>
            </div>
            <div 
              style={styles.estadisticaCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
            >
              <h4 style={styles.estadisticaNumero}>
                {estadisticas.cargando ? '...' : estadisticas.totalPacientes}
              </h4>
              <p style={styles.estadisticaTexto}>Total Pacientes</p>
            </div>
            <div 
              style={styles.estadisticaCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
            >
              <h4 style={styles.estadisticaNumero}>
                {estadisticas.cargando ? '...' : estadisticas.totalCitas}
              </h4>
              <p style={styles.estadisticaTexto}>Total Citas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  contenedor: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'clamp(20px, 5vw, 40px)'
  },
  encabezado: {
    textAlign: 'center',
    marginBottom: 'clamp(30px, 8vw, 50px)'
  },
  titulo: {
    color: '#2563eb',
    fontSize: 'clamp(28px, 6vw, 36px)',
    marginBottom: '10px'
  },
  bienvenida: {
    fontSize: 'clamp(16px, 4vw, 18px)',
    color: '#666'
  },
  tarjetasContenedor: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'clamp(20px, 5vw, 30px)',
    marginBottom: 'clamp(30px, 8vw, 50px)'
  },
  tarjetaEnlace: {
    textDecoration: 'none',
    color: 'inherit'
  },
  tarjeta: {
    padding: 'clamp(20px, 5vw, 30px)',
    borderRadius: '10px',
    color: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '150px'
  },
  tarjetaTitulo: {
    fontSize: 'clamp(20px, 5vw, 24px)',
    marginBottom: '10px',
    margin: 0
  },
  tarjetaDescripcion: {
    fontSize: 'clamp(14px, 3vw, 16px)',
    opacity: 0.9,
    marginBottom: '20px',
    margin: 0
  },
  tarjetaIcono: {
    fontSize: 'clamp(20px, 4vw, 24px)',
    position: 'absolute',
    bottom: '20px',
    right: '20px'
  },
  estadisticas: {
    marginTop: 'clamp(30px, 8vw, 50px)'
  },
  estadisticasTitulo: {
    color: '#333',
    fontSize: 'clamp(20px, 5vw, 24px)',
    marginBottom: 'clamp(20px, 5vw, 30px)',
    textAlign: 'center'
  },
  estadisticasGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: 'clamp(15px, 4vw, 20px)'
  },
  estadisticaCard: {
    backgroundColor: 'white',
    padding: 'clamp(20px, 5vw, 30px)',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    minHeight: '120px',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  estadisticaNumero: {
    fontSize: 'clamp(28px, 6vw, 36px)',
    color: '#2563eb',
    margin: '0 0 10px 0'
  },
  estadisticaTexto: {
    color: '#666',
    margin: 0,
    fontSize: 'clamp(14px, 3vw, 16px)'
  }
};

export default Dashboard;
