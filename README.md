# ColaboraCar — Movilidad Colaborativa UTP

Aplicación web en **React + TypeScript + Vite + Tailwind CSS** diseñada para incrustarse en un **WebView** móvil. Permite a estudiantes y conductores registrarse, verificar su cuenta, completar el perfil y consultar viajes colaborativos disponibles.

Durante el desarrollo, el backend se simula con **MSW (Mock Service Worker)** para avanzar con el diseño sin depender de una API real.

## Requisitos

- Node.js 18+
- npm

## Inicio rápido

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173` (o la IP de tu máquina si usas `--host`).

### Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run dev:local` | Desarrollo con modo `localdev` |
| `npm run dev:development` | Desarrollo con modo `development` |
| `npm run build` | Build de producción |
| `npm run build:development` | Build en modo development |
| `npm run preview` | Vista previa del build |
| `npm run typecheck` | Verificación de tipos TypeScript |

> **Nota:** Vite no permite usar `local` como nombre de modo porque entra en conflicto con `.env.local`.

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto si necesitas personalizar la configuración:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_AUTH_COOKIE_NAME=app_auth_token
VITE_AUTH_VERIFIED_COOKIE_NAME=app_auth_verified
```

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `VITE_API_BASE_URL` | URL base de la API | `http://localhost:3000/api` |
| `VITE_AUTH_COOKIE_NAME` | Cookie del token de sesión | `app_auth_token` |
| `VITE_AUTH_VERIFIED_COOKIE_NAME` | Cookie de verificación OTP | `app_auth_verified` |

## Flujos de la aplicación

### Inicio de sesión

```
Login → Verificación (OTP 6 dígitos) → Dashboard
```

### Registro

```
Registro → Completar perfil → Login
```

## Rutas

| Ruta | Pantalla | Acceso |
|------|----------|--------|
| `/auth/login` | Iniciar sesión | Público |
| `/auth/register` | Registro | Público |
| `/auth/verificacion` | Verificación OTP | Requiere token (post-login) |
| `/auth/completar-perfil` | Completar perfil | Tras registro |
| `/dashboard` | Listado de viajes | Requiere sesión verificada |

## Estructura del proyecto

```
app-utp-movilidad-colaborativa/
├── frames/                    # Mockups de diseño (referencia UI)
├── public/
│   └── mockServiceWorker.js   # Service worker de MSW
├── src/
│   ├── app/
│   │   ├── App.tsx            # Definición de rutas
│   │   ├── layouts/
│   │   │   └── AppLayout.tsx  # Layout del dashboard (header + bottom nav)
│   │   └── routes/
│   │       └── ProtectedRoute.tsx
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/    # AuthField, AuthLayout, OtpInput, etc.
│   │   │   ├── data/          # Opciones de departamentos, distritos, sedes
│   │   │   ├── pages/         # Login, Register, Verification, CompleteProfile
│   │   │   └── services/
│   │   │       └── authService.ts
│   │   └── dashboard/
│   │       ├── components/    # RideCard, BottomNav, DashboardHeader, etc.
│   │       ├── pages/
│   │       │   └── DashboardPage.tsx
│   │       ├── services/
│   │       │   └── dashboardService.ts
│   │       └── types.ts
│   ├── mocks/
│   │   ├── browser.ts           # Configuración del worker MSW
│   │   ├── handlers.ts          # Endpoints mock
│   │   └── setup.ts             # Activación en desarrollo
│   ├── shared/
│   │   ├── api/
│   │   │   └── apiClient.ts     # Cliente Axios centralizado
│   │   └── icons/               # Iconos SVG reutilizables
│   ├── styles/
│   │   └── index.css            # Tailwind + estilos globales WebView
│   └── main.tsx                 # Punto de entrada
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

### Convenciones

- **`src/app`**: configuración global, layouts y rutas.
- **`src/features`**: módulos por dominio (`auth`, `dashboard`). Cada feature agrupa páginas, componentes y servicios propios.
- **`src/shared`**: código transversal (API client, iconos).
- **`src/mocks`**: API simulada con MSW, activa solo en `import.meta.env.DEV`.
- **`frames/`**: diseños de referencia; no se importan en runtime.

## API mock (MSW)

En desarrollo, MSW intercepta las peticiones HTTP. El worker se inicializa en `src/main.tsx` antes de montar la aplicación.

### Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/auth/login` | Inicio de sesión |
| `POST` | `/api/auth/register` | Registro de usuario |
| `POST` | `/api/auth/verify-code` | Verificación OTP (6 dígitos) |
| `POST` | `/api/auth/resend-code` | Reenvío de código |
| `POST` | `/api/auth/complete-profile` | Completar perfil |
| `POST` | `/api/auth/logout` | Cerrar sesión |
| `GET` | `/api/rides` | Listado de viajes |
| `POST` | `/api/rides/:rideId/reserve` | Reservar viaje |

