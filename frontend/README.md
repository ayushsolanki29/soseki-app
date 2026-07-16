# Frontend

This folder contains the Next.js frontend for Soseki.

## Purpose

- Render the user interface
- Handle dashboard, auth, and workspace pages
- Keep UI components and client-side logic organized
- Communicate with the backend API
  
## Main Areas

- `src/app/` - route groups and pages
- `src/components/` - reusable UI and feature components
- `src/lib/` - client utilities, API helpers, and shared constants
- `public/` - static assets

## Development

Run the frontend from the repository root:

```bash
npm run dev:frontend
```

Or run it directly from this folder:

```bash
npm run dev
```

## Environment

Create `frontend/.env` with:

```env
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
```

## Notes

- Keep frontend-only documentation here
- Keep product-level documentation in the root `docs/` folder
- Keep shared setup instructions in [`SETUP.md`](../SETUP.md)
