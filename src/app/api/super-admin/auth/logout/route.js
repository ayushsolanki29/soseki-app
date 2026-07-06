import { NextResponse } from 'next/server';
import { clearSuperCookies } from '@/lib/auth';

export async function POST() {
  try {
    await clearSuperCookies();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Super Admin Logout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
