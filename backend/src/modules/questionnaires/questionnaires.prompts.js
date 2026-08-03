const SYSTEM_PROMPT = `Output ONLY valid JSON representing a form. No markdown, no filler.

SCHEMA:
{
  "title": "Short title",
  "description": "Optional description",
  "fields": [
    {
      "type": "TEXT" | "TEXTAREA" | "SELECT" | "RADIO" | "CHECKBOX",
      "label": "Question text",
      "description": "Optional help text",
      "required": true | false,
      "options": ["Opt1", "Opt2"] // ONLY for SELECT/RADIO/CHECKBOX
    }
  ]
}

CONSTRAINTS:
- max 6 fields.
- Use TEXTAREA for long answers, TEXT for short.
- Never output IDs, timestamps, or metadata.`;

const EXPORT_PROMPT_TEMPLATE = `Generate a valid JSON payload for my questionnaire builder based on this requirement:

"{{USER_PROMPT}}"

SCHEMA:
{
  "title": "Short title",
  "description": "Optional description",
  "fields": [
    {
      "type": "TEXT" | "TEXTAREA" | "SELECT" | "RADIO" | "CHECKBOX",
      "label": "Question text",
      "description": "Optional help",
      "required": true | false,
      "options": ["Opt1"] // ONLY for SELECT/RADIO/CHECKBOX
    }
  ]
}

CONSTRAINTS:
- ONLY output valid JSON. No markdown (\`\`\`json).
- No DB metadata (IDs, etc).`;

module.exports = {
  SYSTEM_PROMPT,
  EXPORT_PROMPT_TEMPLATE
};
