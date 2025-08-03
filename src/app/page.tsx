'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import PetCard from '@/components/PetCard';
import FilterBar from '@/components/FilterBar';

const INITIAL_LOAD_COUNT = 6;
const LOAD_MORE_COUNT = 3;

interface Pet {
  id: string;
  breed: string;
  price: number;
  location: string;
  image: string[];
  description: string;
  created_at: string;
  age?: number; // Added age property
}

const HomePage = () => {
  const [allPets, setAllPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(INITIAL_LOAD_COUNT);

  // New filter states
  const [minAge, setMinAge] = useState<string>('');
  const [maxAge, setMaxAge] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [dateListed, setDateListed] = useState<string>('');

  const loaderRef = useRef<HTMLDivElement>(null);

  const breeds = [...new Set(allPets.map((pet) => pet.breed))];
  const locations = [...new Set(allPets.map((pet) => pet.location))];

  const fetchAndFilterPets = useCallback(async (
    breeds: string[],
    location: string,
    search: string,
    minAge: string,
    maxAge: string,
    minPrice: string,
    maxPrice: string,
    dateListed: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const randomError = Math.random();
      if (randomError < 0.1) {
        throw new Error("Network connection lost. Please check your internet.");
      } else if (randomError < 0.2) {
        throw new Error("Data format error. Please contact support.");
      }

      let query = supabase.from('pets').select('id, breed, price, location, image, description, created_at, age');

      if (breeds.length > 0) {
        query = query.in('breed', breeds);
      }
      if (location) {
        query = query.eq('location', location);
      }
      if (search) {
        const lowerCaseSearch = search.toLowerCase();
        query = query.or(
          `breed.ilike.%${lowerCaseSearch}%,location.ilike.%${lowerCaseSearch}%,description.ilike.%${lowerCaseSearch}%`
        );
      }
      if (minAge) {
        query = query.gte('age', parseInt(minAge));
      }
      if (maxAge) {
        query = query.lte('age', parseInt(maxAge));
      }
      if (minPrice) {
        query = query.gte('price', parseFloat(minPrice));
      }
      if (maxPrice) {
        query = query.lte('price', parseFloat(maxPrice));
      }
      if (dateListed) {
        query = query.gte('created_at', dateListed);
      }

      const { data, error: supabaseError } = await query;

      if (supabaseError) {
        throw supabaseError;
      }

      setAllPets(data || []);
      setFilteredPets(data || []);
    } catch (err: any) {
      if (err.message.includes("Network")) {
        setError("Connection failed: " + err.message);
      } else if (err.message.includes("Data format")) {
        setError("Problem with data: " + err.message);
      } else if (err.code) {
        setError(`Supabase Error (${err.code}): ${err.message}`);
      } else {
        setError(err.message || 'Failed to fetch pets. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const applyFilters = useCallback(() => {
    fetchAndFilterPets(
      selectedBreeds,
      selectedLocation,
      searchTerm,
      minAge,
      maxAge,
      minPrice,
      maxPrice,
      dateListed
    );
  }, [selectedBreeds, selectedLocation, searchTerm, minAge, maxAge, minPrice, maxPrice, dateListed, fetchAndFilterPets]);

  const handleBreedChange = (breed: string, isChecked: boolean) => {
    const newSelectedBreeds = isChecked
      ? [...selectedBreeds, breed]
      : selectedBreeds.filter((b) => b !== breed);
    setSelectedBreeds(newSelectedBreeds);
    setDisplayCount(INITIAL_LOAD_COUNT);
    // applyFilters will be called by useEffect
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const location = e.target.value;
    setSelectedLocation(location);
    setDisplayCount(INITIAL_LOAD_COUNT);
    // applyFilters will be called by useEffect
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setDisplayCount(INITIAL_LOAD_COUNT);
    // applyFilters will be called by useEffect
  };

  const handleMinAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinAge(e.target.value);
    setDisplayCount(INITIAL_LOAD_COUNT);
  };

  const handleMaxAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxAge(e.target.value);
    setDisplayCount(INITIAL_LOAD_COUNT);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
    setDisplayCount(INITIAL_LOAD_COUNT);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
    setDisplayCount(INITIAL_LOAD_COUNT);
  };

  const handleDateListedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateListed(e.target.value);
    setDisplayCount(INITIAL_LOAD_COUNT);
  };

  const retryFilter = () => {
    applyFilters();
  };

  // Apply filters whenever filter states change
  useEffect(() => {
    const handler = setTimeout(() => {
      applyFilters();
    }, 300); // Debounce filter application
    return () => clearTimeout(handler);
  }, [selectedBreeds, selectedLocation, searchTerm, minAge, maxAge, minPrice, maxPrice, dateListed, applyFilters]);

  // Infinite scrolling logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && displayCount < filteredPets.length) {
          setIsLoading(true);
          setTimeout(() => {
            setDisplayCount((prevCount) => prevCount + LOAD_MORE_COUNT);
            setIsLoading(false);
          }, 500); // Simulate loading more data
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isLoading, displayCount, filteredPets.length]);

  const petsToDisplay = filteredPets.slice(0, displayCount);

  return (
    <div className="flex flex-col min-h-screen">
      

      <div
        className="relative bg-white rounded-lg shadow-md h-64 flex items-center text-gray-800"
      >
        <div className="container mx-auto px-6 text-center p-4">
          <h1 className="text-3xl font-bold mb-4">
            Find KUSA registered breeds of dogs & puppies in South Africa
          </h1>
          <div className="w-full max-w-lg mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by breed, location, or description..."
              className="w-full p-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md border border-gray-300"
            />
          </div>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <FilterBar
              breeds={breeds}
              locations={locations}
              selectedBreeds={selectedBreeds}
              onBreedChange={handleBreedChange}
              onLocationChange={handleLocationChange}
              minAge={minAge}
              maxAge={maxAge}
              minPrice={minPrice}
              maxPrice={maxPrice}
              dateListed={dateListed}
              onMinAgeChange={handleMinAgeChange}
              onMaxAgeChange={handleMaxAgeChange}
              onMinPriceChange={handleMinPriceChange}
              onMaxPriceChange={handleMaxPriceChange}
              onDateListedChange={handleDateListedChange}
            />
          </div>

          <section className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {error ? (
                <div role="status" aria-live="polite" className="col-span-full text-center">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button
                    onClick={retryFilter}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Retry
                  </button>
                </div>
              ) : isLoading && petsToDisplay.length === 0 ? (
                <p role="status" aria-live="polite" className="col-span-full text-center">Loading pets...</p>
              ) : petsToDisplay.length > 0 ? (
                petsToDisplay.map((pet) => <PetCard key={pet.id} pet={pet} />)
              ) : (
                <p role="status" aria-live="polite" className="col-span-full text-center">No pets match your current filters. Try adjusting your search.</p>
              )}
            </div>
            {isLoading && petsToDisplay.length > 0 && (
              <p role="status" aria-live="polite" className="text-center mt-4">Loading more pets...</p>
            )}
            {!isLoading && petsToDisplay.length > 0 && petsToDisplay.length === filteredPets.length && (
              <p role="status" aria-live="polite" className="text-center mt-4">All pets loaded.</p>
            )}
            <div ref={loaderRef} style={{ height: '20px' }}></div>
          </section>
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

export default HomePage;