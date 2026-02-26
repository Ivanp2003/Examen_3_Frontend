# Frontend - Sistema de Gestión de Citas Médicas

Aplicación web desarrollada con React y Vite para gestionar citas médicas, interfaz de usuario del sistema

## Tecnologías
- React 18
- Vite 7.3.1
- React Router DOM
- Axios
- CSS3
- LocalStorage para gestión de sesión
- JavaScript ES6+

## Características
- Autenticación con JWT
- CRUD completo de Pacientes, Especialidades y Citas
- Rutas protegidas con validación de token
- Sistema de notificaciones internas
- Diseño responsivo y profesional
- Interceptor automático de tokens
- Manejo de errores y validaciones
- Estado de carga en operaciones asíncronas


## Conexión con el Backend

### Configuración de API
- **URL Base**: `http://localhost:
- **Autenticación**: Token JWT en header `Authorization: Bearer {token}`


## Configuración e Instalación

### Prerrequisitos
- Node.js 18+
- NPM o Yarn
- Backend corriendo en `http://localhost:`

### Instalación
```bash
# Clonar el repositorio
git clone git@github.com:Ivanp2003/Examen_3_Frontend.git
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

##  Flujo de Autenticación

### 1. Inicio de Sesión
- **URL**: `/login`
- **Credenciales por defecto**:
  - Email: `admin@test.com`
  - Password: `123456`
<img width="476" height="414" alt="{2F69C930-4D2C-4C88-AB9C-1178374F8E6B}" src="https://github.com/user-attachments/assets/6fa144f5-b9bb-45ed-8eb6-4547bb80bf38" />

<img width="571" height="738" alt="{C7B62559-11CE-445D-B067-9A4D895C5B37}" src="https://github.com/user-attachments/assets/c89d4451-afe7-4363-ab21-6000ce74c558" />

### 2. Sesión Activa
- **Token**: Almacenado en localStorage
- **Validación**: Cada petición incluye el token en header `Authorization: Bearer {token}`
- **Expiración**: Si el token expira o es inválido, redirige automáticamente a `/login`
<img width="1896" height="945" alt="{81808310-7E7E-4837-9A4B-AD6910B42ACC}" src="https://github.com/user-attachments/assets/7397cd97-53d2-4a0c-9743-68dbdeb2e7b6" />

### 3. Cierre de Sesión
- **Proceso**: Elimina token y datos del usuario de localStorage, redirige a `/login`
<img width="507" height="500" alt="{ADB44BEE-8CC4-4D5C-8481-BEAAB6AC8128}" src="https://github.com/user-attachments/assets/c542e04a-5f45-4893-b48e-5c1de6453dfa" />

## Módulos del Sistema

### 1. Dashboard (`/dashboard`)
- **Función**: Panel principal con estadísticas en tiempo real
- **Características**:
  - Bienvenida personalizada
  - Resumen rápido con totales de cada módulo
  - Navegación rápida a todas las secciones
  - Botón de cierre de sesión

### 2. Especialidades (`/especialidades`)
- **Función**: CRUD completo de especialidades médicas
- **Campos**: Código, Nombre, Descripción
- **Operaciones**: Crear, Leer, Actualizar, Eliminar
- **Validaciones**: Código único, nombre requerido
<img width="1250" height="496" alt="{FFDA2CEB-0360-4016-A8EB-E331F4E906B0}" src="https://github.com/user-attachments/assets/d880489d-c6b1-489f-9668-8e4251951482" />

### 3. Pacientes (`/pacientes`)
- **Función**: CRUD completo de pacientes
- **Campos**: Nombre, Apellido, Cédula, Fecha de Nacimiento, Género, Ciudad, Dirección, Teléfono, Email
- **Operaciones**: Crear, Leer, Actualizar, Eliminar
- **Validaciones**: Cédula única, email requerido, formato de fecha
- **Restricciones**: No se puede eliminar si tiene citas asociadas
<img width="1240" height="342" alt="{7AF62CEB-7F66-4F6B-B895-709FBD16EA52}" src="https://github.com/user-attachments/assets/bfcbe734-1963-4a4b-8eef-0c2ffbbbffa0" />

### 4. Citas (`/citas`)
- **Función**: CRUD completo de citas médicas
- **Campos**: Código, Descripción, Paciente (select), Especialidad (select)
- **Operaciones**: Crear, Leer, Actualizar, Eliminar
- **Relaciones**: Paciente y Especialidad deben existir en la base de datos
<img width="1254" height="353" alt="{6ED39EC4-0E53-48C7-A63F-6A349F317855}" src="https://github.com/user-attachments/assets/7bb5f3ad-8ef2-44ea-93b1-ab0f9f2243c9" />


### Variables de Entorno
Para producción, puedes configurar variables de entorno en un archivo `.env.production`:
```
VITE_API_URL=https://tu-backend.com/api
```

## Pruebas de Rendimiento
### 1. `Prueba en Lighthouse`

### 2. `ResponsiveViewer`

