# 🎓 Qué Hay UT - Frontend

**Comunidad Digital Universitaria para la Universidad del Tolima**

Una aplicación web moderna y responsiva que conecta a los estudiantes de modalidad a distancia de la Universidad del Tolima, facilitando el acceso a información académica y promoviendo la colaboración estudiantil.

![Vue.js](https://img.shields.io/badge/Vue.js-3.5.22-4FC08D?style=flat&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.11-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.16-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 🌟 Características

### 📢 **Anuncios Oficiales**
- Visualización de comunicados de la universidad
- Filtros por categoría y prioridad
- Búsqueda avanzada de anuncios
- Notificaciones de anuncios importantes

### 📅 **Calendario Académico**
- Calendario interactivo con fechas importantes
- Eventos, fechas límite y actividades académicas
- Vista mensual con navegación intuitiva
- Recordatorios personalizables

### 👥 **Comunidad Estudiantil**
- Publicaciones de estudiantes
- Venta de materiales académicos
- Formación de grupos de estudio
- Solicitudes de ayuda académica

### 👩‍🏫 **Directorio de Docentes**
- Información de contacto de profesores
- Horarios de atención
- Materias impartidas
- Recursos académicos

## 🚀 Tecnologías

- **Frontend Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Icons**: Heroicons
- **Router**: Vue Router 4
- **HTTP Client**: Axios
- **Language**: JavaScript/ES6+

## 📦 Instalación

### Prerrequisitos
- Node.js >= 20.19.0 o >= 22.12.0
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/DianaSolarte/queHayUTFrontend.git
   cd queHayUTFrontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env` con la configuración de tu backend:
   ```env
   VITE_API_URL=http://localhost:8080/api
   VITE_APP_NAME=Qué Hay UT
   VITE_UNIVERSITY_NAME=Universidad del Tolima
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:5177
   ```

## 🏗️ Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Vista previa del build
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── api/                    # Configuración de APIs
│   ├── index.js           # Configuración base de Axios
│   ├── announcements.api.js
│   ├── calendar.api.js
│   ├── community.api.js
│   └── teachers.api.js
├── assets/                # Recursos estáticos
├── components/            # Componentes reutilizables
│   ├── AnnouncementCard.vue
│   ├── Footer.vue
│   └── Navbar.vue
├── layouts/               # Layouts de páginas
│   └── MainLayout.vue
├── modules/               # Módulos por funcionalidad
│   ├── announcements/
│   │   └── views/
│   │       └── AnnouncementsView.vue
│   ├── auth/
│   │   └── views/
│   │       └── LoginView.vue
│   ├── calendar/
│   │   └── views/
│   │       └── CalendarView.vue
│   ├── community/
│   │   └── views/
│   │       └── CommunityView.vue
│   └── teachers/
│       └── views/
│           └── TeachersView.vue
├── router/                # Configuración de rutas
│   └── index.js
├── App.vue               # Componente raíz
├── main.js               # Punto de entrada
└── style.css             # Estilos globales
```

## 🔗 Conectando con el Backend

La aplicación está diseñada para funcionar con el backend de Spring Boot. Para conectar ambos:

1. **Asegúrate de que el backend esté ejecutándose** en `http://localhost:8080`

2. **Configura CORS en tu backend Spring Boot:**
   ```java
   @CrossOrigin(origins = "http://localhost:5177")
   ```

3. **Endpoints esperados por el frontend:**
   ```
   GET    /api/anuncios              # Listar anuncios
   GET    /api/anuncios/{id}         # Obtener anuncio por ID
   POST   /api/anuncios              # Crear anuncio
   PUT    /api/anuncios/{id}         # Actualizar anuncio
   DELETE /api/anuncios/{id}         # Eliminar anuncio
   ```

## 📱 Diseño Responsivo

La aplicación está optimizada para:
- 📱 **Móviles**: 320px+
- 📱 **Tablets**: 768px+
- 💻 **Desktop**: 1024px+
- 🖥️ **Wide screens**: 1280px+

## 🧪 Datos de Prueba

La aplicación incluye datos de ejemplo para demostración:
- Anuncios ficticios de la universidad
- Eventos del calendario académico
- Publicaciones de la comunidad estudiantil
- Directorio de docentes

## 🚀 Despliegue

### Build para producción
```bash
npm run build
```

### Despliegue en Netlify
1. **Conecta tu repositorio GitHub a Netlify**
2. **Configuración de build:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `20`
3. **Variables de entorno en Netlify:**
   ```
   VITE_API_URL=https://tu-backend-url.com/api
   VITE_APP_NAME=Qué Hay UT
   VITE_UNIVERSITY_NAME=Universidad del Tolima
   ```
4. **Configuración automática:** El archivo `netlify.toml` se encarga del resto

### Despliegue en Vercel
1. Conecta tu repositorio
2. Configura las variables de entorno
3. Set build command: `npm run build`
4. Set output directory: `dist`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Créditos

- **Universidad del Tolima** - Institución educativa
- **Ingeniería de Sistemas** - Programa académico
- **Modalidad a Distancia** - Comunidad objetivo

## 📞 Soporte

¿Necesitas ayuda? 
- 📧 Email: dmsolartem@ut.edu.co
- 🌐 Portal UT: https://www.ut.edu.co
- 📚 Plataforma Saber: https://saber.ut.edu.co

---

**Desarrollado con ❤️ para la comunidad estudiantil de la Universidad del Tolima**
