# Data Migration — Feature Documentation

**Route:** `/dashboard/migration`  
**Access:** Authenticated users only. Sidebar → Data Migration.

---

## ★ Why This Matters

Most business tools trap your data. Moving to a new platform means hours of manual re-entry, CSV wrestling, or expensive consultants. Soseki solves this with **AI-Assisted Data Migration** — a powerful feature that lets users import their entire history from any previous tool, in any format, in minutes.

It doesn't matter if your old data is:
- A messy Excel spreadsheet of clients and invoices
- A folder of PDF invoices
- A CSV export from QuickBooks, FreshBooks, Wave, or any other tool
- A raw text dump with inconsistent date formats

The process is always the same: you give your data to an AI, the AI structures it into Soseki's schema, and you upload the result. **No custom importers. No format restrictions. No data left behind.**

---

## How It Works — The Full Flow

The migration page is a linear 4-step wizard (with a 5th success state). Steps 1–3 are always visible. Step 4 only appears after a file is uploaded. The success state replaces step 4 after a successful import.

---

### Step 1 — How it works (Tutorial)

A 2×4 grid of placeholder video/GIF slots showing the migration workflow visually. These are currently placeholders ("GIF Placeholder 1–4") pending final tutorial content.

---

### Step 2 — Prepare AI Instructions

Two action buttons:

**"1. Download JSON Template"** — downloads `soseki_migration_template.json`, a worked example file showing the exact structure Soseki expects:

```json
{
  "clients": [...],
  "projects": [...],
  "invoices": [...],
  "payments": [...]
}
```

The template includes a full real-world example: a client "Acme Corp", a project "Website Redesign", an invoice with a line item (including tax rate), and a payment with a bank transfer reference. This shows the AI exactly what shape to produce.

**"2. Copy AI Prompt"** — copies a carefully engineered system prompt to the clipboard. This is the prompt the user pastes into ChatGPT, Claude, or any AI tool alongside their messy data.

**Instructions text shown to user:**
> "Go to ChatGPT or Claude. Paste the copied prompt, attach the downloaded JSON template, and upload your messy data (PDFs, Excel, etc). The AI will generate a strict JSON file."

Both the template and prompt are fetched from the server (`GET /migration/prompt`) so they can be updated centrally without a frontend deploy. While loading: a spinner with "We are cooking, just a moment..." is shown.

---

### The AI Prompt (What the AI Receives)

The prompt sent to the AI is a precisely engineered set of instructions stored in `migration.constants.js`. Key rules baked into the prompt:

**Artifact handling** — the AI is instructed to intelligently deduce relationships across different source formats. A spreadsheet row mentioning a payment for a company should produce a Client, an Invoice, and a Payment, all correctly linked.

**Missing data sentinel** — if a required text field is missing from the source data, the AI must write exactly `"this-is-blank"` (not `null`, not empty string). This gives the importer a known signal to substitute safe defaults.

**ID mapping** — the AI assigns its own logical string IDs (e.g. `"client-xyz"`) and uses them as foreign keys to link records. These are temporary IDs only used during the import process.

**Date normalization** — all dates must be ISO-8601. The AI is instructed to parse messy dates like "Jan 5th 24" into proper ISO format automatically.

**Strict JSON output** — no markdown code fences, no intro text, no explanations. Raw JSON only.

---

### Step 3 — Upload Generated Data

A large dashed drag-target upload area. Accepts `.json` files only.

- Clicking opens the file picker
- After selecting: the file name is shown in the upload area
- The file is read client-side using `FileReader` and parsed as JSON immediately
- On parse success: toast "Data parsed successfully!" → Step 4 appears below
- On invalid JSON: toast "Failed to parse JSON file. Ensure it is valid."
- On non-JSON file type: toast "Please upload a valid JSON file."

No data is sent to the server at this point — parsing is entirely client-side.

---

### Step 4 — Review & Import

Appears only after a file is successfully parsed. Animates in with a fade + slide-up transition.

Shows a preview card: "I found this data:" with four rows:

| Row | Value |
|---|---|
| Clients detected | `parsedData.clients?.length` |
| Projects detected | `parsedData.projects?.length` |
| Invoices detected | `parsedData.invoices?.length` |
| Payments detected | `parsedData.payments?.length` |

**"Import All Data" button** — sends `POST /migration/import` with the full parsed JSON body.

- While importing: button shows "Importing...", disabled
- On success: toast "All data imported successfully!" → file and parsed data cleared → Step 4 disappears → Success state appears
- On error: toast with server error message

---

### Success State

Shown after a successful import (only when `parsedData` is cleared and `importStatus` has non-zero counts). Green border card with:

- `CheckCircleIcon` (green, large)
- "Import Successful!" heading
- Summary: "Successfully imported X clients, Y projects, Z invoices, and W payments."

---

## What the Backend Does (Import Logic)

`POST /migration/import` processes the four entity arrays **sequentially in dependency order**. This is critical — each entity references the previous ones.

### ID Remapping

The AI generates temporary string IDs (e.g. `"client-1"`, `"invoice-1"`). These are **not** UUIDs — they are just the AI's internal reference labels. The import service maintains an `idMap` that tracks `{ aiId → realDatabaseId }` for each entity type. Every subsequent entity uses this map to resolve its foreign keys.

