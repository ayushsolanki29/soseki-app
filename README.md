<div align="center">
  <img style="border-radius: 30%;" src="./frontend/public/logo.png" alt="Soseki Logo" width="150" />
  <h1>Soseki</h1>
  <p><strong>An open-source business operating platform for freelancers, consultants, and small agencies.</strong></p>
  
  <p>
    <a href="https://github.com/ayushsolanki29/workora/stargazers"><img src="https://img.shields.io/github/stars/ayushsolanki29/workora?style=for-the-badge&logo=github&color=black" alt="GitHub stars" /></a>
    <a href="https://github.com/ayushsolanki29/workora/network/members"><img src="https://img.shields.io/github/forks/ayushsolanki29/workora?style=for-the-badge&logo=github&color=black" alt="GitHub forks" /></a>
    <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License" /></a>
    <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  </p>
</div>

---

Soseki replaces spreadsheets and scattered tools with one workspace for clients, projects, invoices, payments, expenses, questionnaires, support tickets, and reporting. The product follows the philosophy of its namesake, Japanese novelist Natsume Soseki: no bloat, no unnecessary complexity, just the tools you actually need to run a service business.

**[Full Product Documentation](./docs/index.md)** | **[Setup Guide](./SETUP.md)** 

---

## 🚀 Major Advantages

### 💱 Multi-Currency Invoicing
Create invoices and record expenses in different currencies, then store exchange-rate snapshots for accurate reporting in your master currency. Automatically fetches live exchange rates so you never have to do mental math.

### 🤖 AI-Assisted Data Migration
Import data from older systems, spreadsheets, PDFs, CSVs, or exported files using a built-in AI-assisted migration tool. Generate a structured JSON file with ChatGPT/Claude, and import clients, projects, invoices, and payments in one shot.

### 📝 AI-Assisted Questionnaires
Build shareable public forms for onboarding, discovery, feedback, and structured client intake. Use the drag-and-drop builder, or paste questions into ChatGPT for AI-generated forms.

### 💳 Client Portal & Payments
Give your clients a seamless, professional experience. Soseki includes a dedicated client portal where your customers can log in, view their outstanding invoices, and pay you directly through the platform.

---

## 🎯 Who It's For

- **Freelancers** managing multiple clients and projects
- **Small agencies** billing across different currencies and countries
- **Service businesses** moving away from disconnected finance and admin tools like QuickBooks, FreshBooks, or spreadsheets

---

## 🛠️ Feature Overview

- **📊 Dashboard & Reports:** Real-time snapshot of the entire workspace with KPI stat cards, charts, and converted master currency totals.
- **👥 Client Management:** Full client lifecycle tracking with robust detail pages.
- **📁 Project Management:** Track work engagements, timelines, linked invoices, and expenses.
- **🧾 Invoicing & Payments:** Multi-currency, professional PDF generation, line-item tax rates, and a unified payment ledger.
- **💸 Expense Tracking:** Link costs to clients, projects, or invoices with multi-currency support and receipt previews.
- **📋 Questionnaires:** Public, shareable forms without requiring login for respondents.
- **🎫 Support Tickets:** In-app support channel with threaded conversation UI.
- **⚙️ Workspace Settings:** Tailored organization setup including financial and currency management.

*Read more in our [Documentation Index](./docs/index.md).*

---

## 💻 Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, Express
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** JWT with httpOnly cookies
- **Charts:** Recharts
- **Avatars:** DiceBear 
- **PDF Generation:** HTML/CSS A4 canvas (browser-rendered)

---

## 📂 Project Structure

```text
.
├── frontend/    # Next.js frontend application
├── backend/     # Express & Prisma backend API
└── docs/        # Comprehensive product & feature documentation
```

---

## 🚦 Quick Start

Ready to dive in? Check out the **[SETUP.md](./SETUP.md)** for full instructions on getting Soseki running locally.

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

---

## 🤝 Contributing

Contributions are welcome! Please keep product-level details in the `docs/` folder and folder-specific notes inside the relevant subdirectory (e.g., `frontend/` or `backend/`).

---

## 📜 License

Released under the [MIT License](./LICENSE).
