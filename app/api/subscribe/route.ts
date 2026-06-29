import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

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

    // Directly query the database for existing subscription
    try {
      const existing = await db.newsletterSubscription.findUnique({
        where: { email },
      });
      if (existing) {
        return NextResponse.json({ message: 'This email is already subscribed!' }, { status: 400 });
      }
      const subscription = await db.newsletterSubscription.create({
        data: { email },
      });
      return NextResponse.json({ message: 'Success', id: subscription.id }, { status: 200 });
    } catch (dbError) {
      // Prisma unique constraint violation (duplicate email)
      if (dbError?.code === 'P2002') {
        return NextResponse.json({ message: 'This email is already subscribed!' }, { status: 400 });
      }
      console.error('Database error during newsletter subscription:', dbError);
      return NextResponse.json(
        { message: 'An internal error occurred. Please try again.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('API newsletter subscription route error:', error);
    return NextResponse.json(
      { message: 'An internal error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
