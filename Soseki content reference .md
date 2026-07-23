# Soseki Public Pages: Content Reference and Agent Instructions

Use this file as the single source of truth for copy across the homepage,
about section, and features page. Apply it in one pass across all the
components it touches.

---

## GLOBAL RULES (apply everywhere, every page)

1. Never say the product is self hosted, and never promise the reader can
   "host it yourself," "own your data forever" as a self hosting pitch, or
   anything implying they run their own instance. Soseki.app is the hosted
   product. This is a hard rule, not a style preference.
2. No em dashes anywhere. Use periods, commas, or "and" / "but" instead.
3. No stock SaaS filler: "seamless," "zero friction," "beautiful platform,"
   "modern teams," "unlock," "elevate," "ensuring your workflow is never
   interrupted," "generative," "centralized," "universal." If a sentence
   would read the same on any SaaS landing page in existence, rewrite it to
   say something specific to Soseki instead.
4. Audience is freelancers and small agencies, not enterprise teams. Avoid
   "organization," "teams," or "across your company." Use "your business,"
   "your clients," or just "you."
5. Do not invent claims. Every feature described must exist in the actual
   component or be documented in the README or docs. Flag anything you
   cannot verify instead of guessing.

---

## FLAGGED ISSUE, NEEDS YOUR DECISION

The current "Why modern teams choose Soseki" section has a card:

> **Open-source flexibility**
> Host it yourself, own your data forever, and customize the codebase to
> your exact needs.

This directly contradicts Rule 1. It is not just phrasing, it is a self
hosting pitch. I have rewritten it below to keep the true part (open source,
MIT license, code is inspectable) and drop the self hosting promise. If you
actually do want to offer self hosting as an option, tell me and I will
write that pitch properly instead of quietly removing it.

---

## HOMEPAGE

### Hero
Eyebrow: Open source. Built for people who bill by the project.
Headline: Run your freelance business without five different tools
Subhead: Clients, projects, invoices, and expenses, all in one workspace. No
juggling a separate invoicing app, a CRM, and a spreadsheet just to know if
the month made money.

### About section
Soseki is named after Natsume Soseki, the Japanese novelist. Not as a
branding gimmick, but because of how he wrote: no bloat, no padding, just
what the work actually needs. That is the idea behind the product too.
Freelancers do not need forty modules they will never open. They need
invoices that go out correctly, a clear record of what a client owes, and a
way to tell if the month actually made money. It is built and maintained by
one backend engineer who got tired of stitching together spreadsheets, an
invoicing tool, and a separate CRM just to run client work. The code is open
source under the MIT license, so anyone can read it or contribute to it.

### Closing CTA
Open source, actively maintained, and built by someone who runs client work
the same way you do.

---

## FEATURES PAGE

### Page intro (replaces "Global billing with zero friction")
Headline: Run the financial side of your business without the busywork
Subhead: Multi currency invoicing, live exchange rates, and reporting that
actually reflects what is happening in your business.

(Note: "zero friction" and "your service business" were the two generic
phrases here. "Service business" is fine and accurate, kept it. Dropped
"zero friction" since it's a stock phrase that doesn't describe anything.)

