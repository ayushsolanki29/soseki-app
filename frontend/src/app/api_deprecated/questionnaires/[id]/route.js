import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET /api/questionnaires/[id] - Fetch a single questionnaire
export async function GET(request, { params }) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const questionnaire = await prisma.questionnaire.findUnique({
      where: { 
        id,
        organizationId: session.organizationId
      },
      include: {
        fields: {
          orderBy: {
            order: 'asc'
          }
        },
        client: {
          select: { id: true, name: true, email: true }
        },
        project: {
          select: { id: true, title: true }
        }
      }
    });

    if (!questionnaire) {
      return NextResponse.json({ error: 'Questionnaire not found' }, { status: 404 });
    }

    return NextResponse.json({ questionnaire });
  } catch (error) {
    console.error('Fetch questionnaire error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/questionnaires/[id] - Update a questionnaire
export async function PATCH(request, { params }) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, description, status, maxResponses, clientId, projectId, fields } = body;

    // Check if it exists
    const existing = await prisma.questionnaire.findUnique({
      where: { id, organizationId: session.organizationId }
    });

    if (!existing) {
      return NextResponse.json({ error: 'Questionnaire not found' }, { status: 404 });
    }

    // Prepare update data
    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (maxResponses !== undefined) updateData.maxResponses = maxResponses === null ? null : parseInt(maxResponses);
    if (clientId !== undefined) updateData.clientId = clientId;
    if (projectId !== undefined) updateData.projectId = projectId;

    // If fields are provided, we update them. For simplicity, delete old and recreate new ones
    if (fields) {
      // We will perform this in a transaction
      await prisma.$transaction([
        prisma.questionnaireField.deleteMany({
          where: { questionnaireId: id }
        }),
        prisma.questionnaire.update({
          where: { id },
          data: {
            ...updateData,
            fields: {
              create: fields.map((field, index) => ({
                type: field.type,
                label: field.label,
                description: field.description || null,
                required: field.required || false,
                order: index,
                options: field.options || null
              }))
            }
          }
        })
      ]);
    } else {
      await prisma.questionnaire.update({
        where: { id },
        data: updateData
      });
    }

    // Fetch the updated questionnaire
    const updatedQuestionnaire = await prisma.questionnaire.findUnique({
      where: { id },
      include: { fields: { orderBy: { order: 'asc' } } }
    });

    return NextResponse.json({ questionnaire: updatedQuestionnaire });
  } catch (error) {
    console.error('Update questionnaire error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/questionnaires/[id] - Delete a questionnaire
export async function DELETE(request, { params }) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check if it exists
    const existing = await prisma.questionnaire.findUnique({
      where: { id, organizationId: session.organizationId }
    });

    if (!existing) {
      return NextResponse.json({ error: 'Questionnaire not found' }, { status: 404 });
    }

    await prisma.questionnaire.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete questionnaire error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
