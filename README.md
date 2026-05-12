# Introduction

This is a small e-commerce based on Fastify, Postgres and Next.js.
This repository is organized in two main folders:
- `apps/api` — Fastify (Fastify, TypeScript-ready).
- `apps/web` — Next.js (React -Next.js-, TypeScript-ready).



## Requirements

- Node.js (v18+ recommended)
- npm or pnpm
- Docker & Docker Compose (only if you want to run using containers)



## Quick overview

- Client: located in `apps/web/` — Next.js app.
- Server: located in `apps/api/` — Fastify app.

You can run the apps independently or start them together via Docker Compose.



## Run locally (recommended for development)

1. Prepare Docker env/secrets for Postgres:
  - Copy `docker/compose.env.example` to `docker/compose.env`
  - Copy `docker/secrets/postgres_password.txt.example` to `docker/secrets/postgres_password.txt`
  - Set the values you want in `docker/compose.env` (`POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PORT`)
  - Replace the example password in `docker/secrets/postgres_password.txt`

2. Start only Postgres with Docker:
  - `docker compose --env-file docker/compose.env up -d postgres`

3. Configure the API to use that Postgres container:
  - Copy `apps/api/.env.example` to `apps/api/.env`
  - Keep `POSTGRES_HOST=localhost`
  - Set `POSTGRES_PORT` to the same value as `POSTGRES_PORT` in `docker/compose.env`
    - Example: if Docker exposes Postgres on `5433`, then `apps/api/.env` should also use `5433`
    - We use `5433` for local development so it does not clash with another Postgres already using the default port `5432` on your machine
  - Set `POSTGRES_USER` to the same value as `POSTGRES_USER` in `docker/compose.env`
  - Set `POSTGRES_NAME` to the same value as `POSTGRES_DB` in `docker/compose.env`
  - Set `POSTGRES_PSW` to the password stored in `docker/secrets/postgres_password.txt`
  - Set `JWT_SECRET` to any local development secret

4. Start the server:
  - Open a terminal
  - cd into the server folder and install dependencies:
    - cd apps/api
    - npm install
  - Start the server in watch/dev mode:
    - npm run dev

5. Start the client:
  - Copy `apps/web/.env.example` to `apps/web/.env` if needed
  - Open a terminal
  - cd into the client folder and install dependencies:
    - cd apps/web
    - npm install
  - Start Next.js in development:
    - npm run dev



## Run with Docker Compose

The compose setup includes four services:
- `postgres` (database)
- `backend` (Fastify API)
- `frontend` (Next.js)
- `pgadmin` (optional database administration UI)

### 1) Prepare env files

- Copy `docker/compose.env.example` to `docker/compose.env` for non-sensitive Docker Compose values.
- Copy `apps/web/.env.example` to `apps/web/.env` if you also run the frontend outside Docker.
- Copy `apps/api/.env.example` to `apps/api/.env` only if you run the API outside Docker.
- Keep secrets out of all `.env` files used by Compose.

### 2) Prepare Docker secrets

This setup uses Docker secrets for sensitive values (`POSTGRES_PSW`, `JWT_SECRET`, pgAdmin password).

Create the secret files from the examples:

```bash
cp docker/secrets/postgres_password.txt.example docker/secrets/postgres_password.txt
cp docker/secrets/jwt_secret.txt.example docker/secrets/jwt_secret.txt
cp docker/secrets/pgadmin_password.txt.example docker/secrets/pgadmin_password.txt
cp docker/compose.env.example docker/compose.env
```

Then replace the example values with real credentials.
The backend reads sensitive values from mounted secret files, not from Compose environment variables.

### 3) Start in development mode (watch)

```bash
docker compose --env-file docker/compose.env up --watch
```

To start pgAdmin as well:

```bash
docker compose --env-file docker/compose.env --profile tools up --watch
```

### 4) Stop services

```bash
docker compose down
```

### Access URLs

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:80`
- pgAdmin: `http://localhost:5050` when started with `--profile tools`



## Build for production (locally)

- Client:
  - set up variables in .env
  - cd client
  - npm install
  - npm run build
  - npm run start
  - By default `next start` serves the production build on port 3000 (use `PORT` env var to override).

- Server:
  - set up variables in .env
  - cd api
  - npm install
  - npm run build
  - npm run start
  - `npm run build` uses `tsc` (TypeScript compiler) to emit `dist/`; `npm run start` runs the compiled server.



## Environment variables

- client:
  - NEXT_PUBLIC_API_URL — base URL used by browser-side code to call the backend.
    - Local dev example: `http://localhost:80`
    - Docker Compose example: `http://localhost:80`
  - API_INTERNAL_URL — internal backend URL used by server-side code or services inside Docker.
    - Local dev example: `http://localhost:80`
    - Docker Compose example: `http://backend:80`
  - NEXT_TELEMETRY_DISABLED — set to 1 to disable telemetry, optional.

- server:
  - PORT — port for the API used by the server.
  - POSTGRES_PSW — Postgres database password
  - POSTGRES_HOST — Postgres database host, e.g. localhost
  - POSTGRES_PORT — Postgres database port, usually 5432
  - POSTGRES_NAME — Postgres database name
  - POSTGRES_USER — Postgres username
  - JWT_SECRET — JWT secret

- docker compose:
  - Non-sensitive values should live in `docker/compose.env` or service-specific local `.env` files.
  - Sensitive values should live only in Docker secrets files mounted at `/run/secrets/*`.
  - In this repo:
    - `POSTGRES_PSW` is read from `docker/secrets/postgres_password.txt`
    - `JWT_SECRET` is read from `docker/secrets/jwt_secret.txt`
    - `PGADMIN_DEFAULT_PASSWORD` is read from `docker/secrets/pgadmin_password.txt`



## Project structure (high level)

- apps/web/
  - package.json — scripts: `dev`, `build`, `start`, `lint`
  - next.js app files

- apps/api/
  - package.json — scripts: `dev`, `build`, `start`, `lint`
  - src/ — source code
  - dist/ — compiled output after build (created by `npm run build`)

- compose.yaml (or docker-compose.yaml)
  - Docker Compose configuration used to run both services together



## Specific documentantion
To check for specific documentation see:
- server: `apps/api/README.md`
- client: `apps/web/README.md`
