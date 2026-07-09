const MIGRATION_TEMPLATE = {
  clients: [
    {
      id: "client-1",
      name: "Acme Corp",
      email: "billing@acmecorp.com",
      phone: "+1-555-0100",
      status: "Active"
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
    }
  ],
  invoices: [
    {
      id: "invoice-1",
      clientId: "client-1",
      projectId: "project-1",
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

const AI_PROMPT = `You are an expert data migration assistant and structural parser. Your task is to extract unstructured or semi-structured data from the provided context (which may include PDFs, Excel spreadsheets, CSVs, or messy text) and cleanly transform it into a strict JSON payload matching the target schema.

CRITICAL INSTRUCTIONS TO TRAIN YOUR PARSING LOGIC:
1. ARTIFACT HANDLING: The user's data may come from diverse sources (e.g., invoices from an accounting system, spreadsheets of clients). Intelligently deduce relationships. For example, if a spreadsheet row mentions an amount paid for a specific company, create the Client, the Invoice, and the Payment, linking them correctly.
2. MISSING DATA: If a required text field cannot be found, populate it with exactly "this-is-blank". Do not use null, undefined, or empty strings. For missing numbers, use 0.
3. ID MAPPING: You MUST use logical string IDs to link relational records (e.g., assign a client "client-xyz", then set an invoice's clientId to "client-xyz").
4. DATE FORMATTING: All dates must be strictly ISO-8601 (e.g., "YYYY-MM-DDTHH:mm:ssZ"). If the source data has messy dates like "Jan 5th 24", intelligently parse it into ISO.
5. STRICT OUTPUT: Return ONLY valid JSON. Absolutely no markdown blocks (\`\`\`json), no introductory text, no conversational filler.

TARGET SCHEMA TEMPLATE:
${JSON.stringify(MIGRATION_TEMPLATE, null, 2)}

Please begin parsing the following data exactly as instructed:
[INSERT YOUR DATA HERE]`;

module.exports = {
  MIGRATION_TEMPLATE,
  AI_PROMPT
};
