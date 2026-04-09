# CAEX Logistics — Módulo de Tracking

Portal de autoservicio para consultar el estado de envíos en tiempo real.

> **Herramientas de IA utilizadas:** Claude Code (Anthropic) — usado para acelerar el scaffolding, generación de código boilerplate y revisión de tipos TypeScript. ChatGPT (OpenAI) — usado para consultas puntuales y resolución rápida de dudas. Toda la lógica de negocio, decisiones de arquitectura y stack fueron definidas por el desarrollador.

---

## Stack

**Backend** — Node.js + Express + TypeScript · Prisma ORM · PostgreSQL 15 · JWT · `express-validator`

**Frontend** — React + Vite + TypeScript · Tailwind CSS · Axios · Zod

**Infra** — Docker + Docker Compose

---

## Inicio rápido con Docker

**Prerequisito:** tener Docker y Docker Compose instalados.

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd caex-tracking

# 2. Levantar todo (DB + Backend + Frontend)
docker compose up --build

# 3. Abrir el portal
#    Frontend → http://localhost:3000
#    Backend  → http://localhost:3001
```

La base de datos se crea y se pobla automáticamente al iniciar.

---

## Inicio manual (sin Docker)

### Prerequisitos
- Node.js 20+
- PostgreSQL 15 corriendo localmente

### Backend

```bash
cd backend
npm install

# Copiar variables de entorno
cp .env.example .env
# Editar .env con tu DATABASE_URL

# Crear tablas y poblar datos
npx prisma db push
npx prisma db seed

# Desarrollo
npm run dev

# Producción
npm run build && npm start
```

### Frontend

```bash
cd frontend
npm install

# Copiar variables de entorno
cp .env.example .env
# Editar VITE_API_URL si el backend no corre en localhost:3001

# Desarrollo
npm run dev       # → http://localhost:5173

# Producción
npm run build && npm run preview
```

---

## Documentación de la API

La documentación interactiva completa (Swagger UI) está disponible con el proyecto corriendo:

```
http://localhost:3001/api-docs
```

Desde ahí podés explorar todos los endpoints, ver schemas de request/response y probarlos directamente en el browser.

---

## Guías de prueba

| Guía | Estado | Ubicación actual |
|------|--------|-----------------|
| `CAEX-001` | Entregado | Zona 10, Guatemala Ciudad |
| `CAEX-002` | En Tránsito | Hub Quetzaltenango |
| `CAEX-003` | Retenido en Aduana | Aduana Puerto Quetzal |
| `CAEX-004` | En Bodega | Bodega Central Mixco |
| `CAEX-005` | Pendiente de Recolección | Bodega Sur Escuintla |

---

## Diagrama de datos

```
┌─────────────────────────────────────┐
│               guias                 │
├─────────────────────────────────────┤
│ id              SERIAL  PK          │
│ numero_guia     VARCHAR UNIQUE      │
│ estado_actual   VARCHAR             │
│ ubicacion_actual VARCHAR            │
│ destinatario    VARCHAR (nullable)  │
│ created_at      TIMESTAMP           │
└──────────────────┬──────────────────┘
                   │ 1
                   │
                   │ N
┌──────────────────▼──────────────────┐
│           historial_ruta            │
├─────────────────────────────────────┤
│ id          SERIAL  PK              │
│ guia_id     INTEGER FK → guias.id   │
│ ubicacion   VARCHAR                 │
│ estado      VARCHAR                 │
│ descripcion TEXT (nullable)         │
│ fecha_hora  TIMESTAMP               │
└─────────────────────────────────────┘
```

**Relación:** Una guía tiene muchos registros de historial (1:N).  
El historial se retorna ordenado por `fecha_hora DESC` (más reciente primero).

---

## Arquitectura por capas (Backend)

```
Request
  └─▶ Route (express-validator)
        └─▶ Middleware (JWT auth)
              └─▶ Controller (parse req/res)
                    └─▶ Service (lógica de negocio)
                          └─▶ Repository (queries Prisma)
                                └─▶ PostgreSQL
```
