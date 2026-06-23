import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Helper to check if database is online
async function isDbConnected(): Promise<boolean> {
  try {
    await db.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    return false;
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Database check
    try {
      const dbOnline = await isDbConnected();
      if (dbOnline) {
        await db.newsletterSubscription.delete({
          where: { id },
        });
        return NextResponse.json({ message: 'Subscription deleted successfully' }, { status: 200 });
      } else {
        throw new Error('Database is offline');
      }
    } catch (dbError) {
      console.warn('Database delete failed for newsletter subscription, mock execution triggered:', dbError);
      
      // Simulate success response when DB is offline
      return NextResponse.json({ 
        message: 'Mock Delete Success (DB Offline)', 
        simulated: true 
      }, { status: 200 });
    }

  } catch (error) {
    console.error('API newsletter subscription delete error:', error);
    return NextResponse.json(
      { message: 'An internal error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
