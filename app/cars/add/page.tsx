'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';
import Link from 'next/link';

const AddCarPage: React.FC = () => {
  const [registration, setRegistration] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registration,
          brand,
          model,
          notes
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add car');
      }

      router.push('/cars');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
        <h5>Add New Car</h5>
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
          <button className="purplebutton" type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Car'}
          </button>
        </form>
      </div>
      <Link href="/cars" className="my-4 text-indigo-700">Back to the index</Link>
    </div>
  );
};

export default AddCarPage;
