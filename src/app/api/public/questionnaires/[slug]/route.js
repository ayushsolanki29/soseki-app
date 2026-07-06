import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/public/questionnaires/[slug] - Fetch form details for respondents
export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const questionnaire = await prisma.questionnaire.findUnique({
      where: { slug },
      include: {
        fields: {
          orderBy: { order: 'asc' }
        },
        organization: {
          select: { name: true }
        }
      }
    });

    if (!questionnaire) {
      return NextResponse.json({ error: 'Questionnaire not found' }, { status: 404 });
    }

    // Check status
    if (questionnaire.status !== 'Active') {
      return NextResponse.json({ error: 'This questionnaire is currently inactive.' }, { status: 403 });
    }

    // Check limits
    if (questionnaire.maxResponses && questionnaire.responseCount >= questionnaire.maxResponses) {
      return NextResponse.json({ error: 'This questionnaire has reached its maximum number of responses.' }, { status: 403 });
    }

    return NextResponse.json({ questionnaire });
  } catch (error) {
    console.error('Fetch public questionnaire error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/public/questionnaires/[slug] - Submit responses
export async function POST(request, { params }) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { answers } = body;

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Invalid answers payload' }, { status: 400 });
    }

    const questionnaire = await prisma.questionnaire.findUnique({
      where: { slug },
      include: { fields: true }
    });

    if (!questionnaire) {
      return NextResponse.json({ error: 'Questionnaire not found' }, { status: 404 });
    }

    if (questionnaire.status !== 'Active') {
      return NextResponse.json({ error: 'This questionnaire is currently inactive.' }, { status: 403 });
    }

    if (questionnaire.maxResponses && questionnaire.responseCount >= questionnaire.maxResponses) {
      return NextResponse.json({ error: 'This questionnaire has reached its maximum number of responses.' }, { status: 403 });
    }

    // Validate required fields
    for (const field of questionnaire.fields) {
      if (field.required && !answers[field.id]) {
        return NextResponse.json({ error: `Field "${field.label}" is required.` }, { status: 400 });
      }
    }

    // Process submission in a transaction to safely increment count
    await prisma.$transaction([
      prisma.questionnaireResponse.create({
        data: {
          questionnaireId: questionnaire.id,
          clientId: questionnaire.clientId, // implicitly link to client if the form is client-specific
          answers: answers
        }
      }),
      prisma.questionnaire.update({
        where: { id: questionnaire.id },
        data: { responseCount: { increment: 1 } }
      })
    ]);

    return NextResponse.json({ success: true, message: 'Response submitted successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Submit public questionnaire error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
