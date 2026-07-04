# Dashboard Content Redesign for Workora

This plan outlines the redesign of the dashboard content to align with the Workora business operating platform requirements, replacing demo/template data with realistic SaaS business data while adhering to project architecture rules.

## Proposed Changes

We will prioritize reusing existing component structures and adopting a composition-first approach to avoid creating duplicate UI elements (e.g., using a single generic `DataTable` component instead of five separate table components).

### 1. Refactor into Generic Reusable Components
To comply with the project's strict DRY and reuse principles, we will create generic wrapper components for the repetitive widget types requested:

#### [NEW] `src/components/dashboard-data-table.jsx`
- **Purpose**: A generic card-based table widget that takes `title`, `description`, `columns`, `data`, and `emptyState` as props.
- **Usage**: Will power "Recent Clients", "Active Projects", "Recent Estimates", "Recent Invoices", and "Recent Payments".

#### [NEW] `src/components/dashboard-list-widget.jsx`
- **Purpose**: A generic card-based list widget (with icons and meta text) that takes a list of items and an `emptyState`.
- **Usage**: Will power "Activity Timeline", "Upcoming Deadlines", and "Quick Actions".

### 2. Update KPI Cards
#### [MODIFY] `src/components/stats.jsx`
- Increase the number of stat cards from 4 to 8.
- **New Metrics**: Total Revenue, Outstanding Payments, Active Projects, Total Clients, Estimates Pending, Overdue Invoices, Payments Received This Month, Monthly Growth.
- Implement realistic mock data (e.g., ₹2,15,000, $84,000).

### 3. Update Charts
We will repurpose the existing Recharts widget files, renaming the exported components and internal data to match the new Workora requirements, while keeping the file names intact to minimize unnecessary file churn (or rename them if preferred, but reusing the files keeps the diff clean).

#### [MODIFY] `src/components/conversation-volume-chart.jsx`
- Repurpose as **Revenue Overview**.
- Update the Recharts implementation to display a monthly Line Chart (Jan - Dec) with `Revenue` and `Expenses` series.

#### [MODIFY] `src/components/channel-breakdown-chart.jsx`
- Repurpose as **Invoice Status**.
- Update the Donut chart to display `Paid`, `Pending`, `Overdue`, and `Draft` statuses.

#### [MODIFY] `src/components/csat-responses-chart.jsx`
- Repurpose as **Project Status**.
- Show distribution for `Planning`, `In Progress`, `Review`, `Completed`, and `On Hold`.

#### [MODIFY] `src/components/first-reply-time-chart.jsx`
- Repurpose as **Business Health**.
- Display metrics like `Average Invoice Value`, `Collection Rate`, `Active Client Ratio`, etc.

### 4. Assemble the Dashboard
#### [MODIFY] `src/components/dashboard.jsx`
- Remove the old imported components (`RecentConversations`, `SupportActivity`, `TeamOnDuty`).
- Import the new generic `DashboardDataTable` and `DashboardListWidget` components.
- Render the new Workora sections in the grid:
  - 8 KPI cards (spanning top row)
  - Revenue Overview Chart
  - Invoice & Project Status Charts
  - Business Health Chart
  - 5x Data Tables (Clients, Projects, Estimates, Invoices, Payments)
  - 3x List Widgets (Activity Timeline, Deadlines, Quick Actions)
- Ensure the layout remains responsive and retains the existing spacing/grid system.

### 5. Cleanup
#### [DELETE] `src/components/recent-conversations.jsx`
#### [DELETE] `src/components/support-activity.jsx`
#### [DELETE] `src/components/team-on-duty.jsx`
(Since these will be fully replaced by the generic wrapper components, we can safely remove them).

## Verification Plan
- Verify that the dashboard compiles without module resolution errors.
- Ensure the new generic components correctly render the realistic mock data.
- Confirm empty states are handled gracefully in the UI.
- Verify the grid layout remains responsive and consistent with the original `dashboard.jsx` structure.

## Open Questions
> [!NOTE]
> 1. Is it acceptable to delete `recent-conversations`, `support-activity`, and `team-on-duty` files as proposed above, given they will be replaced by the reusable generic components? 
> 2. Would you like the Recharts chart files (e.g., `conversation-volume-chart.jsx`) to physically be renamed to match their new content (e.g. `revenue-chart.jsx`), or should I just repurpose the existing files and rename the exported component inside them?
