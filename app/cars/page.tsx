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
      <div className="card">
        <h1>Cars Index</h1>
        <Link href="/cars/add">Add new car</Link>
        {loading ? (
          <p>Loading cars...</p>
        ) : error? (
          <p>Error loading cars: {error}</p>
        ) : cars.length > 0 ? (
          <ul>
            {cars.map((car) => (
              <li key={car.id}>
                {car.brand} {car.model} {car.registration} {car.notes}
              </li>
            ))}
          </ul>
        ) : (
          <p>No cars yet.</p>
        )}
      </div>
    </div>
  );
};

export default CarsPage;
