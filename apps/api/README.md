# Introduction
Fullstack app with a Fastify backend and a Next.js frontend wired using hexagonal (ports & adapters) architecture.
This README is a short tutorial / composition guide that illustrates, step‑by‑step, how the example project applies hexagonal (ports & adapters) architecture to expose an API with Fastify. It explains the role of each layer and shows minimal example code to implement each piece. It also shows how to start the project both locally and with Docker.



# Example: how to work with Hexagonal Architecture

## 1️⃣ Define your domain model

### File: src/feature/domain/feature.entity.ts

This is your core data structure — what your app cares about, not how it’s stored.

```javascript
// user.entity.ts
export interface User {
  id: string;
  name: string;
  email: string;
}
```

### ✅ Why?
Everything starts with the domain. This defines what a “User” is, independent of DB, API, or framework.



## 2️⃣ Define the Port (Interface)

### File: src/feature/domain/feature.repository.port.ts

This describes what the app needs from the outside world (e.g., a DB), but not how it’s done.

```javascript
// user.repository.port.ts
import { User } from "./user.entity";

export interface UserRepositoryPort {
  findUserById(id: string): Promise<User | null>;
}
```

### ✅ Why?
Your core logic should depend on interfaces, not implementations. This keeps your app flexible — you can plug in a DB later without changing logic.



## 3️⃣ Implement the Port (Outbound Adapter)

### File: src/feature/adapters/outbound/feature.repository.mock.ts

The outbound adapter is how you actually fulfill that interface — e.g., talking to a database, calling an API, reading a file. Start with a mock, replace it later with real persistence (Prisma, Mongo, whatever). The use case doesn’t care if it’s a mock or a real DB. That’s the beauty of decoupling.

```javascript
// user.repository.mock.ts
import { UserRepositoryPort } from "../../domain/user.repository.port";
import { User } from "../../domain/user.entity";

const mockUsers: User[] = [{ id: "1", name: "John", email: "john@example.com" }];

export class PostgresUserRepository implements UserRepositoryPort {
  async findUserById(id: string): Promise<User | null> {
    return mockUsers.find(u => u.id === id) || null;
  }
}
```

### ✅ Why?
Your app can now run and be tested with no DB — fast and clean.



## 4️⃣ Add the Use Case (Business Logic)

### File: src/feature/application/action.usecase.ts

This orchestrates your domain logic — the “verb” (action) of your feature. It doesn’t know where the data comes from — it just calls the port. Here you check if the data follows certain business rules (unique email, permissions, etc).

```javascript
// get-user.usecase.ts
import { UserRepositoryPort } from "../domain/user.repository.port";
import { User } from "../domain/user.entity";

export class GetUserUseCase {
  constructor(private readonly userRepo: UserRepositoryPort) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepo.findUserById(id);
  }
}
```

### ✅ Why?
Your domain and use cases are where the real logic lives. The controller just calls them.
Each use case represents a single action your system can perform.



## 5️⃣ Expose It via a Controller (Inbound Adapter)

### File: src/feature/adapters/inbound/feature.controller.ts

This connects your use case to the real world (HTTP, CLI, etc.). Here you check if the data is the right shape (all fields present, correct types).

```javascript
// user.controller.ts
import { FastifyInstance } from "fastify";
import { GetUserUseCase } from "../../application/get-user.usecase";
import { PostgresUserRepository } from "../outbound/user.repository.mock";

export async function userController(app: FastifyInstance) {
  const userRepo = new PostgresUserRepository();
  const getUserUseCase = new GetUserUseCase(userRepo);

  app.get("/users/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const user = await getUserUseCase.execute(id);
    if (!user) return reply.code(404).send({ error: "User not found" });
    return user;
  });
}
```

### ✅ Why?
This layer just translates HTTP → use case → HTTP response.
No business logic here — just mapping and validation.
Always remember: inbound brings requests in — outbound sends data out.



## 6️⃣ Register the Route

### File: src/routes.ts

Hook your controller into Fastify.

```javascript
import { FastifyInstance } from "fastify";
import { userController } from "./app/user/adapters/inbound/user.controller";

export async function registerRoutes(app: FastifyInstance) {
  await userController(app);
}
```

### ✅ Why?
Your server doesn’t know or care what features exist — it just imports the controllers.



## 7️⃣ (Optional) Wire It Up in server.ts

### File: src/server.ts

```javascript
import Fastify from "fastify";
import { registerRoutes } from "./routes";

const app = Fastify();

registerRoutes(app);

app.listen({ port: 3000 }, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
```

### ✅ Why?
This is the app entry point — composition root for wiring everything.



# Generate schemas from types

## Because writing schemas is a pain in the @ss

I refused to write all schemas on my own, so I picked [typescript-json-schema](https://github.com/YousefED/typescript-json-schema) to help me generate schemas. Now, I know that there might be better options out there, if you happen to know one of them please let me know.
To generate a schema from a type (e.g. FindUserByEmailParamsType) open the terminal and enter the following command (inside apps/api):

```powershell
npx typescript-json-schema tsconfig.json <your type> --required > <your file>.json
```

Example:

```powershell
npx typescript-json-schema tsconfig.json FindUserByEmailParamsType --required > generated.schemas.json
```

Then, from the generated file, pick the part of the schema you're interested in and use it wherever you're defining schemas (e.g. user.schemas.ts, the schema generated with the command right above from FindUserByEmailParamsType would be the 200 response schema).



# Check out all available APIs

## Find out about all available APIs

This project uses SwaggerUI to browse and test the API. Start the API server (default port 3000) and open the Swagger UI at:
http://localhost:80/docs
(if your project uses a different route or port, check the Fastify swagger registration in server code)

Grouping routes in Swagger UI
- Ensure each route schema includes a tag: { schema: { tags: ['FeatureName'], ... } } — routes with the same tag appear grouped.
- Optionally add tag metadata to the swagger/openapi options so groups show descriptions.

Example: add a tag to a route
```typescript
app.get('/user', {
  schema: {
    tags: ['User'],
    response: {
      200: schemas.findAllUsersSuccessReturnSchema,
      ...errorSchemas
    }
  }
}, handler)
```

Example: register Fastify swagger with tag metadata (adjust to your plugin and config)
```typescript
fastify.register(fastifySwagger, {
  openapi: {
    info: { title: 'API', version: '1.0.0' },
    tags: [
      { name: 'User', description: 'User endpoints' },
      { name: 'Package', description: 'Package endpoints' },
      { name: 'Biscuit', description: 'Biscuit endpoints' }
    ]
  },
  routePrefix: '/documentation',
  uiConfig: { docExpansion: 'list' },
  exposeRoute: true
})
```

Now restart the server — Swagger UI will display routes grouped by the tag names you provided.



## Environment variables

These are the environment variables needed to run the project smoothly: add them in your .env file and don't share them with anyone, not even your best friend.

- PORT — port for the API used by the server
- POSTGRES_DB_PSW — Postgres database password
- POSTGRES_DB_HOST — Postgres database host, e.g. localhost
- POSTGRES_DB_PORT — Postgres database port, usually 5432
- POSTGRES_DB_NAME — Postgres database name
- POSTGRES_USER_NAME — Postgres username
- JWT_SECRET — JWT secret