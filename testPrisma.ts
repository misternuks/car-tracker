import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const newCar = await prisma.car.create({
    data: {
      registration: 'testregistration',
      brand: 'Brandmaster',
      model: '5000',
      notes: 'test car'
    }
  });
  console.log('Created a new car:', JSON.stringify(newCar, null, 2));

  const allCars = await prisma.car.findMany();
  console.log('List of all cars:', JSON.stringify(allCars, null, 2));
}

main().catch((e) => {
  console.error(e);
}).finally(async () => {
  await prisma.$disconnect();
});
