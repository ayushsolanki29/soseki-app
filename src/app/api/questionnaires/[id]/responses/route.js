import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET /api/questionnaires/[id]/responses - Fetch responses for a questionnaire
export async function GET(request, { params }) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    const skip = (page - 1) * limit;

    // Verify ownership
    const questionnaire = await prisma.questionnaire.findUnique({
      where: { 
        id,
        organizationId: session.organizationId
      },
      include: {
        fields: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!questionnaire) {
      return NextResponse.json({ error: 'Questionnaire not found' }, { status: 404 });
    }

    // Fetch total count
    const totalCount = await prisma.questionnaireResponse.count({
      where: { questionnaireId: id }
    });

    // Fetch paginated responses
    const responses = await prisma.questionnaireResponse.findMany({
      where: { questionnaireId: id },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      questionnaire,
      responses,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Fetch questionnaire responses error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
