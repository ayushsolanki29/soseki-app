import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// PATCH /api/clients/[id] - Update a client
export async function PATCH(request, { params }) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const { name, email, phone, status } = body;

    // Verify ownership
    const existingClient = await prisma.client.findFirst({
      where: {
        id,
        organizationId: session.organizationId,
      }
    });

    if (!existingClient) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Check email uniqueness if email is being changed
    if (email && email.trim().toLowerCase() !== existingClient.email) {
      const emailExists = await prisma.client.findFirst({
        where: {
          email: email.trim().toLowerCase(),
          organizationId: session.organizationId,
          id: { not: id }
        }
      });

      if (emailExists) {
        return NextResponse.json({ error: 'A client with this email already exists' }, { status: 400 });
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (email !== undefined) updateData.email = email.trim().toLowerCase();
    if (phone !== undefined) updateData.phone = phone?.trim() || null;
    if (status !== undefined) updateData.status = status;

    const updatedClient = await prisma.client.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({ client: updatedClient }, { status: 200 });
  } catch (error) {
    console.error('Update client error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
