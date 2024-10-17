'use client';

import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '@/app/globals.css';

interface Car {
  id: number;
  registration: string;
  brand: string;
  model: string;
  notes?: string;
}

const CarsPage: React.FC = () => {
  // Intitializers
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars');
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        setCars(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Delete functionality
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this car?')) {
      return;
    }

    try {
      const response = await fetch(`api/cars/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete car');
      }

      // Remove the car from the index
      setCars(cars.filter((car) => car.id !== id));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="container">
      <h5>Cars Index</h5>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {loading ? (
          <p>Loading cars...</p>
        ) : error? (
          <p>Error loading cars: {error}</p>
        ) : cars.length > 0 ? (
          <table className=" table-auto w-full text-sm">
            <thead className="text-xs uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">Brand</th>
                <th scope="col" className="px-6 py-3">Model</th>
                <th scope="col" className="px-6 py-3">Registration</th>
                <th scope="col" className="px-6 py-3">Notes</th>
                <th scope="col" className="px-6 py-3">Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr
                  key={car.id}
                  className="odd:bg-white even:bg-gray-50 border-b"
                >
                  <td className="px-6 py-4">{car.brand}</td>
                  <td className="px-6 py-4">{car.model}</td>
                  <td className="px-6 py-4">{car.registration}</td>
                  <td className="px-6 py-4">{car.notes}</td>
                  <td className="px-6 py-4">
                    <Link href={`/cars/edit/${car.id}`}>
                      <button>Edit /</button>
                    </Link>
                    <button onClick={() => handleDelete(car.id)}>&nbsp;Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No cars yet.</p>
        )}
      </div>
      <Link className="purplebutton" href="/cars/add">Add new car</Link>
    </div>

  );
};

export default CarsPage;
