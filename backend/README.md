# Project Backend

A clean and reusable backend structure built with Node.js, Express, and Prisma 7.

## Getting Started

Follow these steps to set up and run the project locally:

### 1. Environment Setup
Copy the example environment file and configure your database settings.
```bash
cp .env.example .env
```
> **Note:** Open the newly created `.env` file and change `project_db` to your actual database name in the `DATABASE_URL`.

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Initialization
Push the schema to your database and generate the Prisma Client.
```bash
npm run db:dev
```

### 4. Seed Database
Add the initial admin user to the database.
```bash
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```
The server will be available at `http://localhost:5050` (default).

---

## Useful Commands

### Prisma Studio
To view and manage your data in a browser-based UI:
```bash
npm run db:studio
```

### Manual Client Generation
If you update the schema, regenerate the client with:
```bash
npm run db:generate
```
