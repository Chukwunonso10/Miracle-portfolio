import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

// Validation schema for subscription
const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = subscribeSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: 'Invalid email address', errors: validation.error.format() },
        { status: 400 }
      );
    }
    const { email } = validation.data;

    // Use real DB; if DB unavailable, return 503
    try {
      const existing = await db.newsletterSubscription.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json({ message: 'This email is already subscribed!' }, { status: 400 });
      }
      const subscription = await db.newsletterSubscription.create({ data: { email } });
      return NextResponse.json({ message: 'Success', id: subscription.id }, { status: 200 });
    } catch (dbError) {
      console.error('Database error during subscription:', dbError);
      return NextResponse.json({ message: 'Service unavailable. Please try again later.' }, { status: 503 });
    }
  } catch (error) {
    console.error('API newsletter subscription route error:', error);
    return NextResponse.json(
      { message: 'An internal error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subs = await db.newsletterSubscription.findMany({
      select: { id: true, email: true, createdAt: true },
    });
    return NextResponse.json({ subscriptions: subs }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch newsletter subscriptions:', error);
    return NextResponse.json({ message: 'An internal error occurred.' }, { status: 500 });
  }
}
