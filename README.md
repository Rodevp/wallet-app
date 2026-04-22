# 💳 wallet-app

Una **plantilla de API REST** lista para producción para construir aplicaciones de billetera y pagos. Desarrollada con Node.js, TypeScript y PostgreSQL, este proyecto sigue una arquitectura modular limpia diseñada para ser extendida por desarrolladores que construyen productos fintech.

---

## 📋 Tabla de Contenidos

- [Descripción general](#descripción-general)
- [Tecnologías](#tecnologías)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Módulos](#módulos)
- [Middlewares](#middlewares)
- [Primeros pasos](#primeros-pasos)
- [Variables de entorno](#variables-de-entorno)
- [Ejecución con Docker](#ejecución-con-docker)
- [Extender la plantilla](#extender-la-plantilla)

---

## Descripción general

`wallet-app` es una **plantilla inicial** diseñada para darle a los desarrolladores una base sólida y escalable para construir servicios backend relacionados con billeteras o pagos. Incluye autenticación de usuarios, gestión de billeteras, manejo de transacciones, un sistema de libro contable (ledger) y características de seguridad integradas como detección de fraude y limitación de solicitudes — todo listo para usar.

---

## Tecnologías

| Capa | Tecnología |
|---|---|
| Runtime | Node.js |
| Lenguaje | TypeScript |
| Framework | Express.js |
| Base de datos | PostgreSQL |
| Contenedores | Docker / Docker Compose |
| Autenticación | JWT (JSON Web Tokens) |
| Seguridad | bcrypt, rate limiting, middleware antifraude |

---

## Arquitectura del proyecto

El proyecto sigue una **arquitectura modular por capas**. Cada módulo de dominio es autocontenido y está organizado en cuatro capas consistentes:

```
┌─────────────────────────────────────────┐
│            Solicitud HTTP               │
└──────────────────┬──────────────────────┘
                   │
         ┌─────────▼─────────┐
         │     router.ts     │  ← Define las rutas HTTP y aplica middlewares
         └─────────┬─────────┘
                   │
         ┌─────────▼─────────┐
         │   transport.ts    │  ← Parsea la solicitud, llama al servicio y formatea la respuesta
         └─────────┬─────────┘
                   │
         ┌─────────▼─────────┐
         │  [modulo].ts      │  ← Lógica de negocio / casos de uso
         └─────────┬─────────┘
                   │
         ┌─────────▼─────────┐
         │  repository.ts    │  ← Capa de acceso a datos (consultas)
         └─────────┬─────────┘
                   │
         ┌─────────▼─────────┐
         │    PostgreSQL     │
         └───────────────────┘
```

> Este patrón separa las responsabilidades claramente, haciendo que cada capa sea independientemente testeable y reemplazable.

---

## Estructura de carpetas

```
wallet-app/
├── src/
│   ├── index.ts                        # Punto de entrada, arranque del servidor
│   ├── db.ts                           # Configuración de la conexión a la base de datos
│   ├── error.ts                        # Clases de error personalizadas
│   ├── types.ts                        # Tipos TypeScript globales
│   │
│   ├── middlewares/
│   │   ├── auth.ts                     # Middleware de autenticación JWT
│   │   ├── antifraud.middleware.ts     # Verificaciones antifraude
│   │   ├── rateLimitter.ts             # Middleware de limitación de solicitudes
│   │   └── errors.ts                  # Middleware global de manejo de errores
│   │
│   ├── models/
│   │   ├── user.ts                     # Modelo de datos de usuario
│   │   ├── wallet.ts                   # Modelo de datos de billetera
│   │   ├── transaction.ts              # Modelo de datos de transacción
│   │   └── ledger.ts                  # Modelo de datos del libro contable
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.ts                 # Lógica de negocio (login, registro)
│   │   │   ├── repository.ts           # Consultas a la BD para autenticación
│   │   │   ├── router.ts               # Rutas de autenticación
│   │   │   ├── transport.ts            # Manejadores de solicitud/respuesta
│   │   │   └── types.ts                # Tipos específicos de autenticación
│   │   │
│   │   ├── user/
│   │   │   ├── user.ts                 # Lógica de negocio de usuario
│   │   │   ├── repository.ts           # Consultas a la BD para usuarios
│   │   │   ├── router.ts               # Rutas de usuario
│   │   │   └── transport.ts            # Manejadores de solicitud/respuesta
│   │   │
│   │   ├── wallet/
│   │   │   ├── wallet.ts               # Lógica de negocio de billetera
│   │   │   ├── repository.ts           # Consultas a la BD para billeteras
│   │   │   ├── router.ts               # Rutas de billetera
│   │   │   ├── transport.ts            # Manejadores de solicitud/respuesta
│   │   │   └── types.ts                # Tipos específicos de billetera
│   │   │
│   │   ├── transactions/
│   │   │   ├── transaction.ts          # Lógica de negocio de transacciones
│   │   │   ├── repository.ts           # Consultas a la BD para transacciones
│   │   │   ├── router.ts               # Rutas de transacciones
│   │   │   ├── transport.ts            # Manejadores de solicitud/respuesta
│   │   │   └── types.ts                # Tipos específicos de transacciones
│   │   │
│   │   └── ledger/
│   │       ├── ledger.ts               # Lógica de negocio del libro contable
│   │       ├── repository.ts           # Consultas a la BD para el ledger
│   │       ├── router.ts               # Rutas del ledger
│   │       ├── transport.ts            # Manejadores de solicitud/respuesta
│   │       └── types.ts                # Tipos específicos del ledger
│   │
│   └── utils/
│       └── security.ts                 # Utilidades de seguridad (hashing, tokens)
│
├── .example.env                        # Plantilla de variables de entorno
├── .gitignore
├── docker-compose.yml                  # Docker Compose para desarrollo local
├── Dockerfile                          # Definición de la imagen Docker
├── package.json
├── package-lock.json
└── tsconfig.json
```

---

## Módulos

### 🔐 Auth
Maneja el registro de usuarios, inicio de sesión y emisión de tokens. Protege las rutas mediante autenticación basada en JWT.

### 👤 User
Gestiona los datos del perfil de usuario. Proporciona endpoints para leer y actualizar la información del usuario.

### 💰 Wallet
Módulo principal. Gestiona la creación de billeteras, consultas de saldo y estado de la billetera. Cada usuario puede tener una o más billeteras.

### 💸 Transactions
Maneja el movimiento de dinero entre billeteras. Registra operaciones de débito/crédito y aplica reglas de negocio antes de confirmar las transferencias.

### 📒 Ledger
Mantiene un registro de auditoría inmutable de todos los movimientos financieros. Cada transacción genera una entrada de ledger correspondiente para trazabilidad y conciliación.

---

## Middlewares

| Middleware | Propósito |
|---|---|
| `auth.ts` | Valida tokens JWT en rutas protegidas |
| `antifraud.middleware.ts` | Inspecciona transacciones en busca de patrones sospechosos |
| `rateLimitter.ts` | Previene abusos limitando las solicitudes por cliente |
| `errors.ts` | Manejo centralizado de errores y respuestas estandarizadas |

---

## Primeros pasos

### Requisitos previos

- Node.js >= 18
- PostgreSQL >= 14
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/wallet-app.git
cd wallet-app

# Instalar dependencias
npm install

# Copiar y configurar las variables de entorno
cp .example.env .env
# Edita .env con tus valores

# Iniciar el servidor de desarrollo
npm run dev
```

---

## Variables de entorno

Copia `.example.env` a `.env` y completa tus valores:

```env
DATABASE_URL="postgresql://postgres:tu_contraseña@localhost:5432/wallet"
SECRET="tu_clave_secreta_jwt"
```

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Cadena de conexión a PostgreSQL |
| `SECRET` | Clave secreta utilizada para firmar los tokens JWT |

---

## Ejecución con Docker

El proyecto incluye un `Dockerfile` y un `docker-compose.yml` para el desarrollo local en contenedores.

```bash
# Iniciar todos los servicios (API + PostgreSQL)
docker-compose up --build

# Detener los servicios
docker-compose down
```

---

## Extender la plantilla

Este proyecto está diseñado como punto de partida. Algunas sugerencias para extenderlo:

- **Agregar un nuevo módulo**: Crea una nueva carpeta dentro de `src/modules/` siguiendo el mismo patrón `router → transport → [modulo] → repository`.
- **Agregar migraciones de base de datos**: Integra una herramienta como [Flyway](https://flywaydb.org/) o [node-pg-migrate](https://github.com/salsita/node-pg-migrate).
- **Agregar un ORM**: Incorpora [Prisma](https://www.prisma.io/) o [TypeORM](https://typeorm.io/) para reemplazar las consultas directas en los archivos `repository.ts`.
- **Agregar pruebas**: Cada capa (transport, lógica de negocio, repository) puede probarse de forma unitaria de manera independiente gracias a la separación de responsabilidades.
- **Agregar documentación de API**: Integra [Swagger/OpenAPI](https://swagger.io/) usando `swagger-ui-express` y documenta cada router.

---

## Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).
