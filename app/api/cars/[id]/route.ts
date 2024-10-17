import { NextResponse } from 'next/server';
import prisma from '@/prisma-client';
import { Prisma } from '@prisma/client';


// GET handler
export async function GET(
  request: Request,

  // Access the ID parameter from the URL via the options
  { params }: { params: { id: string } }
) {
  try {
    const carId = Number(params.id);
    const car = await prisma.car.findUnique({
      where: { id: carId },
    });

    if (!car) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }

    return NextResponse.json(car);

  // Handle errors
  } catch (error) {
    console.error('Error fetching car:', error);
    return NextResponse.json(
      { error: 'Failed to fetch car' },
      { status: 500 }
    );
  }
}

// PUT handler
export async function PUT(
  request: Request,

  // Access the ID parameter from the URL via the options
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

    // If successful
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

// DELETE handler
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const carId = Number(params.id);

    await prisma.car.delete({
      where: { id: carId },
    });

    return NextResponse.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: 'Car not found' }, { status: 404 });
      }
    }

    return NextResponse.json({ error: 'Failed to delete car' }, { status: 500 });
  }
}
