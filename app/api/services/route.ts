import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const services = await db.service.findMany({
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching services' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, slug, description, benefits, deliverables, priceRange, icon } = body;

    const service = await db.service.create({
      data: { name, slug, description, benefits, deliverables, priceRange, icon }
    });

    revalidatePath('/');
    revalidatePath('/services');
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('POST /api/services error:', error);
    return NextResponse.json({ message: 'Error creating service' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, slug, description, benefits, deliverables, priceRange, icon } = body;

    const service = await db.service.update({
      where: { id },
      data: { name, slug, description, benefits, deliverables, priceRange, icon }
    });

    revalidatePath('/');
    revalidatePath('/services');
    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    console.error('PUT /api/services error:', error);
    return NextResponse.json({ message: 'Error updating service' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    await db.service.delete({ where: { id } });

    revalidatePath('/');
    revalidatePath('/services');
    return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/services error:', error);
    return NextResponse.json({ message: 'Error deleting service' }, { status: 500 });
  }
}
