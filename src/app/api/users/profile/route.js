import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // We assume the first user for now, or fetch by session if auth was implemented.
    const user = await prisma.user.findFirst();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = password; // Should hash in real app

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
