import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching testimonials' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clientName, clientRole, clientCompany, clientAvatar, testimonialText, rating, isFeatured } = body;

    const testimonial = await db.testimonial.create({
      data: { clientName, clientRole, clientCompany, clientAvatar, testimonialText, rating, isFeatured }
    });

    revalidatePath('/');
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('POST /api/testimonials error:', error);
    return NextResponse.json({ message: 'Error creating testimonial' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, clientName, clientRole, clientCompany, clientAvatar, testimonialText, rating, isFeatured } = body;

    const testimonial = await db.testimonial.update({
      where: { id },
      data: { clientName, clientRole, clientCompany, clientAvatar, testimonialText, rating, isFeatured }
    });

    revalidatePath('/');
    return NextResponse.json(testimonial, { status: 200 });
  } catch (error) {
    console.error('PUT /api/testimonials error:', error);
    return NextResponse.json({ message: 'Error updating testimonial' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    await db.testimonial.delete({ where: { id } });

    revalidatePath('/');
    return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/testimonials error:', error);
    return NextResponse.json({ message: 'Error deleting testimonial' }, { status: 500 });
  }
}
