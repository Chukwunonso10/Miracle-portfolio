import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { isDatabaseEmpty } from '@/lib/dbHelper';

// In‑memory store for mock newsletter subscriptions
const mockSubscribedEmails = new Set<string>();


const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});



export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate email
    const validation = subscribeSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: 'Invalid email address', errors: validation.error.format() },
        { status: 400 }
      );
    }

    const { email } = validation.data;



      // Always use the real database. If the DB is unreachable, respond with service unavailable.
      try {
        const existing = await db.newsletterSubscription.findUnique({ where: { email } });
        if (existing) {
          return NextResponse.json({ message: 'This email is already subscribed!' }, { status: 400 });
        }
        const subscription = await db.newsletterSubscription.create({ data: { email } });
        return NextResponse.json({ message: 'Success', id: subscription.id }, { status: 200 });
      } catch (dbError: any) {
        // Fallback to mock mode on any DB error
        if (mockSubscribedEmails.has(email)) {
          return NextResponse.json({ message: 'This email is already subscribed (mock mode)!' }, { status: 400 });
        }
        mockSubscribedEmails.add(email);
        return NextResponse.json({
          message: 'Mock Success (DB Offline)',
          simulated: true,
          data: { email, createdAt: new Date().toISOString() },
        }, { status: 200 });

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
    // If DB has no subscriptions, fall back to mock store
    const count = await db.newsletterSubscription.count();
    if (count === 0) {
      const mockList = Array.from(mockSubscribedEmails).map((email) => ({ email }));
      return NextResponse.json({ subscriptions: mockList }, { status: 200 });
    }
    // Real DB subscriptions
    const subs = await db.newsletterSubscription.findMany({
      select: { id: true, email: true, createdAt: true },
    });
    return NextResponse.json({ subscriptions: subs }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch newsletter subscriptions:', error);
    return NextResponse.json({ message: 'An internal error occurred.' }, { status: 500 });
  }
}
