# Despliegue en Render Static Sites

## 🚀 Instrucciones para Despliegue

### 1. Preparar el Proyecto
El proyecto ya está configurado para despliegue estático con:
- ✅ Servicios con datos simulados
- ✅ Configuración de Vite optimizada
- ✅ Archivo `render.yaml` configurado
- ✅ Build sin TypeScript

### 2. Subir a Render

#### Opción A: Conectando tu repositorio GitHub
1. **Sube el proyecto a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Deploy ready"
   git branch -M main
   git remote add origin <tu-repo-url>
   git push -u origin main
   ```

2. **En Render Dashboard**
   - New → Static Site
   - Conecta tu repositorio GitHub
   - Render detectará automáticamente el `render.yaml`

#### Opción B: Subiendo manualmente
1. **Construye el proyecto**
   ```bash
   npm install
   npm run build
   ```

2. **Comprime la carpeta dist**
   ```bash
   cd dist
   zip -r ../build.zip .
   cd ..
   ```

3. **Sube el ZIP a Render**
   - New → Static Site
   - Upload ZIP file
   - Configura el nombre y dominio

### 3. Configuración Automática
El `render.yaml` incluye:
- **Build Command**: `npm run build`
- **Publish Directory**: `./dist`
- **Node Version**: Latest
- **Environment**: Production

### 4. Funcionalidades Disponibles
✅ **Login**: admin@test.com / 123456
✅ **Dashboard**: Con estadísticas simuladas
✅ **Gestión de Pacientes**: CRUD completo
✅ **Gestión de Citas**: CRUD completo
✅ **Gestión de Especialidades**: CRUD completo
✅ **Diseño Responsive**: Mobile, Tablet, Desktop
✅ **Notificaciones**: Sistema de toast

### 5. URLs de Producción
Una vez desplegado, tu aplicación estará disponible en:
- **URL de Render**: `https://sistema-citas-medicas.onrender.com`
- **Dominio personalizado**: Configurable en dashboard de Render

### 6. Variables de Entorno
El proyecto usa:
- `VITE_API_URL`: Configurada para modo estático
- `NODE_ENV`: Production (automático en Render)

### 7. Troubleshooting

#### Si el build falla:
```bash
# Limpia caché
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Si las rutas no funcionan:
- Verifica que `base: '/'` en `vite.config.js`
- Confirma las rutas en `render.yaml`

#### Si los datos no cargan:
- Los servicios tienen datos simulados automáticamente
- Revisa la consola para errores

### 8. Optimizaciones Implementadas
- 🗜️ **Minificación automática**
- 📦 **Bundle splitting**
- 🗂️ **Static assets optimizados**
- 📱 **Meta tags responsive**
- 🔒 **Seguridad básica**

## 🎯 Listo para Producción

El proyecto está completamente configurado para despliegue estático en Render con todas las funcionalidades trabajando sin backend.
