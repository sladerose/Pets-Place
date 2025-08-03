'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';

interface Pet {
  id: string;
  breed: string;
  price: number;
  location: string;
  image: string[];
  description: string;
  created_at: string;
}

const PetDetailsPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const thumbnailRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const fetchPet = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('pets')
          .select('id, breed, price, location, image, description, created_at')
          .eq('id', id as string)
          .single();

        if (error) {
          throw error;
        }
        setPet(data);
        if (data && data.image && data.image.length > 0) {
          setMainImage(data.image[0]); // Set the first image as the main image
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch pet details.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPet();
    }
  }, [id]);

  const handleThumbnailKeyDown = (event: React.KeyboardEvent<HTMLImageElement>, index: number) => {
    if (!pet || !pet.image) return;

    const currentThumbnail = thumbnailRefs.current[index];
    if (!currentThumbnail) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setMainImage(pet.image[index]);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = (index + 1) % pet.image.length;
      thumbnailRefs.current[nextIndex]?.focus();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const prevIndex = (index - 1 + pet.image.length) % pet.image.length;
      thumbnailRefs.current[prevIndex]?.focus();
    }
  };

  if (isLoading) {
    return <div className="flex flex-col min-h-screen items-center justify-center">Loading pet details...</div>;
  }

  if (error) {
    return <div className="flex flex-col min-h-screen items-center justify-center text-red-500">Error: {error}</div>;
  }

  if (!pet) {
    return <div className="flex flex-col min-h-screen items-center justify-center">Pet not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {mainImage && (
              <img
                src={mainImage}
                alt={`Main image of ${pet.breed}`}
                className="w-full h-96 object-cover rounded-lg shadow-md mb-4"
              />
            )}
            <div role="group" aria-label="Pet image thumbnails" className="grid grid-cols-4 gap-2">
              {pet.image.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`${pet.breed} thumbnail ${index + 1}`}
                  role="button"
                  tabIndex={0} // Make thumbnails focusable
                  aria-label={`View image ${index + 1} of ${pet.breed}`}
                  className={`w-full h-20 object-cover rounded-lg cursor-pointer ${mainImage === imgSrc ? 'border-2 border-blue-500' : ''}`}
                  onClick={() => setMainImage(imgSrc)}
                  onKeyDown={(e) => handleThumbnailKeyDown(e, index)}
                  ref={el => { thumbnailRefs.current[index] = el; }}
                />
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{pet.breed}</h1>
            <p className="text-2xl text-gray-600 mt-2">R {pet.price.toLocaleString()}</p>
            <p className="text-lg text-gray-500 mt-2">{pet.location}</p>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800">Description</h2>
              <p className="text-gray-600 mt-4">{pet.description}</p>
            </div>
            <div className="mt-8 p-4 border border-gray-200 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Seller</h2>
              <p className="text-gray-600 mb-2">Email: seller@example.com</p>
              <p className="text-gray-600 mb-4">Phone: +27 12 345 6789</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                aria-label={`Contact seller for ${pet.breed}`}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 Pets Place. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PetDetailsPage;