Suggestion on the "Master Currency" label in the widget: this reads unclear
to a first time viewer. Rename to "Base Currency," which is the actual
finance term and matches language used elsewhere on the page (your
workspace's base currency).

---

### Section: Finances / Financial Management

**Multi-Currency Invoicing**
Send invoices in whatever currency your client pays in. Soseki pulls live
exchange rates automatically and keeps your dashboard synced to your home
currency, so the numbers always add up.

Widget "Live Invoice Conversion": keep structure, keep the "1 EUR = 1.10
USD" rate line, keep the Design System Retainer / Acme Corp / INV-2023-08 /
Pending example as is. It is a good, concrete example.

**Expense Management**
Track what you spend and tie each expense to a client, a project, or an
invoice, so you always know where the money went.

Widget "Recent Expenses": keep "Software Subscriptions" and "Contractor
Payment." Consider swapping "Delaware franchise tax" style line items for
something less US specific, since the page markets to international
clients. This is a judgment call, not a hard rule.

**Payment Management**
See every payment that's come in and what's still outstanding, all in one
place.
(Changed from "across your organization," per Rule 4.)

Widget: keep Total Balance and the three line items exactly as is.

---

### Section: Workspace / Client & Project Management

**Direct Client Portal**
Give clients a secure portal where they can pay you directly, with no
middleman platform fee.

Widget: keep as is (invoice, Pay Directly, Payment Successful, 0% Middleman
Fees). This is concrete and clear.

**Client Management**
Keep every client relationship in one place, from the first message to the
final invoice.
(Simplified from "manage every client relationship... inside one centralized
workspace," which repeated "workspace" from elsewhere and used "centralized"
which is filler.)

Widget: keep Activity Timeline example as is.

**Project Management**
Track progress, deadlines, and every invoice, expense, or form tied to a
project, all from one place.
(Simplified the four-item list into something that reads like a sentence
instead of a spec sheet.)

Widget: keep progress bar and task list as is.

---

### Section: Intelligence / AI Productivity

**AI Data Migration**
Move your existing data over from spreadsheets, PDFs, QuickBooks, or CSV
exports. The AI maps the fields and currencies for you.
(Trimmed "with AI-assisted migration" since the heading already says AI
Data Migration, no need to repeat it in the body.)

Widget: keep Clients Imported / Invoices Mapped numbers as they reflect
actual product behavior.

**AI Questionnaire Builder**
Generate client onboarding forms, project briefs, or surveys with a prompt,
or build them yourself with the drag and drop builder.
(Cut "professional," it's a filler adjective that doesn't add information.)

Widget: keep the prompt example and generated form as is.

---

### Section: Analytics / Insights & Navigation

**Dashboard & Analytics**
See revenue, profit, and expenses at a glance, so you know how the business
is actually doing without digging through invoices.
(Rewrote "Monitor the health of your business with real-time insights and
financial analytics," which was two vague phrases stacked on top of each
other.)

Widget: keep Revenue / Profit percentages and Revenue vs Expenses chart.

**Global Search**
Find any client, invoice, project, payment, or expense in one search, no
matter where it lives in your workspace.
(Cut "instantly" and "universal search," both filler.)

Widget: keep the search example as is.

---

### Section: Why Soseki (replaces "Why modern teams choose Soseki")

Headline: Why freelancers and small agencies use Soseki
Subhead: Everything you need to run a service business, in one open source
tool.
(Cut "modern teams," wrong audience per Rule 4. Cut "beautiful," filler
adjective. Kept "open source," which is true and specific.)

**Card 1, Replace multiple SaaS subscriptions**
Stop paying for separate invoicing, CRM, project management, and form
tools. Soseki brings all of it into one place.

**Card 2, rewritten per the flagged issue above (Open source, not self hosting)**
Built in the open
The code is open source under the MIT license. Read it, see exactly how
your data is handled, and know the project does not disappear if a company
decides to shut it down.

**Card 3, Fast by design**
Built on a modern stack so pages load quickly and nothing feels like it's
catching up to you.
(Rewrote "ensuring your workflow is never interrupted," a stock phrase that
promises nothing specific.)

**Card 4, AI handles the busywork**
From migrating your old spreadsheets to drafting client questionnaires, AI
takes care of the setup work so you can get to the actual job faster.

---

## VERIFICATION STEPS FOR THE AGENT

1. Grep the entire frontend/src directory for the em dash character (—).
   Zero matches required.
2. Grep for "self host," "self-host," "host it yourself," and "own your
   data forever." Zero matches required, unless the user has explicitly
   approved keeping a self hosting pitch (see flagged issue above).
3. Grep for "organization" and "modern teams" in any customer facing copy.
   Replace any remaining instances per Rule 4.
4. Confirm the app builds and every touched component still renders without
   breaking layout.
5. List every file changed, and separately list anywhere the real component
   content differed from what's written here, so nothing gets silently
   overwritten if it was already correct.