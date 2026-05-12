# Docker secrets for Compose

Create these files before running `docker compose up`:

- `docker/secrets/postgres_password.txt`
- `docker/secrets/jwt_secret.txt`
- `docker/secrets/pgadmin_password.txt`

Each file should contain only the secret value (single line, no quotes).

For Docker Compose, keep non-sensitive settings in `docker/compose.env` and keep secrets only in these files.
The backend reads secret files through Docker secrets; it does not need secret values in `apps/api/.env` when running in Compose.

Example:

```bash
cp docker/secrets/postgres_password.txt.example docker/secrets/postgres_password.txt
cp docker/secrets/jwt_secret.txt.example docker/secrets/jwt_secret.txt
cp docker/secrets/pgadmin_password.txt.example docker/secrets/pgadmin_password.txt
```

Then edit each copied file with your real credentials.
