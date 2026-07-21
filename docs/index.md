<div align="center">
  <h1>Welcome to Soseki Docs</h1>
  <p><strong>The modern, open-source business operating system for freelancers, agencies, and small teams.</strong></p>
</div>

---

## 🌟 What is Soseki?

Say goodbye to the chaos of scattered spreadsheets, fragmented SaaS subscriptions, and manual client tracking. **Soseki** is a unified, open-source business management platform that covers the entire lifecycle of your client work—from the initial handshake to the final payment.

Named after the Japanese novelist Natsume Soseki, known for his precise and uncluttered writing, our platform embodies the same philosophy: **Zero bloat, zero friction, and absolute clarity.** We give you exactly what you need to run a profitable service business without the unnecessary complexity. 

Best of all? **You own your data**. With our comprehensive export features and seamless integrations, your business records are always yours to control.

---

## 🎯 Who is this for?

- **Independent Freelancers** juggling multiple clients, projects, and deadlines.
- **Boutique Agencies** navigating international billing across diverse currencies.
- **Service Businesses** ready to break free from the limitations (and recurring costs) of tools like QuickBooks, FreshBooks, Wave, or Google Sheets.

---

## 🚀 Why Choose Soseki? (Our Core Advantages)

### 1. Multi-Currency Invoicing on Autopilot
Most invoicing tools either lock you into a single currency or force you to calculate exchange rates manually. Soseki eliminates the friction by automatically fetching live exchange rates when you log an expense or create a foreign-currency invoice. Every financial metric on your dashboard—revenue, outstanding balances, and profit—is seamlessly translated back to your master currency. 

*Deep dive:* [Invoices](./invoices.md), [Expenses](./expenses.md), [Workspace Settings](./workspace-settings.md)

### 2. Effortless AI-Assisted Data Migration
Switching platforms shouldn't mean starting from scratch. Soseki features a revolutionary AI-assisted migration engine capable of digesting PDFs, messy CSVs, QuickBooks exports, and Excel sheets. Just download our JSON template, pass your legacy data through ChatGPT or Claude, and upload the structured result to instantly import clients, projects, invoices, and payments in one flawless batch.

*Deep dive:* [Data Migration Guide](./migration.md)

### 3. Smart, AI-Powered Questionnaires
Collect structured data seamlessly with our built-in, shareable form builder. Whether it's client onboarding, project briefs, or feedback surveys, every form generates a clean, public URL (`/q/[slug]`). Build forms via our intuitive drag-and-drop interface, or simply paste raw questions into our AI prompt to generate the form structure instantly.

*Deep dive:* [Questionnaires](./questionnaires.md)

### 4. Client Portal & Payments
Give your clients a seamless, professional experience. Soseki includes a dedicated client portal where your customers can log in, view their outstanding invoices, and pay you directly through the platform.

---

## 📚 Explore the Features

Navigate through our comprehensive guides to master every aspect of Soseki:

### 📊 [Dashboard](./dashboard.md)
Your business at a glance. Access real-time KPI stat cards, dynamic revenue vs. expense charts, and a centralized hub for all active projects and pending invoices. 

### 👥 [Clients](./clients.md)
Manage the full client lifecycle. Seamlessly transition leads to active clients, and view detailed histories of associated projects, invoices, and expenses.

### 📁 [Projects](./projects.md)
Track work engagements with precision. Monitor timelines, link financial records, and manage statuses from Planning to Completed.

### 🧾 [Invoices](./invoices.md)
The financial engine of Soseki. Generate stunning PDF invoices, manage multiple line items, apply tax rates, and seamlessly track the payment lifecycle across currencies.

### 💳 [Payments](./payments.md)
A unified, read-only ledger capturing every payment received across your organization.

### 💸 [Expenses](./expenses.md)
Attribute costs directly to clients, projects, or invoices. Leverage multi-currency support and generate printable A4 receipts.

### 📋 [Questionnaires](./questionnaires.md)
Design and deploy public forms effortlessly. Manage response caps, view structured submissions, and export data with ease.

### 🔄 [Data Migration](./migration.md)
Master the AI-assisted import workflow to bring your legacy data into Soseki without dropping a single record.

### 🎫 [Support Tickets](./support.md)
Communicate with the Soseki team directly through our threaded, in-app support channel.

### ⚙️ [Workspace Settings](./workspace-settings.md)
Configure your organization’s DNA—from financial default settings to strict currency management.

### 🔍 [Global Features](./global.md)
Discover powerful platform-wide tools, including the blazing-fast Global Search (`⌘K`) and our deterministic DynamicAvatar system.

---

## 🛠️ The Tech Stack Behind the Magic

| Layer | Technology |
|---|---|
| **Frontend** | Next.js (App Router), React, Tailwind CSS |
| **Backend** | Node.js, Express |
| **Database** | PostgreSQL via Prisma ORM |
| **Authentication** | JWT (httpOnly cookie), Session Table |
| **Data Visualization**| Recharts |
| **Dynamic Avatars** | DiceBear (`@dicebear/core`, `@dicebear/collection`) |
| **Exchange Rates** | `open.er-api.com` (Free, no key required) |
| **PDF Generation** | HTML/CSS A4 Canvas (Browser-rendered) |

---

## 🏗️ Data Architecture (Entity Relationships)

Understanding how Soseki links your data together:

```text
Organization
  ├── Users
  ├── Clients
  │     ├── Projects
  │     ├── Invoices (Line Items, Payments, Activities)
  │     ├── Expenses
  │     └── Questionnaires
  ├── Projects (Invoices, Expenses, Questionnaires)
  ├── Questionnaires (Fields, Responses)
  ├── Expenses
  ├── QuickItems
  └── SupportTickets (Messages)
```

Welcome aboard. Let's build a better business workspace, together.
