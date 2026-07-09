const prisma = require("../../database/prisma");

const search = async (query, organizationId) => {
    if (!query || query.trim() === "") {
        return [];
    }

    const q = query.trim();
    
    // We can run searches concurrently
    const [clients, projects, invoices, questionnaires, supportTickets] = await Promise.all([
      prisma.client.findMany({
        where: {
          organizationId,
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
          ]
        },
        take: 5,
        select: { id: true, name: true, email: true }
      }),
      prisma.project.findMany({
        where: {
          organizationId,
          title: { contains: q, mode: "insensitive" }
        },
        take: 5,
        select: { id: true, title: true, status: true }
      }),
      prisma.invoice.findMany({
        where: {
          organizationId,
          OR: [
            { invoiceNumber: { contains: q, mode: "insensitive" } },
            { notice: { contains: q, mode: "insensitive" } }
          ]
        },
        take: 5,
        select: { id: true, invoiceNumber: true, status: true, client: { select: { name: true } } }
      }),
      prisma.questionnaire.findMany({
        where: {
          organizationId,
          title: { contains: q, mode: "insensitive" }
        },
        take: 5,
        select: { id: true, title: true, status: true }
      }),
      prisma.supportTicket.findMany({
        where: {
          organizationId,
          title: { contains: q, mode: "insensitive" }
        },
        take: 5,
        select: { id: true, title: true, status: true }
      })
    ]);

    let results = [];

    if (clients.length > 0) {
      results.push({
        group: "Clients",
        items: clients.map(c => ({ id: c.id, label: c.name, subLabel: c.email, type: 'client' }))
      });
    }
    
    if (projects.length > 0) {
      results.push({
        group: "Projects",
        items: projects.map(p => ({ id: p.id, label: p.title, subLabel: p.status, type: 'project' }))
      });
    }

    if (invoices.length > 0) {
      results.push({
        group: "Invoices",
        items: invoices.map(i => ({ id: i.id, label: i.invoiceNumber, subLabel: i.client?.name, type: 'invoice' }))
      });
    }

    if (questionnaires.length > 0) {
      results.push({
        group: "Questionnaires",
        items: questionnaires.map(q => ({ id: q.id, label: q.title, subLabel: q.status, type: 'questionnaire' }))
      });
    }

    if (supportTickets.length > 0) {
      results.push({
        group: "Support Tickets",
        items: supportTickets.map(t => ({ id: t.id, label: t.title, subLabel: t.status, type: 'support_ticket' }))
      });
    }

    // Handle formatId logic if the query looks like a formatId (e.g., INV-, CLI-)
    const prefixMatch = q.match(/^([A-Z]{3,4})-(.*)/i);
    if (prefixMatch) {
        const prefix = prefixMatch[1].toUpperCase();
        const idSegment = prefixMatch[2]; 
        
        if (idSegment.length >= 3) { 
            try {
                if (prefix === "CLI") {
                    const idClients = await prisma.$queryRaw`SELECT id, name, email FROM "Client" WHERE "organizationId" = ${organizationId} AND id::text LIKE ${idSegment + '%'} LIMIT 5`;
                    if (idClients.length) addIdResults(results, "Clients", idClients, c => ({ id: c.id, label: c.name, subLabel: c.email, type: 'client' }));
                } else if (prefix === "PRJ") {
                    const idProjects = await prisma.$queryRaw`SELECT id, title, status FROM "Project" WHERE "organizationId" = ${organizationId} AND id::text LIKE ${idSegment + '%'} LIMIT 5`;
                    if (idProjects.length) addIdResults(results, "Projects", idProjects, p => ({ id: p.id, label: p.title, subLabel: p.status, type: 'project' }));
                } else if (prefix === "INV") {
                    // Need a JOIN for client name
                    const idInvoices = await prisma.$queryRaw`
                        SELECT i.id, i."invoiceNumber", i.status, c.name as "clientName" 
                        FROM "Invoice" i 
                        LEFT JOIN "Client" c ON i."clientId" = c.id
                        WHERE i."organizationId" = ${organizationId} AND i.id::text LIKE ${idSegment + '%'} 
                        LIMIT 5`;
                    if (idInvoices.length) addIdResults(results, "Invoices", idInvoices, i => ({ id: i.id, label: i.invoiceNumber, subLabel: i.clientName, type: 'invoice' }));
                } else if (prefix === "FRM") {
                    const idForms = await prisma.$queryRaw`SELECT id, title, status FROM "Questionnaire" WHERE "organizationId" = ${organizationId} AND id::text LIKE ${idSegment + '%'} LIMIT 5`;
                    if (idForms.length) addIdResults(results, "Questionnaires", idForms, q => ({ id: q.id, label: q.title, subLabel: q.status, type: 'questionnaire' }));
                } else if (prefix === "SPT") {
                    const idTickets = await prisma.$queryRaw`SELECT id, title, status FROM "SupportTicket" WHERE "organizationId" = ${organizationId} AND id::text LIKE ${idSegment + '%'} LIMIT 5`;
                    if (idTickets.length) addIdResults(results, "Support Tickets", idTickets, t => ({ id: t.id, label: t.title, subLabel: t.status, type: 'support_ticket' }));
                }
            } catch (err) {
                console.error("ID Search error:", err.message);
            }
        }
    }

    return results;
};

function addIdResults(results, groupName, newItems, mapper) {
    let group = results.find(g => g.group === groupName);
    if (!group) {
        group = { group: groupName, items: [] };
        results.push(group);
    }
    const mappedItems = newItems.map(mapper);
    for (let item of mappedItems) {
        if (!group.items.find(i => i.id === item.id)) {
            group.items.push(item);
        }
    }
}

module.exports = {
  search
};
