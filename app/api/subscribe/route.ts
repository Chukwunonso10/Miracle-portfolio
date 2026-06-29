import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

// In-memory store for mock mode when DB has no data
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

      // Determine DB status and record count
      let dbOnline = false;
      let subscriptionCount = 0;
      try {
        subscriptionCount = await db.newsletterSubscription.count();
        dbOnline = true;
      } catch (connError) {
        dbOnline = false;
      }

      if (dbOnline && subscriptionCount > 0) {
        // Use real database
        try {
          const existing = await db.newsletterSubscription.findUnique({ where: { email } });
          if (existing) {
            return NextResponse.json({ message: 'This email is already subscribed!' }, { status: 400 });
          }
          const subscription = await db.newsletterSubscription.create({ data: { email } });
          return NextResponse.json({ message: 'Success', id: subscription.id }, { status: 200 });
        } catch (dbError: any) {
          if (dbError?.code === 'P2002') {
            return NextResponse.json({ message: 'This email is already subscribed!' }, { status: 400 });
          }
          console.error('Database error during newsletter subscription:', dbError);
          return NextResponse.json({ message: 'An internal error occurred. Please try again.' }, { status: 500 });
        }
      } else if (dbOnline && subscriptionCount === 0) {
        // No data in DB – use mock mode
        if (mockSubscribedEmails.has(email)) {
          return NextResponse.json({ message: 'This email is already subscribed (mock mode)!' }, { status: 400 });
        }
        mockSubscribedEmails.add(email);
        return NextResponse.json({
          message: 'Mock Success (DB Offline)',
          simulated: true,
          data: { email, createdAt: new Date().toISOString() },
        }, { status: 200 });
      } else {
        // DB offline – cannot safely determine data presence
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
