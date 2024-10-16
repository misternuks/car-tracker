import { NextResponse } from 'next/server';
import prisma from '@/prisma-client';

// PUT handler
export async function PUT(
  request: Request,

  // Access the dynamic route for the car via the options
  { params }: { params: { id: string } }
) {
  try {
    const carId = Number(params.id);
    const data = await request.json();
    const { registration, brand, model, notes } = data;

    // Validation
    if (!registration || !brand || !model) {
      return NextResponse.json(
        { errror: 'Missing required fields' },
        { status: 400}
      );
    }

    // Update the car via Prisma
    const updatedCar = await prisma.car.update({
      where: { id: carId },
      data: {
        registration,
        brand,
        model,
        notes
      },
    });

    return NextResponse.json(updatedCar);

    // Handle errors
  } catch (error) {
    console.error('Error updating car:', error);
    return NextResponse.json(
      { error: 'Failed to update care'},
      { status: 500 }
    );
  }
}
