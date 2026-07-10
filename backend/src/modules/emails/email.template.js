const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const TEMPLATES_DIR = path.join(__dirname, "templates");

// Cache templates in memory to avoid reading from disk on every email
const templateCache = {};

/**
 * Loads and compiles a handlebars template.
 * Uses cache if available.
 * 
 * @param {string} templateName - e.g. "welcome", "invoice_created"
 * @returns {function} Compiled handlebars template function
 */
const getTemplate = (templateName) => {
  if (templateCache[templateName]) {
    return templateCache[templateName];
  }

  const templatePath = path.join(TEMPLATES_DIR, `${templateName}.hbs`);
  
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Email template ${templateName} not found.`);
  }

  const templateSource = fs.readFileSync(templatePath, "utf-8");
  const compiledTemplate = handlebars.compile(templateSource);
  
  templateCache[templateName] = compiledTemplate;
  return compiledTemplate;
};

/**
 * Renders an email template with the given context.
 * 
 * @param {string} templateName 
 * @param {object} context 
 * @returns {string} Rendered HTML string
 */
const renderTemplate = (templateName, context) => {
  const template = getTemplate(templateName);
  
  // If rendering the layout itself, just return the template
  if (templateName === 'layout') {
    return template(context);
  }

  const bodyHtml = template(context);
  
  try {
    const layoutTemplate = getTemplate('layout');
    context.body = bodyHtml;
    return layoutTemplate(context);
  } catch (e) {
    // If layout doesn't exist yet, fallback to just returning the body
    return bodyHtml;
  }
};

module.exports = {
  renderTemplate
};
