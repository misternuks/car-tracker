'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

const EditCarPage: React.FC = () => {

  // Initializers
  const [registration, setRegistration] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams();

  // Fetch car data
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`/api/cars/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch car data');
        }
        const data = await response.json();
        setRegistration(data.registration);
        setBrand(data.brand);
        setModel(data.model);
        setNotes(data.notes || '');
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [params.id]);

  //Handle form details and submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    try {
      const response = await fetch(`/api/cars/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registration,
          brand,
          model,
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update car');
      }

      // Send the update back to the index
      router.push('/cars');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div className="container">
        <h5>Edit Car Details</h5>
      <div>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <form onSubmit={handleSubmit} className="card">
          <div>
            <label>
              Registration:
              <input
                type="text"
                value={registration}
                onChange={(e) => setRegistration(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Brand:
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Model:
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Notes:
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </label>
          </div>
          <button className="purplebutton" type="submit" disabled={updating}>
            {updating ? 'Updating...' : 'Update Car'}
          </button>
        </form>
      </div>
      <Link href="/cars" className="my-4 text-indigo-700">Back to the index</Link>
    </div>
  );

};

export default EditCarPage;