### Credenciales de prueba

- **Login:** cualquier correo y contraseña válidos.
- **Verificación:** cualquier código de **6 dígitos**.
- **Registro:** email + contraseña (mín. 8 caracteres con letras, números y símbolos).

## Diseños de referencia (`frames/`)

Los mockups guían la implementación visual. La UI está adaptada a **WebView** (sin marco móvil, safe areas, `100dvh`).

| # | Archivo | Pantalla | Estado |
|---|---------|----------|--------|
| 01 | [01. login.png](<frames/01. login.png>) | Iniciar sesión | Implementada |
| 02 | [02. registro.png](<frames/02. registro.png>) | Registro | Implementada |
| 03 | [03. verificacion.png](<frames/03. verificacion.png>) | Verificación OTP | Implementada |
| 04 | [04. completar-perfil.png](<frames/04. completar-perfil.png>) | Completar perfil | Implementada |
| 05 | [05. datos-vehiculo.png](<frames/05. datos-vehiculo.png>) | Datos del vehículo | Pendiente |
| 06 | [06. dashboard.png](<frames/06. dashboard.png>) | Dashboard / viajes | Implementada |
| 07 | [07. about-card.png](<frames/07. about-card.png>) | Tarjeta informativa | Pendiente |

### Vista previa de pantallas

#### 01 — Login

<p align="center">
  <img src="frames/01. login.png" alt="Pantalla de login" width="360" />
</p>

#### 02 — Registro

<p align="center">
  <img src="frames/02. registro.png" alt="Pantalla de registro" width="360" />
</p>

#### 03 — Verificación

<p align="center">
  <img src="frames/03. verificacion.png" alt="Pantalla de verificación" width="360" />
</p>

#### 04 — Completar perfil

<p align="center">
  <img src="frames/04. completar-perfil.png" alt="Pantalla completar perfil" width="360" />
</p>

#### 05 — Datos del vehículo

<p align="center">
  <img src="frames/05. datos-vehiculo.png" alt="Pantalla datos del vehículo" width="360" />
</p>

#### 06 — Dashboard

<p align="center">
  <img src="frames/06. dashboard.png" alt="Pantalla dashboard" width="360" />
</p>

#### 07 — About card

<p align="center">
  <img src="frames/07. about-card.png" alt="Pantalla about card" width="360" />
</p>

## Stack tecnológico

| Librería | Uso |
|----------|-----|
| [React 18](https://react.dev/) | UI |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [Vite](https://vitejs.dev/) | Bundler y dev server |
| [Tailwind CSS](https://tailwindcss.com/) | Estilos |
| [React Router](https://reactrouter.com/) | Navegación |
| [TanStack Query](https://tanstack.com/query) | Estado asíncrono y caché |
| [Axios](https://axios-http.com/) | Cliente HTTP |
| [js-cookie](https://github.com/js-cookie/js-cookie) | Gestión de cookies |
| [MSW](https://mswjs.io/) | API mock en desarrollo |
| [Faker](https://fakerjs.dev/) | Datos de prueba en mocks |

## Consideraciones WebView

- Viewport con `viewport-fit=cover` para respetar notch y áreas seguras.
- Variables CSS `--safe-area-inset-*` para padding en iOS/Android.
- Layouts a pantalla completa (`100dvh`), sin marco tipo dispositivo.
- Selects personalizados en lugar de `<select>` nativo (evita bugs de posicionamiento en WebView).

## Próximos pasos sugeridos

- Implementar pantalla **Datos del vehículo** (`05. datos-vehiculo.png`).
- Implementar pantalla **About card** (`07. about-card.png`).
- Conectar navegación inferior (Historial, Billetera, Perfil).
- Integrar API backend real reemplazando o desactivando MSW en producción.
