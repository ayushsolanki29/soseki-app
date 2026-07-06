export const MIGRATION_TEMPLATE = {
  clients: [
    {
      id: "client-1",
      name: "Acme Corp",
      email: "billing@acmecorp.com",
      phone: "+1-555-0100",
      status: "Active"
    },
    {
      id: "client-2",
      name: "Globex Inc",
      email: "finance@globex.com",
      phone: "+1-555-0101",
      status: "Active"
    },
    {
      id: "client-3",
      name: "Stark Industries",
      email: "tony@stark.com",
      phone: "this-is-blank",
      status: "Inactive"
    },
    {
      id: "client-4",
      name: "Wayne Enterprises",
      email: "bruce@wayne.com",
      phone: "this-is-blank",
      status: "Lead"
    }
  ],
  projects: [
    {
      id: "project-1",
      clientId: "client-1",
      title: "Website Redesign",
      description: "Complete overhaul of the Acme Corp corporate website",
      startDate: "2026-01-15T00:00:00Z",
      estimatedEndDate: "2026-03-30T00:00:00Z",
      status: "Active"
    },
    {
      id: "project-2",
      clientId: "client-2",
      title: "Mobile App MVP",
      description: "this-is-blank",
      startDate: "2026-02-01T00:00:00Z",
      estimatedEndDate: "this-is-blank",
      status: "Planning"
    }
  ],
  invoices: [
    {
      id: "invoice-1",
      clientId: "client-1",
      projectId: "project-1", // optional
      invoiceNumber: "INV-2026-001",
      status: "Paid",
      issueDate: "2026-02-15T00:00:00Z",
      dueDate: "2026-03-15T00:00:00Z",
      currency: "USD",
      items: [
        {
          description: "UI/UX Design Phase",
          quantity: 1,
          unitPrice: 5000,
          taxRate: 10
        }
      ]
    },
    {
      id: "invoice-2",
      clientId: "client-2",
      projectId: "this-is-blank",
      invoiceNumber: "INV-2026-002",
      status: "Sent",
      issueDate: "2026-03-01T00:00:00Z",
      dueDate: "2026-04-01T00:00:00Z",
      currency: "USD",
      items: [
        {
          description: "Consulting Retainer",
          quantity: 10,
          unitPrice: 150,
          taxRate: 0
        }
      ]
    }
  ],
  payments: [
    {
      id: "payment-1",
      invoiceId: "invoice-1",
      amount: 5500,
      date: "2026-02-28T00:00:00Z",
      method: "Bank Transfer",
      reference: "TXN-987654321"
    }
  ]
};

export const AI_PROMPT = `
You are an expert data migration assistant. I need you to parse my unstructured data (which could be text, CSV, or tables) and convert it into a strict JSON format based on the template below.

Here are the strict rules:
1. ONLY return valid JSON. Do not include markdown formatting like \`\`\`json, and do not include any conversational text before or after the JSON.
2. If a field is missing in my data, use the exact string "this-is-blank" for text fields, or the number 0 for numeric fields. Do not use null or undefined.
3. Map related records using string IDs. For example, give a Client an ID like "client-x", and if there's an invoice for them, set the invoice's clientId to "client-x".
4. All dates MUST be converted to ISO-8601 format (e.g., "YYYY-MM-DDTHH:mm:ssZ").
5. The output must have four root keys: "clients", "projects", "invoices", and "payments" (arrays of objects). Even if an array is empty, include it.

Here is the JSON Template to follow:
${JSON.stringify(MIGRATION_TEMPLATE, null, 2)}

Here is my data to parse:
[INSERT YOUR DATA HERE]
`;
