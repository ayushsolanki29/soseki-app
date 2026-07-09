# Soseki

Soseki is an open-source business operating platform for freelancers, consultants, and small agencies.

It replaces spreadsheets and scattered tools with one workspace for clients, projects, invoices, payments, expenses, questionnaires, support tickets, and reporting.

## Quick Links

- [Full product documentation](./docs/index.md)
- [Setup guide](./SETUP.md)
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [License](./LICENSE)

## Who It’s For

- Freelancers managing multiple clients and projects
- Small agencies billing across different currencies
- Service businesses moving away from disconnected finance and admin tools

## Major Advantages

### Multi-Currency Invoicing

Create invoices and record expenses in different currencies, then store exchange-rate snapshots for accurate reporting in a master currency.

### AI-Assisted Data Migration

Import data from older systems, spreadsheets, PDFs, CSVs, or exported files using a JSON-based migration flow.

### AI-Assisted Questionnaires

Build shareable public forms for onboarding, discovery, feedback, and structured client intake.

### Zero Lock-In Architecture

Self-hostable, open-source, and designed so your data stays in your own PostgreSQL database.

## Core Features

- Dashboard and business reports
- Client management
- Project management
- Invoices and payment tracking
- Expense tracking
- Questionnaires and public forms
- Support tickets
- Workspace settings and onboarding

## Project Structure

- `frontend/` - Next.js frontend
- `backend/` - Express and Prisma backend
- `docs/` - Product and feature documentation

## Tech Stack

- Frontend: Next.js, React, Tailwind CSS, shadcn/ui
- Backend: Node.js, Express, Prisma, PostgreSQL
- Auth: JWT with httpOnly cookies

## Quick Start

See [SETUP.md](./SETUP.md) for full instructions.

## Contributing

Contributions are welcome. Please keep product-level details in `docs/` and folder-specific notes inside the relevant subdirectory.

## License

Released under the [MIT License](./LICENSE).