```
AI ID "client-1"  →  created DB UUID "uuid-abc-123"
AI ID "invoice-1" →  references "client-1" → resolved to "uuid-abc-123"
```

### Import Order & Rules

**1. Clients** — imported first, no dependencies.

| AI field | Behavior |
|---|---|
| `name` | Used as-is, defaults to `"Unknown Client"` if missing |
| `email` | If `"this-is-blank"`, generates a unique temp email: `import-[timestamp]@temp.com` |
| `phone` | If `"this-is-blank"`, stored as `null` |
| `status` | Defaults to `"Active"` |

**2. Projects** — imported second, depend on clients.

- If `clientId` cannot be resolved from `idMap.clients`, the project is **silently skipped**
- `description`, `startDate`, `estimatedEndDate` — if `"this-is-blank"`, stored as `null` or defaulted to today
- `status` defaults to `"Planning"`

**3. Invoices** — imported third, depend on clients (required) and projects (optional).

- If `clientId` cannot be resolved, invoice is **silently skipped**
- If `projectId` is `"this-is-blank"` or absent, stored as `null`
- **Totals are recomputed from line items** — the AI doesn't need to provide correct totals; the server recalculates `subtotal`, `taxAmount`, and `totalAmount` from `items[].quantity`, `items[].unitPrice`, `items[].taxRate`
- `invoiceNumber` defaults to `"INV-[timestamp]"` if missing
- `dueDate` defaults to 30 days from now if `"this-is-blank"`
- `currency` defaults to `"USD"`

**4. Payments** — imported last, depend on invoices.

- If `invoiceId` cannot be resolved, payment is **silently skipped**
- `method` defaults to `"Bank Transfer"` if `"this-is-blank"`
- `reference` stored as `null` if `"this-is-blank"`
- After creating the payment, the parent invoice's `paidAmount` is incremented by the payment amount (atomic `increment`)

### Return value

```json
{
  "imported": {
    "clients": 3,
    "projects": 5,
    "invoices": 12,
    "payments": 8
  }
}
```

---

## JSON Schema — What the AI Must Produce

### Top-level structure
```json
{
  "clients":  [...],
  "projects": [...],
  "invoices": [...],
  "payments": [...]
}
```

All four arrays are optional — you can migrate just clients, or just clients + invoices, etc.

### Client object
```json
{
  "id": "client-1",
  "name": "Acme Corp",
  "email": "billing@acmecorp.com",
  "phone": "+1-555-0100",
  "status": "Active"
}
```

### Project object
```json
{
  "id": "project-1",
  "clientId": "client-1",
  "title": "Website Redesign",
  "description": "Complete overhaul...",
  "startDate": "2026-01-15T00:00:00Z",
  "estimatedEndDate": "2026-03-30T00:00:00Z",
  "status": "Active"
}
```

### Invoice object
```json
{
  "id": "invoice-1",
  "clientId": "client-1",
  "projectId": "project-1",
  "invoiceNumber": "INV-2026-001",
  "status": "Paid",
  "issueDate": "2026-02-15T00:00:00Z",
  "dueDate": "2026-03-15T00:00:00Z",
  "currency": "USD",
  "items": [
    {
      "description": "UI/UX Design Phase",
      "quantity": 1,
      "unitPrice": 5000,
      "taxRate": 10
    }
  ]
}
```

Note: `subtotal`, `taxAmount`, `totalAmount` are **not** in the schema — they are computed by the server.

### Payment object
```json
{
  "id": "payment-1",
  "invoiceId": "invoice-1",
  "amount": 5500,
  "date": "2026-02-28T00:00:00Z",
  "method": "Bank Transfer",
  "reference": "TXN-987654321"
}
```

---

## Resilience Design

The migration is designed to be tolerant of imperfect AI output:

- **Missing text fields**: `"this-is-blank"` sentinel gives the server a known fallback signal — no crashes on empty data
- **Missing numeric fields**: AI is instructed to use `0` — server uses `0` as default too
- **Broken relationships**: records with unresolvable foreign keys are silently skipped rather than failing the entire import
- **Duplicate emails**: if the AI produces an email that already exists in the org, the Prisma `create` will throw — this is the one edge case that is not currently handled gracefully
- **Totals**: never trusted from the AI — always recomputed from line items

---

## API Endpoints

| Action | Method | Endpoint |
|---|---|---|
| Get AI prompt + template | GET | `/migration/prompt` |
| Import all data | POST | `/migration/import` |

---

## Navigation

| Element | Destination |
|---|---|
| Sidebar → Data Migration | `/dashboard/migration` |
| After successful import | Stays on migration page, shows success state |

---

## Related Documentation

- [clients.md](./clients.md) — Clients created during migration appear immediately in the clients list
- [projects.md](./projects.md) — Projects created during migration appear in the projects list
- [invoices.md](./invoices.md) — Invoices and their line items created during migration; paidAmount updated by payment imports
- [payments.md](./payments.md) — Payments created during migration are visible in the payments ledger
- [questionnaires.md](./questionnaires.md) — AI Import for questionnaires uses a similar 2-step AI prompt + JSON paste flow
