import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET /api/questionnaires - Fetch questionnaires with pagination and search
export async function GET(request) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const status = searchParams.get('status') || 'All';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const skip = (page - 1) * limit;

    // Build the where clause
    const where = {
      organizationId: session.organizationId,
      ...(status !== 'All' ? { status } : {}),
      ...(query && {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ]
      })
    };

    // Fetch total count
    const totalCount = await prisma.questionnaire.count({ where });

    // Fetch paginated data
    const questionnaires = await prisma.questionnaire.findMany({
      where,
      skip,
      take: limit,
      include: {
        _count: {
          select: { responses: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      questionnaires: questionnaires.map(q => ({
        ...q,
        responseCount: q._count.responses
      })),
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Fetch questionnaires error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/questionnaires - Create a new questionnaire
export async function POST(request) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, maxResponses, clientId, projectId, fields } = body;

    // Basic Validation
    if (!title || title.trim().length === 0) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    
    // Generate a unique slug
    const slug = crypto.randomUUID();

    // Create questionnaire
    const newQuestionnaire = await prisma.questionnaire.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        slug,
        maxResponses: maxResponses ? parseInt(maxResponses) : null,
        organizationId: session.organizationId,
        clientId: clientId || null,
        projectId: projectId || null,
        fields: fields && fields.length > 0 ? {
          create: fields.map((field, index) => ({
            type: field.type,
            label: field.label,
            description: field.description || null,
            required: field.required || false,
            order: index,
            options: field.options || null
          }))
        } : undefined
      },
      include: {
        fields: true
      }
    });

    return NextResponse.json({ questionnaire: newQuestionnaire }, { status: 201 });
  } catch (error) {
    console.error('Create questionnaire error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
