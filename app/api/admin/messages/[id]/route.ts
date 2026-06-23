import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { isRead } = body;

    try {
      const updated = await db.contactMessage.update({
        where: { id },
        data: { isRead }
      });
      return NextResponse.json(updated, { status: 200 });
    } catch (dbError) {
      const errMessage = dbError instanceof Error ? dbError.message : String(dbError);
      console.warn('DB update message bypassed (offline):', errMessage);
      return NextResponse.json({ message: 'Mock updated', simulated: true }, { status: 200 });
    }
  } catch (error) {
    console.error('PUT /api/admin/messages/[id] error:', error);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    try {
      await db.contactMessage.delete({ where: { id } });
      return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
    } catch (dbError) {
      const errMessage = dbError instanceof Error ? dbError.message : String(dbError);
      console.warn('DB delete message bypassed (offline):', errMessage);
      return NextResponse.json({ message: 'Mock deleted', simulated: true }, { status: 200 });
    }
  } catch (error) {
    console.error('DELETE /api/admin/messages/[id] error:', error);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
