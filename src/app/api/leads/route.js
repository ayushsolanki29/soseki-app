import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import disposableEmailDetector from 'disposable-email-detector';

// Basic email regex for sanity check
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, country, profession, earningsRange, previousTool } = body;

    // 1. Basic Presence Validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length === 0) {
      return NextResponse.json({ error: 'Full name is required and must be valid.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      return NextResponse.json({ error: 'Email is required and must be valid.' }, { status: 400 });
    }

    const cleanFullName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();

    // 2. Length Validation
    if (cleanFullName.length < 2 || cleanFullName.length > 50) {
      return NextResponse.json({ error: 'Full name must be between 2 and 50 characters.' }, { status: 400 });
    }

    if (cleanEmail.length > 100) {
      return NextResponse.json({ error: 'Email is too long.' }, { status: 400 });
    }

    // 3. Format Validation
    if (!EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address format.' }, { status: 400 });
    }

    // 4. Disposable Email Check
    try {
      const isDisposable = await disposableEmailDetector(cleanEmail);
      if (isDisposable) {
        return NextResponse.json({ error: 'Disposable email addresses are not allowed. Please use your primary email.' }, { status: 400 });
      }
    } catch (detectorError) {
      console.warn('Disposable email detector failed (ignoring check):', detectorError);
      // We log but do not block if the detector itself fails
    }

    // 5. Check if email already exists in waitlist
    const existingLead = await prisma.waitlistLead.findUnique({
      where: { email: cleanEmail },
    });

    if (existingLead) {
      return NextResponse.json(
        { error: 'You are already on the waitlist!' },
        { status: 400 }
      );
    }

    // 6. Enforce string limits on optional fields to prevent abuse
    const cleanCountry = typeof country === 'string' ? country.trim().substring(0, 50) : null;
    const cleanProfession = typeof profession === 'string' ? profession.trim().substring(0, 50) : null;
    const cleanEarningsRange = typeof earningsRange === 'string' ? earningsRange.trim().substring(0, 50) : null;
    const cleanPreviousTool = typeof previousTool === 'string' ? previousTool.trim().substring(0, 50) : null;

    const lead = await prisma.waitlistLead.create({
      data: {
        fullName: cleanFullName,
        email: cleanEmail,
        country: cleanCountry,
        profession: cleanProfession,
        earningsRange: cleanEarningsRange,
        previousTool: cleanPreviousTool,
      },
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('Waitlist lead creation error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
