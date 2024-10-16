import { NextResponse } from 'next/server';
import prisma from '@/prisma-client'


// Get handler
export async function GET() {
  try {

    // Index the cars
    const cars = await prisma.car.findMany();
    return NextResponse.json(cars);

    //Throw errors
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cars'},
      { status: 500}
    );
  }
}

// POST handler
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { registration, brand, model, notes } = data;

    // Validation
    if (!registration || !brand || !model) {
      return NextResponse.json(
        { error: 'Missing required fields'},
        { status: 400}
      );
    }

    // Create new car
    const newCar = await prisma.car.create({
      data: {
        registration,
        brand,
        model,
        notes,
      },
    });
    return NextResponse.json(newCar, { status: 201 });

    // Throw errors
  } catch (error) {
    console.error('Error creating car:', error);
    return NextResponse.json(
      { error: 'Failed to create car'},
      { status: 500}
    );
  }
}
