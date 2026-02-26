import React from "react";
import { Toaster } from "react-hot-toast";
import LoginForm from "../components/LoginForm";

const Login = () => {
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
  };

  return (
    <div style={styles.container}>
      <Toaster position="top-right" />
      <div style={styles.card}>
        <h2 style={styles.title}>Sistema de Gestión de Citas Médicas</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
