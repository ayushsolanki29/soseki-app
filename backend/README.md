# Backend

This folder contains the Express and Prisma backend for Soseki.

## Purpose

- Expose the API used by the frontend
- Handle authentication, business logic, and validation
- Manage database access through Prisma
- Keep feature modules isolated and reusable
v sd
## Main Areas

- `src/app.js` and `src/server.js` - server bootstrap
- `src/modules/` - feature modules such as clients, invoices, payments, and support
- `src/database/` - Prisma client and seed logic
- `prisma/` - schema and database configuration

## Development

Run the backend from the repository root:

```bash
npm run dev:backend
```

Or run it directly from this folder:

```bash
npm run dev
```

## Environment

Create `backend/.env` with:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/soseki?schema=public"
JWT_SECRET="your_super_secret_jwt_key"
PORT=4000
FRONTEND_URL="http://localhost:3000"
```

## Database Commands

```bash
npm run db:dev
npm run db:seed
npm run db:studio
npm run db:generate
```

## Notes

- Keep backend-only implementation notes here
- Keep product-level documentation in the root `docs/` folder
- Keep shared setup instructions in [`SETUP.md`](../SETUP.md)
