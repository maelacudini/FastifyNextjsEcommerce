# Introduction

A minimal starter to run a Fastify backend and a Next.js frontend together. This repository contains two main folders:
- `apps/api` — Fastify (Fastify, TypeScript-ready).
- `apps/web` — Next.js (React -Next.js-, TypeScript-ready).
- `packages` — Shared stuff between client and server.



## Requirements

- Node.js (v18+ recommended)
- npm or pnpm
- Docker & Docker Compose (only if you want to run using containers)



## Quick overview

- Client: located in `apps/web/` — Next.js app.
- Server: located in `app/server/` — Fastify app.

You can run the apps independently or start them together via Docker Compose.



## Run locally (recommended for development)

1. Start the server:
  - Open a terminal
  - cd into the server folder and install dependencies:
    - cd server
    - npm install
  - Start the server in watch/dev mode:
    - npm run dev

2. Start the client:
  - Open a separate terminal
  - cd client
  - npm install
  - Provide the API base URL so the frontend knows where the backend is. Create `client/.env.local` (or set environment variables in your shell) with:
    - NEXT_PUBLIC_WEB_URL=http://localhost:your_port
  - Start Next.js in development:
    - npm run dev



## Run with Docker Compose

This repository provides a compose setup. There are two typical modes: development (with live-reload) and production.

1. Development (watch)
  - Make sure the compose file uses the development Dockerfile for each service (the repository uses `Dockerfile.dev` naming convention in the compose service build config).
  - Then run:
    - docker compose up --watch
  - This will build the images (using the dev Dockerfiles which are typically configured for file-watch / live reload) and run the services. When you are done:
    - docker compose down

2. Production
  - Configure the compose file to use `Dockerfile.prod` (or ensure the production build steps are used).
  - Build and start in detached mode:
    - docker compose up --build -d
  - Stop:
    - docker compose down

Notes:
- The exact compose service names and Dockerfile names are in `compose.yaml` in the repo — adjust as needed.



## Build for production (locally)

- Client:
  - cd client
  - npm install
  - npm run build
  - npm run start
  - By default `next start` serves the production build on port 3000 (use `PORT` env var to override).

- Server:
  - cd server
  - npm install
  - npm run build
  - npm run start
  - `npm run build` uses `tsc` (TypeScript compiler) to emit `dist/`; `npm run start` runs the compiled server.



## Environment variables

- client:
  - NEXT_PUBLIC_WEB_URL — base URL for the API used by the client (e.g. `http://localhost:3000`).
  - NEXT_PUBLIC_API_URL — base URL for the API used to connect to the backend (e.g. `http://backend:80`).
  - Use a `.env.local` file in `client/` for Next.js environment variables.

- server:
  - PORT — port for the API used by the server.

- docker:
  - If you are using Docker, always remember to set both backend and frontend environment variables inside the `compose.yaml` file.



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