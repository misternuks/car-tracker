'use client';

import React, { useEffect, useState } from 'react';
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
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
  return (
    <div className="container">
      <h5>Cars Index</h5>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {loading ? (
          <p>Loading cars...</p>
        ) : error? (
          <p>Error loading cars: {error}</p>
        ) : cars.length > 0 ? (
          <table className=" table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Brand</th>
                <th scope="col" className="px-6 py-3">Model</th>
                <th scope="col" className="px-6 py-3">Registration</th>
                <th scope="col" className="px-6 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr
                  key={car.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4">{car.brand}</td>
                   <td className="px-6 py-4">{car.model}</td>
                   <td className="px-6 py-4">{car.registration}</td>
                   <td className="px-6 py-4">{car.notes}</td>
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
