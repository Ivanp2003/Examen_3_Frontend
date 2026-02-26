import axios from 'axios';
// Configuración base
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const api = axios.create({
baseURL: `${API_URL}/api`,
headers: {
'Content-Type': 'application/json',
},timeout: 10000, // 10 segundos
});
// Interceptor de Request: Agregar token
api.interceptors.request.use(
(config) => {
const token = localStorage.getItem('token');
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
},
(error) => {
return Promise.reject(error);
}
);
// Interceptor de Response: Manejo de errores
api.interceptors.response.use(
(response) => response,
(error) => {
// Token inválido o expirado
if (error.response?.status === 401 || error.response?.status === 403) {
localStorage.removeItem('token');
localStorage.removeItem('nombre');
localStorage.removeItem('apellido');
localStorage.removeItem('email');
window.location.href = '/login';
}
// Error de red
if (!error.response) {
console.error('Error de red:', error.message);
return Promise.reject({
message: 'Error de conexión. Verifique su red.',
});
}
return Promise.reject(error);
}
);
export default api;