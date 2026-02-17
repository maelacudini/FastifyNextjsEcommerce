# Docker secrets for Compose

Create these files before running `docker compose up`:

- `secrets/postgres_password.txt`
- `secrets/jwt_secret.txt`
- `secrets/pgadmin_password.txt`

Each file should contain only the secret value (single line, no quotes).

Example:

```bash
cp secrets/postgres_password.txt.example secrets/postgres_password.txt
cp secrets/jwt_secret.txt.example secrets/jwt_secret.txt
cp secrets/pgadmin_password.txt.example secrets/pgadmin_password.txt
```

Then edit each copied file with your real credentials.
