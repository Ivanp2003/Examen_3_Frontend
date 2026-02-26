import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSimple = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulación de login
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (
        formData.email === "admin@test.com" &&
        formData.password === "123456"
      ) {
        // Guardar en localStorage
        localStorage.setItem("token", "mock-token-" + Date.now());
        localStorage.setItem("nombre", "Andres");
        localStorage.setItem("apellido", "Panchi");
        localStorage.setItem("email", formData.email);
        
        console.log('Login exitoso, redirigiendo a dashboard...');
        navigate("/dashboard");
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f3f4f6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
    },
    card: {
      backgroundColor: "white",
      padding: "clamp(1.5rem, 5vw, 2rem)",
      borderRadius: "0.5rem",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "448px",
      margin: "0 auto",
    },
    title: {
      fontSize: "clamp(1.25rem, 4vw, 1.5rem)",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "1.5rem",
      color: "#1f2937",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    input: {
      width: "100%",
      padding: "0.75rem 1rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      outline: "none",
      transition: "border-color 0.2s",
    },
    button: {
      width: "100%",
      backgroundColor: "#2563eb",
      color: "white",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      cursor: "pointer",
      border: "none",
      opacity: loading ? 0.5 : 1,
      transition: "all 0.2s",
      fontWeight: "500",
    },
    error: {
      color: "#dc2626",
      backgroundColor: "#fee2e2",
      padding: "0.75rem",
      borderRadius: "0.375rem",
      textAlign: "center",
      fontSize: "0.875rem",
      border: "1px solid #fecaca",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sistema de Gestión de Citas Médicas </h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required={true}
            disabled={loading ? true : false}
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required={true}
            disabled={loading ? true : false}
          />

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.button} disabled={loading ? true : false}>
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSimple;
