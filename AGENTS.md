<!-- BEGIN:project-rules -->

# Project Architecture Rules

These rules are mandatory for every AI agent contributing to this project.

## 1. Respect Existing Architecture

- Never reorganize the project structure unless explicitly instructed.
- Follow the existing folder structure.
- Place new files only in the appropriate existing directories.
- Do not create new folders if an appropriate one already exists.

---

## 2. Reuse Before Creating

Before creating any component, utility, hook, or helper:

- Search the codebase for an existing implementation.
- Reuse existing components whenever possible.
- Extend existing components instead of duplicating functionality.
- Never create duplicate UI components with similar behavior.

Example:

❌ `PrimaryButton.jsx`
❌ `AppButton.jsx`
❌ `BlueButton.jsx`

✅ Extend the existing `Button` component.

---

## 3. Component Organization

Follow these conventions:

```
src/
 ├── app/
 ├── components/
 │     ├── ui/          // Generic reusable UI components
 │     ├── layout/      // Layout components
 │     ├── dashboard/   // Dashboard-specific components
 │     ├── forms/       // Form components
 │     └── shared/      // Shared business components
 ├── hooks/
 ├── lib/
 ├── services/
 ├── types/
 └── utils/
```

Never place components in random directories.

---

## 4. Build Reusable Components

Always design components for reuse.

Bad:

```
<ClientInvoiceTable />
<ProjectInvoiceTable />
<UserInvoiceTable />
```

Good:

```
<DataTable />
```

configured with props.

Avoid hardcoded business logic inside reusable components.

---

## 5. Keep Components Small

Prefer:

- Single Responsibility
- Composition
- Reusable building blocks

Split large components when they become difficult to maintain.

---

## 6. UI Consistency

Always use existing design system components.

Use:

- shadcn/ui components
- existing Button
- existing Card
- existing Dialog
- existing Input
- existing Table

Do not recreate components already provided.

---

## 7. Styling Rules

- Use Tailwind CSS.
- Reuse existing utility classes.
- Follow existing spacing, typography, colors, and radius.
- Do not introduce inline styles unless absolutely necessary.

---

## 8. Naming Conventions

Components:

```
UserCard.jsx
InvoiceTable.jsx
PaymentDialog.jsx
```

Hooks:

```
useInvoices.js
useProjects.js
```

Utilities:

```
formatCurrency.js
generateInvoice.js
```

Keep names descriptive and consistent.

---

## 9. File Creation Policy

Before creating a new file ask yourself:

- Does this already exist?
- Can it be extended?
- Can this be a prop?
- Can this become a reusable component?

If the answer is yes, DO NOT create another file.

---

## 10. Code Quality

Write code that is:

- Modular
- Readable
- Typed (when applicable)
- Easy to test
- Easy to reuse

Avoid unnecessary abstraction.

---

## 11. Project Consistency

Every contribution should feel like it was written by the same developer.

Follow the project's existing:

- architecture
- naming
- coding style
- component patterns
- folder organization

Consistency is more important than personal preference.

---

## 12. Before Finishing Any Task

Verify:

- No duplicate components were created.
- Existing components were reused where possible.
- Folder structure remains consistent.
- No unnecessary files were added.
- The implementation follows the project's architecture.

<!-- END:project-rules -->