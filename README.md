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
- Server: located in `app/api/` — Fastify app.

You can run the apps independently or start them together via Docker Compose.



## Run locally (recommended for development)

1. Start the server:
  - Set up .env with correct variables
  - Open a terminal
  - cd into the server folder and install dependencies:
    - cd apps/api
    - npm install
  - Start the server in watch/dev mode:
    - npm run dev

2. Start the client:
  - Set up .env with correct variables
  - Open a terminal
  - cd into the server folder and install dependencies:
    - cd apps/web
    - npm install
  - Start Next.js in development:
    - npm run dev



## Run with Docker Compose

This repository provides a compose setup. There are two typical modes: development (with live-reload) and production.

1. Set up environment variables.

2. Development (watch)
  - Make sure the compose file uses the development Dockerfile for each service (the repository uses `Dockerfile.dev` naming convention in the compose service build config).
  - Then run:
    - docker compose up --watch
  - This will build the images (using the dev Dockerfiles which are typically configured for file-watch / live reload) and run the services. When you are done:
    - docker compose down

3. Production
  - Configure the compose file to use `Dockerfile.prod` (or ensure the production build steps are used).
  - Build and start in detached mode:
    - docker compose up --build -d
  - Stop:
    - docker compose down

Notes:
- The exact compose service names and Dockerfile names are in `compose.yaml` in the repo — adjust as needed.



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

- docker:
  - If you are using Docker, always remember to set both backend and frontend environment variables inside the `compose.yaml` file, or use secrets for sensitive env vars.



## Project structure (high level)

- apps/web/
  - package.json — scripts: `dev`, `build`, `start`, `lint`
  - next.js app files

- app/api/
  - package.json — scripts: `dev`, `build`, `start`, `lint`
  - src/ — source code
  - dist/ — compiled output after build (created by `npm run build`)

- compose.yaml (or docker-compose.yaml)
  - Docker Compose configuration used to run both services together



## Specific documentantion
To check for specific documentation see:
- server: `apps/api/README.md`
- client: `apps/web/README.md`