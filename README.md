# LMS PRO

Sistema de Gestión de Aprendizaje moderno y profesional creado con Next.js.

**Creado por Andrez Hernandez**

## 🚀 Características

- 🎓 Sistema completo de gestión de cursos
- 📹 Integración con YouTube para videos
- 👥 Gestión de usuarios con múltiples roles (Student, Instructor, Admin)
- 📊 Seguimiento de progreso en tiempo real
- 🎯 Sistema de certificación
- 🎨 Interfaz moderna con tema oscuro
- 🔐 Autenticación segura con NextAuth.js

## 🛠️ Tecnologías

- **Framework**: Next.js 16 (App Router)
- **Base de Datos**: SQLite con Prisma ORM
- **Autenticación**: NextAuth.js
- **Lenguaje**: TypeScript
- **Estilo**: CSS Vanilla (Dark Theme)

## 📋 Requisitos Previos

- Node.js 18+ instalado
- npm o yarn

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/lms-pro.git
cd lms-pro
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="tu-secreto-aleatorio-seguro-aqui"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Configurar base de datos**
```bash
npx prisma generate
npx prisma migrate dev
```

5. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

6. **Abrir en el navegador**
```
http://localhost:3000
```

## 📚 Documentación

Consulta [DOCUMENTATION.md](./DOCUMENTATION.md) para documentación completa del sistema, incluyendo:
- Arquitectura del sistema
- Roles y permisos
- Modelos de base de datos
- Funcionalidades por rol
- Flujos de trabajo

## 🎭 Roles del Sistema

### 🎓 STUDENT (Estudiante)
- Ver y tomar cursos publicados
- Seguimiento de progreso
- Obtener certificados

### 👨‍🏫 INSTRUCTOR
- Crear y gestionar cursos
- Publicar contenido
- Gestionar estados de cursos

### 👨‍💼 ADMIN (Administrador)
- Gestión completa de usuarios
- Administración de todos los cursos
- Asignación de roles

## 📂 Estructura del Proyecto

```
my-app/
├── app/                    # Directorio de Next.js App Router
│   ├── dashboard/          # Páginas del dashboard
│   │   ├── courses/        # Módulo de cursos
│   │   ├── users/          # Gestión de usuarios (Admin)
│   │   └── profile/        # Perfil de usuario
│   ├── api/                # API Routes
│   └── auth/               # Autenticación
├── prisma/                 # Configuración de base de datos
│   └── schema.prisma       # Schema de Prisma
├── lib/                    # Utilidades
└── public/                 # Archivos estáticos
```

## 🔐 Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ Sesiones seguras con NextAuth.js
- ✅ Validación de roles en servidor
- ✅ Protección CSRF
- ✅ Prevención SQL Injection (Prisma)

## 📦 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Build para producción
npm start            # Servidor de producción
npm run lint         # Linter
npx prisma studio    # Interfaz visual de BD
```

## 🌟 Funcionalidades Destacadas

### Sistema de Progreso Inteligente
- Tracking en tiempo real
- Auto-save cada 5 segundos
- Prevención de adelanto de video
- Sincronización entre vistas

### Integración con YouTube
- Reproducción de videos
- Obtención automática de thumbnails
- Cálculo de duración real

### Filtros Dinámicos
- Por título, nivel, estado
- Por progreso del estudiante
- Ordenamiento inteligente

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto.

## 👨‍💻 Autor

**Andrez Hernandez**

---

## 📞 Soporte

Para reportar problemas o solicitar funcionalidades, abre un issue en GitHub.

---

**© 2026 LMS PRO - Sistema de Gestión de Aprendizaje**
