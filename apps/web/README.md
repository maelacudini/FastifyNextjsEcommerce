# Introduction

This folder contains the Next.js frontend for the project. It is a modern React/Next app configured with TypeScript and the App Router. Key features used in this project:

- Next.js (App Router)
- next-intl for i18n (server + client translations)
- Tailwind CSS for utility-first styling
- ESLint for linting
- TypeScript for types and safety
- Docker support (Dockerfile.dev) for containerized development


## What this client does

- Renders UI with Next App Router and server components.
- Uses next-intl for localization and a small i18n folder to manage locales and cookies.
- Fetches API data from the backend; use environment variables to point to the backend URL.


## Quick start (local)

1. Install dependencies
```powershell
cd client
npm install
```

2. Development
```powershell
npm run dev
# opens on http://localhost:3000 by default
```

3. Production build / run
```powershell
npm run build
npm run start
# Next will serve production build on the configured port (3000 by default)
```


## Environment variables

The client uses environment variables to determine the backend API URL and other runtime settings.

Recommended vars:
- NEXT_PUBLIC_WEB_URL — URL used by client code (browser and server components if needed).
- NEXT_PUBLIC_API_URL=http://backend:80
  - In Docker Compose, set `NEXT_PUBLIC_WEB_URL=http://backend:80` so server-side Next fetches can resolve backend by service name.
- NEXT_TELEMETRY_DISABLED=1

Notes:
- Use NEXT_PUBLIC_* prefix when the value must be available to browser code. Server-only values (not exposed to browser) can be defined without the prefix, but server components can access both.
- For server-side fetches inside the Next server running in Docker, you can use `http://backend:80` (service name) as the base URL. For browser requests, use a URL reachable from the browser (e.g. http://localhost:80).


## i18n (next-intl)

- Translations live under `client/i18n` (locales, types, helpers).
- The app uses `next-intl` server helpers to detect locale and provide translations to components.
- Cookie name and default locales are defined in `client/i18n/const.ts`.


## Styling (Tailwind)

- Tailwind configured via `tailwind.config.js` and used throughout `app/` components.
- Global CSS is in `app/_styles/globals.css`.


## Linting

- ESLint configuration lives in `eslint.config.mjs`.
- Run:
```powershell
npm run lint
```

## Types
This project uses OpenAPI to convert OpenAPI 3.0/3.1 schemas to TypeScript types and create type-safe fetching. To use run the following command:
```powershell
npm run gen:api
```

## Fetch data
This project uses openapi-react-query, a type-safe tiny wrapper (1 kb) around @tanstack/react-query to work with OpenAPI schema. It works by using openapi-fetch and openapi-typescript.
For the official documentation on openapi-react-query please check out their official [website](https://openapi-ts.dev/openapi-react-query/).

## Docker / Containerized development

From the client folder, build the image:
```powershell
docker build -t fastify_next_client_img .
```

From the client folder, to build only client side:
```powershell
docker run --name fastify_next_client_cont --rm -p 3000:3000 fastify_next_client_img
```

Stop container (with --rm it removes itself after being stopped):
```powershell
docker stop fastify_next_client_cont
```