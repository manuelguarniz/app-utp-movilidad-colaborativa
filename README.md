# App UTP Movilidad Colaborativa

Proyecto base en React + TypeScript + Vite + Tailwind CSS para una aplicación de movilidad colaborativa.

## Requisitos

- Node.js 18+
- npm o pnpm

## Comandos

### Instalación

```bash
npm install
```

### Ejecutar en distintos perfiles

> Nota: Vite no permite usar `local` como nombre de modo porque entra en conflicto con `.env.local`.

```bash
npm run dev
npm run dev:local
npm run dev:development
```

### Build

```bash
npm run build
npm run build:development
```

### Tipos

```bash
npm run typecheck
```

## Variables de entorno

Copia `.env.example` a `.env` y ajusta los valores:

```bash
cp .env.example .env
```

Ejemplo:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_ENV=local
VITE_AUTH_COOKIE_NAME=app_auth_token
```

## Arquitectura sugerida

- `src/app`: configuración general, layout y rutas
- `src/features`: módulos funcionales (`auth`, `dashboard`)
- `src/shared`: utilidades y servicios compartidos (`apiClient`)
- `src/styles`: estilos globales y Tailwind

## Buenas prácticas incluidas

- TypeScript con tipado fuerte
- Rutas protegidas con `react-router-dom`
- Integración con cookies para autenticación
- Cliente HTTP centralizado con Axios
- React Query para consultas y caché
- Variables de entorno por perfil
- Estructura escalable para crecimiento del proyecto

## Ejemplo de uso de librerías

- `react-router-dom`: navegación basada en URL
- `@tanstack/react-query`: manejo de estado asíncrono del backend
- `axios`: consumo de API REST
- `js-cookie`: lectura y escritura de cookies
- `tailwindcss`: estilos rápidos y consistentes

## Nota

Este proyecto es una base inicial. El backend debe exponer endpoints como:

```http
POST /api/auth/login
POST /api/auth/register
GET /api/dashboard/stats
```

La arquitectura está construida para poder evolucionar hacia módulos más complejos, autenticación real, servicios, validaciones y UI con componentes reutilizables.
